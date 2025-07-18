
import { useState, useEffect } from "react";
import {
  Building,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IntegratorUser } from "@/types/serviceRequest";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { UserMenu } from "./sidebar/UserMenu";

export function IntegratorSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<IntegratorUser | null>(null);
  
  useEffect(() => {
    const userStr = localStorage.getItem("integratorUser");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    }
  }, []);

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 sticky top-0",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-sidebar-primary" />
            <span className="font-bold text-lg text-sidebar-primary">Integrador</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent rounded-full"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <SidebarNavigation collapsed={collapsed} />
      </div>

      <UserMenu collapsed={collapsed} user={user} />
    </div>
  );
}
