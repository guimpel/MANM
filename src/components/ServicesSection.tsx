
import { Car, Settings, Battery, Wrench, Truck, ReceiptText } from "lucide-react";

const services = [
  {
    icon: <Car className="h-10 w-10 text-man-blue" />,
    title: "Mecânica Geral",
    description: "Manutenção preventiva e corretiva para todo tipo de veículo da sua frota."
  },
  {
    icon: <Battery className="h-10 w-10 text-man-blue" />,
    title: "Auto Elétrica",
    description: "Reparos e diagnósticos elétricos especializados para sistemas automotivos."
  },
  {
    icon: <Wrench className="h-10 w-10 text-man-blue" />,
    title: "Troca de Peças",
    description: "Substituição de componentes com peças originais e homologadas."
  },
  {
    icon: <Truck className="h-10 w-10 text-man-blue" />,
    title: "Guincho",
    description: "Serviço de reboque 24 horas em todo território nacional."
  },
  {
    icon: <Settings className="h-10 w-10 text-man-blue" />,
    title: "Revisão",
    description: "Revisões programadas para manter sua frota sempre em dia."
  },
  {
    icon: <ReceiptText className="h-10 w-10 text-man-blue" />,
    title: "Relatórios",
    description: "Documentação completa e detalhada de todos os serviços realizados."
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="man-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-man-blue mb-4">Nossos Serviços</h2>
          <p className="text-man-gray max-w-2xl mx-auto text-lg">
            Conectamos empresas com fornecedores qualificados de serviços automobilísticos 
            em todo o Brasil, funcionando como uma plataforma integrada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="man-card hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center p-6"
            >
              <div className="p-3 bg-gray-100 rounded-full mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-man-blue">{service.title}</h3>
              <p className="text-man-gray">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
