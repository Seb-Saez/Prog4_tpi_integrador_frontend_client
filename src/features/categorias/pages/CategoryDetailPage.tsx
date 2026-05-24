import { useParams } from "react-router-dom";
import { useCategoria } from "@/features/products/hooks/useCategoria";
import { useProductos } from "@/features/products/hooks/useProductos";
import { useCategorias } from "@/features/products/hooks/useCategoria";
import TiendaProductCard from "@/features/products/components/TiendaProductCard";
import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
const CategoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const categoriaQuery = useCategoria(id);
  const productosQuery = useProductos();
  const categoriasQuery = useCategorias();
  if (categoriaQuery.isLoading || productosQuery.isLoading || categoriasQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }
  if (categoriaQuery.isError || !categoriaQuery.data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">Categoría no encontrada.</p>
      </div>
    );
  }
  const categoria = categoriaQuery.data;
  const productos = Array.isArray(productosQuery.data) ? productosQuery.data : [];
  const categorias = Array.isArray(categoriasQuery.data) ? categoriasQuery.data : [];
  const productosDeCategoria = productos.filter((p) =>
    p.categorias_ids.includes(categoria.id)
  );
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-2">
        <Link
          to={ROUTES.CATEGORIAS}
          className="text-sm font-medium text-stone-500 hover:text-stone-900"
        >
          ← Volver a categorías
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoria.nombre}</h1>
      <p className="text-gray-600 mb-8">{categoria.descripcion}</p>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Productos en esta categoría
      </h2>
      {productosDeCategoria.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">
            No hay productos en esta categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosDeCategoria.map((producto) => (
            <TiendaProductCard
              key={producto.id}
              producto={producto}
              categorias={categorias}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default CategoryDetailPage;