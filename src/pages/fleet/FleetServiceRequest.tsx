
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Car, MapPin, Clock, User, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const requestSchema = z.object({
  licensePlate: z.string().min(7, {
    message: "A placa deve ter no mínimo 7 caracteres",
  }).max(8),
  problem: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres",
  }),
  location: z.string().min(5, {
    message: "Informe um endereço válido",
  }),
  preferredTime: z.string().min(1, {
    message: "Selecione um horário preferencial",
  }),
  driverName: z.string().min(3, {
    message: "Informe o nome do condutor",
  }),
  driverPhone: z.string().min(10, {
    message: "Informe um telefone válido",
  }),
});

type ServiceRequestValues = z.infer<typeof requestSchema>;

// Novo hook customizado para criar chamado
function useCreateServiceRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ServiceRequestValues) => {
      // Mapear campos do formulário para o schema do banco
      const payload = {
        plate: data.licensePlate,
        description: data.problem,
        location: data.location,
        preferred_time: data.preferredTime,
        driver_name: data.driverName,
        driver_phone: data.driverPhone,
        status: 'pending',
        is_deleted: false,
        created_at: new Date().toISOString(),
        // Adicionar outros campos obrigatórios conforme schema real
      };
      const { error } = await supabase
        .from('service_requests')
        .insert([payload]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fleet-services'] });
    },
  });
}

export function FleetServiceRequest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const createServiceRequest = useCreateServiceRequest();
  
  const form = useForm<ServiceRequestValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      licensePlate: "",
      problem: "",
      location: "",
      preferredTime: "",
      driverName: "",
      driverPhone: "",
    },
  });

  function maskLicensePlate(value: string) {
    // Format license plate: ABC-1234 or ABC1D23
    value = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    
    if (value.length <= 3) {
      return value;
    } else if (value.length <= 7) {
      // Traditional format: ABC-1234
      return `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      // Mercosul format: ABC1D23
      return value.slice(0, 7);
    }
  }

  function maskPhone(value: string) {
    value = value.replace(/\D/g, "");
    
    if (value.length <= 2) {
      return `(${value}`;
    } else if (value.length <= 6) {
      return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 10) {
      return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else {
      return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }
  }

  function onSubmit(data: ServiceRequestValues) {
    setIsSubmitting(true);
    createServiceRequest.mutate(data, {
      onSuccess: () => {
        setIsSubmitting(false);
        toast({
          title: "Solicitação enviada",
          description: `Solicitação para o veículo ${data.licensePlate} registrada com sucesso.`,
        });
        navigate("/fleet-services");
      },
      onError: (error: any) => {
        setIsSubmitting(false);
        toast({
          title: "Erro ao registrar solicitação",
          description: error.message || "Tente novamente.",
          variant: "destructive"
        });
      }
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Solicitar Serviço</h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para registrar uma nova solicitação de serviço.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="licensePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Placa do Veículo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Car className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="ABC-1234" 
                            className="pl-9"
                            {...field}
                            onChange={(e) => {
                              const formatted = maskLicensePlate(e.target.value);
                              e.target.value = formatted;
                              field.onChange(formatted);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário Preferencial</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="pl-9">
                              <SelectValue placeholder="Selecione um horário" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Manhã (8h - 12h)</SelectItem>
                              <SelectItem value="afternoon">Tarde (13h - 17h)</SelectItem>
                              <SelectItem value="evening">Noite (18h - 21h)</SelectItem>
                              <SelectItem value="urgent">Urgente (Próximas 2h)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição do Problema</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o problema ou serviço necessário..." 
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Endereço completo" 
                          className="pl-9"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="driverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Condutor</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Nome completo" 
                            className="pl-9"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="driverPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone do Condutor</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="(00) 00000-0000" 
                          {...field}
                          onChange={(e) => {
                            const formatted = maskPhone(e.target.value);
                            e.target.value = formatted;
                            field.onChange(formatted);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto gap-2"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Example Request */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-4">Exemplo de Solicitação</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Placa do Veículo</p>
                <p className="text-muted-foreground">ABC-1234</p>
              </div>
              <div>
                <p className="text-sm font-medium">Horário Preferencial</p>
                <p className="text-muted-foreground">Tarde (13h - 17h)</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Descrição do Problema</p>
              <p className="text-muted-foreground">Veículo com problema no sistema de freios. Pedal está ficando "mole" e o carro demora para parar completamente. Também está fazendo um ruído ao frear.</p>
            </div>
            <div>
              <p className="text-sm font-medium">Localização</p>
              <p className="text-muted-foreground">Av. Paulista, 1000, São Paulo, SP</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Nome do Condutor</p>
                <p className="text-muted-foreground">João Silva</p>
              </div>
              <div>
                <p className="text-sm font-medium">Telefone do Condutor</p>
                <p className="text-muted-foreground">(11) 98765-4321</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
