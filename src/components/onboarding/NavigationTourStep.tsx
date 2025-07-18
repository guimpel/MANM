
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  LayoutDashboard, 
  Wrench, 
  History, 
  CreditCard, 
  User, 
  ChevronRight
} from "lucide-react";

type ProfileType = "fleet" | "shop" | "driver";

interface NavigationTourStepProps {
  profileType: ProfileType;
  onComplete: () => void;
}

interface TourItem {
  icon: React.ElementType;
  title: string;
  description: string;
}

export function NavigationTourStep({ profileType, onComplete }: NavigationTourStepProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const fleetNavItems: TourItem[] = [
    {
      icon: LayoutDashboard,
      title: "Painel Geral",
      description: "Visualize informações gerais sobre sua frota e serviços"
    },
    {
      icon: Car,
      title: "Solicitar Atendimento",
      description: "Registre solicitações de serviço para seus veículos"
    },
    {
      icon: Wrench,
      title: "Serviços em Andamento",
      description: "Acompanhe os serviços que estão em execução"
    },
    {
      icon: History,
      title: "Histórico de Veículos",
      description: "Veja o histórico completo de serviços por veículo"
    },
    {
      icon: CreditCard,
      title: "Financeiro",
      description: "Gerencie pagamentos e relatórios financeiros"
    }
  ];

  const shopNavItems: TourItem[] = [
    {
      icon: Wrench,
      title: "Atendimentos",
      description: "Visualize e gerencie solicitações de serviço"
    },
    {
      icon: History,
      title: "Orçamentos",
      description: "Gerencie orçamentos enviados aos clientes"
    },
    {
      icon: CreditCard,
      title: "Financeiro",
      description: "Acompanhe pagamentos e antecipações"
    }
  ];

  const driverNavItems: TourItem[] = [
    {
      icon: Car,
      title: "Meu Veículo",
      description: "Informações sobre seu veículo atual"
    },
    {
      icon: Wrench,
      title: "Solicitar Serviço",
      description: "Registre uma nova solicitação de serviço"
    },
    {
      icon: History,
      title: "Histórico",
      description: "Veja o histórico de serviços do seu veículo"
    }
  ];

  const getTourItems = (): TourItem[] => {
    switch(profileType) {
      case "fleet": return fleetNavItems;
      case "shop": return shopNavItems;
      case "driver": return driverNavItems;
      default: return fleetNavItems;
    }
  };

  const tourItems = getTourItems();
  const currentItem = tourItems[currentStep];

  const handleNext = () => {
    if (currentStep < tourItems.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Conheça sua navegação</h2>
        <p className="text-muted-foreground">
          Vamos te mostrar as principais áreas da plataforma
        </p>
      </div>

      <div className="flex justify-center">
        <div className="relative">
          {/* Progress bar */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${(100 * currentStep) / (tourItems.length - 1)}%` }}
            ></div>
          </div>
          
          {/* Tour steps */}
          <div className="flex justify-between relative" style={{ width: `${tourItems.length * 100}px` }}>
            {tourItems.map((_, index) => (
              <div 
                key={index} 
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10
                  ${index <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mt-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-full">
            <currentItem.icon className="w-10 h-10 text-primary" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{currentItem.title}</h3>
            <p className="text-muted-foreground">{currentItem.description}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="ghost" 
          onClick={onComplete}
        >
          Pular tour
        </Button>
        <Button 
          onClick={handleNext}
          className="gap-2"
        >
          {currentStep < tourItems.length - 1 ? "Próximo" : "Finalizar"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
