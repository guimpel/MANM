
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, AlertCircle, CheckCircle, Clock, Wrench, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ElectricalService = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="man-container">
            <div className="flex items-center mb-6">
              <Zap className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">Serviços de Elétrica Veicular</h1>
            </div>
            <p className="text-xl max-w-3xl">
              Soluções rápidas e profissionais para todos os problemas elétricos do seu veículo,
              disponíveis em todo o Brasil através da IMOVA.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="man-container py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Desafios da Elétrica Veicular</h2>
              <p className="text-lg text-gray-700">
                Problemas elétricos em veículos são complexos e podem deixar seu carro completamente 
                inoperante. Os sistemas elétricos modernos são cada vez mais integrados e exigem 
                diagnósticos precisos e soluções especializadas.
              </p>
              
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                  Desafios Comuns
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                    <span>Diagnóstico complexo que requer equipamentos específicos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                    <span>Veículos modernos com sistemas eletrônicos integrados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                    <span>Alto custo de peças originais e serviços especializados</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                    <span>Necessidade de técnicos experientes e certificados</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-lg text-gray-700">
                A IMOVA conecta você a especialistas em elétrica veicular que possuem as ferramentas, 
                conhecimento e experiência necessários para solucionar qualquer problema elétrico de 
                forma eficiente e acessível.
              </p>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">Serviços Oferecidos</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Diagnóstico eletrônico</span>
                      <p className="text-sm text-gray-600">Leitura e interpretação de códigos de erro</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Reparo e substituição de baterias</span>
                      <p className="text-sm text-gray-600">Incluindo teste de carga e alternador</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Sistema de iluminação</span>
                      <p className="text-sm text-gray-600">Faróis, lanternas e iluminação interna</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Sistemas de conforto</span>
                      <p className="text-sm text-gray-600">Ar-condicionado, vidros e travas elétricas</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Injeção eletrônica</span>
                      <p className="text-sm text-gray-600">Diagnóstico e reparo de sensores e atuadores</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <div className="flex items-center mb-4">
                  <Wrench className="h-8 w-8 text-accent mr-3" />
                  <h3 className="text-xl font-bold">Fornecedores Qualificados</h3>
                </div>
                <p className="mb-6">
                  Todos os prestadores de serviços elétricos na IMOVA passam por verificação 
                  rigorosa, garantindo que seu veículo seja atendido por profissionais qualificados.
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                  <Link to="/fleet-request">Solicitar Serviço Elétrico</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <Clock className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Atendimento Rápido</h3>
              <p className="text-gray-600">
                Fornecedores próximos são notificados e respondem em minutos, evitando longas esperas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <MessageCircle className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Comunicação Direta</h3>
              <p className="text-gray-600">
                Chat integrado com o técnico para acompanhamento em tempo real do serviço.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Garantia de Serviço</h3>
              <p className="text-gray-600">
                Todos os serviços elétricos têm garantia mínima de 90 dias através da plataforma.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link to="/register">Cadastre-se para Solicitar Serviços</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ElectricalService;
