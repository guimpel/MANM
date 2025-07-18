
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "Diretor de Operações, Locadora RL",
    image: "/placeholder.svg",
    content: "A plataforma transformou completamente a maneira como gerenciamos nossa frota. Com mais de 200 veículos, a agilidade no atendimento e a transparência nos serviços prestados são essenciais para nosso negócio.",
    stars: 5
  },
  {
    name: "Ana Souza",
    role: "Gestora de Frotas, Transportes Express",
    image: "/placeholder.svg",
    content: "Conseguimos reduzir o tempo de veículos parados em mais de 70% após começarmos a utilizar o MotorAssist. A rede de fornecedores é extensa e a qualidade do serviço é excelente.",
    stars: 5
  },
  {
    name: "Roberto Ferreira",
    role: "Proprietário, Oficina Mecânica Ferreira",
    image: "/placeholder.svg",
    content: "Como fornecedor, a plataforma nos permitiu expandir nossa base de clientes e aumentar o faturamento. A interface é intuitiva e o processo de pagamento é rápido e seguro.",
    stars: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-man-blue-light to-man-blue text-white">
      <div className="man-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-200">
            Empresas e fornecedores em todo o Brasil confiam no Motor Assist Network para
            suas necessidades de serviços automobilísticos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
              <p className="italic mb-4">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 overflow-hidden mr-3">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-300">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
