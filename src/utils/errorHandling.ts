
import { toast } from 'sonner';

export interface ErrorDetails {
  code?: string;
  message: string;
  details?: string;
  hint?: string;
}

export const handleApiError = (error: any, customMessage?: string): void => {
  console.error('API Error:', error);
  
  let userMessage = customMessage || 'Ocorreu um erro inesperado';
  let description = '';

  // Handle Supabase errors
  if (error?.message) {
    switch (error.code) {
      case 'PGRST116':
        userMessage = 'Dados não encontrados';
        description = 'O registro solicitado não existe ou você não tem permissão para acessá-lo.';
        break;
      case '23505':
        userMessage = 'Dados duplicados';
        description = 'Já existe um registro com essas informações.';
        break;
      case '23503':
        userMessage = 'Referência inválida';
        description = 'Os dados referenciam um registro que não existe.';
        break;
      case '42501':
        userMessage = 'Permissão negada';
        description = 'Você não tem permissão para realizar esta operação.';
        break;
      case 'auth/invalid-email':
        userMessage = 'Email inválido';
        description = 'Verifique se o email está no formato correto.';
        break;
      case 'auth/user-not-found':
        userMessage = 'Usuário não encontrado';
        description = 'Não existe uma conta com este email.';
        break;
      case 'auth/wrong-password':
        userMessage = 'Senha incorreta';
        description = 'Verifique sua senha e tente novamente.';
        break;
      case 'auth/too-many-requests':
        userMessage = 'Muitas tentativas';
        description = 'Aguarde alguns minutos antes de tentar novamente.';
        break;
      default:
        if (error.message.includes('RLS')) {
          userMessage = 'Acesso negado';
          description = 'Você não tem permissão para acessar estes dados.';
        } else if (error.message.includes('Network')) {
          userMessage = 'Erro de conexão';
          description = 'Verifique sua conexão com a internet.';
        } else {
          description = error.message;
        }
    }
  }

  toast.error(userMessage, {
    description,
    duration: 5000,
  });
};

export const handleValidationError = (field: string, value: any, rule: string): string => {
  const fieldNames: Record<string, string> = {
    cnpj: 'CNPJ',
    phone: 'Telefone',
    whatsapp: 'WhatsApp',
    email: 'Email',
    company_name: 'Nome da empresa',
    city_id: 'Cidade',
    service_types: 'Tipos de serviço'
  };

  const fieldName = fieldNames[field] || field;

  switch (rule) {
    case 'required':
      return `${fieldName} é obrigatório`;
    case 'email':
      return `${fieldName} deve ter um formato válido`;
    case 'phone':
      return `${fieldName} deve ter um formato válido (ex: (11) 99999-9999)`;
    case 'cnpj':
      return `${fieldName} deve ter um formato válido (ex: 12.345.678/0001-90)`;
    case 'min_length':
      return `${fieldName} deve ter pelo menos ${value} caracteres`;
    case 'max_length':
      return `${fieldName} deve ter no máximo ${value} caracteres`;
    case 'array_min':
      return `Selecione pelo menos ${value} ${fieldName.toLowerCase()}`;
    default:
      return `${fieldName} é inválido`;
  }
};

export const validateCNPJ = (cnpj: string): boolean => {
  const cleanCNPJ = cnpj.replace(/\D/g, '');
  
  if (cleanCNPJ.length !== 14) return false;
  
  // Validate CNPJ algorithm
  let sum = 0;
  let pos = 5;
  
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(cleanCNPJ.charAt(12))) return false;
  
  sum = 0;
  pos = 6;
  
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(cleanCNPJ.charAt(13));
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateBrazilianPhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Should have 10-11 digits (DDD + number)
  if (cleanPhone.length < 10 || cleanPhone.length > 11) return false;
  
  // DDD should be between 11-99
  const ddd = parseInt(cleanPhone.substring(0, 2));
  if (ddd < 11 || ddd > 99) return false;
  
  // Mobile numbers should start with 9
  if (cleanPhone.length === 11 && cleanPhone.charAt(2) !== '9') return false;
  
  return true;
};
