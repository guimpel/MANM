
import { toast } from "sonner";
import { generateVerificationCode, storeVerificationCode } from "@/utils/verificationUtils";

/**
 * Email service for sending verification codes
 * Note: This is a client-side service that simulates email sending
 * In a production environment, this would be implemented as a server-side service
 */
export const sendEmailVerification = async (email: string, code: string): Promise<boolean> => {
  try {
    // In a real implementation, this would call a backend API endpoint
    // that uses Nodemailer or similar
    console.log(`[Email Service] Sending code ${code} to ${email}`);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Enhanced validation - accept any well-formed email
    if (email && email.includes("@") && email.includes(".")) {
      console.log(`[Email Service] Successfully sent code ${code} to ${email}`);
      toast.success(`Email com código ${code} enviado para ${email}`, {
        description: "Por favor verifique sua caixa de entrada e pasta de spam"
      });
      return true;
    } else {
      console.error("[Email Service] Invalid email format:", email);
      toast.error("Falha no envio do email. Formato de email inválido.");
      return false;
    }
  } catch (error) {
    console.error("[Email Service] Error sending email verification:", error);
    toast.error("Erro ao enviar email de verificação");
    return false;
  }
};

/**
 * For testing purposes, this function both generates and sends a verification code
 */
export const generateAndSendEmailVerification = async (email: string): Promise<boolean> => {
  try {
    const code = generateVerificationCode();
    console.log(`[Email Service] Generated code ${code} for ${email}`);
    
    // Store the code
    storeVerificationCode('email', email, code);
    
    // Send the code
    return await sendEmailVerification(email, code);
  } catch (error) {
    console.error("[Email Service] Error generating and sending email verification:", error);
    return false;
  }
};
