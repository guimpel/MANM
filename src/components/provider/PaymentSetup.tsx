
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LockKeyhole, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";

interface PaymentSetupProps {
  onSubmit: () => void;
}

const PaymentSetup = ({ onSubmit }: PaymentSetupProps) => {
  const [pixKey, setPixKey] = useState("");
  const [pixType, setPixType] = useState("cnpj");
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pixKey) {
      toast.error("Por favor, informe sua chave PIX.");
      return;
    }
    
    if (!termsAccepted) {
      toast.error("Você precisa aceitar os termos e condições.");
      return;
    }
    
    // In a real app, would send this data securely to the server
    console.log({
      pixType,
      pixKey
    });
    
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-yellow-500" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-yellow-800">Informação Importante</h3>
          <p className="text-sm text-yellow-700 mt-1">
            Os pagamentos serão realizados via PIX diretamente à conta vinculada à chave informada.
            A chave PIX deve estar vinculada ao mesmo CNPJ da empresa cadastrada.
          </p>
        </div>
      </div>
      
      <Card className="p-6 border-2 border-blue-100 bg-blue-50/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Configuração de Pagamentos</h3>
          <LockKeyhole className="h-5 w-5 text-blue-500" />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pix-type">Tipo de Chave PIX</Label>
            <select
              id="pix-type"
              className="w-full h-10 px-3 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={pixType}
              onChange={(e) => setPixType(e.target.value)}
            >
              <option value="cnpj">CNPJ</option>
              <option value="phone">Telefone</option>
              <option value="email">Email</option>
              <option value="random">Chave Aleatória</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pix-key">Chave PIX</Label>
            <div className="relative">
              <Input
                id="pix-key"
                className="pr-10"
                placeholder={
                  pixType === "cnpj" ? "00.000.000/0000-00" :
                  pixType === "phone" ? "+55 (00) 00000-0000" :
                  pixType === "email" ? "email@exemplo.com" :
                  "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                }
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <LockKeyhole className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Esta informação é criptografada e armazenada com segurança
            </p>
          </div>
          
          <div className="pt-4 space-y-2">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
              </div>
              <Label htmlFor="terms" className="ml-3 text-sm">
                Confirmo que a chave PIX fornecida está vinculada ao CNPJ cadastrado e autorizo o recebimento de pagamentos através dela.
              </Label>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-gray-500 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p className="font-medium">Sobre a segurança dos pagamentos</p>
            <ul className="mt-1 space-y-1 list-disc list-inside">
              <li>A plataforma não armazena dados sensíveis de cartão de crédito</li>
              <li>Os pagamentos são processados diretamente via PIX para sua conta</li>
              <li>Cada transação recebe um ID único para rastreamento</li>
              <li>Notificações automáticas são enviadas quando um pagamento é realizado</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Finalizar Cadastro
      </Button>
    </form>
  );
};

export default PaymentSetup;
