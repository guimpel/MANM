
import React, { useEffect, useState } from 'react';
import { VerificationCodeInput } from './VerificationCodeInput';
import { generateVerificationCode, storeVerificationCode, validateVerificationCode, getActiveVerificationCodes } from '@/utils/verificationUtils';
import { sendWhatsAppVerification, generateAndSendWhatsAppVerification, sendEmailVerification, generateAndSendEmailVerification } from '@/services/whatsappService';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface VerificationStepProps {
  email: string;
  phone: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

export const VerificationStep: React.FC<VerificationStepProps> = ({
  email,
  phone,
  onVerificationSuccess,
  onBack
}) => {
  const [activeCodes, setActiveCodes] = useState<Record<string, { code: string, expiresAt: string }>>({});
  const [mostRecentCode, setMostRecentCode] = useState("");
  
  useEffect(() => {
    // Send verification codes automatically when component mounts
    handleResendCode();
    
    // Set up interval to update active codes
    const interval = setInterval(() => {
      const codes = getActiveVerificationCodes();
      setActiveCodes(codes);
      
      // Find the most recent code for auto-fill
      const codeEntries = Object.entries(codes);
      if (codeEntries.length > 0) {
        // Get the first code as the most recent one
        setMostRecentCode(codeEntries[0][1].code);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleVerifyCode = async (code: string): Promise<boolean> => {
    // Check if either email or phone verification is valid
    const isEmailValid = validateVerificationCode('email', email, code);
    const isPhoneValid = validateVerificationCode('phone', phone, code);
    
    console.log("[Verification] Validating code:", code);
    console.log("[Verification] Email valid:", isEmailValid);
    console.log("[Verification] Phone valid:", isPhoneValid);
    
    if (isEmailValid || isPhoneValid) {
      toast.success('Verificação concluída com sucesso!', {
        icon: <CheckCircle className="h-4 w-4 text-green-500" />
      });
      onVerificationSuccess();
      return true;
    }
    
    return false;
  };
  
  const handleResendCode = async (): Promise<boolean> => {
    try {
      // Generate and send new codes
      const emailSuccess = await generateAndSendEmailVerification(email);
      const whatsappSuccess = await generateAndSendWhatsAppVerification(phone);
      
      // Update active codes
      setActiveCodes(getActiveVerificationCodes());
      
      return emailSuccess || whatsappSuccess;
    } catch (error) {
      console.error("[Verification] Error resending verification codes:", error);
      toast.error("Erro ao reenviar códigos. Por favor, tente novamente.");
      return false;
    }
  };
  
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success("Código copiado para área de transferência!");
    });
  };
  
  return (
    <div className="space-y-5">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-primary">Verifique seu Acesso</h2>
        <p className="text-sm text-gray-600 mt-1">
          Enviamos um código de 6 dígitos para seu email e WhatsApp.
          <br />Digite o código para continuar.
        </p>
      </div>
      
      {/* Show active codes for demo purposes - improved UI */}
      <Alert className="bg-amber-50 border-amber-200">
        <AlertTitle className="text-amber-700 flex items-center gap-2">
          <HelpCircle className="h-4 w-4" /> 
          Modo de demonstração
        </AlertTitle>
        <AlertDescription className="text-amber-700">
          <p className="mb-2">
            Para testar, você pode usar qualquer um dos seguintes códigos:
          </p>
          {Object.entries(activeCodes).map(([key, data]) => (
            <div key={key} className="flex items-center justify-between text-sm p-1.5 bg-white rounded-md mb-1.5 border border-amber-100">
              <span className="font-medium">{key.split(':')[0]}: <strong>{data.code}</strong></span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => copyToClipboard(data.code)} 
                className="h-6 w-6 p-0 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                title="Copiar código"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <div className="flex items-center justify-between text-sm p-1.5 bg-white rounded-md mb-1 border border-amber-100">
              <span className="font-medium">Universal: <strong>123456</strong></span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => copyToClipboard("123456")} 
                className="h-6 w-6 p-0 text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                title="Copiar código universal"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
        </AlertDescription>
      </Alert>
      
      <VerificationCodeInput
        onVerify={handleVerifyCode}
        onResendCode={handleResendCode}
        initialCode={mostRecentCode}
      />
      
      <div className="space-y-2 text-center text-sm">
        <div className="flex items-center justify-center space-x-1 text-gray-500">
          <p>Email: {email}</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Verifique sua caixa de entrada e também a pasta de spam</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center justify-center space-x-1 text-gray-500">
          <p>WhatsApp: {phone}</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Verifique se seu número está correto e com o código do país</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <button 
          onClick={onBack} 
          className="text-sm text-primary hover:underline"
        >
          Voltar e editar dados
        </button>
      </div>
    </div>
  );
};
