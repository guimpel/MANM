
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Zap, Calendar, Clock, Car, CheckCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForFleets = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="man-container">
            <h1 className="text-4xl font-bold mb-4">Solução Completa para Frotistas</h1>
            <p className="text-xl max-w-3xl">
              Gerencie sua frota com eficiência, contrate serviços em todo o Brasil
              e tenha total controle sobre manutenções e custos.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="man-container py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Atendimento Nacional</h2>
              <p className="text-lg text-gray-700">
                Com a plataforma IMOVA, sua empresa pode contratar serviços em qualquer local do Brasil. 
                Não importa onde seu veículo esteja, temos fornecedores qualificados prontos para atendê-lo.
              </p>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">Serviços Disponíveis:</h3>
                <ul className="grid grid-cols-2 gap-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Mecânica</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Elétrica</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Reboque</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Peças</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Lanternagem</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Pintura</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Alinhamento</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2" />
                    <span>Balanceamento</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-lg text-gray-700">
                A IMOVA facilita toda a gestão financeira: nós pagamos o fornecedor e faturamos 
                para sua empresa, simplificando os processos administrativos e evitando a 
                necessidade de cadastro de novos fornecedores.
              </p>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-primary">Como Funciona</h3>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Solicite onde estiver</span>
                      <span className="text-gray-600">Atendimento em todo território nacional</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Resposta rápida</span>
                      <span className="text-gray-600">Fornecedores próximos atendem em minutos</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Agendamento flexível</span>
                      <span className="text-gray-600">Programe serviços conforme sua necessidade</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <Car className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Relatórios detalhados</span>
                      <span className="text-gray-600">Histórico completo de cada veículo</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium block mb-1">Faturamento simplificado</span>
                      <span className="text-gray-600">Pagamos fornecedores e faturamos para você</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 mt-16">
            <div className="text-center mb-8">
              <Clock className="h-10 w-10 mx-auto text-accent mb-4" />
              <h2 className="text-2xl font-bold text-primary">Economize tempo e recursos</h2>
              <p className="text-lg max-w-3xl mx-auto mt-2">
                Chega de perder tempo procurando fornecedores locais ou negociando preços. 
                A IMOVA automatiza todo o processo e garante o melhor custo-benefício.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 mb-4" asChild>
                <Link to="/register">Registre sua Frota</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/fleet-dashboard">Ver Demo do Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForFleets;
