import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CustomerModalProps = {
  open: boolean;
  onClose: () => void;
  user: {
    nombre: string;
    apellido: string;
    direccion: string;
    referencia: string;
    distrito: string;
    provincia: string;
    departamento: string;
  } | null;
};

export function CustomerModal({ open, onClose, user }: CustomerModalProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Datos del Cliente</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Nombre:</strong> {user.nombre} {user.apellido}
          </p>
          <p>
            <strong>Dirección:</strong> {user.direccion}
          </p>
          <p>
            <strong>Referencia:</strong> {user.referencia}
          </p>
          <p>
            <strong>Distrito:</strong> {user.distrito}
          </p>
          <p>
            <strong>Provincia:</strong> {user.provincia}
          </p>
          <p>
            <strong>Departamento:</strong> {user.departamento}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
