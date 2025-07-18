
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, ArrowRight, Award, Target } from "lucide-react";

const History = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary text-white py-16">
          <div className="man-container">
            <h1 className="text-4xl font-bold mb-4">Nossa História</h1>
            <p className="text-xl max-w-3xl">
              Conheça a trajetória da IMOVA, desde sua fundação até se tornar 
              referência em soluções para gestão de frotas e manutenção veicular.
            </p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="man-container py-12">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-primary mb-6">Uma Jornada de Inovação</h2>
                <p className="text-gray-700 mb-6">
                  A IMOVA nasceu da identificação de uma necessidade crítica no mercado: 
                  conectar de forma eficiente frotistas e prestadores de serviços automotivos em todo o Brasil.
                </p>
                <p className="text-gray-700 mb-6">
                  Nossa trajetória é marcada pelo compromisso com a excelência, 
                  inovação tecnológica e o desenvolvimento de soluções que 
                  realmente transformam a gestão de frotas veiculares.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <h3 className="font-semibold flex items-center">
                    <Target className="h-5 w-5 mr-2 text-primary" />
                    Missão desde o início
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    "Transformar o mercado de manutenção de frotas, 
                    criando um ecossistema que beneficie tanto frotistas quanto fornecedores, 
                    através de tecnologia e processos inovadores."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-12">
              <div className="relative border-l-2 border-primary/20 pl-6 pb-8">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span className="text-primary font-semibold">2018</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Fundação e Concepção</h3>
                  <p className="text-gray-700">
                    A IMOVA foi fundada por um grupo de empreendedores com experiência 
                    nas áreas de tecnologia e gestão de frotas. A ideia inicial surgiu 
                    após identificarem os gargalos e dificuldades enfrentados pelas empresas 
                    de logística e transporte na manutenção e gestão de suas frotas.
                  </p>
                </div>
              </div>
              
              <div className="relative border-l-2 border-primary/20 pl-6 pb-8">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span className="text-primary font-semibold">2019</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Desenvolvimento da Plataforma</h3>
                  <p className="text-gray-700">
                    Após intensas pesquisas de mercado e análise de necessidades, 
                    iniciamos o desenvolvimento da primeira versão da plataforma IMOVA. 
                    Nesta fase, estabelecemos as principais funcionalidades e o modelo 
                    de negócio que seriam a base do ecossistema.
                  </p>
                </div>
              </div>
              
              <div className="relative border-l-2 border-primary/20 pl-6 pb-8">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span className="text-primary font-semibold">2020</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Lançamento Oficial</h3>
                  <p className="text-gray-700">
                    Mesmo enfrentando os desafios da pandemia global, a IMOVA 
                    lançou oficialmente sua plataforma, conectando inicialmente 
                    200 fornecedores com 50 empresas frotistas nas principais 
                    capitais do Brasil. Os resultados iniciais superaram as expectativas.
                  </p>
                </div>
              </div>
              
              <div className="relative border-l-2 border-primary/20 pl-6 pb-8">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span className="text-primary font-semibold">2021-2022</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Expansão e Crescimento</h3>
                  <p className="text-gray-700">
                    Neste período, expandimos nossa presença para todas as regiões do Brasil, 
                    multiplicamos nossa base de usuários e implementamos melhorias 
                    significativas na plataforma. Recebemos nosso primeiro aporte de 
                    investimento que acelerou o crescimento e desenvolvimento tecnológico.
                  </p>
                </div>
              </div>
              
              <div className="relative border-l-2 border-primary/20 pl-6">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">5</span>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span className="text-primary font-semibold">2023-Hoje</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Consolidação e Inovação Contínua</h3>
                  <p className="text-gray-700 mb-4">
                    Nos últimos anos, consolidamos nossa posição como líderes no setor, 
                    expandimos nossa oferta de serviços e continuamos a inovar com 
                    a introdução de tecnologias avançadas como IA para previsão 
                    de manutenção e análise preditiva para gestão de frotas.
                  </p>
                  <div className="flex items-center bg-accent/10 p-3 rounded-lg">
                    <Award className="h-5 w-5 text-accent mr-2" />
                    <p className="text-sm font-medium">
                      Reconhecida como uma das startups mais promissoras do setor automotivo em 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">O Futuro da IMOVA</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Continuamos comprometidos com nossa missão de transformar a gestão de frotas 
              e o ecossistema de manutenção veicular no Brasil, com planos ambiciosos 
              de expansão internacional e inovações tecnológicas que redefinirão o setor.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
