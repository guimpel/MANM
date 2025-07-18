
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
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard,
  DollarSign,
  Search,
  ArrowUpCircle,
  ArrowDownCircle,
  FileText,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const invoices = [
  {
    id: "INV-2023-001",
    client: "TransporteMax Ltda",
    service: "Revisão completa de freios",
    amount: 1850.75,
    date: "2025-04-15",
    status: "paid"
  },
  {
    id: "INV-2023-002",
    client: "Frotex Logística",
    service: "Troca de óleo e filtros",
    amount: 680.50,
    date: "2025-04-18",
    status: "pending"
  },
  {
    id: "INV-2023-003",
    client: "Transportadora Express",
    service: "Alinhamento e balanceamento",
    amount: 350.00,
    date: "2025-04-22",
    status: "paid"
  },
  {
    id: "INV-2023-004",
    client: "TransporteMax Ltda",
    service: "Substituição de amortecedores",
    amount: 1250.30,
    date: "2025-04-25",
    status: "pending"
  },
  {
    id: "INV-2023-005",
    client: "Logística Rápida S.A.",
    service: "Diagnóstico eletrônico",
    amount: 420.00,
    date: "2025-04-28",
    status: "overdue"
  }
];

const payments = [
  {
    id: "PMT-2023-001",
    client: "TransporteMax Ltda",
    invoice: "INV-2023-001",
    amount: 1850.75,
    date: "2025-04-15",
    method: "credit_card"
  },
  {
    id: "PMT-2023-002",
    client: "Transportadora Express",
    invoice: "INV-2023-003",
    amount: 350.00,
    date: "2025-04-22",
    method: "bank_transfer"
  }
];

const expenses = [
  {
    id: "EXP-2023-001",
    supplier: "Auto Peças Ltda",
    description: "Peças para estoque",
    amount: 3500.00,
    date: "2025-04-10",
    category: "inventory"
  },
  {
    id: "EXP-2023-002",
    supplier: "Serviços Gerais",
    description: "Manutenção de equipamentos",
    amount: 850.25,
    date: "2025-04-12",
    category: "maintenance"
  },
  {
    id: "EXP-2023-003",
    supplier: "Distribuidora Óleo e Cia",
    description: "Óleo para câmbio",
    amount: 1250.80,
    date: "2025-04-18",
    category: "inventory"
  },
  {
    id: "EXP-2023-004",
    supplier: "Energia Elétrica S.A.",
    description: "Conta de energia",
    amount: 750.00,
    date: "2025-04-20",
    category: "utilities"
  }
];

export function ShopFinance() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleMarkAsPaid = (id: string) => {
    toast.success(`Fatura ${id} marcada como paga.`);
  };

  const handleSendReminder = (id: string) => {
    toast.success(`Lembrete enviado para a fatura ${id}.`);
  };

  const filteredInvoices = invoices.filter(
    invoice => 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate financial metrics
  const totalReceivables = invoices
    .filter(inv => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);
  
  const totalRevenue = payments.reduce((sum, pmt) => sum + pmt.amount, 0);
  
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const profit = totalRevenue - totalExpenses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-muted-foreground">
          Gerencie as finanças da sua oficina, faturas e pagamentos.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total a Receber
            </CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              }).format(totalReceivables)}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter(inv => inv.status === "pending" || inv.status === "overdue").length} faturas pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              }).format(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">
              Mês atual
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Despesas
            </CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              }).format(totalExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">
              Mês atual
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lucro
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              }).format(profit)}
            </div>
            <p className="text-xs text-muted-foreground">
              Mês atual
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">Faturas</TabsTrigger>
          <TabsTrigger value="payments">Pagamentos</TabsTrigger>
          <TabsTrigger value="expenses">Despesas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="invoices" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Faturas</CardTitle>
              <CardDescription>
                Gerencie todas as faturas de clientes
              </CardDescription>
              <div className="relative flex-1 pt-2">
                <Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por ID ou cliente..."
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
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.service}</TableCell>
                      <TableCell>{new Date(invoice.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(invoice.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={invoice.status === "paid" ? "outline" : 
                                  invoice.status === "pending" ? "secondary" : "destructive"}
                        >
                          {invoice.status === "paid" ? "Pago" : 
                           invoice.status === "pending" ? "Pendente" : "Atrasado"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {invoice.status !== "paid" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleMarkAsPaid(invoice.id)}
                            >
                              Marcar Pago
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleSendReminder(invoice.id)}
                            >
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Exportar</Button>
              <Button>Nova Fatura</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pagamentos Recebidos</CardTitle>
              <CardDescription>
                Histórico de pagamentos recebidos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fatura</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.client}</TableCell>
                      <TableCell>{payment.invoice}</TableCell>
                      <TableCell>{new Date(payment.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(payment.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {payment.method === "credit_card" ? "Cartão de Crédito" : "Transferência"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Despesas</CardTitle>
              <CardDescription>
                Gerenciamento de despesas da oficina
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.id}</TableCell>
                      <TableCell>{expense.supplier}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{new Date(expense.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(expense.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            expense.category === "inventory" ? "secondary" : 
                            expense.category === "maintenance" ? "outline" : "default"
                          }
                        >
                          {expense.category === "inventory" ? "Estoque" : 
                           expense.category === "maintenance" ? "Manutenção" : "Serviços"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Exportar</Button>
              <Button>Nova Despesa</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ShopFinance;
