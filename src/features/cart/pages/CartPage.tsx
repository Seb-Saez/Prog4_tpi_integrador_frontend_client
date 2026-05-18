import { useCartStore } from "../../../store/cartStore";
import { Link } from "react-router-dom";

const CartPage = () => {
  const items = useCartStore((s) => s.items);
  const updateCantidad = useCartStore((s) => s.updateCantidad);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.total);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-gray-50 rounded-xl p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-500 mb-8">Agregá productos desde nuestra tienda.</p>
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.producto.id}
            className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-white/80">
                {item.producto.nombre.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{item.producto.nombre}</h3>
              <p className="text-sm text-gray-500">
                ${item.producto.precio_base.toFixed(2)} c/u
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateCantidad(item.producto.id, item.cantidad - 1)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center font-semibold">{item.cantidad}</span>
              <button
                onClick={() => updateCantidad(item.producto.id, item.cantidad + 1)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>

            <div className="text-right min-w-[80px]">
              <p className="font-bold text-gray-900">
                ${(item.producto.precio_base * item.cantidad).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => removeItem(item.producto.id)}
              className="text-red-400 hover:text-red-600 transition-colors p-1"
              title="Eliminar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-3xl font-bold text-indigo-600">${total().toFixed(2)}</span>
        </div>
        <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
          Confirmar pedido
        </button>
      </div>
    </div>
  );
};

export default CartPage;
