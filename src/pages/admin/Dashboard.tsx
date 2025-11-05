import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/data-table";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { CustomerModal } from "@/components/CustomerModal";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUserModal, setOpenUserModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, users(*)")
        .order("created_at", { ascending: false });

      setOrders(data || []);
    };

    fetchOrders();
  }, []);

  const updateEnvio = async (id, estado) => {
    await supabase.from("orders").update({ estado_envio: estado }).eq("id", id);
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, estado_envio: estado } : o))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>

      <DataTable
        columns={[
          {
            header: "Cliente",
            accessorKey: "users.nombre",
            cell: ({ row }) => {
              const user = row.original.users;
              return (
                <Button
                  variant="link"
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenUserModal(true);
                  }}
                >
                  {user.nombre} {user.apellido}
                </Button>
              );
            },
          },
          { header: "Orden", accessorKey: "numero_orden" },
          { header: "Cantidad", accessorKey: "cantidad" },
          { header: "Color", accessorKey: "color" },
          { header: "Total", accessorKey: "total" },
          {
            header: "Pago",
            accessorKey: "estado_pago",
            cell: ({ row }) => <Badge>{row.original.estado_pago}</Badge>,
          },
          {
            header: "Envío",
            accessorKey: "estado_envio",
            cell: ({ row }) => {
              const order = row.original;

              return (
                <Select
                  defaultValue={order.estado_envio}
                  onValueChange={(val) => updateEnvio(order.id, val)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="preparado">Preparado</SelectItem>
                    <SelectItem value="en_ruta">En Ruta</SelectItem>
                    <SelectItem value="en_agencia">En Agencia</SelectItem>
                    <SelectItem value="entregado">Entregado</SelectItem>
                  </SelectContent>
                </Select>
              );
            },
          },
        ]}
        data={orders}
      />

      <CustomerModal
        open={openUserModal}
        onClose={() => setOpenUserModal(false)}
        user={selectedUser}
      />
    </div>
  );
}
