import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Ingrediente } from "../types/ingrediente";
import { useCartStore } from "../../cart/store/cartStore";
import TiendaIngredienteCard from "../components/TiendaIngredienteCard";
import { useProducto } from "../hooks/useProducto";
import { useCategorias } from "../hooks/useCategoria";
import { useIngredientes } from "../hooks/useIngredientes";
import { ROUTES } from "@/router/routes";

const placeholderGradient = "bg-gradient-to-br from-amber-400 to-orange-500";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((s) => s.addItem);
  const [imgError, setImgError] = useState(false);

  const productoQuery = useProducto(id);
  const categoriasQuery = useCategorias();
  const ingredientesQuery = useIngredientes();

  if (productoQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (productoQuery.isError || !productoQuery.data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">Producto no encontrado.</p>
      </div>
    );
  }

  const producto = productoQuery.data;
  const categorias = Array.isArray(categoriasQuery.data) ? categoriasQuery.data : [];
  const ingredientes = Array.isArray(ingredientesQuery.data) ? ingredientesQuery.data : [];

  const nombresCategorias = producto.categorias_ids
    .map((cid) => categorias.find((c) => c.id === cid)?.nombre)
    .filter(Boolean);

  const ingredientesProducto = producto.ingredientes_ids
    .map((iid) => ingredientes.find((i) => i.id === iid))
    .filter(Boolean) as Ingrediente[];

  const showPlaceholder = !producto.imagenes_url || imgError;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-4">
        <Link
          to={ROUTES.PRODUCTOS}
          className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          ← Volver a productos
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-stone-100">
        <div className="md:flex">
          {/* Imagen */}
          <div className="md:w-1/2 relative h-72 md:h-auto min-h-[320px]">
            {showPlaceholder ? (
              <div className={`h-full w-full ${placeholderGradient} flex items-center justify-center`}>
                <span className="text-8xl font-bold text-white/90">
                  {producto.nombre.charAt(0).toUpperCase()}
                </span>
              </div>
            ) : (
              <img
                src={producto.imagenes_url}
                alt={producto.nombre}
                className="h-full w-full object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          {/* Info */}
          <div className="p-6 md:p-8 md:w-1/2 flex flex-col">
            {/* Stock badge */}
            <div className="mb-3">
              {producto.stock_cantidad === 0 ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
                  Sin stock
                </span>
              ) : producto.stock_cantidad <= 5 ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                  ¡Quedan solo {producto.stock_cantidad}!
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                  Disponible
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl font-bold text-stone-900 mb-2">
              {producto.nombre}
            </h1>

            {nombresCategorias.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {nombresCategorias.map((cat) => (
                  <span
                    key={cat}
                    className="px-2.5 py-0.5 text-xs font-medium bg-orange-50 text-orange-600 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            <p className="text-stone-500 mb-6 leading-relaxed">
              {producto.descripcion}
            </p>

            <div className="mt-auto">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm text-stone-400">$</span>
                <span className="text-4xl font-bold text-stone-900">
                  {Math.floor(producto.precio_base)}
                </span>
                <span className="text-lg text-stone-400">
                  .{(producto.precio_base % 1).toFixed(2).slice(2)}
                </span>
              </div>

              <button
                onClick={() => addItem(producto)}
                disabled={producto.stock_cantidad === 0}
                className="w-full rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 py-3.5 px-6 font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-105 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {producto.stock_cantidad === 0
                  ? "Sin stock"
                  : "Agregar al carrito"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {ingredientesProducto.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-stone-800 mb-4">
            Ingredientes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ingredientesProducto.map((ingrediente) => (
              <TiendaIngredienteCard
                key={ingrediente.id}
                ingrediente={ingrediente}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
