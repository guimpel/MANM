import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Building2, Wrench, MessageSquare, ClipboardList, User, Bell, Settings, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import { ServiceRequestStatusBadge } from "@/components/services/ServiceRequestStatusBadge";
import { Service, ServiceRequest } from "@/types/serviceRequest";

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [services, setServices] = useState<Service[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { userProfile, logout } = useAuth();
  
  useEffect(() => {
    const fetchServices = async () => {
      if (!userProfile?.id) return;
      
      try {
        // Use a generic approach for services table with type assertion
        const { data: servicesData, error: servicesError } = await supabase
          .from('services' as any)
          .select('*')
          .eq('provider_id', userProfile.id);
          
        if (servicesError) throw servicesError;
        
        // Type assertion to match our expected shape
        setServices((servicesData || []) as unknown as Service[]);
        
        // Use a generic approach for service_requests table
        const { data: requestsData, error: requestsError } = await supabase
          .from('service_requests')
          .select(`
            *,
            services:service_id(*),
            user_profiles:client_id(first_name, last_name)
          `)
          .eq('provider_id', userProfile.id);
          
        if (requestsError) throw requestsError;
        
        // Type assertion to match our expected shape
        setServiceRequests((requestsData || []) as unknown as ServiceRequest[]);
      } catch (error: any) {
        console.error("Error fetching provider data:", error.message);
        toast.error("Erro ao carregar dados");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, [userProfile?.id]);

  // Helper function to safely get service name
  const getServiceName = (services: ServiceRequest['services']) => {
    if (!services) return 'N/A';
    if (Array.isArray(services) && services.length > 0) {
      return services[0].name || 'N/A';
    }
    if (!Array.isArray(services) && services.name) {
      return services.name;
    }
    return 'N/A';
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader>
            <div className="p-2">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">
                    {userProfile?.first_name} {userProfile?.last_name}
                  </h3>
                  <p className="text-xs text-gray-500">Prestador de Serviços</p>
                </div>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <MessageSquare />
                  <span>Atendimentos</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Wrench />
                  <span>Meus Serviços</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ClipboardList />
                  <span>Histórico</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User />
                  <span>Perfil</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Bell />
                  <span>Notificações</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                  <LogOut />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Painel do Prestador</h1>
            <p className="text-gray-500">Gerencie seus serviços e atendimentos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Serviços
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? <Spinner size="sm" /> : services.length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Solicitações Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    serviceRequests.filter(req => req.status === 'pending').length
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Serviços Concluídos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    serviceRequests.filter(req => req.status === 'completed').length
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Solicitações de Serviço</h2>
            
            <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="pending">Pendentes</TabsTrigger>
                <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
                <TabsTrigger value="completed">Finalizados</TabsTrigger>
                <TabsTrigger value="all">Todos</TabsTrigger>
              </TabsList>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Spinner size="lg" />
                </div>
              ) : (
                <>
                  <TabsContent value="pending" className="mt-0">
                    {renderServiceRequestTable(
                      serviceRequests.filter(req => req.status === 'pending'),
                      getServiceName
                    )}
                  </TabsContent>
                  
                  <TabsContent value="in-progress" className="mt-0">
                    {renderServiceRequestTable(
                      serviceRequests.filter(req => req.status === 'in-progress'),
                      getServiceName
                    )}
                  </TabsContent>
                  
                  <TabsContent value="completed" className="mt-0">
                    {renderServiceRequestTable(
                      serviceRequests.filter(req => req.status === 'completed'),
                      getServiceName
                    )}
                  </TabsContent>
                  
                  <TabsContent value="all" className="mt-0">
                    {renderServiceRequestTable(serviceRequests, getServiceName)}
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Meus Serviços</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.length === 0 ? (
                  <Card className="col-span-full p-6">
                    <div className="text-center">
                      <p className="mb-4 text-muted-foreground">
                        Você ainda não cadastrou nenhum serviço.
                      </p>
                      <Button>Adicionar Serviço</Button>
                    </div>
                  </Card>
                ) : (
                  services.map(service => (
                    <Card key={service.id}>
                      <CardHeader className="pb-2">
                        <CardTitle>{service.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                          {service.description}
                        </p>
                        <p className="font-bold">
                          R$ {service.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Categoria: {service.category}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

function renderServiceRequestTable(
  requests: ServiceRequest[], 
  getServiceName: (services: ServiceRequest['services']) => string
) {
  if (requests.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <p className="text-muted-foreground">Nenhuma solicitação encontrada.</p>
        </div>
      </Card>
    );
  }
  
  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Serviço</th>
              <th className="px-6 py-3">Data</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map(request => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.user_profiles?.first_name} {request.user_profiles?.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getServiceName(request.services) || request.service_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.created_at ? new Date(request.created_at).toLocaleDateString() : ''}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ServiceRequestStatusBadge status={request.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProviderDashboard;
