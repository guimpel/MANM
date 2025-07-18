
import { DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car, XCircle } from "lucide-react";
import { ServiceRequest } from "@/types/serviceRequest";

interface RejectedRequestContentProps {
  request: ServiceRequest;
  onClose: () => void;
}

const RejectedRequestContent = ({
  request,
  onClose
}: RejectedRequestContentProps) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  // Handle services whether it's an array or a single object
  const servicesList = Array.isArray(request.services) 
    ? request.services 
    : request.services ? [request.services] : [];

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Serviço Não Atendido - {request.vehiclePlate || 'Veículo'}
        </DialogTitle>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Empresa</p>
            <p>{request.clientName || 'Cliente'}</p>
            <p className="text-sm text-gray-500">{request.clientCnpj || 'CNPJ não informado'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Veículo</p>
            <p>{request.vehicleModel || 'Modelo não informado'}</p>
            <p className="text-sm text-gray-500">Placa: {request.vehiclePlate || 'Não informado'}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500">Data da Solicitação</p>
          <p>{formatDate(request.requestDate || request.request_date || request.created_at)}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Serviços Solicitados</p>
          <ul className="space-y-1">
            {servicesList.map((service, index) => (
              <li key={index} className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span>{service.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-red-50 p-3 rounded-md border border-red-200">
          <div className="flex items-start gap-2">
            <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Serviço não atendido</p>
              <p className="text-sm text-red-700">
                Este serviço foi recusado ou cancelado. Entre em contato com o cliente para mais informações.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button onClick={onClose}>
          Fechar
        </Button>
      </DialogFooter>
    </>
  );
};

export default RejectedRequestContent;
