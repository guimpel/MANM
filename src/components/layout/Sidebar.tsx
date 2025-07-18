
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Car,
  LayoutDashboard,
  Wrench,
  History,
  CreditCard,
  User,
  ChevronLeft,
  ChevronRight,
  Bell,
  FileBarChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { fleetRoutes, shopRoutes } from "@/lib/routes";

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  role: "fleet" | "shop";
}

const navItems: NavItem[] = [
  { 
    name: "Painel Geral", 
    path: fleetRoutes.dashboard.path, 
    icon: LayoutDashboard,
    role: "fleet" 
  },
  { 
    name: "Solicitar Atendimento", 
    path: fleetRoutes.serviceRequest.path, 
    icon: Car,
    role: "fleet" 
  },
  { 
    name: "Serviços em Andamento", 
    path: fleetRoutes.services.path, 
    icon: Wrench,
    role: "fleet" 
  },
  { 
    name: "Histórico de Veículos", 
    path: fleetRoutes.history.path, 
    icon: History,
    role: "fleet" 
  },
  { 
    name: "Relatórios Analíticos", 
    path: fleetRoutes.analytics.path, 
    icon: FileBarChart,
    role: "fleet" 
  },
  { 
    name: "Financeiro", 
    path: fleetRoutes.finance.path, 
    icon: CreditCard,
    role: "fleet" 
  },
  { 
    name: "Perfil", 
    path: fleetRoutes.profile.path, 
    icon: User,
    role: "fleet" 
  },
  { 
    name: "Atendimentos", 
    path: shopRoutes.serviceOrders.path, 
    icon: Wrench,
    role: "shop" 
  },
  { 
    name: "Orçamentos", 
    path: shopRoutes.quotes.path, 
    icon: History,
    role: "shop" 
  },
  { 
    name: "Relatórios", 
    path: shopRoutes.reports.path, 
    icon: FileBarChart,
    role: "shop" 
  },
  { 
    name: "Financeiro", 
    path: shopRoutes.finance.path, 
    icon: CreditCard,
    role: "shop" 
  },
];

interface SidebarProps {
  userRole?: "fleet" | "shop";
}

export function Sidebar({ userRole = "fleet" }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const filteredNavItems = navItems.filter(item => item.role === userRole);

  // Add console log for validation
  console.info(`${userRole} sidebar navigation loaded successfully`);

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
            <Car className="h-6 w-6 text-sidebar-primary" />
            <span className="font-bold text-lg text-sidebar-primary">{userRole === "fleet" ? "AutoFleet" : "AutoShop"}</span>
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
        <nav className="space-y-1 px-2">
          <TooltipProvider>
            {filteredNavItems.map((item) => (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      location.pathname === item.path
                        ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", collapsed && "h-6 w-6")} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </div>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Avatar" />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                  {userRole === "fleet" ? "FL" : "SH"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-sidebar-foreground">
                  {userRole === "fleet" ? "Carlos Mendes" : "Oficina Master"}
                </span>
                <span className="text-xs text-sidebar-foreground/70">
                  {userRole === "fleet" ? "Frotista" : "Oficina"}
                </span>
              </div>
            </div>
          )}
          
          {collapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="Avatar" />
                    <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                      {userRole === "fleet" ? "FL" : "SH"}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {userRole === "fleet" ? "Carlos Mendes" : "Oficina Master"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell size={18} />
              </Button>
              <ThemeToggle />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
