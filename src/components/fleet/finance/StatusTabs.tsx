
import { Clock, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StatusTabsProps {
  pendingCount: number;
  approvedCount?: number;
  rejectedCount?: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function StatusTabs({ 
  pendingCount, 
  approvedCount = 0, 
  rejectedCount = 0, 
  activeTab, 
  onTabChange 
}: StatusTabsProps) {
  return (
    <TabsList className="grid grid-cols-3 mb-4">
      <TabsTrigger 
        value="pending" 
        className="relative" 
        onClick={() => onTabChange("pending")}
        data-state={activeTab === "pending" ? "active" : "inactive"}
      >
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Pendentes
        </span>
        {pendingCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-amber-500">{pendingCount}</Badge>
        )}
      </TabsTrigger>
      <TabsTrigger 
        value="approved" 
        onClick={() => onTabChange("approved")}
        data-state={activeTab === "approved" ? "active" : "inactive"}
      >
        <span className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          Aprovados
        </span>
        {approvedCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-green-500">{approvedCount}</Badge>
        )}
      </TabsTrigger>
      <TabsTrigger 
        value="rejected" 
        onClick={() => onTabChange("rejected")}
        data-state={activeTab === "rejected" ? "active" : "inactive"}
      >
        <span className="flex items-center gap-2">
          <X className="h-4 w-4" />
          Rejeitados
        </span>
        {rejectedCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500">{rejectedCount}</Badge>
        )}
      </TabsTrigger>
    </TabsList>
  );
}
