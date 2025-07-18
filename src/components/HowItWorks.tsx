
import { Search, Calendar, CheckCircle, TruckIcon, FileText, CreditCard } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-12 w-12 text-white" />,
    title: "Busca de Serviços",
    description: "Empresas buscam prestadores de serviços disponíveis na cidade onde o veículo precisa de assistência."
  },
  {
    icon: <Calendar className="h-12 w-12 text-white" />,
    title: "Solicitação",
    description: "A plataforma dispara o chamado para todos os fornecedores da região selecionada."
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-white" />,
    title: "Aceitação",
    description: "O primeiro fornecedor que aceitar a solicitação fica responsável pelo atendimento."
  },
  {
    icon: <TruckIcon className="h-12 w-12 text-white" />,
    title: "Execução",
    description: "O serviço é executado com registro de fotos e dados, mantendo a qualidade e transparência."
  },
  {
    icon: <FileText className="h-12 w-12 text-white" />,
    title: "Relatório",
    description: "Um relatório técnico completo é gerado com descrições, fotos e garantias."
  },
  {
    icon: <CreditCard className="h-12 w-12 text-white" />,
    title: "Pagamento",
    description: "Após aprovação do cliente, o pagamento é realizado via Pix ao fornecedor."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="man-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-man-blue mb-4">Como Funciona</h2>
          <p className="text-man-gray max-w-2xl mx-auto text-lg">
            Nossa plataforma simplifica o processo de solicitação e prestação de serviços automobilísticos,
            garantindo eficiência e transparência em todas as etapas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-man-blue flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-man-orange text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-man-blue text-center">{step.title}</h3>
              <p className="text-man-gray text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
