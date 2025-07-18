
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calendar, BarChart3, PieChart } from "lucide-react";
import { toast } from "sonner";

export function ShopReports() {
  const [dateRange, setDateRange] = useState("month");
  
  const handleDownloadReport = (reportType: string) => {
    toast.success(`Relatório de ${reportType} baixado com sucesso.`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">
          Visualize e exporte relatórios para analisar o desempenho da sua oficina.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm font-medium">Período:</div>
        <div className="flex items-center gap-2">
          <Button 
            variant={dateRange === "week" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setDateRange("week")}
          >
            Semanal
          </Button>
          <Button 
            variant={dateRange === "month" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setDateRange("month")}
          >
            Mensal
          </Button>
          <Button 
            variant={dateRange === "quarter" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setDateRange("quarter")}
          >
            Trimestral
          </Button>
          <Button 
            variant={dateRange === "year" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setDateRange("year")}
          >
            Anual
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financials">
        <TabsList>
          <TabsTrigger value="financials">Financeiro</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financials" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Faturamento Total
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 45.231,89</div>
                <p className="text-xs text-muted-foreground">
                  +12% em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Ticket Médio
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 873,60</div>
                <p className="text-xs text-muted-foreground">
                  +5% em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Contas a Receber
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 12.458,35</div>
                <p className="text-xs text-muted-foreground">
                  15 faturas pendentes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Despesas
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 23.145,72</div>
                <p className="text-xs text-muted-foreground">
                  -3% em relação ao período anterior
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Relatórios Financeiros</CardTitle>
              <CardDescription>
                Exporte relatórios financeiros para análise detalhada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Demonstrativo de Resultados</h4>
                        <p className="text-sm text-muted-foreground">Resumo financeiro do período</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("DRE")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Fluxo de Caixa</h4>
                        <p className="text-sm text-muted-foreground">Entradas e saídas financeiras</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("Fluxo de Caixa")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Contas a Receber</h4>
                        <p className="text-sm text-muted-foreground">Relatório de valores a receber</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("Contas a Receber")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Serviços
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <p className="text-xs text-muted-foreground">
                  +15% em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tempo Médio de Atendimento
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5 dias</div>
                <p className="text-xs text-muted-foreground">
                  -0.5 dias em relação ao período anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Serviços em Andamento
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14</div>
                <p className="text-xs text-muted-foreground">
                  5 em atraso
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Satisfação do Cliente
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5.0</div>
                <p className="text-xs text-muted-foreground">
                  +0.2 em relação ao período anterior
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Serviços</CardTitle>
              <CardDescription>
                Exporte relatórios de serviços para análise detalhada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Serviços por Tipo</h4>
                        <p className="text-sm text-muted-foreground">Detalhamento dos serviços realizados</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("Serviços por Tipo")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Tempo de Execução</h4>
                        <p className="text-sm text-muted-foreground">Análise de tempo por serviço</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("Tempo de Execução")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Avaliações de Clientes</h4>
                        <p className="text-sm text-muted-foreground">Feedback de satisfação</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("Avaliações")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Clientes</CardTitle>
              <CardDescription>
                Análise de clientes e comportamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <PieChart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Segmentação de Clientes</h4>
                        <p className="text-sm text-muted-foreground">Por tipo de frota</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("Segmentação")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Frequência de Visitas</h4>
                        <p className="text-sm text-muted-foreground">Recorrência de clientes</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("Frequência")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Lifetime Value</h4>
                        <p className="text-sm text-muted-foreground">Valor total por cliente</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("LTV")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Desempenho</CardTitle>
              <CardDescription>
                Análise de eficiência e produtividade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Produtividade da Equipe</h4>
                        <p className="text-sm text-muted-foreground">Horas trabalhadas x faturadas</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("Produtividade")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Ocupação da Oficina</h4>
                        <p className="text-sm text-muted-foreground">Taxa de ocupação por dia</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("Ocupação")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Eficiência por Serviço</h4>
                        <p className="text-sm text-muted-foreground">Comparativo de tempo x orçamento</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => handleDownloadReport("Eficiência")}
                    >
                      <Download className="h-4 w-4 mr-2" /> Exportar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ShopReports;
