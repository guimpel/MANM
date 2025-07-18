
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, Search, Plus, FileText, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Provider {
  id: string;
  name: string;
  cnpj: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  category: string;
  rating: number;
  status: "active" | "inactive";
}

const mockProviders: Provider[] = [
  {
    id: "prov1",
    name: "Auto Peças Central",
    cnpj: "12.345.678/0001-90",
    contact: "João Silva",
    phone: "(11) 98765-4321",
    email: "joao@autopecascentral.com",
    address: "Rua das Peças, 123, São Paulo - SP",
    category: "Peças Automotivas",
    rating: 4.5,
    status: "active"
  },
  {
    id: "prov2",
    name: "Lubrificantes Express",
    cnpj: "23.456.789/0001-01",
    contact: "Maria Santos",
    phone: "(11) 97654-3210",
    email: "maria@lubrificantesexpress.com",
    address: "Av. dos Óleos, 456, São Paulo - SP",
    category: "Lubrificantes",
    rating: 4.2,
    status: "active"
  },
  {
    id: "prov3",
    name: "Elétrica Automotiva Ltda",
    cnpj: "34.567.890/0001-12",
    contact: "Pedro Souza",
    phone: "(11) 96543-2109",
    email: "pedro@eletricaautomotiva.com.br",
    address: "Rua dos Motores, 789, São Paulo - SP",
    category: "Componentes Elétricos",
    rating: 4.8,
    status: "active"
  },
  {
    id: "prov4",
    name: "Pneus & Rodas SA",
    cnpj: "45.678.901/0001-23",
    contact: "Ana Oliveira",
    phone: "(11) 95432-1098",
    email: "ana@pneusrodas.com",
    address: "Av. das Rodas, 321, São Paulo - SP",
    category: "Pneus e Rodas",
    rating: 4.0,
    status: "inactive"
  },
  {
    id: "prov5",
    name: "Ferramentas Automotivas",
    cnpj: "56.789.012/0001-34",
    contact: "Carlos Mendes",
    phone: "(11) 94321-0987",
    email: "carlos@ferramentasauto.com.br",
    address: "Rua das Ferramentas, 654, São Paulo - SP",
    category: "Ferramentas",
    rating: 4.3,
    status: "active"
  }
];

const Providers = () => {
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newProvider, setNewProvider] = useState<Partial<Provider>>({
    name: "",
    cnpj: "",
    contact: "",
    phone: "",
    email: "",
    address: "",
    category: "",
    rating: 4,
    status: "active"
  });

  const handleAddProvider = () => {
    const providerToAdd = {
      ...newProvider,
      id: `prov${Date.now()}`,
    } as Provider;
    
    setProviders([...providers, providerToAdd]);
    toast.success("Fornecedor adicionado com sucesso!");
    setOpenDialog(false);
    setNewProvider({
      name: "",
      cnpj: "",
      contact: "",
      phone: "",
      email: "",
      address: "",
      category: "",
      rating: 4,
      status: "active"
    });
  };

  const handleStatusChange = (id: string) => {
    setProviders(providers.map(provider => 
      provider.id === id ? { 
        ...provider, 
        status: provider.status === "active" ? "inactive" : "active" 
      } : provider
    ));
    
    const provider = providers.find(p => p.id === id);
    const newStatus = provider?.status === "active" ? "inativo" : "ativo";
    toast.success(`Status do fornecedor alterado para ${newStatus}!`);
  };

  const filteredProviders = providers.filter(provider => 
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    provider.cnpj.includes(searchTerm) ||
    provider.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fornecedores</h1>
          <p className="text-muted-foreground">
            Gerencie os fornecedores da sua empresa
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Fornecedor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Fornecedor</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo fornecedor
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome/Razão Social</Label>
                  <Input 
                    id="name" 
                    placeholder="Nome da empresa" 
                    value={newProvider.name}
                    onChange={(e) => setNewProvider({...newProvider, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input 
                    id="cnpj" 
                    placeholder="00.000.000/0000-00" 
                    value={newProvider.cnpj}
                    onChange={(e) => setNewProvider({...newProvider, cnpj: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contact">Contato</Label>
                  <Input 
                    id="contact" 
                    placeholder="Nome do contato" 
                    value={newProvider.contact}
                    onChange={(e) => setNewProvider({...newProvider, contact: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    placeholder="(00) 00000-0000" 
                    value={newProvider.phone}
                    onChange={(e) => setNewProvider({...newProvider, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="email@empresa.com" 
                  value={newProvider.email}
                  onChange={(e) => setNewProvider({...newProvider, email: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="address">Endereço</Label>
                <Input 
                  id="address" 
                  placeholder="Endereço completo" 
                  value={newProvider.address}
                  onChange={(e) => setNewProvider({...newProvider, address: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input 
                    id="category" 
                    placeholder="Categoria de produtos/serviços" 
                    value={newProvider.category}
                    onChange={(e) => setNewProvider({...newProvider, category: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rating">Avaliação (1-5)</Label>
                  <Input 
                    id="rating" 
                    type="number" 
                    min="1"
                    max="5"
                    step="0.1"
                    value={newProvider.rating}
                    onChange={(e) => setNewProvider({...newProvider, rating: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancelar</Button>
              <Button onClick={handleAddProvider}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Fornecedores
            </CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providers.length}</div>
            <p className="text-xs text-muted-foreground">
              {providers.filter(p => p.status === "active").length} ativos
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="list">Lista de Fornecedores</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fornecedores</CardTitle>
              <CardDescription>
                Lista completa de fornecedores cadastrados
              </CardDescription>
              <div className="relative flex-1 pt-2">
                <Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por nome, CNPJ ou categoria..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome/Razão Social</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProviders.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell>{provider.name}</TableCell>
                      <TableCell>{provider.category}</TableCell>
                      <TableCell>{provider.contact}</TableCell>
                      <TableCell>{provider.phone}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {provider.rating.toFixed(1)}
                          <span className="ml-1 text-yellow-500">★</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          provider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {provider.status === 'active' ? 'Ativo' : 'Inativo'}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(provider.id)}
                          >
                            {provider.status === 'active' ? 'Desativar' : 'Ativar'}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CreditCard className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos a Fornecedores</CardTitle>
              <CardDescription>
                Acompanhe os pagamentos a fornecedores
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex flex-col items-center justify-center h-full">
                <CreditCard className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  O histórico de pagamentos a fornecedores será implementado em breve.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Providers;
