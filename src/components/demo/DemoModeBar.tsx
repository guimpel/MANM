
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function DemoModeBar() {
  const [expanded, setExpanded] = useState(true);
  const { toast } = useToast();

  const handleRegister = () => {
    toast({
      title: "Saindo do modo demo",
      description: "Você será redirecionado para o cadastro.",
    });
    // In a real app, navigate to register page
    window.location.href = "/register";
  };

  if (!expanded) {
    return (
      <Button
        className="fixed left-4 bottom-4 z-50 bg-amber-500 hover:bg-amber-600"
        onClick={() => setExpanded(true)}
      >
        <AlertCircle className="mr-2 h-4 w-4" />
        Modo Demo
      </Button>
    );
  }

  return (
    <div className="sticky top-0 z-50 bg-amber-500 text-white py-2 px-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <AlertCircle className="mr-2 h-5 w-5" />
          <span className="font-medium">
            Você está em modo de simulação. Os dados são fictícios e as alterações não serão salvas.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRegister}
            className="bg-white text-amber-700 border-amber-200 hover:bg-amber-50"
          >
            Cadastrar
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setExpanded(false)}
            className="text-amber-50 hover:bg-amber-600 hover:text-white"
          >
            <span className="sr-only">Minimizar</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
