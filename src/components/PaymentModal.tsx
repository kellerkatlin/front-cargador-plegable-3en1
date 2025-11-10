import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (amount: number, paymentCode: string) => void;
  paymentType: "adelanto" | "pagado";
  amountDue: number;
  total: number;
}

export const PaymentModal = ({
  open,
  onClose,
  onSubmit,
  paymentType,
  amountDue,
  total,
}: PaymentModalProps) => {
  const [amount, setAmount] = useState<string>("");
  const [paymentCode, setPaymentCode] = useState<string>("");

  // Autorellenar el monto cuando se abre el modal
  useEffect(() => {
    if (open) {
      if (paymentType === "pagado") {
        setAmount(amountDue.toFixed(2));
      } else {
        setAmount("");
      }
      setPaymentCode("");
    }
  }, [open, paymentType, amountDue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && paymentCode.trim()) {
      onSubmit(numAmount, paymentCode.trim());
      setAmount("");
      setPaymentCode("");
    }
  };

  const handleClose = () => {
    setAmount("");
    setPaymentCode("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {paymentType === "adelanto"
              ? "Registrar Adelanto"
              : "Registrar Pago Total"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="total">Total de la Orden</Label>
            <Input
              id="total"
              type="text"
              value={`S/ ${total.toFixed(2)}`}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount-due">Por Pagar</Label>
            <Input
              id="amount-due"
              type="text"
              value={`S/ ${amountDue.toFixed(2)}`}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">
              {paymentType === "adelanto"
                ? "Monto del Adelanto"
                : "Monto del Pago"}
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              max={amountDue}
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              disabled={paymentType === "pagado"}
            />
            {paymentType === "adelanto" && (
              <p className="text-xs text-muted-foreground">
                Máximo: S/ {amountDue.toFixed(2)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-code">
              Código de Pago
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="payment-code"
              type="text"
              placeholder="Ej: YAPE-12345"
              value={paymentCode}
              onChange={(e) => setPaymentCode(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Código de operación de la transferencia o pago
            </p>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">Registrar Pago</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
