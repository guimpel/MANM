
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Phone, Mail, MapPin, Wrench, MessageSquare, ClipboardList, User, Bell, Settings, LogOut, Gauge } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { testSurfaceConnection } from "@/services/surfaceService";
import { toast } from "sonner";

import RequestsTable from "@/components/provider/RequestsTable";

const ProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [surfaceConnected, setSurfaceConnected] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if profile is completed and test Surface connection
  useEffect(() => {
    const isProfileComplete = localStorage.getItem("providerProfileComplete") === "true";
    
    if (!isProfileComplete) {
      // Redirect to profile completion page if profile is not completed
      navigate("/provider/profile-completion");
    }

    // Test Surface connection
    const checkSurfaceConnection = async () => {
      try {
        const connected = await testSurfaceConnection();
        setSurfaceConnected(connected);
        if (connected) {
          toast({
            title: "Conectado ao Surface",
            description: "Sistema de monitoramento ativo",
          });
        }
      } catch (error) {
        console.error("Surface connection error:", error);
      }
    };

    checkSurfaceConnection();
  }, [navigate, toast]);

  const handleSurfaceDashboard = () => {
    navigate('/provider/surface');
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Atendimento</h1>
          <p className="text-gray-500">Gerencie suas solicitações de serviço</p>
        </div>

        {surfaceConnected && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-md p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-blue-700">Surface está conectado</h3>
              <p className="text-sm text-blue-600">Sistema de monitoramento de motores ativo</p>
            </div>
            <Button onClick={handleSurfaceDashboard}>
              Acessar Surface
            </Button>
          </div>
        )}
        
        <Tabs defaultValue="pending" className="w-full" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="pending">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                Pendentes
              </span>
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                Em Andamento
              </span>
            </TabsTrigger>
            <TabsTrigger value="completed">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                Finalizados
              </span>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              <span className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                Não Atendidos
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <RequestsTable status="pending" />
          </TabsContent>
          
          <TabsContent value="in-progress">
            <RequestsTable status="in-progress" />
          </TabsContent>
          
          <TabsContent value="completed">
            <RequestsTable status="completed" />
          </TabsContent>
          
          <TabsContent value="rejected">
            <RequestsTable status="rejected" />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
};

export default ProviderDashboard;
