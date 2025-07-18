
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertType = "info" | "success" | "warning";

interface InfoAlertProps {
  type: AlertType;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function InfoAlert({ type, title, children, className }: InfoAlertProps) {
  const getIcon = () => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5" />;
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      case "warning":
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "info":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "success":
        return "bg-green-50 text-green-800 border-green-200";
      case "warning":
        return "bg-amber-50 text-amber-800 border-amber-200";
    }
  };

  return (
    <div className={cn("flex rounded-md border p-4", getStyles(), className)}>
      <div className="mr-3 flex-shrink-0">{getIcon()}</div>
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="mt-1 text-sm">{children}</div>
      </div>
    </div>
  );
}
