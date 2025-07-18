
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProfile } from '@/types/serviceRequest';
import { useAuth } from '@/contexts/AuthContext';
import { Plan } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { mapDataToModel, safeDataItem } from '@/utils/supabaseHelpers';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Key, User, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"client" | "provider">("client");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Remover o estado e o carregamento dinâmico dos planos
  // const [plans, setPlans] = useState<Plan[]>([]);
  // useEffect(() => { ... });
  // Substituir por opções fixas
  const planOptions = [
    { id: 'gratuito', name: 'Gratuito' },
    { id: 'premium', name: 'Premium' },
  ];
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { register } = useAuth();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    let errors: { [key: string]: string } = {};
    let isValid = true;

    if (!firstName.trim()) {
      errors.firstName = "Nome é obrigatório";
      isValid = false;
    }

    if (!lastName.trim()) {
      errors.lastName = "Sobrenome é obrigatório";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "E-mail é obrigatório";
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Formato de e-mail inválido";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Senha é obrigatória";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "A senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirmação de senha é obrigatória";
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem";
      isValid = false;
    }

    if (!selectedPlan) {
      errors.plan = "Selecione um plano";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form fields before submission
      if (!validateForm()) {
        toast.error("Por favor, corrija os erros no formulário");
        return;
      }

      setIsSubmitting(true);
      
      // Set timeout for 8 seconds
      const timeout = setTimeout(() => {
        setIsSubmitting(false);
        toast.error("Tempo excedido. Tente novamente.");
      }, 8000);
      setTimeoutId(timeout);

      // Prepare user data - maintain 'client' for backend but display as Frotista in UI
      // This mapping ensures compatibility with existing database code
      const userData: Partial<UserProfile> = {
        first_name: firstName,
        last_name: lastName,
        user_type: userType, // This is 'client' or 'provider'
      };

      // Debug log before API call
      console.log("Enviando cadastro:", { 
        email, 
        userType, // Will show 'client' or 'provider' in logs
        planId: selectedPlan,
        userData
      });

      // Submit registration
      await register(
        email, 
        password, 
        { 
          ...userData, 
          plan_id: selectedPlan || undefined 
        }
      );

      // Debug log after successful API call
      console.log("Cadastro bem-sucedido:", { 
        email, 
        userType, 
        planId: selectedPlan 
      });

      // Clear timeout on success
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setSuccessMessage("Cadastro realizado com sucesso! Redirecionando para o login...");
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1800);
      // Success - toast message displayed by register function
      // Form is cleared and user is redirected by the auth logic
    } catch (error: any) {
      // Clear timeout if there's an error
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }

      setIsSubmitting(false);
      
      console.error("Erro de cadastro:", error);
      
      // Handle specific error types
      if (error.message?.includes("already registered") || 
          error.message?.includes("already exists")) {
        setFormErrors({
          ...formErrors,
          email: "E-mail já utilizado, tente outro"
        });
        toast.error("E-mail já utilizado, tente outro");
        // Focus on email field
        document.getElementById("email")?.focus();
      } else if (error.message?.includes("constraint") || 
                error.message?.includes("violates") || 
                error.message?.includes("permission denied")) {
        toast.error("Erro interno, tente novamente mais tarde");
        console.error("Erro de constraint ou permissão:", error);
      } else {
        toast.error(error.message || "Erro ao cadastrar. Tente novamente.");
      }
    }
  };

  // Remover o estado e o carregamento dinâmico dos planos
  // const [plans, setPlans] = useState<Plan[]>([]);
  // useEffect(() => {
  //   const fetchPlans = async () => {
  //     const { data, error } = await supabase.from('plans').select('*');
  //     if (error) {
  //       console.error('Erro ao buscar planos:', error);
  //       return;
  //     }
      
  //     if (data) {
  //       // Convert to Plan[] with type safety
  //       const typedPlans = mapDataToModel(data, (item): Plan => {
  //         // Create a default plan in case of errors
  //         const defaultPlan: Plan = {
  //           id: "",
  //           name: "",
  //           price: 0
  //         };
          
  //         // Make sure the item is valid and not an error
  //         const safePlan = safeDataItem(item, defaultPlan);
          
  //         return {
  //           id: safePlan.id,
  //           name: safePlan.name,
  //           price: safePlan.price,
  //           description: safePlan.description || null,
  //           max_fleet: safePlan.max_fleet || null, 
  //           max_quotes: safePlan.max_quotes || null
  //         };
  //       });
        
  //       setPlans(typedPlans);
        
  //       // Preselect the free plan if available
  //       const freePlan = typedPlans.find(plan => 
  //         plan.name?.toLowerCase() === 'free' || plan.price === 0
  //       );
  //       if (freePlan) {
  //         setSelectedPlan(freePlan.id);
  //       } else if (typedPlans.length > 0) {
  //         setSelectedPlan(typedPlans[0].id);
  //       }
  //     }
  //   };
    
  //   fetchPlans();
  // }, []);
  
  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <>
      {successMessage && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center animate-pulse">
          {successMessage}
        </div>
      )}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Criar conta</h1>
        <p className="text-gray-600 mt-1">Preencha os dados abaixo para se cadastrar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="firstName">Nome</Label>
          <Input
            type="text"
            id="firstName"
            placeholder="Digite seu nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={cn("man-input", formErrors.firstName && "border-destructive")}
            required
            disabled={isSubmitting}
          />
          {formErrors.firstName && (
            <p className="text-sm text-destructive mt-1">{formErrors.firstName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input
            type="text"
            id="lastName"
            placeholder="Digite seu sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={cn("man-input", formErrors.lastName && "border-destructive")}
            required
            disabled={isSubmitting}
          />
          {formErrors.lastName && (
            <p className="text-sm text-destructive mt-1">{formErrors.lastName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn("man-input", formErrors.email && "border-destructive")}
            required
            disabled={isSubmitting}
          />
          {formErrors.email && (
            <p className="text-sm text-destructive mt-1">{formErrors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn("man-input", formErrors.password && "border-destructive")}
            required
            disabled={isSubmitting}
          />
          {formErrors.password && (
            <p className="text-sm text-destructive mt-1">{formErrors.password}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={cn("man-input", formErrors.confirmPassword && "border-destructive")}
            required
            disabled={isSubmitting}
          />
          {formErrors.confirmPassword && (
            <p className="text-sm text-destructive mt-1">{formErrors.confirmPassword}</p>
          )}
        </div>

        <div>
          <Label>Tipo de Usuário</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Button
              type="button"
              variant={userType === "client" ? "default" : "outline"}
              className={cn(
                "flex items-center justify-center gap-2 py-6",
                userType === "client" && "ring-2 ring-primary ring-opacity-50"
              )}
              onClick={() => setUserType("client")}
              disabled={isSubmitting}
            >
              <User className="h-5 w-5" />
              <span className="font-medium">Frotista</span>
            </Button>
            <Button
              type="button"
              variant={userType === "provider" ? "default" : "outline"}
              className={cn(
                "flex items-center justify-center gap-2 py-6",
                userType === "provider" && "ring-2 ring-primary ring-opacity-50"
              )}
              onClick={() => setUserType("provider")}
              disabled={isSubmitting}
            >
              <Briefcase className="h-5 w-5" />
              <span className="font-medium">Fornecedor</span>
            </Button>
          </div>
        </div>
        
        <div>
          <Label htmlFor="plan">Plano</Label>
          <select
            id="plan"
            name="plano"
            required
            className={cn("man-input w-full mt-2", formErrors.plan && "border-destructive")}
            value={selectedPlan || ''}
            onChange={e => setSelectedPlan(e.target.value)}
            disabled={isSubmitting}
          >
            <option value="">Selecione o plano</option>
            {planOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
          {formErrors.plan && (
            <p className="text-sm text-destructive mt-1">{formErrors.plan}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </>
  );
}
