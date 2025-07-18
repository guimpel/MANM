
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Shield, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { fleetRoutes, providerRoutes, integratorRoutes } from "@/lib/routes";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({ loginId: false, password: false });
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  
  const { login, isAuthenticated, isFrotista, isProvider, isIntegrator } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Get redirect path from location state or use default based on user type
      let from = location.state?.from?.pathname || "/";
      
      if (isFrotista) {
        from = fleetRoutes.dashboard.path;
      } else if (isProvider) {
        from = providerRoutes.dashboard.path;
      } else if (isIntegrator) {
        from = integratorRoutes.dashboard.path;
      }
      
      console.log(`User is authenticated, redirecting to: ${from}`);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location, isFrotista, isProvider, isIntegrator]);

  const validateForm = () => {
    const errors = {
      loginId: !loginId.trim(),
      password: !password.trim()
    };
    setFormErrors(errors);
    // Foco automático no primeiro erro
    setTimeout(() => {
      if (errors.loginId && loginRef.current) loginRef.current.focus();
      else if (errors.password && passwordRef.current) passwordRef.current.focus();
    }, 0);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
      toast.error("Tempo excedido. Tente novamente.");
    }, 8000);
    setTimeoutId(timeout);
    try {
      console.log("Tentando login com:", { loginId, password, rememberMe });
      await login(loginId, password, rememberMe);
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.message?.includes("Invalid login credentials")) {
        toast.error("E-mail ou senha inválidos. Verifique e tente novamente.");
      } else if (error.message?.includes("Email not confirmed")) {
        toast.error("E-mail não confirmado. Verifique sua caixa de entrada.");
      } else if (error.message?.includes("User not found")) {
        toast.error("Usuário não encontrado. Verifique o e-mail ou crie uma conta.");
      } else {
        toast.error("Erro ao fazer login. Tente novamente mais tarde.");
      }
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
      setIsLoading(false);
    }
  };

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-primary">IMOVAN</h1>
              <p className="text-man-gray mt-1">Acesse sua conta para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-row gap-2 items-end">
                <div className="flex-1">
                  <Label htmlFor="loginId">Login</Label>
                  <Input
                    id="loginId"
                    ref={loginRef}
                    placeholder="Digite seu login/email"
                    value={loginId}
                    onChange={(e) => {
                      setLoginId(e.target.value);
                      if (e.target.value) setFormErrors(prev => ({ ...prev, loginId: false }));
                    }}
                    className={`man-input ${formErrors.loginId ? 'border-destructive' : ''}`}
                    required
                    disabled={isLoading}
                    aria-invalid={formErrors.loginId ? "true" : "false"}
                  />
                  {formErrors.loginId && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
                </div>
                <div className="flex-1">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    ref={passwordRef}
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value) setFormErrors(prev => ({ ...prev, password: false }));
                    }}
                    className={`man-input ${formErrors.password ? 'border-destructive' : ''}`}
                    required
                    disabled={isLoading}
                    aria-invalid={formErrors.password ? "true" : "false"}
                  />
                  {formErrors.password && <p className="text-xs text-destructive mt-1">Campo obrigatório</p>}
                </div>
                <Button
                  type="submit"
                  className="h-10 px-6 ml-2 bg-primary text-white font-bold rounded-md flex-shrink-0"
                  style={{ backgroundColor: '#4682B4' }}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'IR'}
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="accent-primary"
                />
                <Label htmlFor="rememberMe" className="text-sm cursor-pointer select-none">
                  Mantenha-me conectado
                </Label>
              </div>
              <div className="flex justify-between items-center mt-2">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </Link>
                <Link
                  to="/register"
                  className="font-medium rounded px-4 py-2 text-white"
                  style={{ backgroundColor: '#4682B4' }}
                >
                  Cadastrar
                </Link>
              </div>
            </form>
            <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
              <Shield className="h-4 w-4 mr-1 text-primary" />
              <span>Conexão segura com criptografia SSL</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
