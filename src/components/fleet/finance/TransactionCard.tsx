
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TransactionTable } from "./TransactionTable";
import { EmptyTransactionState } from "./EmptyTransactionState";
import { formatCurrency } from "@/utils/formatters";

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
}

interface TransactionCardProps {
  title: string;
  status: "pending" | "approved" | "rejected";
  transactions: Transaction[];
  totalAmount: number;
  onViewDetails: (transaction: Transaction) => void;
}

export function TransactionCard({ 
  title, 
  status, 
  transactions, 
  totalAmount, 
  onViewDetails 
}: TransactionCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between">
          <span>{title}</span>
          <span>{formatCurrency(totalAmount)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <EmptyTransactionState status={status} />
        ) : (
          <TransactionTable 
            transactions={transactions} 
            status={status} 
            onViewDetails={onViewDetails} 
          />
        )}
      </CardContent>
    </Card>
  );
}
