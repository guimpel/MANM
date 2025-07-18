
import { ServiceRequest } from "@/types/serviceRequest";

export interface ServiceReport {
  providerInfo: {
    name: string;
    logo?: string;
  };
  requestInfo: {
    requesterName: string;
    approverName?: string;
    requestDate: string;
    approvalDate?: string;
  };
  vehicleInfo: {
    model: string;
    plate: string;
    mileage?: string;
  };
  serviceDetails: {
    type: string;
    description: string;
    authorizedItems: Array<{
      name: string;
      price: number;
    }>;
    photos: Array<{
      step: string;
      url: string;
      description: string;
    }>;
  };
  results: {
    description: string;
    finalPrice: number;
    warranty?: string;
  };
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return '-';
  }
};

// Helper function to safely calculate the total price from services
const getTotalPrice = (request: ServiceRequest): number => {
  if (request.total_price !== undefined) {
    return request.total_price;
  }
  
  if (!request.services) {
    return 0;
  }
  
  if (Array.isArray(request.services)) {
    return request.services.reduce((sum, service) => sum + (service.price || 0), 0);
  }
  
  return request.services.price || 0;
};

// Helper function to safely get services list as array
const getServicesArray = (request: ServiceRequest): Array<{ name: string; price?: number }> => {
  if (!request.services) {
    return [];
  }
  
  if (Array.isArray(request.services)) {
    return request.services;
  }
  
  return [request.services];
};

export const generateServiceReport = (request: ServiceRequest): string => {
  const totalValue = getTotalPrice(request);
  const servicesArray = getServicesArray(request);

  return `
RELATÓRIO DE SERVIÇO

${request.providerInfo?.logo ? '[Logo do Fornecedor]' : ''}
Fornecedor: ${request.providerInfo?.name || '-'}

INFORMAÇÕES DA SOLICITAÇÃO
Solicitante: ${request.clientName}
CNPJ: ${request.clientCnpj}
Data da Solicitação: ${formatDate(request.requestDate || request.request_date)}
${request.approverName ? `Autorizado por: ${request.approverName}` : ''}
${request.approval_date ? `Data da Aprovação: ${formatDate(request.approval_date)}` : ''}

INFORMAÇÕES DO VEÍCULO
Modelo: ${request.vehicleModel}
Placa: ${request.vehiclePlate}
${request.mileage ? `Quilometragem: ${request.mileage} km` : ''}

DETALHES DO SERVIÇO
Tipo de Serviço: ${request.service_type}
Início do Serviço: ${formatDate(request.startDate)}
Conclusão: ${formatDate(request.endDate)}

Itens Autorizados:
${servicesArray.map(service => `- ${service.name}: ${formatCurrency(service.price || 0)}`).join('\n')}

Registro Fotográfico:
${request.photos?.map(photo => 
  `[Etapa: ${photo.step}]
   ${photo.description}
`).join('\n') || 'Nenhuma foto registrada'}

RESULTADOS E OBSERVAÇÕES
${request.description || 'Nenhuma observação adicional'}

Valor Total: ${formatCurrency(totalValue)}
${request.warranty ? `Garantia: ${request.warranty}` : ''}

Status: ${request.approved ? 'Aprovado pelo cliente' : 'Aguardando aprovação'}

--------------------------------------------------
${request.providerInfo?.name || ''}
Data do Relatório: ${formatDate(new Date().toISOString())}
  `.trim();
};
