import { useState } from "react";
import { 
  Filter, 
  Search, 
  ChevronRight, 
  Wrench,
  Clock, 
  Calendar,
  Image
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ServiceRequest } from '@/types/serviceRequest';
import { Skeleton } from '@/components/ui/skeleton';

// Mock data for services in progress
// const servicesMockData = [
//   { 
//     id: "SR-001", 
//     plate: "ABC-1234", 
//     provider: "Auto Serviços LTDA",
//     serviceType: "Troca de óleo",
//     location: "São Paulo, SP",
//     startDate: "2025-04-22T10:00:00",
//     estimatedEndDate: "2025-04-22T12:00:00",
//     status: "in-progress",
//     progress: 25,
//     currentTask: "Elevando o veículo na rampa",
//     photos: ["/placeholder.svg", "/placeholder.svg"],
//     updates: [
//       { timestamp: "2025-04-22T10:00:00", text: "Veículo recebido na oficina" },
//       { timestamp: "2025-04-22T10:15:00", text: "Inspeção inicial realizada" },
//       { timestamp: "2025-04-22T10:30:00", text: "Preparação para troca de óleo" },
//     ]
//   },
//   { 
//     id: "SR-002", 
//     plate: "DEF-5678", 
//     provider: "Pneus Express",
//     serviceType: "Alinhamento e Balanceamento",
//     location: "Campinas, SP",
//     startDate: "2025-04-21T15:30:00",
//     estimatedEndDate: "2025-04-21T17:30:00",
//     status: "in-progress",
//     progress: 80,
//     currentTask: "Realizando ajustes finais",
//     photos: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
//     updates: [
//       { timestamp: "2025-04-21T15:30:00", text: "Veículo recebido na oficina" },
//       { timestamp: "2025-04-21T15:45:00", text: "Diagnóstico inicial realizado" },
//       { timestamp: "2025-04-21T16:00:00", text: "Alinhamento em andamento" },
//       { timestamp: "2025-04-21T16:30:00", text: "Balanceamento das rodas realizado" },
//       { timestamp: "2025-04-21T17:00:00", text: "Ajustes finais em andamento" },
//     ]
//   },
//   { 
//     id: "SR-003", 
//     plate: "GHI-9012", 
//     provider: "Centro Automotivo Especializado",
//     serviceType: "Revisão completa",
//     location: "Guarulhos, SP",
//     startDate: "2025-04-20T09:15:00",
//     estimatedEndDate: "2025-04-20T16:00:00",
//     status: "waiting-parts",
//     progress: 45,
//     currentTask: "Aguardando chegada de filtros",
//     photos: ["/placeholder.svg"],
//     updates: [
//       { timestamp: "2025-04-20T09:15:00", text: "Veículo recebido na oficina" },
//       { timestamp: "2025-04-20T09:45:00", text: "Diagnóstico completo realizado" },
//       { timestamp: "2025-04-20T10:30:00", text: "Troca de óleo realizada" },
//       { timestamp: "2025-04-20T11:15:00", text: "Verificação de suspensão concluída" },
//       { timestamp: "2025-04-20T12:00:00", text: "Solicitados filtros adicionais para substituição" },
//     ]
//   },
// ];

// Status filter options
const statusOptions = [
  { value: "all", label: "Todos os status" },
  { value: "in-progress", label: "Em andamento" },
  { value: "waiting-parts", label: "Aguardando peças" },
  { value: "waiting-approval", label: "Aguardando aprovação" },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "in-progress":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Em andamento</Badge>;
    case "waiting-parts":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Aguardando peças</Badge>;
    case "waiting-approval":
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Aguardando aprovação</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

// Calculate time remaining
const calculateTimeRemaining = (startDate: string, endDate: string) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  
  const totalDuration = end - start;
  const elapsed = now - start;
  
  if (elapsed < 0) return "Não iniciado";
  if (elapsed >= totalDuration) return "Concluído";
  
  const remainingMinutes = Math.floor((end - now) / (1000 * 60));
  
  if (remainingMinutes < 60) {
    return `${remainingMinutes} min restantes`;
  } else {
    const hours = Math.floor(remainingMinutes / 60);
    const mins = remainingMinutes % 60;
    return `${hours}h ${mins}min restantes`;
  }
};

// Novo hook customizado para buscar serviços/chamados da frota com filtro direto no Supabase e tipagem
interface UseFleetServicesParams {
  searchTerm: string;
  statusFilter: string;
  page?: number;
  pageSize?: number;
}
interface UseFleetServicesResult {
  data: ServiceRequest[];
  isLoading: boolean;
  isError: boolean;
  error: any;
  hasMore: boolean;
}
function useFleetServices({ searchTerm, statusFilter, page = 1, pageSize = 20 }: UseFleetServicesParams): UseFleetServicesResult {
  const offset = (page - 1) * pageSize;
  return useQuery({
    queryKey: ['fleet-services', searchTerm, statusFilter, page, pageSize],
    queryFn: async () => {
      let query = supabase
        .from('service_requests')
        .select('*', { count: 'exact' })
        .eq('is_deleted', false)
        .order('created_at', { ascending: false })
        .range(offset, offset + pageSize - 1);
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      if (searchTerm.trim()) {
        // Busca por placa, fornecedor, tipo de serviço, id (ajuste os campos conforme schema real)
        query = query.or(`plate.ilike.%${searchTerm}%,provider.ilike.%${searchTerm}%,serviceType.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%`);
      }
      const { data, error, count } = await query;
      if (error) throw error;
      return { data: data as ServiceRequest[], count: count || 0 };
    },
    keepPreviousData: true,
  });
}

