
import { DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car, CheckCircle, Clock, Send, Download, Printer, Mail, MessageSquare } from "lucide-react";
import { ServiceRequest } from "@/types/serviceRequest";
import { generateServiceReport } from "@/utils/reportGenerator";
import { toast } from "sonner";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface CompletedRequestContentProps {
  request: ServiceRequest;
  onClose: () => void;
}

const CompletedRequestContent = ({
  request,
  onClose
}: CompletedRequestContentProps) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendEmail = () => {
    toast.success("Relatório enviado por email com sucesso!");
  };

  const handleSendWhatsApp = () => {
    toast.success("Relatório enviado por WhatsApp com sucesso!");
  };

  const handleDownloadReport = () => {
    const report = generateServiceReport(request);
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${request.vehiclePlate || 'veiculo'}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handlePrintReport = () => {
    const report = generateServiceReport(request);
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Relatório de Serviço - ${request.vehiclePlate || 'Veículo'}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
              pre { white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <pre>${report}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
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
          Serviço Finalizado - {request.vehiclePlate || 'Veículo'}
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
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Solicitado em</p>
            <p>{formatDate(request.requestDate || request.request_date || request.created_at)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Iniciado em</p>
            <p>{request.startDate ? formatDate(request.startDate) : "-"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Finalizado em</p>
            <p>{request.endDate ? formatDate(request.endDate) : "-"}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Serviços Realizados</p>
          <ul className="space-y-1">
            {servicesList.map((service, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{service.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={`p-3 rounded-md border ${request.approved ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className="flex items-start gap-2">
            {request.approved ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Aprovado pelo cliente</p>
                  <p className="text-sm text-green-700">
                    O cliente aprovou este serviço e o pagamento está disponível.
                  </p>
                </div>
              </>
            ) : (
              <>
                <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">Aguardando aprovação</p>
                  <p className="text-sm text-yellow-700">
                    O cliente tem 24 horas para aprovar o serviço ou solicitar ajustes.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <DialogFooter className="flex-col sm:flex-row gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <div className="flex flex-col">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSendWhatsApp}
                className="flex items-center gap-2 px-4 py-2"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSendEmail}
                className="flex items-center gap-2 px-4 py-2"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Button variant="outline" size="icon" onClick={handleDownloadReport}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handlePrintReport}>
          <Printer className="h-4 w-4" />
        </Button>
        <Button onClick={onClose}>
          Fechar
        </Button>
      </DialogFooter>
    </>
  );
};

export default CompletedRequestContent;
