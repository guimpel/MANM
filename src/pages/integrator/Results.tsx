
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, PieChart, LineChart, ArrowUp, ArrowDown } from "lucide-react";

// Mock data for charts
const mockFinancialData = {
  revenue: [
    { month: "Jan", value: 45000 },
    { month: "Fev", value: 52000 },
    { month: "Mar", value: 49000 },
    { month: "Abr", value: 63000 },
    { month: "Mai", value: 58000 },
    { month: "Jun", value: 68000 }
  ],
  expenses: [
    { month: "Jan", value: 38000 },
    { month: "Fev", value: 42000 },
    { month: "Mar", value: 40000 },
    { month: "Abr", value: 45000 },
    { month: "Mai", value: 44000 },
    { month: "Jun", value: 47000 }
  ],
  profit: [
    { month: "Jan", value: 7000 },
    { month: "Fev", value: 10000 },
    { month: "Mar", value: 9000 },
    { month: "Abr", value: 18000 },
    { month: "Mai", value: 14000 },
    { month: "Jun", value: 21000 }
  ],
  categories: {
    expenses: [
      { name: "Operacional", value: 45 },
      { name: "Pessoal", value: 30 },
      { name: "Marketing", value: 15 },
      { name: "Impostos", value: 10 }
    ],
    revenue: [
      { name: "Serviços", value: 65 },
      { name: "Produtos", value: 25 },
      { name: "Assinaturas", value: 10 }
    ]
  }
};

const Results = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resultados</h1>
          <p className="text-muted-foreground">
            Acompanhe os resultados financeiros da sua empresa
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="2025">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Total (2025)
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 335.000</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+12.5% em relação a 2024</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Despesas Totais (2025)
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 256.000</div>
            <div className="flex items-center text-xs text-red-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+8.2% em relação a 2024</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lucro (2025)
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 79.000</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+18.4% em relação a 2024</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Margem de Lucro
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.6%</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+1.2% em relação a 2024</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="revenue">Receitas</TabsTrigger>
          <TabsTrigger value="expenses">Despesas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Receita vs. Despesas</CardTitle>
                <CardDescription>
                  Comparativo dos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex flex-col items-center justify-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                    <span className="text-sm">Receita</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                    <span className="text-sm">Despesas</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                    <span className="text-sm">Lucro</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-center mt-4">
                  Visualização gráfica será implementada em breve.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Evolução do Lucro</CardTitle>
                <CardDescription>
                  Crescimento mensal
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex flex-col items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">
                  Visualização gráfica será implementada em breve.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receitas por Categoria</CardTitle>
              <CardDescription>
                Distribuição de receitas por tipo
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex flex-col items-center justify-center">
              <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
              <div className="grid grid-cols-3 gap-4 mt-4">
                {mockFinancialData.categories.revenue.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-blue-${(index + 3) * 100}`}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-center mt-4">
                Visualização gráfica será implementada em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Despesas por Categoria</CardTitle>
              <CardDescription>
                Distribuição de despesas por tipo
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex flex-col items-center justify-center">
              <PieChart className="h-16 w-16 text-muted-foreground mb-4" />
              <div className="grid grid-cols-4 gap-4 mt-4">
                {mockFinancialData.categories.expenses.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-red-${(index + 3) * 100}`}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-center mt-4">
                Visualização gráfica será implementada em breve.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Results;
