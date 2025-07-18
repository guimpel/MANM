import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Hammer, CheckCircle, Shield, Clock, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function BodyworkService() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Hammer className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">Serviços de Lanternagem</h1>
            </div>
            <p className="text-xl max-w-3xl">
              Restauração da estrutura e carroceria dos veículos com precisão e
              qualidade, garantindo segurança e estética para sua frota.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Restauração e Segurança Estrutural</h2>
              <p className="text-lg text-gray-700">
                A lanternagem vai muito além da estética. Restaurar adequadamente a estrutura de um veículo após uma colisão 
                é essencial para garantir a segurança dos usuários e preservar a integridade estrutural do automóvel, 
                evitando problemas futuros.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Wrench className="h-5 w-5 mr-2 text-accent" />
                    Lanternagem Estrutural
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Restauração precisa de estruturas deformadas e componentes atingidos em colisões.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Hammer className="h-5 w-5 mr-2 text-accent" />
                    Recuperação de Carrocerias
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Reparos em amassados, ondulações e outros danos à lataria do veículo.
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700">
                Na IMOVA, trabalhamos com os melhores profissionais e oficinas especializadas em todo o Brasil, 
                garantindo serviços de lanternagem que seguem rigorosos padrões de qualidade e aplicam técnicas 
                modernas de reparo que preservam as características originais dos veículos.
              </p>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-primary">Serviços Oferecidos</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Reparo de amassados</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Reformas estruturais</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Substituição de painéis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Alinhamento de portas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Ajuste de capô e porta-malas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Reparo em parachoques</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Restauração em veículos sinistrados</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Martelinho de ouro</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold mb-4 text-primary">Por que escolher a IMOVA?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Wrench className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Profissionais especializados</span>
                      <p className="text-sm text-gray-600">Técnicos com certificação e experiência comprovada</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Garantia dos serviços</span>
                      <p className="text-sm text-gray-600">Todos os serviços de lanternagem com garantia extendida</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Agilidade no atendimento</span>
                      <p className="text-sm text-gray-600">Prazos otimizados para minimizar o tempo de inatividade da frota</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Recupere a integridade estrutural do seu veículo</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Serviços de lanternagem de qualidade são essenciais para manter o valor da frota e garantir a segurança dos usuários.
              Conte com a IMOVA para soluções completas de lanternagem.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link to="/fleet-request">Solicitar Serviço de Lanternagem</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
