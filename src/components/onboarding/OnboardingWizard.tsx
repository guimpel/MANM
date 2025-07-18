
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProfileSelectionStep } from "./ProfileSelectionStep";
import { NavigationTourStep } from "./NavigationTourStep";
import { CompletionStep } from "./CompletionStep";
import { useToast } from "@/hooks/use-toast";

type OnboardingStep = "profile" | "navigation" | "completion";
type ProfileType = "fleet" | "shop" | "driver";

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingWizard({ isOpen, onClose }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("profile");
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProfileSelection = (profile: ProfileType) => {
    setSelectedProfile(profile);
    setCurrentStep("navigation");
    
    // In a real app, you would save this preference in the user's profile
    localStorage.setItem("userProfile", profile);
  };

  const handleNavigationComplete = () => {
    setCurrentStep("completion");
  };

  const handleOnboardingComplete = () => {
    // Mark onboarding as completed
    localStorage.setItem("onboardingCompleted", "true");
    
    // Close the wizard
    onClose();
    
    // Redirect to appropriate dashboard
    if (selectedProfile) {
      const redirectPath = selectedProfile === "fleet" 
        ? "/fleet-dashboard" 
        : selectedProfile === "shop" 
          ? "/shop-service-orders" 
          : "/driver-dashboard";
      
      navigate(redirectPath);
      
      // Show success toast
      toast({
        title: "Bem-vindo!",
        description: "Seu perfil foi configurado com sucesso.",
      });
    }
  };

  const renderCurrentStep = () => {
    if (!selectedProfile && currentStep !== "profile") {
      return <ProfileSelectionStep onSelectProfile={handleProfileSelection} />;
    }

    switch(currentStep) {
      case "profile":
        return <ProfileSelectionStep onSelectProfile={handleProfileSelection} />;
      case "navigation":
        return <NavigationTourStep profileType={selectedProfile!} onComplete={handleNavigationComplete} />;
      case "completion":
        return <CompletionStep profileType={selectedProfile!} onComplete={handleOnboardingComplete} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        {renderCurrentStep()}
      </DialogContent>
    </Dialog>
  );
}
