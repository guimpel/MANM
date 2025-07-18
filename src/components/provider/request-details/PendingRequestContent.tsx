
import { DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car } from "lucide-react";
import { ServiceRequest, ServicePricing } from "@/types/serviceRequest";

interface PendingRequestContentProps {
  request: ServiceRequest;
  servicesPricing: ServicePricing[];
  onUpdatePrice: (index: number, price: string) => void;
  onSubmitQuote: () => void;
  onClose: () => void;
}

const PendingRequestContent = ({
  request,
  servicesPricing,
  onUpdatePrice,
  onSubmitQuote,
  onClose
}: PendingRequestContentProps) => {
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
          Solicitação de Serviço - {request.vehiclePlate || 'Veículo'}
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
          <div className="space-y-3">
            {servicesPricing.map((service, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1">
                  <p>{service.name}</p>
                  <p className="text-xs text-gray-500">
                    {servicesList[index] && servicesList[index].price 
                      ? "Cliente já aprovou este serviço"
                      : "Cliente solicitou orçamento"}
                  </p>
                </div>
                <div className="w-32">
                  <div className="relative">
                    <Input
                      placeholder="Valor"
                      value={service.price}
                      onChange={(e) => onUpdatePrice(index, e.target.value)}
                      className="pl-6"
                    />
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={onSubmitQuote}>
          Enviar Orçamento
        </Button>
      </DialogFooter>
    </>
  );
};

export default PendingRequestContent;
