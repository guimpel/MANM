
import { DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car, Clock, CheckCircle, MessageSquare } from "lucide-react";
import { ServiceRequest } from "@/types/serviceRequest";

interface InProgressRequestContentProps {
  request: ServiceRequest;
  onFinishService: () => void;
  onContactClient: (e: React.MouseEvent) => void;
  onClose: () => void;
}

const InProgressRequestContent = ({
  request,
  onFinishService,
  onContactClient,
  onClose
}: InProgressRequestContentProps) => {
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
          Serviço em Andamento - {request.vehiclePlate || 'Veículo'}
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
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Solicitado em</p>
            <p>{formatDate(request.requestDate || request.request_date || request.created_at)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Iniciado em</p>
            <p>{request.startDate ? formatDate(request.startDate) : "-"}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Serviços</p>
          <ul className="space-y-1">
            {servicesList.map((service, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{service.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={onContactClient}
          >
            <MessageSquare className="h-4 w-4" />
            Contatar Cliente
          </Button>
        </div>
        
        <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">Serviço em andamento</p>
              <p className="text-sm text-yellow-700">
                Ao finalizar, o cliente será notificado para aprovar o serviço ou solicitar ajustes.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onFinishService}>
          Finalizar Serviço
        </Button>
      </DialogFooter>
    </>
  );
};

export default InProgressRequestContent;
