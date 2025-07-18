
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LogOut } from "lucide-react";
import { IntegratorUser } from "@/types/serviceRequest";

interface UserMenuProps {
  collapsed: boolean;
  user: IntegratorUser | null;
}

export const UserMenu = ({ collapsed, user }: UserMenuProps) => {
  const handleLogout = () => {
    localStorage.removeItem("integratorUser");
    window.location.href = "/integrator/login";
  };

  return (
    <div className="border-t border-sidebar-border p-4">
      <div className="flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt="Usuário" />
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                {user?.name?.substring(0,2) || "IN"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-sidebar-foreground">
                {user?.name || "Administrador"}
              </span>
              <span className="text-xs text-sidebar-foreground/70">
                {user?.role === "admin" ? "Administrador" : user?.role}
              </span>
            </div>
          </div>
        ) : (
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Usuário" />
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
              {user?.name?.substring(0,2) || "IN"}
            </AvatarFallback>
          </Avatar>
        )}
        
        {!collapsed && (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="rounded-full" onClick={handleLogout}>
              <LogOut size={18} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
