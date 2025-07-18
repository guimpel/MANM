
import { Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchFilterBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
}

export function SearchFilterBar({ value, onChange, onSearch }: SearchFilterBarProps) {
  const [internal, setInternal] = useState("");
  const val = value ?? internal;
  const setVal = onChange ?? setInternal;

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
      <div className="flex-1 relative">
        <Input
          placeholder="Buscar por placa, fornecedor ou serviço"
          className="pl-3"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={onSearch}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        <Button variant="outline" className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>
    </div>
  );
}
