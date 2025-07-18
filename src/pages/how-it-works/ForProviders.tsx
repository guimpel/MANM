
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Award, TrendingUp, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForProviders = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="man-container">
            <h1 className="text-4xl font-bold mb-4">Seja um Fornecedor IMOVAN</h1>
            <p className="text-xl max-w-3xl">
              Expanda seu negócio, conecte-se a milhares de frotistas em todo o Brasil 
              e acelere seu crescimento com a rede IMOVAN.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="man-container py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Crescimento Acelerado</h2>
              <p className="text-lg text-gray-700">
                Como fornecedor na plataforma IMOVAN, você trabalha e recebe à vista pelo produto ou 
                serviço oferecido. Valores competitivos são essenciais para garantir um crescimento 
                acelerado dentro da plataforma.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 text-primary">O mercado de frotas no Brasil:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">Mais de 12 milhões</span> de veículos em frotas corporativas
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      Crescimento anual de <span className="font-medium">8% no setor</span> de locação
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      Mercado que movimenta mais de <span className="font-medium">R$ 20 bilhões por ano</span> em manutenção
                    </div>
                  </li>
                </ul>
              </div>
              
              <p className="text-lg text-gray-700">
                Com a IMOVAN, você tem acesso a esse enorme mercado de forma simplificada, recebendo 
                pagamentos imediatos e aumentando sua base de clientes.
              </p>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">Benefícios para Fornecedores</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>Pagamento imediato via Pix após a conclusão do serviço</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>Aumente sua carteira de clientes sem investir em marketing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>Solicitações georreferenciadas - atenda apenas em sua área</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>Avaliações que destacam sua qualidade de serviço</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>Dashboard completo para gestão do seu negócio</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <span>Sem mensalidades fixas elevadas - pague conforme usa</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <div className="flex items-center mb-4">
                  <Award className="h-8 w-8 text-accent mr-3" />
                  <h3 className="text-xl font-bold">Torne-se um Fornecedor Indicado</h3>
                </div>
                <p className="mb-6">
                  Fornecedores com as melhores avaliações e maior volume de atendimentos 
                  recebem o selo de "Fornecedor Indicado", ganhando prioridade nas solicitações 
                  e destaque na plataforma.
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                  <Link to="/register">Cadastre-se como Fornecedor</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-primary mb-8">Qualidade e Preço: O Caminho para o Sucesso</h2>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              Para crescer na IMOVAN, concentre-se em oferecer o melhor serviço pelo preço mais 
              competitivo. Fornecedores que mantêm alta qualidade e preços justos ganham destaque 
              e recebem mais solicitações.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link to="/register">Comece Agora</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForProviders;
