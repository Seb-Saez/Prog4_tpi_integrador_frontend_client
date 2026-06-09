import { useState } from "react";
import { useProductos } from "../hooks/useProductos";
import { useCategorias } from "../hooks/useCategoria";
import TiendaProductCard from "../components/TiendaProductCard";
const ProductListPage = () => {
  const productosQuery = useProductos();
  const categoriasQuery = useCategorias();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
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
  const productosFiltrados = productos.filter((producto) => {
    const matchesSearch = producto.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategoria =
      selectedCategoria === "" ||
      producto.categorias_ids.includes(Number(selectedCategoria));
    return matchesSearch && matchesCategoria;
  });
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Nuestros Productos
      </h1>
      {/* Barra de filtros */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
          />
        </div>
        <div className="sm:w-64">
          <select
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
          >
            <option value="">Todas las categorías</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">
            No se encontraron productos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosFiltrados.map((producto) => (
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
export default ProductListPage;