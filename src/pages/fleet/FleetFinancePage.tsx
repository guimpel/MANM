
import { useState } from "react";
import { TransactionList } from "@/components/fleet/finance/TransactionList";
import { SearchFilterBar } from "@/components/fleet/finance/SearchFilterBar";

export function FleetFinancePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log("Searching for:", term);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Finanças</h1>
        <p className="text-muted-foreground">
          Gerencie os pagamentos e transações da sua frota
        </p>
      </div>
      
      <SearchFilterBar 
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={() => handleSearch(searchTerm)}
      />
      
      <div className="border rounded-md">
        <TransactionList />
      </div>
    </div>
  );
}
