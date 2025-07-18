
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User, Car, CreditCard, Settings, FileText } from "lucide-react";

export function FleetProfile() {
  const [personalData, setPersonalData] = useState({
    name: "Carlos Mendes",
    email: "carlos.mendes@frota.com.br",
    phone: "(11) 98765-4321",
    position: "Gerente de Frota",
    company: "TransporteMax Ltda"
  });

  const [companyData, setCompanyData] = useState({
    companyName: "TransporteMax Ltda",
    cnpj: "12.345.678/0001-90",
    address: "Av. Paulista, 1000, São Paulo - SP",
    contactEmail: "contato@transportemax.com.br",
    contactPhone: "(11) 3456-7890"
  });

  const handlePersonalDataUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Dados pessoais atualizados com sucesso!");
  };

  const handleCompanyDataUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Dados da empresa atualizados com sucesso!");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e da empresa.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[250px_1fr]">
        <Card>
          <CardContent className="p-6 flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt="Avatar" />
              <AvatarFallback className="text-xl">CM</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <h3 className="font-medium text-lg">{personalData.name}</h3>
              <p className="text-sm text-muted-foreground">{personalData.position}</p>
              <p className="text-sm text-muted-foreground">{personalData.company}</p>
            </div>
            <div className="w-full pt-4 space-y-2">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{personalData.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Car className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Gerente de Frota</span>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Plano Premium</span>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">10 veículos cadastrados</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Tabs defaultValue="personal">
            <TabsList>
              <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
              <TabsTrigger value="company">Dados da Empresa</TabsTrigger>
              <TabsTrigger value="preferences">Preferências</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dados Pessoais</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePersonalDataUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input 
                          id="name" 
                          value={personalData.name}
                          onChange={(e) => setPersonalData({...personalData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={personalData.email}
                          onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input 
                          id="phone" 
                          value={personalData.phone}
                          onChange={(e) => setPersonalData({...personalData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Cargo</Label>
                        <Input 
                          id="position" 
                          value={personalData.position}
                          onChange={(e) => setPersonalData({...personalData, position: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button type="submit">Salvar Alterações</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="company" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dados da Empresa</CardTitle>
                  <CardDescription>
                    Atualize as informações da sua empresa.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCompanyDataUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Nome da Empresa</Label>
                        <Input 
                          id="companyName" 
                          value={companyData.companyName}
                          onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input 
                          id="cnpj" 
                          value={companyData.cnpj}
                          onChange={(e) => setCompanyData({...companyData, cnpj: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Endereço</Label>
                        <Input 
                          id="address" 
                          value={companyData.address}
                          onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Email de Contato</Label>
                        <Input 
                          id="contactEmail" 
                          type="email" 
                          value={companyData.contactEmail}
                          onChange={(e) => setCompanyData({...companyData, contactEmail: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Telefone de Contato</Label>
                        <Input 
                          id="contactPhone" 
                          value={companyData.contactPhone}
                          onChange={(e) => setCompanyData({...companyData, contactPhone: e.target.value})}
                        />
                      </div>
                    </div>
                    <Button type="submit">Salvar Alterações</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Preferências</CardTitle>
                  <CardDescription>
                    Configure suas preferências de notificação e exibição.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-medium">Notificações por Email</h4>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações por email sobre novos serviços
                        </p>
                      </div>
                      <Button variant="outline">Ativado</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-medium">Notificações no Sistema</h4>
                        <p className="text-sm text-muted-foreground">
                          Receber notificações dentro do sistema
                        </p>
                      </div>
                      <Button variant="outline">Ativado</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-medium">Modo Escuro</h4>
                        <p className="text-sm text-muted-foreground">
                          Alternar entre tema claro e escuro
                        </p>
                      </div>
                      <Button variant="outline">Automático</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Segurança</CardTitle>
                  <CardDescription>
                    Gerencie sua senha e configurações de segurança.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium">Alterar Senha</h4>
                      <div className="grid gap-2">
                        <Label htmlFor="current">Senha Atual</Label>
                        <Input id="current" type="password" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new">Nova Senha</Label>
                        <Input id="new" type="password" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm">Confirmar Nova Senha</Label>
                        <Input id="confirm" type="password" />
                      </div>
                      <Button onClick={() => toast.success("Senha alterada com sucesso!")}>
                        Atualizar Senha
                      </Button>
                    </div>
                    <div className="space-y-4 pt-4 border-t">
                      <h4 className="text-sm font-medium">Autenticação de Dois Fatores</h4>
                      <p className="text-sm text-muted-foreground">
                        Ative a autenticação de dois fatores para aumentar a segurança da sua conta.
                      </p>
                      <Button variant="outline" onClick={() => toast.info("Recurso em desenvolvimento")}>
                        Configurar 2FA
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default FleetProfile;
