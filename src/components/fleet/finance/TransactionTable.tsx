
import { ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency } from "@/utils/formatters";

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

interface TransactionTableProps {
  transactions: Transaction[];
  status: "pending" | "approved" | "rejected";
  onViewDetails: (transaction: Transaction) => void;
}

export function TransactionTable({ transactions, status, onViewDetails }: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Referência</TableHead>
            <TableHead>Placa</TableHead>
            <TableHead className="hidden md:table-cell">Fornecedor</TableHead>
            <TableHead className="hidden lg:table-cell">Serviço</TableHead>
            <TableHead className="hidden sm:table-cell">Data</TableHead>
            {status === "approved" && (
              <TableHead className="hidden md:table-cell">Data Aprovação</TableHead>
            )}
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow 
              key={transaction.id} 
              className="cursor-pointer hover:bg-muted/50" 
              onClick={() => onViewDetails(transaction)}
            >
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>{transaction.plate}</TableCell>
              <TableCell className="hidden md:table-cell">{transaction.provider}</TableCell>
              <TableCell className="hidden lg:table-cell">{transaction.serviceType}</TableCell>
              <TableCell className="hidden sm:table-cell">{formatDate(transaction.date)}</TableCell>
              {status === "approved" && (
                <TableCell className="hidden md:table-cell">
                  {formatDate(transaction.approvedDate)}
                </TableCell>
              )}
              <TableCell className="text-right font-medium">{formatCurrency(transaction.amount)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
