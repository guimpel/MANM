
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, MapPin, Clock, Shield, PhoneCall, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TowingService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="man-container">
            <div className="flex items-center mb-6">
              <Truck className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">Serviço de Reboque</h1>
            </div>
            <p className="text-xl max-w-3xl">
              Assistência rápida e segura para deslocamento de veículos em todo Brasil,
              disponível 24 horas por dia, 7 dias por semana.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="man-container py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Desafios do Deslocamento Veicular</h2>
              <p className="text-lg text-gray-700">
                Veículos parados na estrada ou em locais de difícil acesso representam um desafio 
                logístico e de segurança. O reboque adequado exige equipamentos específicos e 
                profissionais treinados para evitar danos adicionais ao veículo.
              </p>
              
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
                  Situações Críticas
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                    <span>Veículos quebrados em rodovias de alto tráfego</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                    <span>Acidentes com necessidade de remoção especializada</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                    <span>Panes em locais distantes ou de difícil acesso</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                    <span>Transferências entre cidades ou estados</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-lg text-gray-700">
                A rede IMOVA conta com prestadores de serviço de reboque estrategicamente 
                posicionados em todo o Brasil, garantindo atendimento rápido mesmo em 
                situações críticas ou em locais remotos.
              </p>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">Tipos de Reboques Disponíveis</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Truck className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Reboque Plataforma</span>
                      <p className="text-sm text-gray-600">Ideal para carros de passeio e SUVs leves</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Truck className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Guincho Pesado</span>
                      <p className="text-sm text-gray-600">Para caminhões e veículos de grande porte</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Truck className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Guincho Integrado</span>
                      <p className="text-sm text-gray-600">Para resgate em locais de difícil acesso</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Truck className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Cegonha</span>
                      <p className="text-sm text-gray-600">Transporte simultâneo de múltiplos veículos</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <div className="flex items-center mb-4">
                  <PhoneCall className="h-8 w-8 text-accent mr-3" />
                  <h3 className="text-xl font-bold">Atendimento Emergencial</h3>
                </div>
                <p className="mb-6">
                  Para situações urgentes, nossa plataforma prioriza o atendimento e direciona 
                  para o prestador mais próximo disponível, reduzindo o tempo de espera.
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                  <Link to="/fleet-request">Solicitar Reboque</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <MapPin className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Cobertura Nacional</h3>
              <p className="text-gray-600">
                Serviço disponível em todos os estados e principais rodovias do Brasil.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <Clock className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Disponibilidade 24/7</h3>
              <p className="text-gray-600">
                Atendimento a qualquer hora do dia ou da noite, incluindo feriados.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <Shield className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Segurança Garantida</h3>
              <p className="text-gray-600">
                Equipamentos modernos e procedimentos seguros para proteção do veículo.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link to="/register">Cadastre sua Empresa</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TowingService;