export function FleetServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceRequest | null>(null);
  const [activeTab, setActiveTab] = useState("progress");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Busca real dos serviços/chamados
  const { data, isLoading, isError, error } = useFleetServices({ searchTerm, statusFilter, page, pageSize });
  const filteredServices = data?.data || [];
  const totalCount = data?.count || 0;
  const hasMore = filteredServices.length === pageSize && (page * pageSize) < totalCount;

  const handleViewDetails = (service: ServiceRequest) => {
    setSelectedService(service);
    setDetailsDialogOpen(true);
  };

  const handleContactProvider = () => {
    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada ao fornecedor do serviço."
    });
  };

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-56 w-full rounded-lg" />
        ))}
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center py-12 border rounded-lg bg-red-50 text-red-600">
        <h3 className="text-lg font-bold mb-2">Erro ao carregar serviços</h3>
        <p>{error?.message || 'Ocorreu um erro inesperado ao buscar os serviços.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Serviços em Andamento</h1>
        <p className="text-muted-foreground">
          Acompanhe os serviços em execução para sua frota
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por placa, fornecedor ou tipo de serviço"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
          />
        </div>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtros
          {statusFilter !== "all" && (
            <Badge className="ml-2 bg-primary/20 text-primary border-0 hover:bg-primary/20">
              1
            </Badge>
          )}
        </Button>
      </div>

      {showFilters && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {filteredServices.length === 0 ? (
          <div className="text-center py-8">
            <Wrench className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-2 text-lg font-medium">Nenhum serviço encontrado</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Não há serviços correspondentes aos critérios de busca.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleViewDetails(service)}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{service.id}</CardTitle>
                        {getStatusBadge(service.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatDate(service.startDate)}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Mais opções</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(service);
                        }}>
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          Contatar fornecedor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div>
                      <p className="text-sm font-medium">Veículo</p>
                      <p className="text-sm text-muted-foreground">Placa: {service.plate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Serviço</p>
                      <p className="text-sm text-muted-foreground">{service.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fornecedor</p>
                      <p className="text-sm text-muted-foreground">{service.provider}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Progresso</p>
                      <p className="text-sm text-muted-foreground">{service.progress}%</p>
                    </div>
                    <Progress value={service.progress} className="h-2" />
                    
                    <div className="flex justify-between items-center pt-1">
                      <p className="text-xs text-muted-foreground">Tarefa atual: {service.currentTask}</p>
                      <p className="text-xs font-medium text-blue-600">
                        {calculateTimeRemaining(service.startDate, service.estimatedEndDate)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Paginação simples */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button onClick={() => setPage(page + 1)} variant="outline">
            Carregar mais
          </Button>
        </div>
      )}

      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedService?.id} {getStatusBadge(selectedService?.status || "")}
            </DialogTitle>
            <DialogDescription>
              {selectedService?.serviceType} - Placa: {selectedService?.plate}
            </DialogDescription>
          </DialogHeader>
          
          {selectedService && (
            <Tabs defaultValue="progress" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="progress">
                  <Clock className="h-4 w-4 mr-2" />
                  Progresso
                </TabsTrigger>
                <TabsTrigger value="photos">
                  <Image className="h-4 w-4 mr-2" />
                  Fotos ({selectedService.photos.length})
                </TabsTrigger>
                <TabsTrigger value="timeline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Linha do Tempo
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="progress" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Início do Serviço</p>
                      <p>{formatDate(selectedService.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Previsão de Conclusão</p>
                      <p>{formatDate(selectedService.estimatedEndDate)}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Local</p>
                    <p>{selectedService.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Fornecedor</p>
                    <p>{selectedService.provider}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium">Progresso do Serviço</p>
                      <p className="text-sm font-medium">{selectedService.progress}%</p>
                    </div>
                    <Progress value={selectedService.progress} className="h-3" />
                    
                    <div className="grid grid-cols-3 text-center text-sm mt-1">
                      <div>
                        <p className="font-medium">Iniciado</p>
                        <p className="text-muted-foreground">
                          {formatDate(selectedService.startDate)}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Tarefa Atual</p>
                        <p className="text-blue-600">{selectedService.currentTask}</p>
                      </div>
                      <div>
                        <p className="font-medium">Previsão</p>
                        <p className="text-muted-foreground">
                          {formatDate(selectedService.estimatedEndDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium">Tempo Restante Estimado</p>
                    <p className="text-xl font-bold text-blue-600">
                      {calculateTimeRemaining(selectedService.startDate, selectedService.estimatedEndDate)}
                    </p>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button onClick={handleContactProvider}>
                      Contatar Fornecedor
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="photos">
                <div className="space-y-4">
                  {selectedService.photos.length > 0 ? (
                    <Carousel>
                      <CarouselContent>
                        {selectedService.photos.map((photo, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <div className="overflow-hidden rounded-lg">
                                <img
                                  src={photo}
                                  alt={`Foto ${index + 1}`}
                                  className="w-full object-cover aspect-video"
                                />
                                <p className="text-center text-sm text-muted-foreground mt-2">
                                  Foto {index + 1} - {selectedService.serviceType}
                                </p>
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  ) : (
                    <div className="text-center py-8">
                      <Image className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-2 text-lg font-medium">Nenhuma foto disponível</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        O fornecedor ainda não enviou fotos deste serviço.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="timeline">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Histórico de Atualizações</h3>
                  
                  <div className="space-y-4">
                    {selectedService.updates.map((update, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                          {index < selectedService.updates.length - 1 && (
                            <div className="h-full w-0.5 bg-gray-200"></div>
                          )}
                        </div>
                        <div className="space-y-1 pb-4">
                          <p className="text-sm text-muted-foreground">
                            {formatDate(update.timestamp)}
                          </p>
                          <p className="font-medium">{update.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
