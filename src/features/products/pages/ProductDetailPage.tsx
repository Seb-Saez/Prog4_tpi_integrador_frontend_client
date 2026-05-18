import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../../api/api";
import type { Producto } from "../../../types/producto";
import type { Categoria } from "../../../types/categoria";
import type { Ingrediente } from "../../../types/ingrediente";
import { useCartStore } from "../../../store/cartStore";
import TiendaIngredienteCard from "../components/TiendaIngredienteCard";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const addItem = useCartStore((s) => s.addItem);

  const productoQuery = useQuery<Producto>({
    queryKey: ["producto", id],
    queryFn: () => api.get(`/productos/${id}`).then((r) => r.data),
    enabled: !!id,
  });

  const categoriasQuery = useQuery<Categoria[]>({
    queryKey: ["categorias"],
    queryFn: () => api.get("/categorias").then((r) => r.data),
  });

  const ingredientesQuery = useQuery<Ingrediente[]>({
    queryKey: ["ingredientes"],
    queryFn: () => api.get("/ingredientes").then((r) => r.data),
  });

  if (productoQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
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
  const categorias = categoriasQuery.data ?? [];
  const ingredientes = ingredientesQuery.data ?? [];

  const nombresCategorias = producto.categorias_ids
    .map((cid) => categorias.find((c) => c.id === cid)?.nombre)
    .filter(Boolean);

  const ingredientesProducto = producto.ingredientes_ids
    .map((iid) => ingredientes.find((i) => i.id === iid))
    .filter(Boolean) as Ingrediente[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center h-64 md:h-auto">
            <span className="text-8xl font-bold text-white/80">
              {producto.nombre.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="p-8 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{producto.nombre}</h1>

            {nombresCategorias.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {nombresCategorias.map((cat) => (
                  <span
                    key={cat}
                    className="px-2.5 py-0.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-600 mb-6">{producto.descripcion}</p>

            <div className="text-3xl font-bold text-indigo-600 mb-6">
              ${producto.precio_base.toFixed(2)}
            </div>

            <button
              onClick={() => addItem(producto)}
              disabled={producto.stock_cantidad === 0}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {producto.stock_cantidad === 0 ? "Sin stock" : "Agregar al carrito"}
            </button>
          </div>
        </div>
      </div>

      {ingredientesProducto.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredientes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ingredientesProducto.map((ingrediente) => (
              <TiendaIngredienteCard key={ingrediente.id} ingrediente={ingrediente} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
