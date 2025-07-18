
import { Car, Check, Clock, Wrench, History, FileBarChart, CreditCard, User } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { fleetRoutes } from "@/lib/routes";

export function FleetDashboard() {
  useEffect(() => {
    console.log("FleetDashboard loaded successfully");
    toast.success("Bem-vindo ao Painel de Controle da Frota");
  }, []);

  const navigate = useNavigate();
  const cards = [
    {
      title: "Painel Geral",
      icon: <Car className="h-7 w-7 text-primary" />, // ou outro ícone
      value: "12 chamados",
      to: fleetRoutes.dashboard.path,
      description: "Resumo geral da frota"
    },
    {
      title: "Solicitar Atendimento",
      icon: <Wrench className="h-7 w-7 text-primary" />, 
      value: "3 pendentes",
      to: fleetRoutes.serviceRequest.path,
      description: "Abrir novo chamado de serviço"
    },
    {
      title: "Serviços em Andamento",
      icon: <Clock className="h-7 w-7 text-primary" />, 
      value: "6 em execução",
      to: fleetRoutes.services.path,
      description: "Acompanhe os serviços em andamento"
    },
    {
      title: "Histórico de Veículos",
      icon: <History className="h-7 w-7 text-primary" />, 
      value: "24 finalizados",
      to: fleetRoutes.history.path,
      description: "Veja o histórico de manutenções"
    },
    {
      title: "Relatórios Analíticos",
      icon: <FileBarChart className="h-7 w-7 text-primary" />, 
      value: "5 relatórios",
      to: fleetRoutes.analytics.path,
      description: "Indicadores e análises da frota"
    },
    {
      title: "Financeiro",
      icon: <CreditCard className="h-7 w-7 text-primary" />, 
      value: "R$ 12.000",
      to: fleetRoutes.finance.path,
      description: "Resumo financeiro da frota"
    },
    {
      title: "Perfil",
      icon: <User className="h-7 w-7 text-primary" />, 
      value: "Editar",
      to: fleetRoutes.profile.path,
      description: "Gerencie seu perfil e dados"
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Painel de Resumos</h1>
        <p className="text-muted-foreground">
          Acesse rapidamente as principais áreas da sua frota.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(card => (
          <button
            key={card.title}
            onClick={() => navigate(card.to)}
            className="rounded-xl border bg-card p-6 flex flex-col items-start shadow hover:shadow-lg transition cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary"
            type="button"
          >
            <div className="mb-3">{card.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg group-hover:text-primary mb-1">{card.title}</h3>
              <p className="text-2xl font-bold mb-1">{card.value}</p>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
