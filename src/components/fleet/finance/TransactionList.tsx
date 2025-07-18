import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { EmptyTransactionState } from "./EmptyTransactionState";
import { Database } from "@/integrations/supabase/types";
import { mapDataToModel, safeDataItem } from "@/utils/supabaseHelpers";

interface Transaction {
  id: string;
  value: number;
  status: string; // allow any status from DB
  created_at: string;
  due_date: string;
  payment_date: string | null;
  supplier?: string | null;
  category?: string | null;
  description: string;
}

// Valid status types for our UI components
type StatusType = "pending" | "approved" | "rejected";

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<StatusType>("pending");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("accounts_payable").select("*");
      
      if (!error && data) {
        // Convert the Supabase data to the Transaction interface with safe type mapping
        const typedTransactions = mapDataToModel(data, (item): Transaction => {
          // Create a safe default transaction with all required fields
          const defaultTransaction: Transaction = {
            id: "",
            value: 0,
            status: "pending",
            created_at: new Date().toISOString(),
            due_date: new Date().toISOString(),
            payment_date: null,
            supplier: null,
            category: null,
            description: ""
          };
          
          // Use safeDataItem to ensure we don't process error objects
          const safeItem = safeDataItem(item, defaultTransaction);
          
          return {
            id: safeItem.id as string,
            value: safeItem.value as number,
            status: safeItem.status as string,
            created_at: (safeItem.created_at as string) || new Date().toISOString(),
            due_date: safeItem.due_date as string,
            payment_date: safeItem.payment_date as string | null,
            supplier: safeItem.supplier as string | null,
            category: safeItem.category as string | null,
            description: safeItem.description as string
          };
        });
        
        setTransactions(typedTransactions);
      }
      setLoading(false);
    };
    fetchTransactions();
  }, []);

  const statusCounts = transactions.reduce(
    (acc, t) => ({
      ...acc,
      [t.status.toLowerCase()]: (acc[t.status.toLowerCase()] || 0) + 1,
    }),
    {} as Record<string, number>
  );

  const filtered = transactions.filter((t) => {
    const matchesStatus = t.status.toLowerCase() === activeTab;
    const matchesSearch = searchTerm 
      ? (t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         t.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
         t.value.toString().includes(searchTerm))
      : true;
    return matchesStatus && matchesSearch;
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value as StatusType);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList>
        {['pending', 'approved', 'rejected'].map((status) => (
          <TabsTrigger key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {statusCounts[status] && (
              <Badge className="ml-2" variant="secondary">
                {statusCounts[status]}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={activeTab}>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="mb-2">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                      <Skeleton className="h-3 w-24 ml-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-2">
            {filtered.map((transaction) => (
              <Card key={transaction.id} className="mb-2">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{transaction.description}</h3>
                      {transaction.supplier && (
                        <p className="text-sm text-muted-foreground">Fornecedor: {transaction.supplier}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold">R$ {transaction.value.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        Vencimento: {new Date(transaction.due_date).toLocaleDateString()}
                      </p>
                      {transaction.payment_date && (
                        <p className="text-sm text-green-600">
                          Pago em: {new Date(transaction.payment_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  {transaction.category && (
                    <div className="mt-2">
                      <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                        {transaction.category}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyTransactionState status={activeTab} />
        )}
      </TabsContent>
    </Tabs>
  );
}
