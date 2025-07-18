
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, FileCheck, UserCheck, Scale, AlertCircle, CheckCircle } from "lucide-react";

const Compliance = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="man-container">
            <div className="flex items-center mb-6">
              <Shield className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">Compliance e Governança</h1>
            </div>
            <p className="text-xl max-w-3xl">
              Compromisso com a integridade, transparência e conformidade legal em todas as nossas operações,
              garantindo um ambiente seguro e confiável para nossos parceiros e clientes.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="man-container py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Nossa Abordagem de Compliance</h2>
              <p className="text-lg text-gray-700">
                Na IMOVA, acreditamos que a integridade está no centro de tudo o que fazemos. 
                Nosso programa de compliance não é apenas um conjunto de regras, mas uma cultura 
                que permeia toda a organização e orienta nossas decisões diárias.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <FileCheck className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Transparência</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Comunicação clara e aberta em todas as transações e relacionamentos comerciais.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                      <Scale className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Ética</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Compromisso com os mais altos padrões éticos em todas as operações e decisões.
                  </p>
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                  Pilares do Nosso Programa
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                    <div>
                      <span className="font-medium">Prevenção</span>
                      <p className="text-sm text-gray-600">Treinamentos periódicos, políticas claras e comunicação efetiva</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                    <div>
                      <span className="font-medium">Detecção</span>
                      <p className="text-sm text-gray-600">Monitoramento contínuo, auditoria e canais de denúncia</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                    <div>
                      <span className="font-medium">Resposta</span>
                      <p className="text-sm text-gray-600">Investigação rápida e efetiva, medidas corretivas e melhoria contínua</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">Políticas e Procedimentos</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Código de Conduta</span>
                      <p className="text-sm text-gray-600">Diretrizes éticas aplicáveis a todos os colaboradores e parceiros</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Política Anticorrupção</span>
                      <p className="text-sm text-gray-600">Tolerância zero para qualquer forma de corrupção ou suborno</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Proteção de Dados</span>
                      <p className="text-sm text-gray-600">Conformidade com a LGPD e melhores práticas de segurança da informação</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Conflito de Interesses</span>
                      <p className="text-sm text-gray-600">Diretrizes para identificação e gestão de potenciais conflitos</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
                <div className="flex items-center mb-4">
                  <UserCheck className="h-8 w-8 text-accent mr-3" />
                  <h3 className="text-xl font-bold">Canal de Denúncias</h3>
                </div>
                <p className="mb-4">
                  Disponibilizamos um canal seguro e confidencial para reportar quaisquer 
                  suspeitas de violações às nossas políticas ou à legislação vigente.
                </p>
                <div className="bg-white p-4 rounded-md border border-accent/20">
                  <p className="text-center font-medium mb-1">Contato do Canal de Ética</p>
                  <p className="text-center text-sm text-gray-600">etica@imova.com.br</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-primary mb-6 text-center">Certificações e Conformidade</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-center mb-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-center">ISO 27001</h3>
                <p className="text-gray-600 text-center">
                  Certificação em Segurança da Informação, garantindo a proteção dos dados de nossos parceiros e clientes.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-center mb-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-center">LGPD</h3>
                <p className="text-gray-600 text-center">
                  Total conformidade com a Lei Geral de Proteção de Dados, respeitando a privacidade e os direitos dos titulares.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-center mb-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-center">ESG</h3>
                <p className="text-gray-600 text-center">
                  Compromisso com práticas ambientais, sociais e de governança, visando um negócio sustentável e responsável.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Compliance;
