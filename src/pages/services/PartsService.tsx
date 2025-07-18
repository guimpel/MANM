
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingBag, CheckCircle, Truck, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PartsService() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <ShoppingBag className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">Serviços de Peças</h1>
            </div>
            <p className="text-xl max-w-3xl">
              Fornecimento de peças originais e homologadas para todos os tipos de veículos,
              com entrega rápida e garantia estendida para sua frota.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">A Importância das Peças Automotivas de Qualidade</h2>
              <p className="text-lg text-gray-700">
                Peças de qualidade são fundamentais para a segurança, desempenho e durabilidade dos veículos. 
                Uma peça inadequada pode comprometer todo o sistema do veículo, gerando custos adicionais e 
                reduzindo a vida útil do automóvel.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Package className="h-5 w-5 mr-2 text-accent" />
                    Peças Originais
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Garantia de qualidade e compatibilidade perfeita com seu veículo.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Truck className="h-5 w-5 mr-2 text-accent" />
                    Entrega Expressa
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Entrega rápida para minimizar o tempo de inatividade da sua frota.
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700">
                A IMOVA conta com uma ampla rede de fornecedores de peças automotivas em todo o Brasil,
                oferecendo acesso a um extenso catálogo de peças originais e homologadas para praticamente 
                todos os modelos de veículos, com preços competitivos e entrega ágil.
              </p>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-primary">Categorias de Peças</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Filtros (ar, óleo, combustível)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Baterias</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Lâmpadas e iluminação</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Pneus e rodas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Freios (pastilhas, discos)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Componentes de motor</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Suspensão e direção</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Acessórios diversos</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold mb-4 text-primary">Por que escolher a IMOVA?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Disponibilidade imediata</span>
                      <p className="text-sm text-gray-600">Amplo estoque com diversidade de marcas e modelos</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Garantia estendida</span>
                      <p className="text-sm text-gray-600">Todas as peças com garantia contra defeitos de fabricação</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Truck className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Logística integrada</span>
                      <p className="text-sm text-gray-600">Sistema de entrega otimizado para atender sua frota onde estiver</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Mantenha sua frota sempre operando</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Peças de qualidade reduzem o tempo de inatividade da frota, aumentam a segurança dos veículos
              e garantem longevidade para seu investimento.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link to="/fleet-request">Solicitar Peças</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
