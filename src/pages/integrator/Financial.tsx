
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Download, Upload, AlertTriangle, Ban, Check, Search, Printer } from "lucide-react";
import { mockClients } from "@/mocks/integratorData";

export default function IntegratorFinancial() {
  const pendingInvoices = [
    { 
      id: "INV-001", 
      client: "Transportes Rápidos Ltda", 
      value: 2500.00, 
      issueDate: "2025-04-10", 
      dueDate: "2025-05-10", 
      status: "pending" 
    },
    { 
      id: "INV-002", 
      client: "Logística Express S.A.", 
      value: 1800.00, 
      issueDate: "2025-04-15", 
      dueDate: "2025-05-15", 
      status: "pending" 
    },
    { 
      id: "INV-003", 
      client: "Entregas Urbanas EIRELI", 
      value: 950.00, 
      issueDate: "2025-04-18", 
      dueDate: "2025-05-18", 
      status: "overdue" 
    },
    { 
      id: "INV-004", 
      client: "Transportadora Nacional Ltda", 
      value: 3200.00, 
      issueDate: "2025-04-05", 
      dueDate: "2025-05-05", 
      status: "overdue" 
    },
  ];

  const paidInvoices = [
    { 
      id: "INV-005", 
      client: "Transportes Rápidos Ltda", 
      value: 2500.00, 
      issueDate: "2025-03-10", 
      dueDate: "2025-04-10", 
      paymentDate: "2025-04-08",
      status: "paid" 
    },
    { 
      id: "INV-006", 
      client: "Logística Express S.A.", 
      value: 1800.00, 
      issueDate: "2025-03-15", 
      dueDate: "2025-04-15", 
      paymentDate: "2025-04-12",
      status: "paid" 
    },
  ];

  const defaulters = mockClients.filter(client => client.paymentStatus === 'overdue');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestão Financeira</h1>
        <p className="text-muted-foreground">
          Gerencie cobranças, controle inadimplência e aprove limites de crédito.
        </p>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="invoices">Cobranças</TabsTrigger>
          <TabsTrigger value="defaulters">Inadimplência</TabsTrigger>
          <TabsTrigger value="credit">Limites de Crédito</TabsTrigger>
        </TabsList>
        
        <TabsContent value="invoices" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="relative max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar cobranças..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline">
                <span className="mr-2">Filtrar</span>
              </Button>
            </div>
            <div className="space-x-2">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Importar
              </Button>
              <Button>
                <CreditCard className="mr-2 h-4 w-4" />
                Nova Cobrança
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Cobranças Pendentes</CardTitle>
              <CardDescription>
                Cobranças aguardando pagamento ou em atraso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Emissão</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Situação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell>{formatCurrency(invoice.value)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={invoice.status === 'pending' ? 'outline' : 'destructive'}
                          className="capitalize"
                        >
                          {invoice.status === 'pending' ? 'Pendente' : 'Em atraso'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cobranças Pagas</CardTitle>
              <CardDescription>
                Histórico de pagamentos recentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Emissão</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                      <TableCell>{formatDate(invoice.paymentDate!)}</TableCell>
                      <TableCell>{formatCurrency(invoice.value)}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="defaulters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                Clientes Inadimplentes
              </CardTitle>
              <CardDescription>
                Clientes com pagamentos em atraso que podem ter acesso bloqueado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Dias em Atraso</TableHead>
                    <TableHead>Valor Devido</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {defaulters.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>{client.cnpj}</TableCell>
                      <TableCell>25 dias</TableCell>
                      <TableCell>{formatCurrency(3200)}</TableCell>
                      <TableCell>
                        <Badge variant="destructive" className="flex items-center w-fit">
                          <Ban className="mr-1 h-3 w-3" /> Bloqueado
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">
                          <Check className="mr-1 h-3 w-3" /> Remover Bloqueio
                        </Button>
                        <Button size="sm">Notificar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="credit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aprovação de Limite de Crédito</CardTitle>
              <CardDescription>
                Analise e aprove limites de crédito para clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Solicitações Pendentes</h3>
                    <div className="rounded-md border p-4 space-y-4">
                      {mockClients.filter(c => c.creditStatus === 'pending').map(client => (
                        <div key={client.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <p className="text-sm text-muted-foreground">{client.cnpj}</p>
                              <p className="text-sm">Limite solicitado: {formatCurrency(client.creditLimit)}</p>
                            </div>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">Recusar</Button>
                              <Button size="sm">Aprovar</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Limites Aprovados</h3>
                    <div className="rounded-md border p-4 space-y-4">
                      {mockClients.filter(c => c.creditStatus === 'approved').map(client => (
                        <div key={client.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <p className="text-sm text-muted-foreground">{client.cnpj}</p>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline" className="mr-2 bg-green-50">
                                  <Check className="mr-1 h-3 w-3 text-green-500" /> Aprovado
                                </Badge>
                                <p className="text-sm">{formatCurrency(client.creditLimit)}</p>
                              </div>
                            </div>
                            <div>
                              <Button variant="outline" size="sm">Ajustar</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
