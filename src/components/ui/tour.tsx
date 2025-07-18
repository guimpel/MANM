
import * as React from "react";
import { createPortal } from "react-dom";
import { ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export type TourStepProps = {
  title: string;
  description: string;
  targetSelector: string;
  position?: "top" | "right" | "bottom" | "left";
};

type TourContextType = {
  currentStep: number;
  steps: TourStepProps[];
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  close: () => void;
};

export const TourContext = React.createContext<TourContextType | undefined>(undefined);

export function useTour() {
  const context = React.useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
}

interface TourProviderProps {
  children: React.ReactNode;
  steps: TourStepProps[];
  onComplete?: () => void;
  defaultOpen?: boolean;
}

export function TourProvider({
  children,
  steps,
  onComplete,
  defaultOpen = false,
}: TourProviderProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [currentStep, setCurrentStep] = React.useState(0);

  React.useEffect(() => {
    if (defaultOpen) {
      setIsOpen(true);
    }
  }, [defaultOpen]);

  const nextStep = React.useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsOpen(false);
      onComplete?.();
    }
  }, [currentStep, steps.length, onComplete]);

  const prevStep = React.useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = React.useCallback((step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  }, [steps.length]);

  const close = React.useCallback(() => {
    setIsOpen(false);
    onComplete?.();
  }, [onComplete]);

  const contextValue = React.useMemo(
    () => ({
      currentStep,
      steps,
      nextStep,
      prevStep,
      goToStep,
      close,
    }),
    [currentStep, steps, nextStep, prevStep, goToStep, close]
  );

  return (
    <TourContext.Provider value={contextValue}>
      {children}
      {isOpen && <TourStep />}
    </TourContext.Provider>
  );
}

function TourStep() {
  const { currentStep, steps, nextStep, prevStep, close } = useTour();
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = React.useState({ top: 0, left: 0 });
  const [tooltipClass, setTooltipClass] = React.useState("");
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const step = steps[currentStep];

  React.useEffect(() => {
    const targetElement = document.querySelector(step.targetSelector);
    
    if (!targetElement || !tooltipRef.current) return;
    
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    // Add highlight to target element
    const prevOutline = (targetElement as HTMLElement).style.outline;
    (targetElement as HTMLElement).style.outline = "2px solid rgba(59, 130, 246, 0.5)";
    (targetElement as HTMLElement).style.outlineOffset = "4px";
    (targetElement as HTMLElement).style.borderRadius = "4px";
    
    // Calculate position based on preferred position or auto-position
    let pos = step.position || "bottom";
    
    // Check if tooltip would go off screen and adjust if needed
    if (pos === "top" && targetRect.top < tooltipRect.height + 10) {
      pos = "bottom";
    } else if (pos === "bottom" && targetRect.bottom + tooltipRect.height + 10 > window.innerHeight) {
      pos = "top";
    } else if (pos === "left" && targetRect.left < tooltipRect.width + 10) {
      pos = "right";
    } else if (pos === "right" && targetRect.right + tooltipRect.width + 10 > window.innerWidth) {
      pos = "left";
    }
    
    // Calculate tooltip and arrow positions
    let tooltipTop = 0;
    let tooltipLeft = 0;
    let arrowTop = 0;
    let arrowLeft = 0;
    let tooltipPositionClass = "";
    
    switch (pos) {
      case "top":
        tooltipTop = targetRect.top - tooltipRect.height - 10;
        tooltipLeft = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        arrowTop = tooltipRect.height;
        arrowLeft = tooltipRect.width / 2;
        tooltipPositionClass = "arrow-bottom";
        break;
      case "right":
        tooltipTop = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        tooltipLeft = targetRect.right + 10;
        arrowTop = tooltipRect.height / 2;
        arrowLeft = -5;
        tooltipPositionClass = "arrow-left";
        break;
      case "bottom":
        tooltipTop = targetRect.bottom + 10;
        tooltipLeft = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
        arrowTop = -5;
        arrowLeft = tooltipRect.width / 2;
        tooltipPositionClass = "arrow-top";
        break;
      case "left":
        tooltipTop = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
        tooltipLeft = targetRect.left - tooltipRect.width - 10;
        arrowTop = tooltipRect.height / 2;
        arrowLeft = tooltipRect.width;
        tooltipPositionClass = "arrow-right";
        break;
    }
    
    // Adjust if tooltip goes off screen
    if (tooltipLeft < 10) tooltipLeft = 10;
    if (tooltipLeft + tooltipRect.width > window.innerWidth - 10)
      tooltipLeft = window.innerWidth - tooltipRect.width - 10;
    if (tooltipTop < 10) tooltipTop = 10;
    if (tooltipTop + tooltipRect.height > window.innerHeight - 10)
      tooltipTop = window.innerHeight - tooltipRect.height - 10;
    
    setPosition({ top: tooltipTop, left: tooltipLeft });
    setArrowPosition({ top: arrowTop, left: arrowLeft });
    setTooltipClass(tooltipPositionClass);
    
    // Scroll target element into view if needed
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    
    return () => {
      // Reset target element styling
      (targetElement as HTMLElement).style.outline = prevOutline;
      (targetElement as HTMLElement).style.outlineOffset = "";
      (targetElement as HTMLElement).style.borderRadius = "";
    };
  }, [currentStep, step]);

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={(e) => {
          // Only close if clicking on overlay, not the tooltip
          if (e.target === e.currentTarget) {
            close();
          }
        }}
      />
      <div
        ref={tooltipRef}
        className={cn(
          "fixed z-50 w-80 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800",
          tooltipClass
        )}
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={close}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        
        {/* Content */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">{step.description}</p>
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {currentStep + 1} de {steps.length}
          </div>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={prevStep}>
                Anterior
              </Button>
            )}
            <Button size="sm" onClick={nextStep} className="gap-1">
              {currentStep === steps.length - 1 ? "Finalizar" : "Próximo"}
              {currentStep !== steps.length - 1 && <ChevronRight className="h-3 w-3" />}
            </Button>
          </div>
        </div>
        
        {/* Arrow */}
        <div
          className="absolute w-3 h-3 bg-white rotate-45 dark:bg-gray-800"
          style={{
            top: arrowPosition.top,
            left: arrowPosition.left,
          }}
        />
      </div>
    </>,
    document.body
  );
}

export function TourButton({ children }: { children: React.ReactNode }) {
  const { steps, goToStep } = useTour();
  
  const startTour = () => {
    goToStep(0);
  };
  
  if (steps.length === 0) return null;
  
  return (
    <Button onClick={startTour} variant="outline">
      {children}
    </Button>
  );
}
