
import { useState } from "react";
import { 
  BarChart4, 
  FileBarChart, 
  Filter, 
  Download, 
  LineChart,
  Car,
  Wrench,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart as RechartLineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { cn } from "@/lib/utils";

// Sample data for demonstration purposes
const costByServiceData = [
  { service: "Troca de Óleo", cost: 7500 },
  { service: "Alinhamento", cost: 5200 },
  { service: "Freios", cost: 12000 },
  { service: "Suspensão", cost: 9800 },
  { service: "Bateria", cost: 4500 },
  { service: "Elétrica", cost: 3800 }
];

const monthlyCostsData = [
  { name: "Jan", cost: 15000 },
  { name: "Fev", cost: 18000 },
  { name: "Mar", cost: 14000 },
  { name: "Abr", cost: 22000 },
  { name: "Mai", cost: 19500 },
  { name: "Jun", cost: 24000 },
];

const providerSpeedData = [
  { name: "Auto Serviços LTDA", avgTimeHours: 8 },
  { name: "Pneus Express", avgTimeHours: 12 },
  { name: "Centro Automotivo", avgTimeHours: 9 },
  { name: "Auto Elétrica", avgTimeHours: 6 },
];

const vehicleMaintenanceData = [
  { plate: "ABC-1234", count: 12, isAtypical: true },
  { plate: "DEF-5678", count: 5, isAtypical: false },
  { plate: "GHI-9012", count: 4, isAtypical: false },
  { plate: "JKL-3456", count: 15, isAtypical: true },
  { plate: "MNO-7890", count: 3, isAtypical: false },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function FleetAnalytics() {
  const [cnpjFilter, setCnpjFilter] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [plateFilter, setPlateFilter] = useState<string>("");
  const [timeRange, setTimeRange] = useState<string>("month");

  // Filter function for the tabular data
  const filteredVehicleData = vehicleMaintenanceData.filter(item => {
    return (
      item.plate.toLowerCase().includes(plateFilter.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relatórios Analíticos</h1>
        <p className="text-muted-foreground">
          Visualize dados e estatísticas sobre os serviços realizados na frota
        </p>
      </div>

      {/* Filters Section */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filtrar por CNPJ..."
              className="pl-9"
              value={cnpjFilter}
              onChange={(e) => setCnpjFilter(e.target.value)}
            />
          </div>
          <Select
            value={serviceFilter}
            onValueChange={(value) => setServiceFilter(value)}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Tipo de Serviço" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os serviços</SelectItem>
              <SelectItem value="oil">Troca de Óleo</SelectItem>
              <SelectItem value="alignment">Alinhamento</SelectItem>
              <SelectItem value="brakes">Freios</SelectItem>
              <SelectItem value="suspension">Suspensão</SelectItem>
              <SelectItem value="battery">Bateria</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex-1 relative">
            <Car className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filtrar por placa..."
              className="pl-9"
              value={plateFilter}
              onChange={(e) => setPlateFilter(e.target.value)}
            />
          </div>
          <Select
            value={timeRange}
            onValueChange={(value) => setTimeRange(value)}
          >
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Último mês</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="semester">Semestre</SelectItem>
              <SelectItem value="year">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtrar</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </Card>

      {/* Main Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost by Service Type Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Custo por Tipo de Serviço</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costByServiceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="service" />
                <YAxis tickFormatter={(value) => `R$ ${value / 100}`} />
                <Tooltip formatter={(value) => `R$ ${(value as number / 100).toFixed(2)}`} />
                <Legend />
                <Bar dataKey="cost" name="Custo (R$)" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Cost Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tendência de Custos Mensais</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <RechartLineChart data={monthlyCostsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `R$ ${value / 100}`} />
                <Tooltip formatter={(value) => `R$ ${(value as number / 100).toFixed(2)}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cost" 
                  name="Custo (R$)" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </RechartLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Service Provider Speed */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tempo Médio de Atendimento por Fornecedor</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={providerSpeedData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis 
                  dataKey="name" 
                  type="category"
                />
                <XAxis 
                  type="number" 
                  tickFormatter={(value) => `${value}h`} 
                />
                <Tooltip formatter={(value) => `${value} horas`} />
                <Legend />
                <Bar 
                  dataKey="avgTimeHours" 
                  name="Tempo Médio (h)" 
                  fill="#82ca9d" 
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicles with Atypical Maintenance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Veículos com Manutenção Atípica</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 h-[300px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Placa</TableHead>
                  <TableHead>Nº de Manutenções</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicleData.map((vehicle) => (
                  <TableRow key={vehicle.plate}>
                    <TableCell className="font-medium">{vehicle.plate}</TableCell>
                    <TableCell>{vehicle.count}</TableCell>
                    <TableCell>
                      <span 
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          vehicle.isAtypical 
                            ? "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300" 
                            : "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300"
                        )}
                      >
                        {vehicle.isAtypical ? 'Atípico' : 'Normal'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Additional metrics in smaller cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Custo Total do Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 1.135,00</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao período anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Fornecedor Mais Utilizado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Auto Serviços LTDA</div>
            <p className="text-xs text-muted-foreground">42% dos serviços</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Veículo com Maior Custo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">ABC-1234</div>
            <p className="text-xs text-muted-foreground">R$ 420,00 no período</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Serviço Mais Solicitado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Troca de Óleo</div>
            <p className="text-xs text-muted-foreground">23 ocorrências</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed cost breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento de Custos por Veículo</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Placa</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">ABC-1234</TableCell>
                <TableCell>Auto Serviços LTDA</TableCell>
                <TableCell>Troca de Óleo</TableCell>
                <TableCell>15/04/2025</TableCell>
                <TableCell className="text-right">R$ 120,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">ABC-1234</TableCell>
                <TableCell>Pneus Express</TableCell>
                <TableCell>Alinhamento</TableCell>
                <TableCell>10/04/2025</TableCell>
                <TableCell className="text-right">R$ 180,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">DEF-5678</TableCell>
                <TableCell>Centro Automotivo</TableCell>
                <TableCell>Revisão 10.000km</TableCell>
                <TableCell>05/04/2025</TableCell>
                <TableCell className="text-right">R$ 350,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">GHI-9012</TableCell>
                <TableCell>Auto Serviços LTDA</TableCell>
                <TableCell>Troca de Pastilhas</TableCell>
                <TableCell>01/04/2025</TableCell>
                <TableCell className="text-right">R$ 220,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">JKL-3456</TableCell>
                <TableCell>Auto Elétrica</TableCell>
                <TableCell>Troca de Bateria</TableCell>
                <TableCell>28/03/2025</TableCell>
                <TableCell className="text-right">R$ 480,00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
