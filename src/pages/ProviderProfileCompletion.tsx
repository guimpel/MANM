
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import ProfileConfirmation from "@/components/provider/ProfileConfirmation";
import ServiceAreaSelection from "@/components/provider/ServiceAreaSelection";
import PaymentSetup from "@/components/provider/PaymentSetup";

// Possible profile completion stages
type ProfileStage = "profile" | "services" | "payment" | "complete";

const ProviderProfileCompletion = () => {
  const [profileStage, setProfileStage] = useState<ProfileStage>("profile");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleProfileSubmit = () => {
    setProfileStage("services");
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };
  
  const handleServicesSubmit = () => {
    setProfileStage("payment");
    toast({
      title: "Serviços definidos",
      description: "Suas áreas de atuação foram definidas com sucesso.",
    });
  };
  
  const handlePaymentSubmit = () => {
    setProfileStage("complete");
    localStorage.setItem("providerProfileComplete", "true");
    toast({
      title: "Cadastro completo!",
      description: "Seu cadastro foi concluído com sucesso.",
    });
  };

  const handleGoToDashboard = () => {
    navigate("/provider/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800">Portal do Fornecedor</h1>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Complete seu cadastro</CardTitle>
            <CardDescription>
              Para começar a receber solicitações, complete as informações abaixo
            </CardDescription>
          </CardHeader>
          <CardContent>
            {profileStage === "profile" && (
              <ProfileConfirmation onSubmit={handleProfileSubmit} />
            )}
            
            {profileStage === "services" && (
              <ServiceAreaSelection onSubmit={handleServicesSubmit} />
            )}
            
            {profileStage === "payment" && (
              <PaymentSetup onSubmit={handlePaymentSubmit} />
            )}
            
            {profileStage === "complete" && (
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-2">Cadastro finalizado com sucesso!</h3>
                <p className="text-gray-500 mb-6">
                  Agora você pode começar a receber solicitações de serviços.
                </p>
                <Button onClick={handleGoToDashboard}>
                  Ir para o Dashboard
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <div className="flex gap-2">
              <div className={`h-2 w-16 rounded-full ${profileStage === "profile" || profileStage === "services" || profileStage === "payment" || profileStage === "complete" ? "bg-blue-500" : "bg-gray-200"}`}></div>
              <div className={`h-2 w-16 rounded-full ${profileStage === "services" || profileStage === "payment" || profileStage === "complete" ? "bg-blue-500" : "bg-gray-200"}`}></div>
              <div className={`h-2 w-16 rounded-full ${profileStage === "payment" || profileStage === "complete" ? "bg-blue-500" : "bg-gray-200"}`}></div>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Toaster />
    </div>
  );
};

export default ProviderProfileCompletion;
