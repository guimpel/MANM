
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { sendQuoteViaWhatsApp, validateBrazilianPhone } from '@/services/whatsappService';
import { toast } from 'sonner';

interface QuoteItem {
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface WhatsAppQuoteButtonProps {
  clientName: string;
  clientPhone?: string;
  companyName: string;
  quoteItems: QuoteItem[];
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

export const WhatsAppQuoteButton: React.FC<WhatsAppQuoteButtonProps> = ({
  clientName,
  clientPhone,
  companyName,
  quoteItems,
  disabled = false,
  size = 'default'
}) => {
  const handleSendQuote = () => {
    if (!clientPhone) {
      toast.error('Número de telefone não informado', {
        description: 'O cliente precisa ter um número de WhatsApp cadastrado.'
      });
      return;
    }

    if (!validateBrazilianPhone(clientPhone)) {
      toast.error('Número de telefone inválido', {
        description: 'Verifique se o número está no formato correto.'
      });
      return;
    }

    if (!quoteItems || quoteItems.length === 0) {
      toast.error('Cotação vazia', {
        description: 'Adicione pelo menos um item à cotação.'
      });
      return;
    }

    const totalValue = quoteItems.reduce((sum, item) => sum + item.total_price, 0);

    const quoteData = {
      clientName,
      companyName,
      totalValue,
      items: quoteItems.map(item => ({
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        total: item.total_price
      }))
    };

    sendQuoteViaWhatsApp(clientPhone, quoteData);
  };

  return (
    <Button
      onClick={handleSendQuote}
      disabled={disabled || !clientPhone || !quoteItems?.length}
      size={size}
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      Enviar via WhatsApp
    </Button>
  );
};
