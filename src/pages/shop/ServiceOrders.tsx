import { useState, useEffect } from "react";
import { Archive, Camera, Check, Clock, Filter, MapPin, MoreHorizontal, Search, Wrench, AlertCircle, FileText, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const serviceOrders = [
  {
    id: "SR-001",
    company: "Locadora Fast",
    plate: "ABC-1234",
    serviceType: "Troca de óleo",
    location: "São Paulo, SP",
    status: "pending",
    createdAt: "2025-04-22T10:00:00",
    pendingReason: "Aguardando aprovação do orçamento",
  },
  {
    id: "SR-002",
    company: "Locadora Top Cars",
    plate: "DEF-5678",
    serviceType: "Alinhamento",
    location: "Campinas, SP",
    status: "in-progress",
    createdAt: "2025-04-21T15:30:00",
    pendingReason: null,
  },
  {
    id: "SR-003",
    company: "Locadora Fast",
    plate: "GHI-9012",
    serviceType: "Revisão completa",
    location: "Guarulhos, SP",
    status: "completed",
    createdAt: "2025-04-20T09:15:00",
    pendingReason: null,
  },
  {
    id: "SR-004",
    company: "Elite Rentals",
    plate: "JKL-3456",
    serviceType: "Troca de pastilhas",
    location: "Santos, SP",
    status: "pending",
    createdAt: "2025-04-19T14:00:00",
    pendingReason: "Aguardando peças",
  },
  {
    id: "SR-005",
    company: "Top Cars",
    plate: "MNO-7890",
    serviceType: "Reparo no ar-condicionado",
    location: "São Paulo, SP",
    status: "in-progress",
    createdAt: "2025-04-18T11:45:00",
    pendingReason: null,
  },
];

const statusOptions = [
  { value: "all", label: "Todos os status" },
  { value: "pending", label: "Pendentes" },
  { value: "in-progress", label: "Em andamento" },
  { value: "completed", label: "Finalizados" },
];

const cityOptions = [
  { value: "all", label: "Todas as cidades" },
  { value: "São Paulo", label: "São Paulo" },
  { value: "Campinas", label: "Campinas" },
  { value: "Guarulhos", label: "Guarulhos" },
  { value: "Santos", label: "Santos" },
];

const clientOptions = [
  { value: "all", label: "Todos os clientes" },
  { value: "Locadora Fast", label: "Locadora Fast" },
  { value: "Top Cars", label: "Top Cars" },
  { value: "Elite Rentals", label: "Elite Rentals" },
];

const reportTypes = [
  { value: "troca-bateria", label: "Troca de Bateria" },
  { value: "troca-pecas", label: "Troca de Peças" },
  { value: "revisao-parcial", label: "Revisão Parcial" },
  { value: "revisao-completa", label: "Revisão Completa" },
  { value: "alinhamento", label: "Alinhamento e Balanceamento" },
  { value: "eletrica", label: "Serviço Elétrico" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pendente</Badge>;
    case "in-progress":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Em andamento</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Finalizado</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

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

const shopData = {
  name: "Auto Mecânica Express",
  logo: "/placeholder.svg",
  userImage: "/placeholder.svg",
  userName: "Carlos Mecânico",
};

export function ServiceOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [clientFilter, setClientFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<typeof serviceOrders[0] | null>(null);
  const [serviceDetailsOpen, setServiceDetailsOpen] = useState(false);
  const [reportType, setReportType] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [photos, setPhotos] = useState<{[key: string]: string}>({});
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const mockAlerts = [
    { id: 1, title: "Peças pendentes", message: "Aguardando chegada de peças para SR-004", type: "pending" },
    { id: 2, title: "Aprovação necessária", message: "Orçamento do serviço SR-006 aguardando aprovação", type: "approval" },
  ];

  const filteredOrders = serviceOrders.filter(order => {
    const matchesSearch = 
      order.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesCity = cityFilter === "all" || order.location.includes(cityFilter);
    const matchesClient = clientFilter === "all" || order.company === clientFilter;
    
    return matchesSearch && matchesStatus && matchesCity && matchesClient;
  });
  
  const handleStartService = (order: typeof serviceOrders[0]) => {
    setSelectedOrder(order);
    setServiceDetailsOpen(true);
    setCurrentStep(1);
    setReportType("");
    setPhotos({});
    setActiveTab("details");
  };

  const handleNextStep = () => {
    if (currentStep === 1 && (!photos['front'] || !photos['km'])) {
      toast({
        title: "Fotos obrigatórias",
        description: "Por favor, adicione todas as fotos necessárias para continuar.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 1 && !reportType) {
      toast({
        title: "Selecione o tipo de relatório",
        description: "Por favor, selecione o tipo de relatório para continuar.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep === 2) {
      if (reportType === 'troca-bateria' && (!photos['old-battery'] || !photos['new-battery'])) {
        toast({
          title: "Fotos obrigatórias",
          description: "Por favor, adicione as fotos da bateria antiga e nova.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Atendimento concluído",
        description: "Relatório de serviço gerado com sucesso!",
      });
      
      setServiceDetailsOpen(false);
      
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotoUpload = (photoType: string) => {
    setPhotos({
      ...photos,
      [photoType]: "/placeholder.svg"
    });
    
    toast({
      title: "Foto adicionada",
      description: "A foto foi adicionada com sucesso."
    });
  };

  const handlePrintReport = () => {
    toast({
      title: "Gerando relatório",
      description: "O relatório está sendo gerado para impressão."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ordens de Serviço</h1>
          <p className="text-muted-foreground">
            Gerencie os atendimentos e solicitações de serviço.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setAlertsOpen(!alertsOpen)} className="relative">
                  <Wrench className="h-5 w-5" />
                  {mockAlerts.length > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Alertas de Serviços</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu open={alertsOpen} onOpenChange={setAlertsOpen}>
            <DropdownMenuTrigger asChild>
              <span className="sr-only">Alertas</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              {mockAlerts.map((alert) => (
                <DropdownMenuItem key={alert.id} className="p-3 cursor-pointer">
                  <div className="flex gap-3 items-start">
                    <AlertCircle className={`h-5 w-5 ${alert.type === 'pending' ? 'text-amber-500' : 'text-blue-500'}`} />
                    <div>
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Car className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Solicitação de Atendimento</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={shopData.userImage} alt={shopData.userName} />
              <AvatarFallback>{shopData.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{shopData.userName}</p>
              <p className="text-xs text-muted-foreground">{shopData.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por placa, cliente ou tipo de serviço"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtros
          {(statusFilter !== "all" || cityFilter !== "all" || clientFilter !== "all") && (
            <Badge className="ml-2 bg-primary/20 text-primary border-0 hover:bg-primary/20">
              {(statusFilter !== "all" ? 1 : 0) + 
               (cityFilter !== "all" ? 1 : 0) + 
               (clientFilter !== "all" ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Cidade" />
            </SelectTrigger>
            <SelectContent>
              {cityOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={clientFilter} onValueChange={setClientFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Cliente" />
            </SelectTrigger>
            <SelectContent>
              {clientOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center p-8">
            <Archive className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-2 text-lg font-medium">Nenhuma ordem de serviço encontrada</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Tente ajustar seus filtros ou busca para encontrar o que está procurando.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <div className={`h-1 ${
                order.status === "pending" ? "bg-amber-500" : 
                order.status === "in-progress" ? "bg-blue-500" : 
                "bg-green-500"
              }`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle>{order.id}</CardTitle>
                      {getStatusBadge(order.status)}
                    </div>
                    <CardDescription className="mt-1">{formatDate(order.createdAt)}</CardDescription>
                    {order.pendingReason && (
                      <p className="text-sm text-amber-600 mt-1">
                        <AlertCircle className="inline-block h-3 w-3 mr-1" />
                        {order.pendingReason}
                      </p>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Mais opções</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStartService(order)}>
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>Contatar cliente</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Cliente</p>
                    <p className="text-sm text-muted-foreground">{order.company}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Veículo</p>
                    <p className="text-sm text-muted-foreground">Placa: {order.plate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Serviço</p>
                    <p className="text-sm text-muted-foreground">{order.serviceType}</p>
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {order.location}
                </div>
                <div className="flex justify-end mt-4">
                  {order.status === "pending" && (
                    <Button onClick={() => handleStartService(order)}>
                      <Clock className="mr-2 h-4 w-4" />
                      Iniciar Atendimento
                    </Button>
                  )}
                  {order.status === "in-progress" && (
                    <Button onClick={() => handleStartService(order)}>
                      <Check className="mr-2 h-4 w-4" />
                      Concluir Atendimento
                    </Button>
                  )}
                  {order.status === "completed" && (
                    <Button variant="outline" onClick={() => handleStartService(order)}>
                      Ver Detalhes
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      <Dialog open={serviceDetailsOpen} onOpenChange={setServiceDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Serviço {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Cliente: {selectedOrder?.company} | Placa: {selectedOrder?.plate}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="report">Relatório</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              {selectedOrder?.status === "pending" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Checklist de Atendimento</h3>
                  <p className="text-muted-foreground text-sm">
                    Para iniciar o atendimento, você precisará selecionar o tipo de relatório e enviar as fotos iniciais:
                  </p>
                  
                  {currentStep === 1 && (
                    <>
                      <div className="mb-4">
                        <label className="text-sm font-medium mb-1 block">Selecione o tipo de relatório:</label>
                        <Select value={reportType} onValueChange={setReportType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Escolha o tipo de relatório" />
                          </SelectTrigger>
                          <SelectContent>
                            {reportTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-md p-4 text-center">
                          <div className="border-2 border-dashed rounded-md p-8 mb-2 relative">
                            {photos['front'] ? (
                              <img src={photos['front']} alt="Frente do carro" className="mx-auto h-32 object-cover" />
                            ) : (
                              <>
                                <Camera className="mx-auto h-10 w-10 text-muted-foreground/50" />
                                <p className="mt-2 text-sm text-muted-foreground">Foto da frente do carro com placa</p>
                              </>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handlePhotoUpload('front')}
                          >
                            {photos['front'] ? 'Substituir Foto' : 'Adicionar Foto'}
                          </Button>
                        </div>
                        <div className="border rounded-md p-4 text-center">
                          <div className="border-2 border-dashed rounded-md p-8 mb-2">
                            {photos['km'] ? (
                              <img src={photos['km']} alt="Painel com KM" className="mx-auto h-32 object-cover" />
                            ) : (
                              <>
                                <Camera className="mx-auto h-10 w-10 text-muted-foreground/50" />
                                <p className="mt-2 text-sm text-muted-foreground">Foto do painel com KM</p>
                              </>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handlePhotoUpload('km')}
                          >
                            {photos['km'] ? 'Substituir Foto' : 'Adicionar Foto'}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {currentStep === 2 && reportType === 'troca-bateria' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 text-center">
                        <div className="border-2 border-dashed rounded-md p-8 mb-2">
                          {photos['old-battery'] ? (
                            <img src={photos['old-battery']} alt="Bateria antiga" className="mx-auto h-32 object-cover" />
                          ) : (
                            <>
                              <Camera className="mx-auto h-10 w-10 text-muted-foreground/50" />
                              <p className="mt-2 text-sm text-muted-foreground">Foto do produto velho instalado</p>
                            </>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handlePhotoUpload('old-battery')}
                        >
                          {photos['old-battery'] ? 'Substituir Foto' : 'Adicionar Foto'}
                        </Button>
                      </div>
                      <div className="border rounded-md p-4 text-center">
                        <div className="border-2 border-dashed rounded-md p-8 mb-2">
                          {photos['new-battery'] ? (
                            <img src={photos['new-battery']} alt="Bateria nova" className="mx-auto h-32 object-cover" />
                          ) : (
                            <>
                              <Camera className="mx-auto h-10 w-10 text-muted-foreground/50" />
                              <p className="mt-2 text-sm text-muted-foreground">Foto do produto novo instalado</p>
                            </>
                          )}
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handlePhotoUpload('new-battery')}
                        >
                          {photos['new-battery'] ? 'Substituir Foto' : 'Adicionar Foto'}
                        </Button>
                      </div>
                      
                      {photos['old-battery'] && photos['new-battery'] && (
                        <div className="border rounded-md p-4 text-center col-span-2">
                          <div className="border-2 border-dashed rounded-md p-8 mb-2">
                            {photos['guarantee'] ? (
                              <img src={photos['guarantee']} alt="Garantia" className="mx-auto h-32 object-cover" />
                            ) : (
                              <>
                                <Camera className="mx-auto h-10 w-10 text-muted-foreground/50" />
                                <p className="mt-2 text-sm text-muted-foreground">Foto da garantia da bateria</p>
                              </>
                            )}
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handlePhotoUpload('guarantee')}
                          >
                            {photos['guarantee'] ? 'Substituir Foto' : 'Adicionar Foto'}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-6">
                    {currentStep > 1 && (
                      <Button variant="outline" onClick={handlePreviousStep}>
                        Voltar
                      </Button>
                    )}
                    <div className="flex gap-2 ml-auto">
                      <Button variant="outline" onClick={() => setServiceDetailsOpen(false)}>
                        Cancelar
                      </Button>
                      <Button className="gap-2" onClick={handleNextStep}>
                        {currentStep === 2 ? (
                          <>
                            <Check size={16} />
                            Finalizar Atendimento
                          </>
                        ) : (
                          <>
                            <Clock size={16} />
                            Próxima Etapa
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedOrder?.status === "in-progress" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Serviço em Andamento</h3>
                  <p className="text-sm text-muted-foreground">
                    Este serviço está atualmente em execução. Você pode atualizar o status ou finalizar o atendimento quando o serviço for concluído.
                  </p>
                  
                  <div className="flex justify-end mt-6">
                    <Button variant="outline" className="mr-2" onClick={() => setServiceDetailsOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => {
                      setActiveTab('report');
                    }}>
                      <Check size={16} className="mr-2" />
                      Concluir Atendimento
                    </Button>
                  </div>
                </div>
              )}
              
              {selectedOrder?.status === "completed" && (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Serviço Finalizado</h3>
                  <p className="text-sm text-muted-foreground">
                    Este serviço foi concluído. Você pode visualizar o relatório ou gerar uma cópia para impressão.
                  </p>
                  
                  <div className="flex justify-end mt-6">
                    <Button variant="outline" className="mr-2" onClick={() => setServiceDetailsOpen(false)}>
                      Fechar
                    </Button>
                    <Button onClick={() => {
                      setActiveTab('report');
                    }}>
                      <FileText size={16} className="mr-2" />
                      Ver Relatório
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="report">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16">
                      <img src={shopData.logo} alt="Logo" className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{shopData.name}</h3>
                      <p className="text-sm text-muted-foreground">Relatório de Serviço Automotivo</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Ordem de Serviço: {selectedOrder?.id}</p>
                    <p className="text-sm text-muted-foreground">Data: {formatDate(selectedOrder?.createdAt || new Date().toISOString())}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-lg mb-2">Dados do Cliente</h4>
                    <div className="border rounded-md p-4">
                      <p><span className="font-medium">Cliente:</span> {selectedOrder?.company}</p>
                      <p><span className="font-medium">Localização:</span> {selectedOrder?.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-lg mb-2">Dados do Veículo</h4>
                    <div className="border rounded-md p-4">
                      <p><span className="font-medium">Placa:</span> {selectedOrder?.plate}</p>
                      <p><span className="font-medium">Tipo de Serviço:</span> {selectedOrder?.serviceType}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Registros Fotográficos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.keys(photos).length > 0 ? (
                      Object.entries(photos).map(([key, url]) => (
                        <div key={key} className="border rounded-md p-2">
                          <img src={url} alt={key} className="h-32 w-full object-cover rounded" />
                          <p className="text-sm text-center mt-1">{
                            key === 'front' ? 'Frente do veículo' : 
                            key === 'km' ? 'Odômetro/Painel' :
                            key === 'old-battery' ? 'Bateria antiga' :
                            key === 'new-battery' ? 'Bateria nova' :
                            key === 'guarantee' ? 'Garantia' : key
                          }</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground col-span-full">Nenhuma foto registrada para este serviço.</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-lg mb-2">Serviços Realizados</h4>
                  <div className="border rounded-md p-4">
                    <p><span className="font-medium">Tipo de Serviço:</span> {selectedOrder?.serviceType}</p>
                    <p><span className="font-medium">Tipo de Relatório:</span> {
                      reportTypes.find(t => t.value === reportType)?.label || "Não especificado"
                    }</p>
                    <p className="mt-4"><span className="font-medium">Observações:</span></p>
                    <p className="text-muted-foreground">Serviço realizado conforme solicitado pelo cliente.</p>
                  </div>
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Técnico Responsável: {shopData.userName}</p>
                    <p className="text-sm text-muted-foreground">{shopData.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Relatório gerado em {new Date().toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button variant="outline" className="mr-2" onClick={() => setActiveTab('details')}>
                    Voltar
                  </Button>
                  <Button onClick={handlePrintReport}>
                    <FileText size={16} className="mr-2" />
                    Imprimir Relatório
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
