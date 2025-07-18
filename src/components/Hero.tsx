
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, Truck, Clock, Shield } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
          alt="Estrada ao amanhecer" 
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
      </div>

      <div className="man-container relative z-10 py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-xl">
              <span className="mr-2 rounded-full bg-accent px-1.5 py-0.5 text-xs text-white">Novo</span>
              <span>Plataforma de serviços automobilísticos</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              A solução completa para sua frota automobilística
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200">
              Conectamos empresas e fornecedores de serviços automobilísticos em todo o Brasil. Simplifique a gestão da sua frota com a IMOVAN.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white" asChild>
                <Link to="/register">Cadastre-se Agora</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
                <Link to="/about">Saiba Mais</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="relative bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl">
              <div className="absolute -top-4 -right-4 bg-accent rounded-lg p-2 shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Atendimento em Tempo Real</h3>
              <p className="mb-4">Solicite serviços e receba respostas de fornecedores em minutos.</p>
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/20 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium">Guincho</p>
                </div>
                <div className="bg-accent/90 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium">Mecânico</p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg text-center">
                  <p className="text-sm font-medium">Elétrica</p>
                </div>
              </div>
              <div className="animate-pulse-light mt-4 flex justify-between items-center p-3 bg-white/10 rounded-lg">
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                  <p className="text-sm">3 fornecedores online próximos</p>
                </div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">Agora</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Bar */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-b border-white/20">
        <div className="man-container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Wrench className="h-8 w-8 mb-2 text-accent" />
              <h3 className="font-medium">Manutenção Rápida</h3>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 mb-2 text-accent" />
              <h3 className="font-medium">Guincho 24h</h3>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 mb-2 text-accent" />
              <h3 className="font-medium">Segurança de Dados</h3>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 mb-2 text-accent" />
              <h3 className="font-medium">Alta Velocidade</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
