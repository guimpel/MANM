
import { ChartContainer as Chart } from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockMetrics, mockClients, mockProviders } from "@/mocks/integratorData";
import { BarChart3, Building, CheckCircle, Clock, CreditCard, Store as StoreIcon, TrendingUp, Users } from "lucide-react";

// Define the chart data types
interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }>;
}

// Define the chart configuration type
interface ChartConfig {
  type: string;
  options: Record<string, any>;
}

export default function IntegratorDashboard() {
  // Dados para o gráfico de clientes
  const clientChartData: ChartData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Clientes Ativos",
        data: [42, 49, 65, 78, 86, 94],
        backgroundColor: "#8B5CF6",
      }
    ],
  };
  
  // Configuração do gráfico de clientes
  const clientChartConfig: ChartConfig = {
    type: "bar",
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Número de Clientes"
          }
        },
        x: {
          title: {
            display: true,
            text: "Mês"
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Evolução de Clientes 2025"
        },
        legend: {
          position: "top",
        },
      },
      responsive: true,
    },
  };
  
  // Dados para o gráfico de receita
  const revenueChartData: ChartData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Receita (R$ mil)",
        data: [120, 135, 180, 210, 250, 290],
        backgroundColor: "#10B981",
        borderColor: "#10B981",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
      {
        label: "Custos (R$ mil)",
        data: [80, 90, 120, 150, 170, 200],
        backgroundColor: "#EF4444",
        borderColor: "#EF4444",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      }
    ],
  };
  
  // Configuração do gráfico de receita
  const revenueChartConfig: ChartConfig = {
    type: "line",
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Valor (R$ mil)"
          }
        },
        x: {
          title: {
            display: true,
            text: "Mês"
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: "Receita vs Custos 2025"
        },
        legend: {
          position: "top",
        },
      },
      responsive: true,
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Painel de Controle</h1>
        <p className="text-muted-foreground">
          Visão geral da operação da plataforma integradora.
        </p>
      </div>

      {/* Cartões de métricas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockMetrics.slice(0, 4).map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.name}
              </CardTitle>
              <div className={`rounded-full p-1 ${metric.change > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {metric.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingUp className="h-4 w-4 rotate-180" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}{metric.unit === '%' || metric.unit === 'R$' ? metric.unit : ''}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change > 0 ? '+' : ''}{metric.change}% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Evolução de Clientes</CardTitle>
            <CardDescription>Crescimento do número de clientes nos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart config={{}} children={
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Gráfico de evolução de clientes
              </div>
            } className="aspect-[3/2]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Desempenho Financeiro</CardTitle>
            <CardDescription>Comparativo entre receitas e despesas</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart config={{}} children={
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Gráfico de desempenho financeiro
              </div>
            } className="aspect-[3/2]" />
          </CardContent>
        </Card>
      </div>

      {/* Status dos Clientes e Fornecedores */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" /> 
                Clientes Recentes
              </CardTitle>
              <CardDescription>Últimos clientes cadastrados</CardDescription>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockClients.slice(0, 3).map((client) => (
                <div key={client.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      client.subscription.status === 'active' ? 'bg-green-500' : 
                      client.subscription.status === 'trial' ? 'bg-blue-500' : 
                      'bg-amber-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {client.subscription.status === 'active' ? 'Ativo' : 
                         client.subscription.status === 'trial' ? 'Em Teste' : 
                         'Pendente'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {client.paymentStatus === 'paid' ? (
                        <span className="text-green-600 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" /> Adimplente
                        </span>
                      ) : client.paymentStatus === 'pending' ? (
                        <span className="text-amber-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> Pendente
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center">
                          <CreditCard className="h-3 w-3 mr-1" /> Em Atraso
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Desde {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <StoreIcon className="mr-2 h-5 w-5" /> 
                Fornecedores por Região
              </CardTitle>
              <CardDescription>Distribuição geográfica da rede</CardDescription>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded-full">
              <BarChart3 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <Chart
                config={{}}
                children={
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Gráfico de distribuição de fornecedores
                  </div>
                }
                className="aspect-square max-w-xs mx-auto"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
