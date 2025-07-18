
import { Landmark } from "lucide-react";

const PartnerLogos = () => {
  return (
    <section className="py-12 bg-white">
      <div className="man-container">
        <div className="text-center mb-8">
          <p className="text-man-gray font-medium">Confiado por empresas de todo o Brasil</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-400">
              <Landmark className="h-6 w-6" />
              <span className="font-semibold text-lg">Empresa {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
