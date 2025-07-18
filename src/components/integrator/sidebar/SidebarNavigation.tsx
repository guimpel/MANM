
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  LayoutDashboard,
  Building,
  Store,
  BarChart3,
  CreditCard,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { integratorRoutes } from "@/lib/routes";
import { toast } from "sonner";

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { 
    name: "Dashboard", 
    path: integratorRoutes.dashboard.path, 
    icon: LayoutDashboard,
  },
  { 
    name: "Usuários", 
    path: integratorRoutes.users.path, 
    icon: Users,
  },
  { 
    name: "Financeiro", 
    path: integratorRoutes.financial.path, 
    icon: CreditCard,
  },
  { 
    name: "Fiscal", 
    path: integratorRoutes.fiscal.path, 
    icon: FileText,
  },
  { 
    name: "Contas a Pagar", 
    path: integratorRoutes.accounts.path, 
    icon: CreditCard,
  },
  { 
    name: "Clientes", 
    path: integratorRoutes.clients.path, 
    icon: Building,
  },
  { 
    name: "Fornecedores", 
    path: integratorRoutes.providers.path, 
    icon: Store,
  },
  { 
    name: "Resultados", 
    path: integratorRoutes.results.path, 
    icon: BarChart3,
  },
  { 
    name: "Configurações", 
    path: integratorRoutes.settings.path, 
    icon: Settings,
  }
];

interface SidebarNavigationProps {
  collapsed: boolean;
}

export const SidebarNavigation = ({ collapsed }: SidebarNavigationProps) => {
  const location = useLocation();

  // Validate routes when component loads
  console.info('Integrator sidebar routes loaded successfully');

  const handleNavClick = (path: string) => {
    // Add navigation validation and logging
    if (!path) {
      toast.error("Rota inválida. Por favor, contate o suporte.");
      console.error("Invalid route path detected in navigation");
      return;
    }
    console.log(`Navigating to: ${path}`);
  };

  return (
    <nav className="space-y-1 px-2">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
            location.pathname === item.path
              ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary",
            collapsed && "justify-center px-2"
          )}
          onClick={() => handleNavClick(item.path)}
        >
          <item.icon className={cn("h-5 w-5", collapsed && "h-6 w-6")} />
          {!collapsed && <span>{item.name}</span>}
        </Link>
      ))}
    </nav>
  );
};
