
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Wrench, User } from "lucide-react";
import { cn } from "@/lib/utils";

type ProfileType = "fleet" | "shop" | "driver";

interface ProfileSelectionStepProps {
  onSelectProfile: (profile: ProfileType) => void;
}

export function ProfileSelectionStep({ onSelectProfile }: ProfileSelectionStepProps) {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);

  const handleSelect = (profile: ProfileType) => {
    setSelectedProfile(profile);
  };

  const handleContinue = () => {
    if (selectedProfile) {
      onSelectProfile(selectedProfile);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-2">Selecione seu perfil</h2>
        <p className="text-muted-foreground">
          Escolha como você deseja usar nossa plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={cn(
            "cursor-pointer transition-all",
            selectedProfile === "fleet" 
              ? "border-primary ring-2 ring-primary ring-opacity-50" 
              : "hover:border-primary/50"
          )}
          onClick={() => handleSelect("fleet")}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <Car size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-lg">Frotista</h3>
            <p className="text-center text-muted-foreground text-sm mt-2">
              Gerenciar sua frota de veículos e solicitar serviços
            </p>
          </CardContent>
        </Card>

        <Card 
          className={cn(
            "cursor-pointer transition-all",
            selectedProfile === "shop" 
              ? "border-primary ring-2 ring-primary ring-opacity-50" 
              : "hover:border-primary/50"
          )}
          onClick={() => handleSelect("shop")}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
              <Wrench size={32} className="text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="font-medium text-lg">Fornecedor</h3>
            <p className="text-center text-muted-foreground text-sm mt-2">
              Oficinas e fornecedores de serviços automotivos
            </p>
          </CardContent>
        </Card>

        <Card 
          className={cn(
            "cursor-pointer transition-all",
            selectedProfile === "driver" 
              ? "border-primary ring-2 ring-primary ring-opacity-50" 
              : "hover:border-primary/50"
          )}
          onClick={() => handleSelect("driver")}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <User size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium text-lg">Condutor</h3>
            <p className="text-center text-muted-foreground text-sm mt-2">
              Acompanhar serviços e solicitar assistência para seu veículo
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-4">
        <Button 
          onClick={handleContinue} 
          disabled={!selectedProfile}
          size="lg"
          className="min-w-[200px]"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
