
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Paintbrush, CheckCircle, Shield, Clock, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function PaintingService() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Paintbrush className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">Serviços de Pintura</h1>
            </div>
            <p className="text-xl max-w-3xl">
              Pintura automotiva com alta qualidade e acabamento profissional, 
              utilizando materiais premium e técnicas avançadas para preservar e valorizar sua frota.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Excelência em Pintura Automotiva</h2>
              <p className="text-lg text-gray-700">
                A pintura não é apenas um elemento estético - é uma camada de proteção crucial para a carroceria do veículo. 
                Uma pintura de qualidade protege contra corrosão, intempéries e mantém o valor de revenda da frota, 
                além de preservar a imagem profissional da sua empresa.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Palette className="h-5 w-5 mr-2 text-accent" />
                    Pintura Completa
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Repintura total do veículo com preparação completa e acabamento premium.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Paintbrush className="h-5 w-5 mr-2 text-accent" />
                    Retoques e Reparos
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Correção pontual de arranhões, manchas e danos localizados na pintura.
                  </p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700">
                A IMOVA trabalha com oficinas especializadas que utilizam cabines de pintura modernas, 
                tintas de alta qualidade e processos de aplicação controlados, garantindo cores precisas, 
                acabamento perfeito e durabilidade superior para a pintura da sua frota.
              </p>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-primary">Serviços Oferecidos</h3>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Pintura total</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Pintura parcial</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Correção de riscos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Tratamento anticorrosão</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Polimento profissional</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Revestimento cerâmico</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Personalização visual</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-accent mr-2 flex-shrink-0" />
                    <span>Aplicação de adesivos</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 bg-primary/5 p-6 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold mb-4 text-primary">Por que escolher a IMOVA?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Palette className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Tecnologia avançada</span>
                      <p className="text-sm text-gray-600">Equipamentos modernos e tintas de alta performance</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Garantia de cor e acabamento</span>
                      <p className="text-sm text-gray-600">Sistema computadorizado de correspondência de cores</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Prazos otimizados</span>
                      <p className="text-sm text-gray-600">Processos eficientes para minimizar o tempo de inatividade</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Renove e proteja sua frota com pinturas de qualidade</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Mantenha seus veículos com aparência impecável e protegidos contra os efeitos do tempo.
              Conte com a IMOVA para serviços de pintura profissionais.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link to="/fleet-request">Solicitar Serviço de Pintura</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
