
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
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Search, Filter } from "lucide-react";
import { toast } from "sonner";

interface FiscalDocument {
  id: string;
  type: string;
  number: string;
  issueDate: string;
  dueDate: string;
  value: number;
  status: "pending" | "processed" | "error";
  company: string;
}

const mockFiscalDocuments: FiscalDocument[] = [
  { 
    id: "doc1", 
    type: "NF-e", 
    number: "123456789", 
    issueDate: "2025-01-10", 
    dueDate: "2025-02-10", 
    value: 1250.75, 
    status: "processed", 
    company: "Auto Peças Ltda" 
  },
  { 
    id: "doc2", 
    type: "NFS-e", 
    number: "987654321", 
    issueDate: "2025-01-15", 
    dueDate: "2025-02-15", 
    value: 3500.00, 
    status: "pending", 
    company: "Serviços Automotivos SA" 
  },
  { 
    id: "doc3", 
    type: "NF-e", 
    number: "456789123", 
    issueDate: "2025-01-20", 
    dueDate: "2025-02-20", 
    value: 899.99, 
    status: "error", 
    company: "Distribuidora de Lubrificantes" 
  },
  { 
    id: "doc4", 
    type: "CT-e", 
    number: "741852963", 
    issueDate: "2025-01-25", 
    dueDate: "2025-02-25", 
    value: 450.00, 
    status: "processed", 
    company: "Transportadora Express" 
  },
];

const Fiscal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("documentos");

  const handleDownloadReport = () => {
    toast.success("Relatório fiscal gerado com sucesso!");
  };

  const handleProcessDocument = (id: string) => {
    toast.success(`Documento ${id} processado com sucesso!`);
  };

  const filteredDocuments = mockFiscalDocuments.filter(doc => 
    doc.number.includes(searchTerm) || 
    doc.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão Fiscal</h1>
          <p className="text-muted-foreground">
            Acompanhe e gerencie documentos fiscais da sua empresa
          </p>
        </div>
        <Button onClick={handleDownloadReport}>
          <Download className="mr-2 h-4 w-4" /> Exportar Relatório
        </Button>
      </div>

      <Tabs defaultValue="documentos" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="obrigacoes">Obrigações</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="documentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Fiscais</CardTitle>
              <CardDescription>
                Gerencie notas fiscais, conhecimentos de transporte e outros documentos fiscais
              </CardDescription>
              
              <div className="flex items-center gap-2 pt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por número ou empresa..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Emissão</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.number}</TableCell>
                      <TableCell>{doc.company}</TableCell>
                      <TableCell>{new Date(doc.issueDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{new Date(doc.dueDate).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell className="text-right">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(doc.value)}
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          doc.status === 'processed' ? 'bg-green-100 text-green-800' :
                          doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {doc.status === 'processed' ? 'Processado' :
                          doc.status === 'pending' ? 'Pendente' : 'Erro'}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleProcessDocument(doc.id)}
                          disabled={doc.status === 'processed'}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Processar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="obrigacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Obrigações Fiscais</CardTitle>
              <CardDescription>
                Acompanhe o calendário de obrigações fiscais da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SPED Fiscal</h3>
                      <p className="text-sm text-muted-foreground">Vencimento: 10/05/2025</p>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">
                      Pendente
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">EFD Contribuições</h3>
                      <p className="text-sm text-muted-foreground">Vencimento: 15/05/2025</p>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">
                      Pendente
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">DCTF</h3>
                      <p className="text-sm text-muted-foreground">Vencimento: 15/04/2025</p>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      Entregue
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="configuracoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Fiscais</CardTitle>
              <CardDescription>
                Configure parâmetros fiscais para sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="regimeTributario" className="text-sm font-medium">
                      Regime Tributário
                    </label>
                    <select
                      id="regimeTributario"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="simples">Simples Nacional</option>
                      <option value="presumido">Lucro Presumido</option>
                      <option value="real">Lucro Real</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="crt" className="text-sm font-medium">
                      CRT (Código de Regime Tributário)
                    </label>
                    <select
                      id="crt"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="1">1 - Simples Nacional</option>
                      <option value="2">2 - Simples Nacional (Excesso)</option>
                      <option value="3">3 - Regime Normal</option>
                    </select>
                  </div>
                </div>
                
                <Button className="mt-4">Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Fiscal;
