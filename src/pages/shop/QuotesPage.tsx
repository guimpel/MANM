
import React, { useState } from "react";
import { Search, Filter, MoreHorizontal, DollarSign, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for quotes
const quotesMockData = [
  {
    id: "Q-001",
    plate: "ABC-1234",
    customer: "Locadora Fast",
    serviceType: "Troca de óleo",
    requestDate: "2025-04-22T10:00:00",
    status: "pending",
    averagePrice: 150.00,
    suggestedPrice: 160.00,
  },
  {
    id: "Q-002",
    plate: "DEF-5678",
    customer: "Locadora Top Cars",
    serviceType: "Alinhamento",
    requestDate: "2025-04-21T15:30:00",
    status: "approved",
    averagePrice: 120.00,
    suggestedPrice: 110.00,
  },
  {
    id: "Q-003",
    plate: "GHI-9012",
    customer: "Locadora Fast",
    serviceType: "Revisão completa",
    requestDate: "2025-04-20T09:15:00",
    status: "rejected",
    averagePrice: 450.00,
    suggestedPrice: 550.00,
  },
];

// Type for the quote entries
type Quote = typeof quotesMockData[0];

// Filters options
const statusOptions = [
  { value: "all", label: "Todos os status" },
  { value: "pending", label: "Pendentes" },
  { value: "approved", label: "Aprovados" },
  { value: "rejected", label: "Rejeitados" },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
};

// Function to get price status color
const getPriceStatusInfo = (averagePrice: number, suggestedPrice: number) => {
  const priceDiff = ((suggestedPrice - averagePrice) / averagePrice) * 100;
  
  if (priceDiff <= -5) {
    return {
      color: "text-blue-500",
      bg: "bg-blue-50",
      icon: <CheckCircle className="h-4 w-4 text-blue-500" />,
      label: "Abaixo da média"
    };
  } else if (priceDiff <= 5) {
    return {
      color: "text-green-500",
      bg: "bg-green-50",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
      label: "Dentro da média"
    };
  } else if (priceDiff <= 15) {
    return {
      color: "text-amber-500",
      bg: "bg-amber-50",
      icon: <AlertCircle className="h-4 w-4 text-amber-500" />,
      label: "Acima da média"
    };
  } else {
    return {
      color: "text-red-500",
      bg: "bg-red-50",
      icon: <XCircle className="h-4 w-4 text-red-500" />,
      label: "Muito acima da média"
    };
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pendente</Badge>;
    case "approved":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Aprovado</Badge>;
    case "rejected":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejeitado</Badge>;
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

export function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [quotePrice, setQuotePrice] = useState<string>("");

  // Filtered quotes based on search and filters
  const filteredQuotes = quotesMockData.filter(quote => {
    const matchesSearch = 
      quote.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleQuoteClick = (quote: Quote) => {
    setSelectedQuote(quote);
    setQuotePrice(quote.suggestedPrice.toString());
    setDialogOpen(true);
  };

  const handleSubmitQuote = () => {
    if (!quotePrice || isNaN(parseFloat(quotePrice)) || parseFloat(quotePrice) <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, informe um valor válido para o orçamento.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send the quote to the backend
    toast({
      title: "Orçamento enviado",
      description: "O orçamento foi enviado com sucesso para aprovação."
    });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Orçamentos</h1>
        <p className="text-muted-foreground">
          Gerencie os orçamentos para solicitações de serviço
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por placa, cliente ou tipo de serviço"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtros
          {statusFilter !== "all" && (
            <Badge className="ml-2 bg-primary/20 text-primary border-0 hover:bg-primary/20">
              1
            </Badge>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-4">
        {filteredQuotes.length === 0 ? (
          <div className="text-center p-8">
            <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-2 text-lg font-medium">Nenhum orçamento encontrado</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Tente ajustar seus filtros ou busca para encontrar o que está procurando.
            </p>
          </div>
        ) : (
          filteredQuotes.map((quote) => {
            const priceStatus = getPriceStatusInfo(quote.averagePrice, quote.suggestedPrice);
            
            return (
              <Card 
                key={quote.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleQuoteClick(quote)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{quote.id}</CardTitle>
                        {getStatusBadge(quote.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Solicitado em: {formatDate(quote.requestDate)}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mais opções</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleQuoteClick(quote);
                        }}>
                          Editar orçamento
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          Ver detalhes do serviço
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Cliente</p>
                      <p className="text-sm text-muted-foreground">{quote.customer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Veículo</p>
                      <p className="text-sm text-muted-foreground">Placa: {quote.plate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Serviço</p>
                      <p className="text-sm text-muted-foreground">{quote.serviceType}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-between items-center pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${priceStatus.bg}`}>
                              {priceStatus.icon}
                              <span className={`text-xs font-medium ${priceStatus.color}`}>
                                {priceStatus.label}
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Preço médio na região: R$ {quote.averagePrice.toFixed(2)}</p>
                            <p>Seu preço: R$ {quote.suggestedPrice.toFixed(2)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    <div className="flex items-center">
                      <p className="font-medium text-base">
                        R$ {quote.suggestedPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Orçamento {selectedQuote?.id}</DialogTitle>
            <DialogDescription>
              Cliente: {selectedQuote?.customer} | Placa: {selectedQuote?.plate}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Serviço</p>
              <p>{selectedQuote?.serviceType}</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Preço Médio na Região</p>
              <p className="text-muted-foreground">R$ {selectedQuote?.averagePrice.toFixed(2)}</p>
            </div>

            <div>
              <label htmlFor="price" className="text-sm font-medium mb-1 block">Valor do Orçamento</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">R$</span>
                <Input
                  id="price"
                  className="pl-9"
                  value={quotePrice}
                  onChange={(e) => {
                    // Allow only numbers and one decimal point
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value)) {
                      setQuotePrice(value);
                    }
                  }}
                  type="text"
                  placeholder="0.00"
                />
              </div>

              {selectedQuote && quotePrice && !isNaN(parseFloat(quotePrice)) && (
                <div className="mt-2">
                  {(() => {
                    const priceStatus = getPriceStatusInfo(selectedQuote.averagePrice, parseFloat(quotePrice));
                    return (
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${priceStatus.bg} inline-flex`}>
                        {priceStatus.icon}
                        <span className={`text-xs font-medium ${priceStatus.color}`}>
                          {priceStatus.label}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="flex justify-between sm:justify-end">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmitQuote}>
              {selectedQuote?.status === "pending" ? "Enviar Orçamento" : "Atualizar Orçamento"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
