
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Check, Plus, Trash2, Wrench } from "lucide-react";
import { toast } from "sonner";

interface ServiceAreaSelectionProps {
  onSubmit: () => void;
}

// Mock list of common services for auto shops
const commonAutoServices = [
  { id: 1, name: "Troca de óleo" },
  { id: 2, name: "Troca de filtro de óleo" },
  { id: 3, name: "Troca de filtro de ar" },
  { id: 4, name: "Troca de filtro de combustível" },
  { id: 5, name: "Alinhamento" },
  { id: 6, name: "Balanceamento" },
  { id: 7, name: "Revisão de freios" },
  { id: 8, name: "Troca de pastilhas de freio" },
  { id: 9, name: "Revisão elétrica" },
  { id: 10, name: "Diagnóstico eletrônico" },
  { id: 11, name: "Troca de bateria" },
  { id: 12, name: "Revisão de suspensão" },
  { id: 13, name: "Troca de amortecedores" },
  { id: 14, name: "Revisão do sistema de refrigeração" },
  { id: 15, name: "Troca de correia dentada" },
];

const ServiceAreaSelection = ({ onSubmit }: ServiceAreaSelectionProps) => {
  const [businessArea, setBusinessArea] = useState("");
  const [customService, setCustomService] = useState("");
  const [selectedServices, setSelectedServices] = useState<Array<{ id: number, name: string }>>(commonAutoServices);
  const [showServiceList, setShowServiceList] = useState(false);
  
  const handleBusinessAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBusinessArea(value);
    
    // If user types "oficina", show the common services
    if (value.toLowerCase().includes("oficina")) {
      setShowServiceList(true);
    }
  };
  
  const handleToggleService = (service: { id: number, name: string }) => {
    if (selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };
  
  const handleAddCustomService = () => {
    if (!customService.trim()) return;
    
    const newService = {
      id: Date.now(),
      name: customService.trim()
    };
    
    setSelectedServices([...selectedServices, newService]);
    setCustomService("");
    toast.success("Serviço adicionado com sucesso!");
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessArea) {
      toast.error("Por favor, informe sua área de atuação.");
      return;
    }
    
    if (selectedServices.length === 0) {
      toast.error("Por favor, selecione pelo menos um serviço.");
      return;
    }
    
    // Would send this data to the server in a real app
    console.log({
      businessArea,
      services: selectedServices
    });
    
    onSubmit();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="business-area">Área de Atuação</Label>
        <div className="flex">
          <Input
            id="business-area"
            placeholder="Ex: Oficina Mecânica, Auto Elétrica..."
            value={businessArea}
            onChange={handleBusinessAreaChange}
            required
          />
          <div className="ml-2 flex items-center text-gray-500">
            <Wrench className="h-5 w-5" />
          </div>
        </div>
        <p className="text-sm text-gray-500">
          Descreva sua área principal de atuação
        </p>
      </div>
      
      {showServiceList && (
        <div className="space-y-4">
          <div>
            <Label>Serviços Oferecidos</Label>
            <p className="text-sm text-gray-500 mb-2">
              Selecione os serviços que sua empresa oferece:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {commonAutoServices.map((service) => (
              <div
                key={service.id}
                className={`flex items-center justify-between p-2 border rounded-md cursor-pointer transition-colors ${
                  selectedServices.some(s => s.id === service.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => handleToggleService(service)}
              >
                <span>{service.name}</span>
                {selectedServices.some(s => s.id === service.id) && (
                  <Check className="h-4 w-4 text-blue-500" />
                )}
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <Label>Adicionar Serviço Personalizado</Label>
            <div className="flex mt-2">
              <Input
                placeholder="Nome do serviço"
                value={customService}
                onChange={(e) => setCustomService(e.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                className="ml-2"
                onClick={handleAddCustomService}
                disabled={!customService.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {selectedServices.length > commonAutoServices.length && (
            <div className="space-y-2">
              <Label>Serviços Personalizados</Label>
              <div className="space-y-2">
                {selectedServices
                  .filter(s => !commonAutoServices.some(cs => cs.id === s.id))
                  .map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-2 border border-blue-500 bg-blue-50 rounded-md"
                    >
                      <span>{service.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleService(service)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      <Button type="submit" className="w-full">
        Continuar
      </Button>
    </form>
  );
};

export default ServiceAreaSelection;
