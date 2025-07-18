
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IntegratorLoginForm } from "@/components/integrator/IntegratorLoginForm";

const IntegratorLogin = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Portal do Integrador</CardTitle>
          <CardDescription>Acesse o sistema para gerenciar a plataforma</CardDescription>
        </CardHeader>
        
        <CardContent>
          <IntegratorLoginForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegratorLogin;
