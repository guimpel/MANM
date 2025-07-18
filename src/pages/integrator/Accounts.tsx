
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
import { CreditCard, Search, Plus, FileText, Check } from "lucide-react";
import { toast } from "sonner";

interface Bill {
  id: string;
  description: string;
  category: string;
  supplier: string;
  dueDate: string;
  value: number;
  status: "pending" | "paid" | "overdue";
}

const mockBills: Bill[] = [
  {
    id: "bill1",
    description: "Fornecimento de Peças Automotivas",
    category: "Estoque",
    supplier: "Auto Peças Ltda",
    dueDate: "2025-05-15",
    value: 4750.80,
    status: "pending"
  },
  {
    id: "bill2",
    description: "Serviço de Manutenção Predial",
    category: "Manutenção",
    supplier: "Serviços Gerais SA",
    dueDate: "2025-05-05",
    value: 1200.00,
    status: "paid"
  },
  {
    id: "bill3",
    description: "Aluguel do Galpão Principal",
    category: "Aluguel",
    supplier: "Imobiliária Central",
    dueDate: "2025-05-10",
    value: 8500.00,
    status: "pending"
  },
  {
    id: "bill4",
    description: "Pagamento de Software ERP",
    category: "Software",
    supplier: "TechSystems",
    dueDate: "2025-04-20",
    value: 3200.00,
    status: "overdue"
  },
  {
    id: "bill5",
    description: "Materiais de Escritório",
    category: "Suprimentos",
    supplier: "Papelaria Total",
    dueDate: "2025-05-25",
    value: 450.25,
    status: "pending"
  }
];

const Accounts = () => {
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newBill, setNewBill] = useState<Partial<Bill>>({
    description: "",
    category: "",
    supplier: "",
    dueDate: "",
    value: 0,
    status: "pending"
  });

  const handleAddBill = () => {
    const billToAdd = {
      ...newBill,
      id: `bill${Date.now()}`,
    } as Bill;
    
    setBills([...bills, billToAdd]);
    toast.success("Conta adicionada com sucesso!");
    setOpenDialog(false);
    setNewBill({
      description: "",
      category: "",
      supplier: "",
      dueDate: "",
      value: 0,
      status: "pending"
    });
  };

  const handlePayBill = (id: string) => {
    setBills(bills.map(bill => 
      bill.id === id ? { ...bill, status: "paid" } : bill
    ));
    toast.success("Pagamento registrado com sucesso!");
  };

  const filteredBills = bills.filter(bill => 
    bill.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
    bill.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPending = filteredBills
    .filter(bill => bill.status === "pending" || bill.status === "overdue")
    .reduce((acc, bill) => acc + bill.value, 0);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Pago";
      case "pending":
        return "Pendente";
      case "overdue":
        return "Atrasado";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contas a Pagar</h1>
          <p className="text-muted-foreground">
            Gerencie pagamentos e controle as contas da sua empresa
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Conta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Conta</DialogTitle>
              <DialogDescription>
                Preencha os detalhes da nova conta a pagar
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Input 
                  id="description" 
                  placeholder="Descreva a conta" 
                  value={newBill.description}
                  onChange={(e) => setNewBill({...newBill, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input 
                    id="category" 
                    placeholder="Categoria" 
                    value={newBill.category}
                    onChange={(e) => setNewBill({...newBill, category: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="supplier">Fornecedor</Label>
                  <Input 
                    id="supplier" 
                    placeholder="Nome do fornecedor" 
                    value={newBill.supplier}
                    onChange={(e) => setNewBill({...newBill, supplier: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Data de Vencimento</Label>
                  <Input 
                    id="dueDate" 
                    type="date" 
                    value={newBill.dueDate}
                    onChange={(e) => setNewBill({...newBill, dueDate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="value">Valor (R$)</Label>
                  <Input 
                    id="value" 
                    type="number"
                    placeholder="0.00"
                    value={newBill.value || ""}
                    onChange={(e) => setNewBill({...newBill, value: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancelar</Button>
              <Button onClick={handleAddBill}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total a Pagar
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalPending)}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredBills.filter(b => b.status === "pending" || b.status === "overdue").length} contas pendentes
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contas a Pagar</CardTitle>
          <CardDescription>
            Listagem de todas as contas a pagar da empresa
          </CardDescription>
          <div className="relative flex-1 pt-2">
            <Search className="absolute left-2.5 top-4 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por descrição ou fornecedor..."
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
                <TableHead>Descrição</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.description}</TableCell>
                  <TableCell>{bill.supplier}</TableCell>
                  <TableCell>{bill.category}</TableCell>
                  <TableCell>{new Date(bill.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(bill.value)}
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusBadgeColor(bill.status)}`}>
                      {getStatusText(bill.status)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePayBill(bill.id)}
                        disabled={bill.status === "paid"}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Pagar
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
    </div>
  );
};

export default Accounts;
