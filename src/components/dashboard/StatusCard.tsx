
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  variant?: "default" | "warning" | "success" | "info" | "danger";
  change?: {
    value: number;
    isPositive: boolean;
  };
  className?: string; // Added className prop
}

export function StatusCard({
  title,
  value,
  icon,
  variant = "default",
  change,
  className,
}: StatusCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "warning":
        return "border-amber-200 bg-amber-50 dark:bg-amber-900/20";
      case "success":
        return "border-green-200 bg-green-50 dark:bg-green-900/20";
      case "info":
        return "border-blue-200 bg-blue-50 dark:bg-blue-900/20";
      case "danger":
        return "border-red-200 bg-red-50 dark:bg-red-900/20";
      default:
        return "border-gray-200 bg-white dark:bg-gray-800/50";
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case "warning":
        return "bg-amber-100 text-amber-600 dark:bg-amber-800 dark:text-amber-200";
      case "success":
        return "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200";
      case "info":
        return "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200";
      case "danger":
        return "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className={cn("rounded-xl border shadow-sm p-5", getVariantClasses(), className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {change && (
            <p className="text-xs mt-1">
              <span
                className={cn(
                  "inline-flex items-center",
                  change.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {change.isPositive ? "+" : "-"}
                {Math.abs(change.value)}%
              </span>{" "}
              <span className="text-gray-500 dark:text-gray-400">desde último mês</span>
            </p>
          )}
        </div>
        <div className={cn("p-2.5 rounded-lg", getIconClasses())}>{icon}</div>
      </div>
    </div>
  );
}
