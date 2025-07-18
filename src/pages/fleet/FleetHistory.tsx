
import { useState } from "react";
import { 
  Car, 
  Search, 
  Calendar, 
  FileText, 
  Download, 
  ArrowUp,
  ArrowDown,
  Check,
  Clock,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VehicleHistory {
  id: string;
  licensePlate: string;
  serviceType: string;
  date: string;
  provider: string;
  status: "completed" | "canceled" | "pending";
  cost: number;
}

// Sample data for demonstration
const mockHistoryData: VehicleHistory[] = [
  {
    id: "SRV-001",
    licensePlate: "ABC-1234",
    serviceType: "Troca de Óleo",
    date: "2024-04-10",
    provider: "Auto Serviços LTDA",
    status: "completed",
    cost: 120.00
  },
  {
    id: "SRV-002",
    licensePlate: "ABC-1234",
    serviceType: "Alinhamento e Balanceamento",
    date: "2024-03-15",
    provider: "Pneus Express",
    status: "completed",
    cost: 180.00
  },
  {
    id: "SRV-003",
    licensePlate: "DEF-5678",
    serviceType: "Revisão Geral 10.000km",
    date: "2024-04-05",
    provider: "Auto Serviços LTDA",
    status: "completed",
    cost: 350.00
  },
  {
    id: "SRV-004",
    licensePlate: "GHI-9012",
    serviceType: "Troca de Pastilhas de Freio",
    date: "2024-04-18",
    provider: "Centro Automotivo",
    status: "pending",
    cost: 220.00
  },
  {
    id: "SRV-005",
    licensePlate: "JKL-3456",
    serviceType: "Troca de Bateria",
    date: "2024-04-02",
    provider: "Auto Elétrica",
    status: "completed",
    cost: 480.00
  },
  {
    id: "SRV-006",
    licensePlate: "ABC-1234",
    serviceType: "Troca de Filtro de Ar",
    date: "2024-02-20",
    provider: "Auto Serviços LTDA",
    status: "canceled",
    cost: 65.00
  },
  {
    id: "SRV-007",
    licensePlate: "DEF-5678",
    serviceType: "Limpeza de Bicos Injetores",
    date: "2024-03-25",
    provider: "Centro Automotivo",
    status: "completed",
    cost: 140.00
  }
];

export function FleetHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof VehicleHistory;
    direction: "ascending" | "descending";
  } | null>(null);

  // Filter the data based on search term and status filter
  const filteredData = mockHistoryData.filter(item => {
    const matchesSearch = 
      item.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      !statusFilter || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort the data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Function to handle sorting
  const requestSort = (key: keyof VehicleHistory) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Function to render sort indicator
  const getSortIndicator = (key: keyof VehicleHistory) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="ml-1 h-4 w-4 inline" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4 inline" />
    );
  };

  // Function to render status badge
  const renderStatusBadge = (status: "completed" | "canceled" | "pending") => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300">
            <Check className="w-3 h-3 mr-1" /> Concluído
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-300">
            <Clock className="w-3 h-3 mr-1" /> Em Andamento
          </span>
        );
      case "canceled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancelado
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Histórico de Veículos</h1>
        <p className="text-muted-foreground">
          Consulte o histórico de serviços de todos os veículos da frota.
        </p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por placa, serviço ou fornecedor..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter || "all"}
            onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="completed">Concluídos</SelectItem>
              <SelectItem value="pending">Em Andamento</SelectItem>
              <SelectItem value="canceled">Cancelados</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2" variant="outline">
            <Calendar className="h-4 w-4" />
            <span>Filtrar Período</span>
          </Button>
          <Button className="gap-2" variant="outline">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>

        {sortedData.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => requestSort("id")}
                  >
                    ID {getSortIndicator("id")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => requestSort("licensePlate")}
                  >
                    Placa {getSortIndicator("licensePlate")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => requestSort("serviceType")}
                  >
                    Serviço {getSortIndicator("serviceType")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => requestSort("date")}
                  >
                    Data {getSortIndicator("date")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => requestSort("provider")}
                  >
                    Fornecedor {getSortIndicator("provider")}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => requestSort("status")}
                  >
                    Status {getSortIndicator("status")}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer"
                    onClick={() => requestSort("cost")}
                  >
                    Valor {getSortIndicator("cost")}
                  </TableHead>
                  <TableHead className="w-[80px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell className="font-medium">{history.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        {history.licensePlate}
                      </div>
                    </TableCell>
                    <TableCell>{history.serviceType}</TableCell>
                    <TableCell>{new Date(history.date).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>{history.provider}</TableCell>
                    <TableCell>
                      {renderStatusBadge(history.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {history.cost.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <History className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Nenhum histórico encontrado</h3>
            <p className="text-muted-foreground mt-1">
              Tente mudar os filtros ou termos de busca.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
