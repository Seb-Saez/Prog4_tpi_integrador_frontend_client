import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePedido } from "../hooks/usePedido";
import { useCancelarPedido } from "../hooks/useCancelarPedido";
import { useOrderStatusWS } from "../hooks/useOrderStatusWS";
import { usePedidoWsStore } from "../store/pedidoWsStore";
import { ROUTES } from "@/router/routes";

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
    month: "long",
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

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const pedidoQuery = usePedido(id);
  const cancelar = useCancelarPedido();
  useOrderStatusWS(id ? Number(id) : undefined);
  const wsStatus = usePedidoWsStore((s) => s.status);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [motivo, setMotivo] = useState("");

  if (pedidoQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (pedidoQuery.isError || !pedidoQuery.data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">Pedido no encontrado.</p>
      </div>
    );
  }

  const pedido = pedidoQuery.data;

  const handleOpenCancelModal = () => {
    setMotivo("");
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!motivo.trim()) return;
    try {
      await cancelar.mutateAsync({ id: pedido.id, motivo: motivo.trim() });
      setCancelModalOpen(false);
    } catch {
      // el hook ya invalida caches
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Link
          to={ROUTES.PEDIDOS}
          className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          ← Volver a pedidos
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-stone-900">
                Pedido #{pedido.id}
              </h1>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  wsStatus === "connected"
                    ? "bg-green-50 text-green-600"
                    : wsStatus === "connecting"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-red-50 text-red-600"
                }`}
              >
                <span
                  className={`w-1 h-1 rounded-full ${
                    wsStatus === "connected"
                      ? "bg-green-500"
                      : wsStatus === "connecting"
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-red-500"
                  }`}
                />
                {wsStatus === "connected"
                  ? "En vivo"
                  : wsStatus === "connecting"
                    ? "Conectando…"
                    : "Desconectado"}
              </span>
            </div>
            <p className="text-sm text-stone-400 mt-1">
              {formatearFecha(pedido.created_at)}
            </p>
          </div>
          <span
            className={`inline-flex items-center self-start px-3 py-1 rounded-full text-sm font-medium border ${
              estadoColores[pedido.estado_pedido.codigo] ||
              "bg-stone-50 text-stone-600 border-stone-200"
            }`}
          >
            {pedido.estado_pedido.nombre}
          </span>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">
              Modalidad
            </p>
            <p className="text-sm font-semibold text-stone-800">
              {pedido.modalidad_entrega === "DELIVERY"
                ? "Delivery"
                : "Retiro en local"}
            </p>
          </div>
          <div className="rounded-xl bg-stone-50 p-4">
            <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">
              Forma de pago
            </p>
            <p className="text-sm font-semibold text-stone-800">
              {pedido.forma_pago_snap || "—"}
            </p>
          </div>
          {pedido.direccion_snap && (
            <div className="rounded-xl bg-stone-50 p-4 sm:col-span-2">
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">
                Dirección
              </p>
              <p className="text-sm font-semibold text-stone-800">
                {pedido.direccion_snap}
              </p>
            </div>
          )}
          {pedido.notas && (
            <div className="rounded-xl bg-amber-50 p-4 sm:col-span-2 border border-amber-100">
              <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">
                Notas
              </p>
              <p className="text-sm text-amber-800">{pedido.notas}</p>
            </div>
          )}
        </div>

        {/* Detalles */}
        <h2 className="text-lg font-semibold text-stone-800 mb-4">Productos</h2>
        <div className="space-y-3 mb-8">
          {pedido.detalles.map((det) => (
            <div
              key={det.producto_id}
              className="flex items-center justify-between rounded-xl border border-stone-100 p-4"
            >
              <div>
                <p className="font-semibold text-stone-900">{det.nombre_snap}</p>
                <p className="text-sm text-stone-500">
                  {det.cantidad}x {formatearMoneda(det.precio_unit_snap)} c/u
                </p>
              </div>
              <p className="font-bold text-stone-900">
                {formatearMoneda(det.subtotal_snap)}
              </p>
            </div>
          ))}
        </div>

        {/* Totales */}
        <div className="rounded-xl bg-stone-50 p-5 space-y-2 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Subtotal</span>
            <span className="font-medium text-stone-800">
              {formatearMoneda(pedido.subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Costo de envío</span>
            <span className="font-medium text-stone-800">
              {formatearMoneda(pedido.costo_envio)}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-stone-200">
            <span className="text-lg font-semibold text-stone-800">Total</span>
            <span className="text-2xl font-bold text-orange-600">
              {formatearMoneda(pedido.total)}
            </span>
          </div>
        </div>

        {/* Historial */}
        {pedido.historial_estado_pedido.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-stone-800 mb-4">
              Historial de estados
            </h2>
            <div className="space-y-3">
              {[...pedido.historial_estado_pedido]
                .reverse()
                .map((h, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
                    <span className="text-stone-400 w-36 flex-shrink-0">
                      {formatearFecha(h.fecha_cambio)}
                    </span>
                    <span className="text-stone-700">
                      {h.estado_anterior
                        ? `${h.estado_anterior} → ${h.estado_nuevo}`
                        : `Creado como ${h.estado_nuevo}`}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Acciones */}
        {pedido.estado_pedido.permite_cancelar && (
          <button
            onClick={handleOpenCancelModal}
            disabled={cancelar.isPending}
            className="w-full rounded-xl border-2 border-red-200 bg-red-50 py-3 font-semibold text-red-700 transition hover:bg-red-100 active:scale-[0.99] disabled:opacity-50"
          >
            {cancelar.isPending ? "Cancelando..." : "Cancelar pedido"}
          </button>
        )}
      </div>

      {/* Modal de cancelación con motivo */}
      {cancelModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setCancelModalOpen(false); }}
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-stone-900 mb-1">
              Cancelar pedido #{pedido.id}
            </h2>
            <p className="text-sm text-stone-500 mb-4">
              Indicá el motivo de la cancelación. Este campo es obligatorio.
            </p>
            <textarea
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Ej: Me equivoqué en el pedido..."
              rows={3}
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 resize-none"
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setCancelModalOpen(false)}
                className="flex-1 rounded-xl border border-stone-200 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
              >
                Volver
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={!motivo.trim() || cancelar.isPending}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelar.isPending ? "Cancelando..." : "Confirmar cancelación"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage;
