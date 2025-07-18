
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Check, 
  CreditCard, 
  FileText, 
  MapPin, 
  Box, 
  MessageSquare, 
  Mail, 
  Lock, 
  Banknote,
  AlertCircle
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProgressSteps } from "@/components/ProgressSteps";
import { InfoAlert } from "@/components/InfoAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Schema de validação
const providerFormSchema = z.object({
  cnpj: z.string().min(18, "CNPJ inválido"),
  companyName: z.string().min(3, "Nome da empresa é obrigatório"),
  address: z.string().min(5, "Endereço completo é obrigatório"),
  stateRegistration: z.string().min(3, "Inscrição estadual é obrigatória"),
  responsibleName: z.string().min(3, "Nome do responsável é obrigatório"),
  whatsapp: z.string().min(14, "WhatsApp inválido"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  confirmPassword: z.string().min(8, "A confirmação de senha é obrigatória"),
  bankAccount: z.string().min(3, "Informação bancária é obrigatória"),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos de uso"
  }),
  selectedPlan: z.string().min(1, "Selecione um plano")
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"]
});

type ProviderFormValues = z.infer<typeof providerFormSchema>;

const fetchCompanyData = async (cnpj: string) => {
  // Simulação de uma chamada de API para a Receita Federal
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (cnpj.replace(/\D/g, '').length === 14) {
    return {
      razao_social: "Auto Peças e Serviços Nacional LTDA",
      endereco: "Av. Brasil, 1500, Centro, São Paulo - SP, 01000-000",
      inscricao_estadual: "123.456.789.000"
    };
  }
  throw new Error("CNPJ inválido ou não encontrado");
};

const steps = [
  {
    id: 1,
    title: "Cadastro",
    description: "Dados da empresa"
  },
  {
    id: 2,
    title: "Pagamento",
    description: "Efetue o pagamento"
  },
  {
    id: 3,
    title: "Documentação",
    description: "Complete seu perfil"
  }
];

