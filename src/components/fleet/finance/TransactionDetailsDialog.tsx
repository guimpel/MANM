
import { useState } from "react";
import { Check, X, AlertCircle } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate, formatCurrency } from "@/utils/formatters";
import { toast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  serviceId: string;
  plate: string;
  provider: string;
  serviceType: string;
  date: string;
  amount: number;
  status: string;
  approvedDate?: string;
  rejectedDate?: string;
  rejectionReason?: string;
}

interface TransactionDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

export function TransactionDetailsDialog({ 
  open, 
  onOpenChange, 
  transaction 
}: TransactionDetailsDialogProps) {
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprovePayment = () => {
    toast({
      title: "Pagamento aprovado",
      description: `Pagamento de ${formatCurrency(transaction?.amount || 0)} aprovado com sucesso.`
    });
    onOpenChange(false);
  };

  const handleRejectPayment = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Motivo obrigatório",
        description: "Por favor, informe o motivo da rejeição.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pagamento rejeitado",
      description: `O pagamento foi rejeitado e o fornecedor será notificado.`
    });
    onOpenChange(false);
    setRejectionReason("");
  };

  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Pagamento</DialogTitle>
          <DialogDescription>
            Referência: {transaction.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Ordem de Serviço</p>
              <p>{transaction.serviceId}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Data</p>
              <p>{formatDate(transaction.date)}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium">Fornecedor</p>
            <p>{transaction.provider}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium">Detalhes do Serviço</p>
            <p>{transaction.serviceType} - Placa: {transaction.plate}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium">Valor</p>
            <p className="text-xl font-bold">{formatCurrency(transaction.amount)}</p>
          </div>
          
          {transaction.rejectionReason && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm font-medium flex items-center gap-1 text-red-700">
                <AlertCircle className="h-4 w-4" />
                Motivo da rejeição
              </p>
              <p className="text-sm text-red-600">{transaction.rejectionReason}</p>
            </div>
          )}
          
          {transaction.approvedDate && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3">
              <p className="text-sm font-medium flex items-center gap-1 text-green-700">
                <Check className="h-4 w-4" />
                Aprovado em {formatDate(transaction.approvedDate)}
              </p>
            </div>
          )}
          
          {transaction.status === 'pending' && (
            <div className="space-y-4">
              <div className="border-t pt-4">
                <p className="text-sm font-medium mb-2">Ações</p>
                <div className="space-y-4">
                  <Button onClick={handleApprovePayment} className="w-full">
                    <Check className="mr-2 h-4 w-4" />
                    Aprovar Pagamento
                  </Button>
                  
                  <div>
                    <label htmlFor="rejection-reason" className="text-sm font-medium mb-1 block">
                      Motivo da rejeição
                    </label>
                    <Input
                      id="rejection-reason"
                      placeholder="Informe o motivo da rejeição"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 hover:text-red-700"
                    onClick={handleRejectPayment}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Rejeitar Pagamento
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {transaction.status !== 'pending' && (
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
