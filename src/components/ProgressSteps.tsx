
import { cn } from "@/lib/utils";

type ProgressStepType = {
  id: number;
  title: string;
  description: string;
};

interface ProgressStepsProps {
  steps: ProgressStepType[];
  currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="relative">
      {/* Linha conectora */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
        <div
          className="h-full bg-man-orange transition-all duration-500"
          style={{ width: `${(100 / (steps.length - 1)) * (currentStep - 1)}%` }}
        />
      </div>
      
      <ol className="relative z-10 flex justify-between">
        {steps.map((step) => {
          const isActive = step.id <= currentStep;
          const isCurrent = step.id === currentStep;
          
          return (
            <li
              key={step.id}
              className={cn(
                "flex flex-col items-center",
                isActive ? "text-man-blue" : "text-gray-400"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  isActive ? "border-man-orange bg-orange-50" : "border-gray-300 bg-white",
                  isCurrent ? "ring-4 ring-orange-100" : ""
                )}
              >
                <span className="text-sm font-bold">{step.id}</span>
              </div>
              <div className="mt-2 text-center">
                <div className={cn("text-sm font-semibold", isActive ? "text-man-blue" : "text-gray-500")}>
                  {step.title}
                </div>
                <div className={cn("text-xs", isActive ? "text-man-gray" : "text-gray-400")}>
                  {step.description}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
