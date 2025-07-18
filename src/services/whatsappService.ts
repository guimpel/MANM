
import { toast } from 'sonner';

export interface QuoteData {
  clientName: string;
  companyName: string;
  totalValue: number;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
}

export function validateBrazilianPhone(phone: string): boolean {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it has 10 or 11 digits (Brazilian format)
  if (cleanPhone.length < 10 || cleanPhone.length > 11) {
    return false;
  }
  
  // Check if DDD is valid (11-99)
  const ddd = parseInt(cleanPhone.substring(0, 2));
  if (ddd < 11 || ddd > 99) {
    return false;
  }
  
  // For mobile numbers (11 digits), the third digit should be 9
  if (cleanPhone.length === 11 && cleanPhone.charAt(2) !== '9') {
    return false;
  }
  
  return true;
}

export function formatBrazilianPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 11) {
    return `+55 (${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
  } else if (cleanPhone.length === 10) {
    return `+55 (${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
  }
  
  return phone;
}

export function sendQuoteViaWhatsApp(phone: string, quoteData: QuoteData): void {
  try {
    // Format the phone number for WhatsApp
    const cleanPhone = phone.replace(/\D/g, '');
    const whatsappPhone = cleanPhone.startsWith('55') ? cleanPhone : '55' + cleanPhone;
    
    // Create the message text
    let message = `*Cotação - ${quoteData.companyName}*\n\n`;
    message += `Olá ${quoteData.clientName}!\n\n`;
    message += `Segue a cotação solicitada:\n\n`;
    
    quoteData.items.forEach((item, index) => {
      message += `*${index + 1}.* ${item.description}\n`;
      message += `   Qtd: ${item.quantity} | Valor unit.: R$ ${item.unitPrice.toFixed(2)}\n`;
      message += `   Total: R$ ${item.total.toFixed(2)}\n\n`;
    });
    
    message += `*VALOR TOTAL: R$ ${quoteData.totalValue.toFixed(2)}*\n\n`;
    message += `Para aceitar esta cotação ou tirar dúvidas, responda esta mensagem.\n\n`;
    message += `Atenciosamente,\n${quoteData.companyName}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodedMessage}`;
    
    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');
    
    toast.success('Abrindo WhatsApp para enviar cotação');
  } catch (error) {
    console.error('Erro ao enviar via WhatsApp:', error);
    toast.error('Erro ao abrir WhatsApp. Tente novamente.');
  }
}

// Mock verification functions for development
export function sendWhatsAppVerification(phone: string): Promise<boolean> {
  console.log(`[Mock] Sending WhatsApp verification to: ${phone}`);
  return Promise.resolve(true);
}

export function generateAndSendWhatsAppVerification(phone: string): Promise<boolean> {
  console.log(`[Mock] Generating and sending WhatsApp verification to: ${phone}`);
  // In a real implementation, this would generate a verification code and send it
  return Promise.resolve(true);
}

export function sendEmailVerification(email: string): Promise<boolean> {
  console.log(`[Mock] Sending email verification to: ${email}`);
  return Promise.resolve(true);
}

export function generateAndSendEmailVerification(email: string): Promise<boolean> {
  console.log(`[Mock] Generating and sending email verification to: ${email}`);
  return Promise.resolve(true);
}