const plans = [
  {
    id: "basic",
    name: "Básico",
    price: "R$ 100,00/mês",
    commission: "5% sobre faturamento",
    features: [
      "Acesso ao sistema de chamados",
      "Limite de 50 atendimentos mensais",
      "Suporte por e-mail"
    ]
  },
  {
    id: "standard",
    name: "Padrão",
    price: "R$ 200,00/mês",
    commission: "4% sobre faturamento",
    features: [
      "Acesso ao sistema de chamados",
      "Limite de 150 atendimentos mensais",
      "Suporte prioritário",
      "Destaque nas buscas"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 350,00/mês",
    commission: "3% sobre faturamento",
    features: [
      "Acesso ao sistema de chamados",
      "Atendimentos ilimitados",
      "Suporte prioritário 24/7",
      "Destaque nas buscas",
      "Relatórios avançados",
      "API de integração"
    ]
  }
];

const ProviderRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cnpjLookupSuccess, setCnpjLookupSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const form = useForm<ProviderFormValues>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      cnpj: "",
      companyName: "",
      address: "",
      stateRegistration: "",
      responsibleName: "",
      whatsapp: "",
      email: "",
      password: "",
      confirmPassword: "",
      bankAccount: "",
      acceptTerms: false,
      selectedPlan: ""
    }
  });

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return `(${numbers}`;
    }
    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleCNPJChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    form.setValue("cnpj", formatted.slice(0, 18));
    
    // Busca dados na Receita Federal quando CNPJ completo
    if (formatted.length === 18) {
      setIsLoading(true);
      try {
        const data = await fetchCompanyData(formatted);
        form.setValue("companyName", data.razao_social);
        form.setValue("address", data.endereco);
        form.setValue("stateRegistration", data.inscricao_estadual);
        toast.success("Dados da empresa encontrados com sucesso!");
        setCnpjLookupSuccess(true);
      } catch (error) {
        toast.error("Erro ao buscar dados do CNPJ. Verifique se o número está correto.");
        form.setError("cnpj", { message: "CNPJ não encontrado" });
        setCnpjLookupSuccess(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    form.setValue("whatsapp", formatted.slice(0, 16));
  };

  const onSubmit = (data: ProviderFormValues) => {
    setIsLoading(true);
    
    // Simulação de envio do formulário
    setTimeout(() => {
      console.log("Dados do formulário:", data);
      toast.success("Cadastro realizado com sucesso! Redirecionando para o pagamento...");
      
      // Simulação de redirecionamento para pagamento
      setTimeout(() => {
        setIsLoading(false);
        navigate("/provider/profile-completion");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-man-blue mb-2">Cadastro de Oficinas e Fornecedores</h1>
              <p className="text-man-gray">Junte-se à maior rede de serviços automotivos do Brasil</p>
            </div>
            
            <div className="mb-10">
              <ProgressSteps steps={steps} currentStep={1} />
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <InfoAlert type="info" title="Importante" className="mb-6">
                Preencha todos os dados corretamente para agilizar seu cadastro. 
                O CNPJ será validado automaticamente na base da Receita Federal.
              </InfoAlert>
              
              {cnpjLookupSuccess === false && (
                <InfoAlert type="warning" title="CNPJ não encontrado" className="mb-6">
                  Verifique se o número do CNPJ está correto ou entre em contato com nosso suporte.
                </InfoAlert>
              )}
              
              {cnpjLookupSuccess === true && (
                <InfoAlert type="success" title="CNPJ validado com sucesso" className="mb-6">
                  Seus dados foram preenchidos automaticamente. Verifique se estão corretos.
                </InfoAlert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-man-blue mb-4 flex items-center">
                      <FileText className="mr-2 h-5 w-5" />
                      Informações da Empresa
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cnpj"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                CNPJ
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="00.000.000/0000-00"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleCNPJChange(e);
                                }}
                                disabled={isLoading}
                                maxLength={18}
                                className="man-input"
                              />
                            </FormControl>
                            <FormDescription>
                              Digite o CNPJ para buscar os dados na Receita Federal
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Empresa (Razão Social)</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                readOnly 
                                placeholder="Preenchimento automático" 
                                className="bg-gray-50 man-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              Endereço Completo
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              readOnly 
                              placeholder="Preenchimento automático" 
                              className="bg-gray-50 man-input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="stateRegistration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Inscrição Estadual</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="000.000.000.000" 
                                className="man-input" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="responsibleName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do Responsável</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="Nome completo" 
                                className="man-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-4">
                    <h2 className="text-xl font-semibold text-man-blue mb-4 flex items-center">
                      <Lock className="mr-2 h-5 w-5" />
                      Dados de Acesso
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                WhatsApp
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="(00) 00000-0000"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleWhatsAppChange(e);
                                }}
                                maxLength={16}
                                className="man-input"
                              />
                            </FormControl>
                            <FormDescription>
                              Será usado para autenticação 2FA
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                E-mail
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                placeholder="empresa@exemplo.com" 
                                className="man-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Senha
                              </div>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="password" 
                                placeholder="Mínimo de 8 caracteres" 
                                className="man-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirme a Senha</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                type="password" 
                                placeholder="Digite a senha novamente" 
                                className="man-input"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="bankAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <div className="flex items-center gap-2">
                              <Banknote className="h-4 w-4" />
                              Conta Bancária para Recebimentos
                            </div>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Banco, Agência e Conta" 
                              className="man-input"
                            />
                          </FormControl>
                          <FormDescription>
                            Informe os dados bancários para receber pagamentos
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 space-y-4">
                    <h2 className="text-xl font-semibold text-man-blue mb-4 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Escolha seu Plano
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {plans.map((plan) => (
                        <FormField
                          key={plan.id}
                          control={form.control}
                          name="selectedPlan"
                          render={({ field }) => (
                            <FormItem className="space-y-0">
                              <FormControl>
                                <label
                                  className={cn(
                                    "flex flex-col rounded-md border-2 p-4 cursor-pointer transition-all",
                                    field.value === plan.id
                                      ? "border-man-orange bg-orange-50"
                                      : "border-gray-200 hover:border-gray-300"
                                  )}
                                >
                                  <input
                                    type="radio"
                                    className="sr-only"
                                    value={plan.id}
                                    checked={field.value === plan.id}
                                    onChange={() => field.onChange(plan.id)}
                                  />
                                  
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <p className="font-semibold text-man-blue">{plan.name}</p>
                                      <p className="text-lg font-bold text-man-black">{plan.price}</p>
                                      <p className="text-sm text-man-gray">{plan.commission}</p>
                                    </div>
                                    {field.value === plan.id && (
                                      <div className="bg-man-orange rounded-full p-1">
                                        <Check className="h-4 w-4 text-white" />
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="border-t border-gray-200 mt-2 pt-2">
                                    <ul className="space-y-1">
                                      {plan.features.map((feature, idx) => (
                                        <li key={idx} className="text-sm flex items-start">
                                          <Check className="h-4 w-4 text-man-orange mr-2 flex-shrink-0 mt-0.5" />
                                          <span>{feature}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </label>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    {form.formState.errors.selectedPlan && (
                      <p className="text-destructive text-sm">
                        {form.formState.errors.selectedPlan.message}
                      </p>
                    )}
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-2 space-y-0 pt-4 border-t border-gray-200">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm cursor-pointer">
                            Concordo com os <a href="#" className="text-man-blue underline">Termos de Uso</a> e <a href="#" className="text-man-blue underline">Política de Privacidade</a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-man-orange hover:bg-man-orange-light text-lg py-6" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>Processando...</>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Avançar para Pagamento
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProviderRegistration;
