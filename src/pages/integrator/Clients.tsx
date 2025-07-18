
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
import { Building, Search, Plus, FileText, Phone } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Client {
  id: string;
  name: string;
  cnpj: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  status: "active" | "inactive";
  segment: string;
  since: string;
}

const mockClients: Client[] = [
  {
    id: "client1",
    name: "Transportes Rápidos Ltda",
    cnpj: "12.345.678/0001-90",
    contact: "Carlos Silva",
    phone: "(11) 98765-4321",
    email: "carlos@transportesrapidos.com",
    address: "Av. das Nações, 1500, São Paulo - SP",
    status: "active",
    segment: "Transportes",
    since: "2022-05-10"
  },
  {
    id: "client2",
    name: "Auto Frotas Brasil SA",
    cnpj: "23.456.789/0001-12",
    contact: "Mariana Oliveira",
    phone: "(11) 97654-3210",
    email: "mariana@autofrotas.com.br",
    address: "Rua Augusta, 780, São Paulo - SP",
    status: "active",
    segment: "Frotas Corporativas",
    since: "2021-10-15"
  },
  {
    id: "client3",
    name: "Logística Express",
    cnpj: "34.567.890/0001-23",
    contact: "Roberto Mendes",
    phone: "(11) 96543-2109",
    email: "roberto@logisticaexpress.com.br",
    address: "Av. Paulista, 1000, São Paulo - SP",
    status: "inactive",
    segment: "Logística",
    since: "2020-03-22"
  },
  {
    id: "client4",
    name: "Entregas Urbanas Ltda",
    cnpj: "45.678.901/0001-34",
    contact: "Ana Soares",
    phone: "(11) 95432-1098",
    email: "ana@entregasurbanas.com",
    address: "Rua dos Andradas, 500, São Paulo - SP",
    status: "active",
    segment: "Entregas",
    since: "2023-01-05"
  },
  {
    id: "client5",
    name: "Transportadora Nacional",
    cnpj: "56.789.012/0001-45",
    contact: "Paulo Ribeiro",
    phone: "(11) 94321-0987",
    email: "paulo@transportadoranacional.com.br",
    address: "Av. Brasil, 2500, Rio de Janeiro - RJ",
    status: "active",
    segment: "Transporte Nacional",
    since: "2021-07-18"
  }
];

const Clients = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: "",
    cnpj: "",
    contact: "",
    phone: "",
    email: "",
    address: "",
    status: "active",
    segment: "",
    since: new Date().toISOString().split('T')[0]
  });

  const handleAddClient = () => {
    const clientToAdd = {
      ...newClient,
      id: `client${Date.now()}`,
    } as Client;
    
    setClients([...clients, clientToAdd]);
    toast.success("Cliente adicionado com sucesso!");
    setOpenDialog(false);
    setNewClient({
      name: "",
      cnpj: "",
      contact: "",
      phone: "",
      email: "",
      address: "",
      status: "active",
      segment: "",
      since: new Date().toISOString().split('T')[0]
    });
  };

  const handleStatusChange = (id: string) => {
    setClients(clients.map(client => 
      client.id === id ? { 
        ...client, 
        status: client.status === "active" ? "inactive" : "active" 
      } : client
    ));
    
    const client = clients.find(c => c.id === id);
    const newStatus = client?.status === "active" ? "inativo" : "ativo";
    toast.success(`Status do cliente alterado para ${newStatus}!`);
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    client.cnpj.includes(searchTerm) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie os clientes da sua empresa
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo cliente
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome/Razão Social</Label>
                  <Input 
                    id="name" 
                    placeholder="Nome da empresa" 
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input 
                    id="cnpj" 
                    placeholder="00.000.000/0000-00" 
                    value={newClient.cnpj}
                    onChange={(e) => setNewClient({...newClient, cnpj: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contact">Contato</Label>
                  <Input 
                    id="contact" 
                    placeholder="Nome do contato" 
                    value={newClient.contact}
                    onChange={(e) => setNewClient({...newClient, contact: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    placeholder="(00) 00000-0000" 
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="email@empresa.com" 
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="address">Endereço</Label>
                <Input 
                  id="address" 
                  placeholder="Endereço completo" 
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="segment">Segmento</Label>
                  <Input 
                    id="segment" 
                    placeholder="Segmento de atuação" 
                    value={newClient.segment}
                    onChange={(e) => setNewClient({...newClient, segment: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="since">Cliente desde</Label>
                  <Input 
                    id="since" 
                    type="date" 
                    value={newClient.since}
                    onChange={(e) => setNewClient({...newClient, since: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancelar</Button>
              <Button onClick={handleAddClient}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Clientes
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">
              {clients.filter(c => c.status === "active").length} ativos
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="list">Lista de Clientes</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>
                Lista completa de clientes da empresa
              </CardDescription>
              <div className="relative flex-1 pt-2">
                <Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por nome, CNPJ ou contato..."
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
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Segmento</TableHead>
                    <TableHead>Cliente Desde</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.cnpj}</TableCell>
                      <TableCell>{client.contact}</TableCell>
                      <TableCell>{client.segment}</TableCell>
                      <TableCell>{new Date(client.since).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {client.status === 'active' ? 'Ativo' : 'Inativo'}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusChange(client.id)}
                          >
                            {client.status === 'active' ? 'Desativar' : 'Ativar'}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Phone className="h-4 w-4" />
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
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Clientes</CardTitle>
              <CardDescription>
                Visualize dados analíticos sobre seus clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex flex-col items-center justify-center h-full">
                <Building className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Os gráficos analíticos de clientes serão implementados em breve.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Clients;
