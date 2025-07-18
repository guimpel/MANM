
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useState } from 'react';
import { ThemeProvider } from 'next-themes';

interface LayoutProps {
  userRole?: "fleet" | "shop";
}

export function Layout({ userRole = "fleet" }: LayoutProps) {
  return (
    <ThemeProvider defaultTheme="light" enableSystem>
      <div className="flex min-h-screen bg-background">
        <Sidebar userRole={userRole} />
        <div className="flex-1">
          <main className="p-4 md:p-6 max-w-7xl mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
