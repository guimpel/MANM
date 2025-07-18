
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { ServiceRequest, ServicePricing } from "@/types/serviceRequest";
import RequestStatusIndicator from "./RequestStatusIndicator";
import RequestDetailsDialog from "./RequestDetailsDialog";
import ContactClientDialog from "./ContactClientDialog";

interface RequestsTableProps {
  status: "pending" | "in-progress" | "completed" | "rejected";
}

// Mock data moved to a separate mock file or will be replaced by API calls
// import { mockServiceRequests } from "@/mocks/serviceRequests";

// Novo hook customizado para buscar chamados do Supabase por status
function useServiceRequests(status: RequestsTableProps['status']) {
  return useQuery({
    queryKey: ['service-requests', status],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .eq('status', status)
        .eq('is_deleted', false)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ServiceRequest[];
    },
  });
}

const RequestsTable = ({ status }: RequestsTableProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [servicesPricing, setServicesPricing] = useState<ServicePricing[]>([]);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [adjustmentMessage, setAdjustmentMessage] = useState("");
  
  // Busca real dos chamados
  const { data: filteredRequests = [], isLoading, isError } = useServiceRequests(status);
  
  const handleOpenRequest = (request: ServiceRequest) => {
    setSelectedRequest(request);
    
    if (status === "pending") {
      // Handle services whether it's an array or a single object
      const servicesList = Array.isArray(request.services) 
        ? request.services 
        : request.services ? [request.services] : [];
        
      setServicesPricing(
        servicesList.map(service => ({
          name: service.name,
          price: ""
        }))
      );
    }
    
    setOpenDialog(true);
  };
  
  const handleSubmitQuote = () => {
    if (servicesPricing.some(service => !service.price)) {
      toast.error("Por favor, informe o valor para todos os serviços.");
      return;
    }
    
    console.log({
      requestId: selectedRequest?.id,
      services: servicesPricing
    });
    
    toast.success("Orçamento enviado com sucesso!");
    setOpenDialog(false);
  };
  
  const handleStartService = () => {
    toast.success("Serviço iniciado com sucesso!");
    setOpenDialog(false);
  };
  
  const handleFinishService = () => {
    toast.success("Serviço finalizado com sucesso! O cliente será notificado para aprovar.");
    setOpenDialog(false);
  };
  
  const handleContactClient = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowContactDialog(true);
  };
  
  const handleSendAdjustment = () => {
    if (!adjustmentMessage.trim()) {
      toast.error("Por favor, descreva o ajuste necessário");
      return;
    }
    
    toast.success("Solicitação de ajuste enviada com sucesso!");
    setAdjustmentMessage("");
    setShowContactDialog(false);
  };

  if (isLoading) {
    return <div className="text-center py-12 border rounded-lg bg-gray-50">Carregando solicitações...</div>;
  }
  if (isError) {
    return <div className="text-center py-12 border rounded-lg bg-red-50 text-red-600">Erro ao carregar solicitações.</div>;
  }
  if (filteredRequests.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <p className="text-gray-500">
          Nenhuma solicitação {
            status === "pending" ? "pendente" : 
            status === "in-progress" ? "em andamento" : 
            status === "completed" ? "finalizada" : 
            "não atendida"
          } no momento.
        </p>
      </div>
    );
  }
  
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead className="hidden md:table-cell">CNPJ</TableHead>
            <TableHead>Placa</TableHead>
            <TableHead className="hidden md:table-cell">Veículo</TableHead>
            <TableHead className="hidden md:table-cell">Data</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRequests.map((request) => (
            <TableRow 
              key={request.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleOpenRequest(request)}
            >
              <TableCell>
                <div className="flex items-center">
                  <RequestStatusIndicator status={request.status} />
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{request.clientName || 'N/A'}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{request.clientCnpj || 'N/A'}</TableCell>
              <TableCell>{request.vehiclePlate || 'N/A'}</TableCell>
              <TableCell className="hidden md:table-cell">{request.vehicleModel || 'N/A'}</TableCell>
              <TableCell className="hidden md:table-cell">
                {request.requestDate ? new Date(request.requestDate).toLocaleDateString('pt-BR') : 
                 request.request_date ? new Date(request.request_date).toLocaleDateString('pt-BR') : 
                 request.created_at ? new Date(request.created_at).toLocaleDateString('pt-BR') : 'N/A'}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenRequest(request);
                  }}
                >
                  <span className="sr-only">Abrir</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <RequestDetailsDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        selectedRequest={selectedRequest}
        servicesPricing={servicesPricing}
        setServicesPricing={setServicesPricing}
        onSubmitQuote={handleSubmitQuote}
        onStartService={handleStartService}
        onFinishService={handleFinishService}
        onContactClient={handleContactClient}
      />
      
      <ContactClientDialog
        open={showContactDialog}
        onOpenChange={setShowContactDialog}
        selectedRequest={selectedRequest}
        adjustmentMessage={adjustmentMessage}
        setAdjustmentMessage={setAdjustmentMessage}
        onSendAdjustment={handleSendAdjustment}
      />
    </>
  );
};

export default RequestsTable;
