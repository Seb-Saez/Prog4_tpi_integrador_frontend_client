import { Link } from "react-router-dom";
import { useMisPedidos } from "../hooks/useMisPedidos";
import { pedidoDetalle } from "@/router/routes";

const estadoColores: Record<string, string> = {
  PENDIENTE: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMADO: "bg-blue-50 text-blue-700 border-blue-200",
  EN_PREPARACION: "bg-indigo-50 text-indigo-700 border-indigo-200",
  LISTO_PARA_RETIRAR: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ENVIADO: "bg-cyan-50 text-cyan-700 border-cyan-200",
  ENTREGADO: "bg-green-50 text-green-700 border-green-200",
  CANCELADO: "bg-red-50 text-red-700 border-red-200",
};

const formatearFecha = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatearMoneda = (val: string) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(Number(val));
};

const OrdersPage = () => {
  const pedidosQuery = useMisPedidos();

  if (pedidosQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (pedidosQuery.isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">Error al cargar los pedidos.</p>
      </div>
    );
  }

  const pedidos = Array.isArray(pedidosQuery.data) ? pedidosQuery.data : [];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-display text-3xl font-bold text-stone-900 mb-8">
        Mis Pedidos
      </h1>

      {pedidos.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-100">
          <p className="text-stone-500 text-lg">No tenés pedidos aún.</p>
          <p className="text-stone-400 text-sm mt-2">
            Los pedidos que confirmes aparecerán acá.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pedidos.map((pedido) => (
            <Link
              key={pedido.id}
              to={pedidoDetalle(pedido.id)}
              className="block bg-white rounded-xl border border-stone-100 p-5 shadow-sm hover:shadow-md transition-all hover:border-stone-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-stone-900">
                      Pedido #{pedido.id}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                        estadoColores[pedido.estado_pedido.codigo] ||
                        "bg-stone-50 text-stone-600 border-stone-200"
                      }`}
                    >
                      {pedido.estado_pedido.nombre}
                    </span>
                  </div>
                  <p className="text-sm text-stone-400">
                    {formatearFecha(pedido.created_at)}
                  </p>
                  <p className="text-sm text-stone-500 mt-1">
                    {pedido.modalidad_entrega === "DELIVERY"
                      ? "Delivery"
                      : "Retiro en local"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-stone-900">
                    {formatearMoneda(pedido.total)}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {pedido.detalles?.length || "?"} productos
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
