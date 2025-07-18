
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { ServiceRequest } from "@/types/serviceRequest";

interface ContactClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRequest: ServiceRequest | null;
  adjustmentMessage: string;
  setAdjustmentMessage: (message: string) => void;
  onSendAdjustment: () => void;
}

const ContactClientDialog = ({
  open,
  onOpenChange,
  selectedRequest,
  adjustmentMessage,
  setAdjustmentMessage,
  onSendAdjustment
}: ContactClientDialogProps) => {
  if (!selectedRequest) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contatar Cliente - {selectedRequest.clientName || 'Cliente'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Informações de Contato</h3>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Ligar
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Solicitar Ajuste no Orçamento</h3>
            <Textarea
              placeholder="Descreva os ajustes necessários no orçamento..."
              value={adjustmentMessage}
              onChange={(e) => setAdjustmentMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSendAdjustment}>
            Enviar Solicitação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactClientDialog;
