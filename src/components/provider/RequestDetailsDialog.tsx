
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceRequest, ServicePricing } from "@/types/serviceRequest";
import PendingRequestContent from "./request-details/PendingRequestContent";
import InProgressRequestContent from "./request-details/InProgressRequestContent";
import CompletedRequestContent from "./request-details/CompletedRequestContent";
import RejectedRequestContent from "./request-details/RejectedRequestContent";

interface RequestDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRequest: ServiceRequest | null;
  servicesPricing: ServicePricing[];
  setServicesPricing: (pricing: ServicePricing[]) => void;
  onSubmitQuote: () => void;
  onStartService: () => void;
  onFinishService: () => void;
  onContactClient: (e: React.MouseEvent) => void;
}

const RequestDetailsDialog = ({
  open,
  onOpenChange,
  selectedRequest,
  servicesPricing,
  setServicesPricing,
  onSubmitQuote,
  onStartService,
  onFinishService,
  onContactClient
}: RequestDetailsDialogProps) => {
  if (!selectedRequest) return null;

  const handleUpdatePrice = (index: number, price: string) => {
    const updatedPricing = [...servicesPricing];
    updatedPricing[index].price = price.replace(/[^0-9.]/g, '');
    setServicesPricing(updatedPricing);
  };

  const renderContent = () => {
    switch (selectedRequest.status) {
      case "pending":
        return (
          <PendingRequestContent
            request={selectedRequest}
            servicesPricing={servicesPricing}
            onUpdatePrice={handleUpdatePrice}
            onSubmitQuote={onSubmitQuote}
            onClose={() => onOpenChange(false)}
          />
        );
      case "in-progress":
        return (
          <InProgressRequestContent
            request={selectedRequest}
            onFinishService={onFinishService}
            onContactClient={onContactClient}
            onClose={() => onOpenChange(false)}
          />
        );
      case "completed":
        return (
          <CompletedRequestContent
            request={selectedRequest}
            onClose={() => onOpenChange(false)}
          />
        );
      case "rejected":
        return (
          <RejectedRequestContent
            request={selectedRequest}
            onClose={() => onOpenChange(false)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default RequestDetailsDialog;
