
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Briefcase, Heart, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HR = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="man-container">
            <div className="flex items-center mb-6">
              <Users className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">Trabalhe Conosco</h1>
            </div>
            <p className="text-xl max-w-3xl">
              Junte-se ao time que está revolucionando a gestão de frotas e 
              serviços automotivos no Brasil através de tecnologia e inovação.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="man-container py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Nossa Cultura</h2>
              <p className="text-lg text-gray-700">
                Na IMOVA, acreditamos que o sucesso começa com nosso time. 
                Buscamos profissionais apaixonados, que compartilhem nossos valores 
                e queiram fazer parte de uma jornada transformadora no setor automotivo.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Inovação</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Encorajamos novas ideias e formas diferentes de pensar e resolver problemas.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Colaboração</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Trabalhamos juntos, valorizando a diversidade e contribuições de cada um.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Aprendizado</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Compromisso com o desenvolvimento contínuo e crescimento pessoal.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Impacto</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Foco em gerar resultados reais e positivos para nossos clientes e a sociedade.
                  </p>
                </div>
              </div>
              
              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl font-semibold mb-4">O que valorizamos</h3>
                <p className="text-gray-700">
                  Buscamos profissionais que demonstrem proatividade, pensamento 
                  analítico, adaptabilidade e excelente comunicação. Valorizamos 
                  talentos diversos, acreditando que diferentes perspectivas nos 
                  tornam mais fortes e inovadores como empresa.
                </p>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-2xl font-bold mb-6 text-primary">Benefícios</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-accent/20 mr-3 mt-1">
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <span className="font-medium">Plano de saúde e odontológico</span>
                      <p className="text-sm text-gray-600">Cobertura completa para você e seus dependentes</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-accent/20 mr-3 mt-1">
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <span className="font-medium">Formato de trabalho flexível</span>
                      <p className="text-sm text-gray-600">Modelos híbridos ou remotos dependendo da função</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-accent/20 mr-3 mt-1">
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <span className="font-medium">Programa de participação nos resultados</span>
                      <p className="text-sm text-gray-600">Compartilhe o sucesso que ajuda a construir</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-accent/20 mr-3 mt-1">
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <span className="font-medium">Vale-refeição e alimentação</span>
                      <p className="text-sm text-gray-600">Valores competitivos para seu bem-estar</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-accent/20 mr-3 mt-1">
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <span className="font-medium">Incentivo educacional</span>
                      <p className="text-sm text-gray-600">Subsídios para cursos e certificações relevantes</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="p-1 rounded-full bg-accent/20 mr-3 mt-1">
                      <ArrowRight className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <span className="font-medium">Gympass e bem-estar</span>
                      <p className="text-sm text-gray-600">Acesso a academias e programas de saúde</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Oportunidades Abertas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4">Tecnologia</span>
                <h3 className="text-xl font-bold mb-2">Desenvolvedor Full Stack</h3>
                <p className="text-gray-600 mb-4">
                  Desenvolvimento e manutenção de funcionalidades na plataforma, 
                  usando tecnologias como React, Node.js e AWS.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="#">Ver Detalhes</Link>
                </Button>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-4">Comercial</span>
                <h3 className="text-xl font-bold mb-2">Executivo de Contas</h3>
                <p className="text-gray-600 mb-4">
                  Prospecção e atendimento a clientes corporativos, 
                  apresentação da plataforma e negociação de contratos.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="#">Ver Detalhes</Link>
                </Button>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mb-4">Marketing</span>
                <h3 className="text-xl font-bold mb-2">Especialista em Marketing Digital</h3>
                <p className="text-gray-600 mb-4">
                  Planejamento e execução de estratégias de marketing digital, 
                  gestão de mídias sociais e análise de performance.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="#">Ver Detalhes</Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90">Ver Todas as Vagas</Button>
            </div>
          </div>
          
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Não encontrou a vaga ideal?</h2>
              <p className="text-gray-700">
                Estamos sempre à procura de talentos excepcionais. Envie seu currículo 
                e conte-nos como você pode contribuir para o nosso time.
              </p>
            </div>
            <div className="flex justify-center">
              <Button className="bg-primary hover:bg-primary/90">Enviar Currículo</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HR;
