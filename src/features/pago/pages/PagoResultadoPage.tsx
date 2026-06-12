import { useSearchParams, Link } from "react-router-dom";
import { ROUTES, pedidoDetalle } from "@/router/routes";

const STATUS_MAP = {
  success: { icon: "✅", title: "¡Pago aprobado!", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  failure: { icon: "❌", title: "Pago rechazado", color: "text-red-600", bg: "bg-red-50 border-red-200" },
  pending: { icon: "⏳", title: "Pago pendiente", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
} as const;

export default function PagoResultadoPage() {
  const [params] = useSearchParams();
  const status = (params.get("status") ?? "pending") as keyof typeof STATUS_MAP;
  const pedidoId = params.get("pedido_id");
  const config = STATUS_MAP[status] ?? STATUS_MAP.pending;

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <div className={`rounded-2xl border p-8 ${config.bg}`}>
        <span className="text-5xl">{config.icon}</span>
        <h1 className={`mt-4 font-display text-2xl font-bold ${config.color}`}>
          {config.title}
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          {status === "success"
            ? "Tu pago fue procesado correctamente."
            : status === "failure"
              ? "Hubo un problema con el pago. Podés intentar de nuevo."
              : "Estamos esperando la confirmación del pago."}
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {pedidoId && (
            <Link
              to={pedidoDetalle(pedidoId)}
              className="rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105"
            >
              Ver mi pedido
            </Link>
          )}
          <Link
            to={ROUTES.INICIO}
            className="text-sm font-medium text-stone-500 hover:text-stone-800"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
