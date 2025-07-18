
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Acesso a fornecedores qualificados em todo o Brasil",
  "Resposta rápida para emergências e manutenções programadas",
  "Dashboard completo com histórico de serviços e relatórios",
  "Pagamentos seguros e facilitados via Pix",
  "Evidências fotográficas e documentação detalhada",
  "Suporte técnico especializado"
];

const CTASection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="man-container">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-man-blue mb-4">
                Pronto para transformar a gestão da sua frota?
              </h2>
              <p className="text-man-gray text-lg mb-6">
                Junte-se a centenas de empresas que já otimizaram suas operações com o Motor Assist Network.
                Cadastre-se agora e comece a utilizar nossa plataforma.
              </p>
              
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-man-orange mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-man-orange hover:bg-man-orange-light text-white" size="lg" asChild>
                  <Link to="/register">Cadastre-se Gratuitamente</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Fale com um Consultor</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-man-blue-light hidden md:block">
              <div className="h-full flex items-center justify-center p-6">
                <div className="relative w-full max-w-md">
                  <div className="absolute -top-6 -left-6 bg-man-orange rounded-lg p-3 shadow-lg">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl">
                    <h3 className="text-xl font-bold mb-4 text-white">Empresa Cliente</h3>
                    
                    <div className="space-y-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <p className="text-sm font-medium text-white mb-1">Solicitação de Serviço</p>
                        <p className="text-xs text-gray-200">Guincho para veículo em São Paulo</p>
                      </div>
                      
                      <div className="bg-white/20 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-white">Status</p>
                          <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
                            Fornecedor encontrado
                          </span>
                        </div>
                        <p className="text-xs text-gray-200">Tempo estimado: 15 minutos</p>
                      </div>
                      
                      <div className="bg-white/20 p-3 rounded-lg">
                        <p className="text-sm font-medium text-white mb-1">Fornecedor</p>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-white/30 mr-2"></div>
                          <div>
                            <p className="text-xs font-medium text-white">Auto Guincho Express</p>
                            <p className="text-xs text-gray-200">Avaliação: 4.9/5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
