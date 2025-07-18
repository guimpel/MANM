
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { 
  TourProvider, 
  TourButton, 
  type TourStepProps 
} from "@/components/ui/tour";

// Example tour steps for demonstration
const tourSteps: TourStepProps[] = [
  {
    targetSelector: ".dashboard-header",
    title: "Painel de controle",
    description: "Aqui você encontra uma visão geral do seu sistema."
  },
  {
    targetSelector: ".sidebar-navigation",
    title: "Menu de navegação",
    description: "Use este menu para acessar as diferentes áreas do sistema."
  },
  {
    targetSelector: ".status-cards",
    title: "Indicadores",
    description: "Monitore os principais indicadores de desempenho da sua frota."
  },
  {
    targetSelector: ".recent-services",
    title: "Serviços recentes",
    description: "Visualize os serviços mais recentes solicitados para sua frota."
  }
];

export default function OnboardingDemo() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <div className="container py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Sistema de Onboarding</h1>
          <p className="text-muted-foreground">
            Esta página demonstra os diferentes componentes de onboarding disponíveis na plataforma.
          </p>
        </div>

        <div className="space-y-4 border rounded-lg p-6">
          <h2 className="text-xl font-semibold">1. Assistente de Onboarding</h2>
          <p className="text-muted-foreground">
            Guia inicial para novos usuários, com seleção de perfil e tour pela navegação.
          </p>
          <Button onClick={() => setShowOnboarding(true)}>
            Iniciar Onboarding
          </Button>
          
          <OnboardingWizard 
            isOpen={showOnboarding} 
            onClose={() => setShowOnboarding(false)} 
          />
        </div>

        <TourProvider steps={tourSteps}>
          <div className="space-y-4 border rounded-lg p-6">
            <h2 className="text-xl font-semibold">2. Tour Guiado</h2>
            <p className="text-muted-foreground">
              Tour interativo com destaque para elementos específicos da interface.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border rounded-lg p-4 dashboard-header">
                <h3 className="font-medium">Painel de Controle</h3>
                <p className="text-sm text-muted-foreground">
                  Visão geral do sistema
                </p>
              </div>
              
              <div className="border rounded-lg p-4 sidebar-navigation">
                <h3 className="font-medium">Menu de Navegação</h3>
                <p className="text-sm text-muted-foreground">
                  Acesso às diferentes áreas
                </p>
              </div>
              
              <div className="border rounded-lg p-4 status-cards">
                <h3 className="font-medium">Indicadores</h3>
                <p className="text-sm text-muted-foreground">
                  KPIs principais
                </p>
              </div>
              
              <div className="border rounded-lg p-4 recent-services">
                <h3 className="font-medium">Serviços Recentes</h3>
                <p className="text-sm text-muted-foreground">
                  Últimos atendimentos
                </p>
              </div>
            </div>
            
            <TourButton>Iniciar Tour</TourButton>
          </div>
        </TourProvider>

        <div className="space-y-4 border rounded-lg p-6">
          <h2 className="text-xl font-semibold">3. Modo Demo</h2>
          <p className="text-muted-foreground">
            Um banner ou indicador que mostra quando o usuário está em modo de demonstração.
          </p>
          <p>
            O banner de demonstração já está ativo no topo da aplicação, mostrando que você está em modo de simulação.
          </p>
        </div>
      </div>
    </div>
  );
}
