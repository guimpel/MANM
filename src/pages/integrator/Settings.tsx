
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, User, Shield, Bell, Server } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface CompanySettings {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  address: string;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  passwordExpiry: boolean;
  loginNotifications: boolean;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  financialAlerts: boolean;
  systemUpdates: boolean;
}

interface IntegrationSettings {
  erp: boolean;
  crm: boolean;
  accounting: boolean;
  banking: boolean;
}

const Settings = () => {
  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: "Integrador Automotivo Brasil",
    cnpj: "12.345.678/0001-90",
    phone: "(11) 3456-7890",
    email: "contato@integradorautobrasil.com",
    address: "Av. Paulista, 1000, São Paulo - SP, 01310-100"
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    passwordExpiry: true,
    loginNotifications: true,
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    financialAlerts: true,
    systemUpdates: true,
  });

  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>({
    erp: true,
    crm: false,
    accounting: true,
    banking: false,
  });

  const handleCompanySettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanySettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecuritySettingChange = (key: keyof SecuritySettings, value: boolean) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNotificationSettingChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleIntegrationSettingChange = (key: keyof IntegrationSettings, value: boolean) => {
    setIntegrationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveCompanySettings = () => {
    toast.success("Configurações da empresa atualizadas com sucesso!");
  };

  const saveSecuritySettings = () => {
    toast.success("Configurações de segurança atualizadas com sucesso!");
  };

  const saveNotificationSettings = () => {
    toast.success("Configurações de notificações atualizadas com sucesso!");
  };

  const saveIntegrationSettings = () => {
    toast.success("Configurações de integrações atualizadas com sucesso!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do sistema
          </p>
        </div>
      </div>

      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="company">Empresa</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa</CardTitle>
              <CardDescription>
                Atualize as informações da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Empresa</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={companySettings.name}
                    onChange={handleCompanySettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input 
                    id="cnpj" 
                    name="cnpj"
                    value={companySettings.cnpj}
                    onChange={handleCompanySettingsChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={companySettings.phone}
                    onChange={handleCompanySettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={companySettings.email}
                    onChange={handleCompanySettingsChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input 
                  id="address" 
                  name="address"
                  value={companySettings.address}
                  onChange={handleCompanySettingsChange}
                />
              </div>
              
              <div className="pt-4">
                <label className="block text-sm font-medium mb-3">Logo da Empresa</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded bg-gray-200 flex items-center justify-center text-gray-500 border">
                    <SettingsIcon className="h-8 w-8" />
                  </div>
                  <Button variant="outline">Upload Logo</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveCompanySettings}>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Configure as opções de segurança do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Autenticação e Acesso
                </h3>
                <Separator className="my-4" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactorAuth">Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">
                      Proteja sua conta com uma camada extra de segurança
                    </p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSecuritySettingChange('twoFactorAuth', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="passwordExpiry">Expiração de Senha</Label>
                    <p className="text-sm text-muted-foreground">
                      Solicitar alteração de senha a cada 90 dias
                    </p>
                  </div>
                  <Switch
                    id="passwordExpiry"
                    checked={securitySettings.passwordExpiry}
                    onCheckedChange={(checked) => handleSecuritySettingChange('passwordExpiry', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="loginNotifications">Notificações de Login</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber alertas sobre novos logins na sua conta
                    </p>
                  </div>
                  <Switch
                    id="loginNotifications"
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => handleSecuritySettingChange('loginNotifications', checked)}
                  />
                </div>
                
                <div className="pt-4">
                  <Button variant="outline">Alterar Senha</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSecuritySettings}>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                Configure como deseja receber notificações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Canais de Notificação
                </h3>
                <Separator className="my-4" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Notificações por E-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber alertas importantes por e-mail
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationSettingChange('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações no navegador
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => handleNotificationSettingChange('pushNotifications', checked)}
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mt-6 mb-4">Tipos de Notificação</h3>
                  <Separator className="my-4" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="financialAlerts">Alertas Financeiros</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber alertas sobre pagamentos e vencimentos
                    </p>
                  </div>
                  <Switch
                    id="financialAlerts"
                    checked={notificationSettings.financialAlerts}
                    onCheckedChange={(checked) => handleNotificationSettingChange('financialAlerts', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="systemUpdates">Atualizações do Sistema</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber notificações sobre atualizações e novidades
                    </p>
                  </div>
                  <Switch
                    id="systemUpdates"
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) => handleNotificationSettingChange('systemUpdates', checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveNotificationSettings}>Salvar Preferências</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>
                Configure integrações com outros sistemas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  Sistemas Integrados
                </h3>
                <Separator className="my-4" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="erp">Integração com ERP</Label>
                    <p className="text-sm text-muted-foreground">
                      Conectar com sistema de gestão empresarial
                    </p>
                  </div>
                  <Switch
                    id="erp"
                    checked={integrationSettings.erp}
                    onCheckedChange={(checked) => handleIntegrationSettingChange('erp', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="crm">Integração com CRM</Label>
                    <p className="text-sm text-muted-foreground">
                      Conectar com sistema de relacionamento com clientes
                    </p>
                  </div>
                  <Switch
                    id="crm"
                    checked={integrationSettings.crm}
                    onCheckedChange={(checked) => handleIntegrationSettingChange('crm', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="accounting">Integração com Sistema Contábil</Label>
                    <p className="text-sm text-muted-foreground">
                      Conectar com sistema contábil
                    </p>
                  </div>
                  <Switch
                    id="accounting"
                    checked={integrationSettings.accounting}
                    onCheckedChange={(checked) => handleIntegrationSettingChange('accounting', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="banking">Integração Bancária</Label>
                    <p className="text-sm text-muted-foreground">
                      Conectar com sistemas bancários para conciliação
                    </p>
                  </div>
                  <Switch
                    id="banking"
                    checked={integrationSettings.banking}
                    onCheckedChange={(checked) => handleIntegrationSettingChange('banking', checked)}
                  />
                </div>
                
                <div className="pt-4">
                  <Button variant="outline">Configurar APIs</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveIntegrationSettings}>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
