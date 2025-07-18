
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CompletionStepProps {
  profileType: "fleet" | "shop" | "driver";
  onComplete: () => void;
}

export function CompletionStep({ profileType, onComplete }: CompletionStepProps) {
  const getDashboardRoute = () => {
    switch(profileType) {
      case "fleet": return "/fleet-dashboard";
      case "shop": return "/shop-service-orders";
      case "driver": return "/driver-dashboard";
      default: return "/";
    }
  };

  const getProfileTitle = () => {
    switch(profileType) {
      case "fleet": return "Frotista";
      case "shop": return "Fornecedor";
      case "driver": return "Condutor";
      default: return "Usuário";
    }
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Tudo pronto!</h2>
        <p className="text-muted-foreground">
          Agora você pode começar a usar a plataforma como {getProfileTitle()}
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6">
        <h3 className="font-medium mb-2">Próximos passos:</h3>
        
        {profileType === "fleet" && (
          <ul className="text-left space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">1.</span> Complete seu perfil com os dados da empresa
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">2.</span> Cadastre seus veículos na plataforma
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">3.</span> Solicite seu primeiro atendimento
            </li>
          </ul>
        )}
        
        {profileType === "shop" && (
          <ul className="text-left space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">1.</span> Complete seu cadastro com serviços oferecidos
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">2.</span> Configure sua área de atuação
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">3.</span> Adicione seus dados bancários para recebimentos
            </li>
          </ul>
        )}
        
        {profileType === "driver" && (
          <ul className="text-left space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">1.</span> Confirme seus dados de contato
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">2.</span> Vincule seu veículo à plataforma
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">3.</span> Explore os serviços disponíveis
            </li>
          </ul>
        )}
      </div>

      <div className="pt-4">
        <Button 
          onClick={onComplete}
          size="lg"
          className="min-w-[200px]"
        >
          Ir para o Painel
        </Button>
      </div>
    </div>
  );
}
