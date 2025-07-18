
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { safeDataItem } from "@/utils/supabaseHelpers";

interface IntegratorUser {
  id: string;
  cpf: string;
  password: string;
  active: boolean;
  name: string;
  email: string;
  role: string;
}

export function IntegratorLoginForm() {
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({ cpf: false, password: false });
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const checkExistingSession = async () => {
      const integratorUser = localStorage.getItem("integratorUser");
      if (integratorUser) {
        try {
          const userData = JSON.parse(integratorUser) as IntegratorUser;
          // Verify that the stored user data is still valid
          const { data, error } = await supabase
            .from('integrator_users')
            .select('*')
            .eq('id', userData.id as any)
            .eq('active', true as any) // Use .eq() for boolean values
            .single();
            
          if (data && !error) {
            // User session is still valid
            navigate("/integrator/dashboard");
          } else {
            // User session is invalid, clear it
            localStorage.removeItem("integratorUser");
          }
        } catch (error) {
          console.error("Error checking integrator session:", error);
          localStorage.removeItem("integratorUser");
        }
      }
    };
    
    checkExistingSession();
  }, [navigate]);
  
  const validateForm = () => {
    const errors = {
      cpf: !cpf,
      password: !password
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    
    setIsLoading(true);
    
    // Remove non-numeric characters for comparison
    const cleanCpf = cpf.replace(/\D/g, "");
    
    console.log("Tentando autenticar com CPF:", cleanCpf);
    
    try {
      // Query the integrator_users table to find a user with matching CPF and password
      // Use correct eq() methods for Supabase
      const { data, error } = await supabase
        .from('integrator_users')
        .select('*')
        .eq('cpf', cleanCpf as any)
        .eq('password', password as any)
        .eq('active', true as any)
        .single();
      
      if (error || !data) {
        console.error("Erro de autenticação:", error);
        toast.error("Credenciais inválidas. Tente novamente.");
        setIsLoading(false);
        return;
      }
      
      // Safely process the data using our helper
      const userData = safeDataItem(data, {
        id: "",
        cpf: "",
        password: "",
        active: false,
        name: "",
        email: "",
        role: ""
      } as IntegratorUser);
      
      // Store user data in localStorage for session management
      localStorage.setItem("integratorUser", JSON.stringify(userData));
      
      toast.success("Login realizado com sucesso!");
      navigate("/integrator/dashboard");
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      toast.error("Ocorreu um erro ao tentar fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format CPF as it's typed (###.###.###-##)
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) {
      value = value.slice(0, 11);
    }
    
    // Format with masks
    if (value.length > 9) {
      setCpf(value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4"));
    } else if (value.length > 6) {
      setCpf(value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3"));
    } else if (value.length > 3) {
      setCpf(value.replace(/(\d{3})(\d{1,3})/, "$1.$2"));
    } else {
      setCpf(value);
    }
    
    if (value) setFormErrors(prev => ({...prev, cpf: false}));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value) setFormErrors(prev => ({...prev, password: false}));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cpf" className={formErrors.cpf ? "text-destructive" : ""}>
          CPF
        </Label>
        <Input
          id="cpf"
          placeholder="123.456.789-00"
          value={cpf}
          onChange={handleCpfChange}
          required
          className={formErrors.cpf ? "border-destructive" : ""}
          aria-invalid={formErrors.cpf}
          disabled={isLoading}
        />
        {formErrors.cpf && (
          <p className="text-xs text-destructive">CPF é obrigatório</p>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className={formErrors.password ? "text-destructive" : ""}>
            Senha
          </Label>
          <a href="#" className="text-xs text-primary hover:underline">
            Esqueceu a senha?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={handlePasswordChange}
          required
          className={formErrors.password ? "border-destructive" : ""}
          aria-invalid={formErrors.password}
          disabled={isLoading}
        />
        {formErrors.password && (
          <p className="text-xs text-destructive">Senha é obrigatória</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Autenticando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>
      
      <div className="text-center text-sm text-muted-foreground mt-4">
        <p>Dados para demonstração:</p>
        <p>CPF: 123.456.789-00</p>
        <p>Senha: 12345678</p>
      </div>
    </form>
  );
}
