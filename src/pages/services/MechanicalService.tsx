
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, CheckCircle, Shield, Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MechanicalService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="man-container">
            <div className="flex items-center mb-6">
              <Wrench className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">Serviços de Mecânica</h1>
            </div>
            <p className="text-xl max-w-3xl">
              Manutenção preventiva e corretiva para todos os sistemas mecânicos do seu veículo,
              com profissionais qualificados e peças de qualidade.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="man-container py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Desafios da Mecânica Veicular</h2>
              <p className="text-lg text-gray-700">
                A manutenção mecânica adequada é essencial para o bom funcionamento e segurança dos veículos. 
                Veículos mal mantidos apresentam maior consumo de combustível, desgaste prematuro de peças e 
                riscos de quebras que podem resultar em acidentes.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Settings className="h-5 w-5 mr-2 text-accent" />
                    Manutenção Preventiva
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Evite problemas maiores com check-ups regulares e trocas de componentes no tempo certo.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Wrench className="h-5 w-5 mr-2 text-accent" />
                    Manutenção Corretiva
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Reparos precisos quando algo já apresenta falha, minimizando tempo de inatividade.
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700">
                Através da IMOVA, sua empresa tem acesso a uma rede de mecânicos qualificados 
                em todo o Brasil, com processos padronizados e documentação completa de cada serviço 
                realizado em sua frota.
              </p>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-primary">Serviços Oferecidos</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Revisões programadas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Sistema de freios</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Suspensão e direção</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Motor e câmbio</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Sistema de arrefecimento</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Embreagem e transmissão</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Correias e tensores</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Escapamento</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold mb-4 text-primary">Por que escolher a IMOVA?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Resposta rápida</span>
                      <p className="text-sm text-gray-600">Atendimento em até 30 minutos na maioria das regiões</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Garantia estendida</span>
                      <p className="text-sm text-gray-600">Todos os serviços com garantia mínima de 3 meses</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Wrench className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Técnicos qualificados</span>
                      <p className="text-sm text-gray-600">Mecânicos com certificação e experiência comprovada</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Mantenha sua frota em perfeitas condições</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Uma manutenção mecânica adequada e regular reduz custos operacionais, 
              aumenta a vida útil dos veículos e garante a segurança dos condutores.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link to="/fleet-request">Solicitar Serviço Mecânico</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MechanicalService;
