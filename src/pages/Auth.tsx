
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, LogIn, UserPlus, Shield, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  
  // Register state
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userType, setUserType] = useState<"client" | "provider">("client");
  
  const { login, register, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/fleet-dashboard";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  
  // Form validation states
  const [loginErrors, setLoginErrors] = useState({ email: false, password: false });
  const [registerErrors, setRegisterErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    firstName: false,
    lastName: false,
    passwordMatch: true
  });
  
  const validateLoginForm = () => {
    const errors = {
      email: !loginEmail,
      password: !loginPassword
    };
    setLoginErrors(errors);
    return !Object.values(errors).some(Boolean);
  };
  
  const validateRegisterForm = () => {
    const errors = {
      email: !registerEmail,
      password: !registerPassword,
      confirmPassword: !confirmPassword,
      firstName: !firstName,
      lastName: !lastName,
      passwordMatch: registerPassword === confirmPassword
    };
    setRegisterErrors(errors);
    return !Object.values(errors).some(Boolean);
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(loginEmail, loginPassword);
    } catch (error) {
      console.error("Login error:", error);
      // Error handling is done in the login function
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(registerEmail, registerPassword, {
        first_name: firstName,
        last_name: lastName,
        user_type: userType
      });
    } catch (error) {
      console.error("Register error:", error);
      // Error handling is done in the register function
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 bg-gray-50">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                {activeTab === "login" ? "Bem-vindo novamente" : "Crie sua conta"}
              </CardTitle>
              <CardDescription>
                {activeTab === "login" 
                  ? "Acesse sua conta para continuar" 
                  : "Junte-se à plataforma Motor Assist Network"}
              </CardDescription>
            </CardHeader>
            
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <div className="px-6">
                <TabsList className="grid grid-cols-2 w-full mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Cadastro</TabsTrigger>
                </TabsList>
              </div>
              
              <CardContent>
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className={loginErrors.email ? "text-destructive" : ""}>
                        Email
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com" 
                        value={loginEmail}
                        onChange={(e) => {
                          setLoginEmail(e.target.value);
                          if (e.target.value) setLoginErrors(prev => ({...prev, email: false}));
                        }}
                        required 
                        className={loginErrors.email ? "border-destructive" : ""}
                        aria-invalid={loginErrors.email}
                        disabled={isSubmitting}
                      />
                      {loginErrors.email && (
                        <p className="text-xs text-destructive">Email é obrigatório</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className={loginErrors.password ? "text-destructive" : ""}>
                          Senha
                        </Label>
                        <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                          Esqueceu a senha?
                        </Link>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={loginPassword}
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                          if (e.target.value) setLoginErrors(prev => ({...prev, password: false}));
                        }}
                        required 
                        className={loginErrors.password ? "border-destructive" : ""}
                        aria-invalid={loginErrors.password}
                        disabled={isSubmitting}
                      />
                      {loginErrors.password && (
                        <p className="text-xs text-destructive">Senha é obrigatória</p>
                      )}
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          Entrar
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className={registerErrors.firstName ? "text-destructive" : ""}>
                          Nome
                        </Label>
                        <Input 
                          id="firstName" 
                          placeholder="João" 
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            if (e.target.value) setRegisterErrors(prev => ({...prev, firstName: false}));
                          }}
                          required 
                          className={registerErrors.firstName ? "border-destructive" : ""}
                          disabled={isSubmitting}
                        />
                        {registerErrors.firstName && (
                          <p className="text-xs text-destructive">Nome é obrigatório</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className={registerErrors.lastName ? "text-destructive" : ""}>
                          Sobrenome
                        </Label>
                        <Input 
                          id="lastName" 
                          placeholder="Silva" 
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            if (e.target.value) setRegisterErrors(prev => ({...prev, lastName: false}));
                          }}
                          required 
                          className={registerErrors.lastName ? "border-destructive" : ""}
                          disabled={isSubmitting}
                        />
                        {registerErrors.lastName && (
                          <p className="text-xs text-destructive">Sobrenome é obrigatório</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="registerEmail" className={registerErrors.email ? "text-destructive" : ""}>
                        Email
                      </Label>
                      <Input 
                        id="registerEmail" 
                        type="email" 
                        placeholder="seu@email.com" 
                        value={registerEmail}
                        onChange={(e) => {
                          setRegisterEmail(e.target.value);
                          if (e.target.value) setRegisterErrors(prev => ({...prev, email: false}));
                        }}
                        required 
                        className={registerErrors.email ? "border-destructive" : ""}
                        disabled={isSubmitting}
                      />
                      {registerErrors.email && (
                        <p className="text-xs text-destructive">Email é obrigatório</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Tipo de Usuário</Label>
                      <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "client" | "provider")} className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="client" id="client" />
                          <Label htmlFor="client">Frotista</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="provider" id="provider" />
                          <Label htmlFor="provider">Fornecedor</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="registerPassword" className={registerErrors.password ? "text-destructive" : ""}>
                        Senha
                      </Label>
                      <Input 
                        id="registerPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        value={registerPassword}
                        onChange={(e) => {
                          setRegisterPassword(e.target.value);
                          if (e.target.value) setRegisterErrors(prev => ({...prev, password: false}));
                        }}
                        required 
                        className={registerErrors.password ? "border-destructive" : ""}
                        disabled={isSubmitting}
                      />
                      {registerErrors.password && (
                        <p className="text-xs text-destructive">Senha é obrigatória</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className={registerErrors.confirmPassword || !registerErrors.passwordMatch ? "text-destructive" : ""}>
                        Confirmar Senha
                      </Label>
                      <Input 
                        id="confirmPassword" 
                        type="password" 
                        placeholder="••••••••" 
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          if (e.target.value) setRegisterErrors(prev => ({...prev, confirmPassword: false}));
                        }}
                        required 
                        className={registerErrors.confirmPassword || !registerErrors.passwordMatch ? "border-destructive" : ""}
                        disabled={isSubmitting}
                      />
                      {registerErrors.confirmPassword && (
                        <p className="text-xs text-destructive">Confirmação é obrigatória</p>
                      )}
                      {!registerErrors.passwordMatch && (
                        <p className="text-xs text-destructive">As senhas não coincidem</p>
                      )}
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Criando conta...
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Criar conta
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </CardContent>
            </Tabs>
            
            <CardFooter className="text-center">
              <div className="w-full flex items-center justify-center text-xs text-gray-500">
                <Shield className="h-4 w-4 mr-1 text-primary" />
                <span>Conexão segura com criptografia SSL</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
