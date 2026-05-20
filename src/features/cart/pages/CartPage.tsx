import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";

const CartPage = () => {
  const items = useCartStore((s) => s.items);
  const updateCantidad = useCartStore((s) => s.updateCantidad);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.total);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <span className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-brand-100 text-brand-500">
          <svg
            className="h-9 w-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </span>
        <h2 className="font-display text-2xl font-semibold text-stone-900">
          Tu carrito está vacío
        </h2>
        <p className="mb-8 mt-2 text-stone-500">
          Agregá productos desde nuestra tienda.
        </p>
        <Link
          to="/"
          className="inline-block rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 active:scale-[0.99]"
        >
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-stone-900">
          Carrito
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          {items.length} {items.length === 1 ? "producto" : "productos"}
        </p>
      </header>

      <div className="mb-8 space-y-3">
        {items.map((item) => (
          <div
            key={item.producto.id}
            className="flex items-center gap-4 rounded-2xl border border-stone-200/70 bg-white p-4 shadow-sm"
          >
            {/* Miniatura: imagen real o inicial */}
            {item.producto.imagenes_url ? (
              <img
                src={item.producto.imagenes_url}
                alt={item.producto.nombre}
                className="h-16 w-16 flex-shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="grid h-16 w-16 flex-shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
                <span className="text-2xl font-bold text-white/90">
                  {item.producto.nombre.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-stone-900">
                {item.producto.nombre}
              </h3>
              <p className="text-sm text-stone-500">
                ${item.producto.precio_base.toFixed(2)} c/u
              </p>
            </div>

            {/* Stepper de cantidad */}
            <div className="flex items-center gap-1 rounded-full bg-stone-100 p-1">
              <button
                onClick={() => updateCantidad(item.producto.id, item.cantidad - 1)}
                className="grid h-8 w-8 place-items-center rounded-full font-semibold text-stone-600 transition-colors hover:bg-white hover:text-orange-600"
                aria-label="Restar"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold text-stone-800">
                {item.cantidad}
              </span>
              <button
                onClick={() => updateCantidad(item.producto.id, item.cantidad + 1)}
                className="grid h-8 w-8 place-items-center rounded-full font-semibold text-stone-600 transition-colors hover:bg-white hover:text-orange-600"
                aria-label="Sumar"
              >
                +
              </button>
            </div>

            <div className="min-w-[80px] text-right">
              <p className="font-bold text-stone-900">
                ${(item.producto.precio_base * item.cantidad).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => removeItem(item.producto.id)}
              className="rounded-lg p-1.5 text-stone-400 transition-colors hover:bg-red-50 hover:text-red-600"
              title="Eliminar"
              aria-label="Eliminar"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div className="rounded-2xl border border-stone-200/70 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-lg font-semibold text-stone-700">Total</span>
          <span className="font-display text-3xl font-semibold text-brand-600">
            ${total().toFixed(2)}
          </span>
        </div>
        <button className="w-full rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 py-3 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 active:scale-[0.99]">
          Confirmar pedido
        </button>
        <Link
          to="/"
          className="mt-3 block text-center text-sm font-medium text-stone-500 hover:text-stone-800"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
