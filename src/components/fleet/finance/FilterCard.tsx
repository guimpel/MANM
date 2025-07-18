
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FilterCardProps {
  dateFilter: string;
  setDateFilter: (filter: string) => void;
}

export function FilterCard({ dateFilter, setDateFilter }: FilterCardProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Período</label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {dateFilter === "custom" && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">Data inicial</label>
                <Input type="date" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Data final</label>
                <Input type="date" />
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
