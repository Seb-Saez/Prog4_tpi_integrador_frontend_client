import { useProductos } from "../hooks/useProductos";
import { useCategorias } from "../hooks/useCategorias";
import TiendaProductCard from "../components/TiendaProductCard";
import TiendaCategoriaCard from "../components/TiendaCategoriaCard";

const ProductListPage = () => {
  const productosQuery = useProductos();
  const categoriasQuery = useCategorias();

  if (productosQuery.isLoading || categoriasQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (productosQuery.isError || categoriasQuery.isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">Error al cargar los productos.</p>
      </div>
    );
  }

  const productos = Array.isArray(productosQuery.data) ? productosQuery.data : [];
  const categorias = Array.isArray(categoriasQuery.data) ? categoriasQuery.data : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Nuestros Productos
      </h1>

      {categorias.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Categorías
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categorias.map((categoria) => (
              <TiendaCategoriaCard key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Productos</h2>
        {productos.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500 text-lg">
              No hay productos disponibles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <TiendaProductCard
                key={producto.id}
                producto={producto}
                categorias={categorias}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductListPage;
