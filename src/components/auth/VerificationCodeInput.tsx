
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { LoaderCircle, Copy } from "lucide-react";
import { toast } from "sonner";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface VerificationCodeInputProps {
  onVerify: (code: string) => Promise<boolean>;
  onResendCode: () => Promise<boolean>;
  resendDelay?: number; // in seconds
  initialCode?: string; // Optional initial code (for demo mode)
}

export const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({ 
  onVerify, 
  onResendCode,
  resendDelay = 60,
  initialCode = ""
}) => {
  const [code, setCode] = useState(initialCode);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  
  // Automatically focus the input when component renders
  useEffect(() => {
    const inputElement = document.getElementById('verificationCode');
    if (inputElement) {
      inputElement.focus();
    }
    
    // If initialCode is provided, start countdown
    if (initialCode) {
      startResendCountdown();
    }
  }, [initialCode]);
  
  const handleVerify = async () => {
    if (!code || code.length < 6) {
      toast.error("Por favor, insira o código completo de 6 dígitos");
      return;
    }
    
    setIsVerifying(true);
    try {
      const success = await onVerify(code);
      if (!success) {
        toast.error("Código inválido. Tente novamente.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Ocorreu um erro na verificação. Tente novamente.");
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleResendCode = async () => {
    setIsResending(true);
    try {
      const success = await onResendCode();
      if (success) {
        startResendCountdown();
        toast.success("Novos códigos enviados! Verifique seu email e WhatsApp");
      }
    } catch (error) {
      console.error("Error resending code:", error);
      toast.error("Erro ao reenviar código. Tente novamente mais tarde.");
    } finally {
      setIsResending(false);
    }
  };
  
  const startResendCountdown = () => {
    setResendCountdown(resendDelay);
    const interval = setInterval(() => {
      setResendCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const handleCodeChange = (newValue: string) => {
    setCode(newValue);
    
    // Auto submit when code is complete
    if (newValue.length === 6) {
      setTimeout(() => onVerify(newValue), 500);
    }
  };

  const copyToClipboard = (codeToCopy: string) => {
    if (!codeToCopy) return;
    
    navigator.clipboard.writeText(codeToCopy).then(() => {
      toast.success("Código copiado para área de transferência!");
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-center my-4">
          <InputOTP 
            value={code} 
            onChange={handleCodeChange} 
            maxLength={6}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} index={index} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>
      </div>
      
      <Button 
        onClick={handleVerify}
        className="w-full bg-accent hover:bg-accent/90"
        disabled={isVerifying || code.length !== 6}
      >
        {isVerifying ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Verificando...
          </>
        ) : (
          'Verificar Código'
        )}
      </Button>
      
      <div className="text-center">
        <Button 
          variant="link" 
          onClick={handleResendCode}
          disabled={isResending || resendCountdown > 0}
          className="text-sm"
        >
          {resendCountdown > 0 
            ? `Reenviar código (${resendCountdown}s)` 
            : isResending 
              ? 'Enviando...' 
              : 'Reenviar código'}
        </Button>
      </div>

      {/* Universal test code helper */}
      <div className="text-center mt-2">
        <Button 
          variant="ghost" 
          onClick={() => copyToClipboard("123456")}
          className="text-xs text-gray-500 flex items-center gap-1"
          size="sm"
        >
          <span>Usar código universal</span>
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};
