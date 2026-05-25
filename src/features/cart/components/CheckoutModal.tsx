import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useCrearPedido } from "@/features/orders/hooks/useCrearPedido";
import { useDirecciones } from "@/features/direcciones/hooks/useDirecciones";
import { ROUTES } from "@/router/routes";
import type { PedidoCreate, ModalidadEntrega } from "@/features/orders/types/pedido";

const FORMAS_PAGO = [
  { id: 1, nombre: "Efectivo" },
  { id: 2, nombre: "Transferencia bancaria" },
  { id: 3, nombre: "MercadoPago" },
];

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [modalidad, setModalidad] = useState<ModalidadEntrega>("RETIRO_LOCAL");
  const [formaPagoId, setFormaPagoId] = useState(1);
  const [direccionId, setDireccionId] = useState<number | "">("");
  const [notas, setNotas] = useState("");
  const [error, setError] = useState("");

  const crearPedido = useCrearPedido();
  const direccionesQuery = useDirecciones();

  if (!open) return null;

  const direcciones = Array.isArray(direccionesQuery.data) ? direccionesQuery.data : [];

  const handleSubmit = async () => {
    setError("");

    if (items.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    if (modalidad === "DELIVERY" && !direccionId) {
      setError("Seleccioná una dirección para el delivery.");
      return;
    }

    // Mergear cantidades si hay duplicados
    const merged = new Map<number, { cantidad: number; personalizacion: number[] }>();
    for (const item of items) {
      const existing = merged.get(item.producto.id);
      if (existing) {
        existing.cantidad += item.cantidad;
      } else {
        merged.set(item.producto.id, {
          cantidad: item.cantidad,
          personalizacion: [],
        });
      }
    }

    const payload: PedidoCreate = {
      modalidad_entrega: modalidad,
      forma_pago_id: formaPagoId,
      direccion_id: modalidad === "DELIVERY" ? Number(direccionId) : null,
      items: Array.from(merged.entries()).map(([producto_id, data]) => ({
        producto_id,
        cantidad: data.cantidad,
        personalizacion: data.personalizacion,
      })),
      notas: notas.trim() || null,
    };

    try {
      await crearPedido.mutateAsync(payload);
      clearCart();
      onClose();
      navigate(ROUTES.PEDIDOS);
    } catch (err: any) {
      const msg = err?.response?.data?.detail || err?.message || "Error al crear el pedido.";
      setError(Array.isArray(msg) ? msg[0]?.msg || JSON.stringify(msg) : msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition-colors"
          aria-label="Cerrar"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="font-display text-2xl font-bold text-stone-900 mb-1">
          Confirmar pedido
        </h2>
        <p className="text-sm text-stone-500 mb-6">
          Revisá los datos antes de confirmar
        </p>

        {/* Resumen del carrito */}
        <div className="mb-6 rounded-xl bg-stone-50 p-4 border border-stone-100">
          <h3 className="text-sm font-semibold text-stone-700 mb-2">Productos ({items.length})</h3>
          <div className="space-y-1">
            {items.map((item) => (
              <div key={item.producto.id} className="flex justify-between text-sm">
                <span className="text-stone-700">
                  {item.cantidad}x {item.producto.nombre}
                </span>
                <span className="font-medium text-stone-900">
                  ${(item.producto.precio_base * item.cantidad).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t border-stone-200 flex justify-between">
            <span className="text-sm font-semibold text-stone-700">Total</span>
            <span className="text-lg font-bold text-stone-900">
              ${items.reduce((acc, i) => acc + i.producto.precio_base * i.cantidad, 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Modalidad */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Modalidad de entrega
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setModalidad("RETIRO_LOCAL"); setDireccionId(""); }}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                modalidad === "RETIRO_LOCAL"
                  ? "border-orange-400 bg-orange-50 text-orange-700 ring-1 ring-orange-400"
                  : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
              }`}
            >
              Retiro en local
            </button>
            <button
              type="button"
              onClick={() => setModalidad("DELIVERY")}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                modalidad === "DELIVERY"
                  ? "border-orange-400 bg-orange-50 text-orange-700 ring-1 ring-orange-400"
                  : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
              }`}
            >
              Delivery
            </button>
          </div>
        </div>

        {/* Dirección (solo delivery) */}
        {modalidad === "DELIVERY" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Dirección de entrega
            </label>
            {direccionesQuery.isLoading ? (
              <div className="text-sm text-stone-400">Cargando direcciones...</div>
            ) : direcciones.length === 0 ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                No tenés direcciones guardadas.{' '}
                <a href={ROUTES.DIRECCIONES} className="font-semibold underline">
                  Agregá una
                </a>
              </div>
            ) : (
              <select
                value={direccionId}
                onChange={(e) => setDireccionId(Number(e.target.value) || "")}
                className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
              >
                <option value="">Seleccioná una dirección</option>
                {direcciones.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.alias} — {d.linea1}, {d.ciudad}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}

        {/* Forma de pago */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Forma de pago
          </label>
          <select
            value={formaPagoId}
            onChange={(e) => setFormaPagoId(Number(e.target.value))}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
          >
            {FORMAS_PAGO.map((fp) => (
              <option key={fp.id} value={fp.id}>
                {fp.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Notas */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Notas (opcional)
          </label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Ej: Sin cebolla, timbrar al llegar..."
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all resize-none"
          />
          <div className="mt-1 text-right text-xs text-stone-400">
            {notas.length}/500
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Botón */}
        <button
          onClick={handleSubmit}
          disabled={crearPedido.isPending}
          className="w-full rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {crearPedido.isPending ? "Procesando..." : "Confirmar pedido"}
        </button>
      </div>
    </div>
  );
}
