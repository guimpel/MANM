
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Users, BookOpen, Shield, Award } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="man-container">
            <h1 className="text-4xl font-bold mb-4">Quem Somos</h1>
            <p className="text-xl max-w-3xl">
              A IMOVA é uma plataforma de tecnologia que conecta frotistas e fornecedores 
              de serviços automotivos em todo o Brasil, trazendo eficiência e segurança 
              para o setor de gestão de frotas.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="man-container py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Nossa Missão</h2>
              <p className="text-lg text-gray-700">
                Transformar a gestão de frotas através de tecnologia e conexões estratégicas, 
                proporcionando às empresas acesso fácil a serviços de qualidade em qualquer lugar do Brasil, 
                enquanto oferecemos aos fornecedores novas oportunidades de crescimento.
              </p>
              
              <h2 className="text-3xl font-bold text-primary mt-8">Nossos Valores</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Excelência</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Buscamos constantemente a máxima qualidade em tudo o que fazemos.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Confiança</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Construímos relações sólidas baseadas em transparência e integridade.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Colaboração</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Acreditamos no poder das parcerias para crescimento mútuo.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Inovação</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Buscamos constantemente novas soluções para desafios do setor.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-primary">Conheça Mais</h3>
                
                <Link to="/quem-somos/historia" className="block p-4 mb-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">Nossa História</h4>
                      <p className="text-sm text-gray-600">Como surgimos e nossa trajetória até aqui</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-accent" />
                  </div>
                </Link>
                
                <Link to="/quem-somos/compliance" className="block p-4 mb-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">Compliance</h4>
                      <p className="text-sm text-gray-600">Nossos princípios e políticas de conformidade</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-accent" />
                  </div>
                </Link>
                
                <Link to="/quem-somos/rh" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">Trabalhe Conosco</h4>
                      <p className="text-sm text-gray-600">Oportunidades e cultura da empresa</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-accent" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <blockquote className="text-center">
              <p className="text-xl font-medium text-gray-700 max-w-3xl mx-auto">
                "Nossa visão é transformar completamente a forma como empresas gerenciam 
                seus ativos veiculares, criando um ecossistema que beneficia tanto 
                frotistas quanto fornecedores de serviços."
              </p>
              <footer className="mt-4">
                <p className="text-accent font-semibold">CEO, IMOVA</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
