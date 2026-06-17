import { useCategorias } from "@/features/productos/hooks/useCategoria";
import TiendaCategoriaCard from "@/features/productos/components/TiendaCategoriaCard";
const CategoriesPage = () => {
  const categoriasQuery = useCategorias();
  if (categoriasQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }
  if (categoriasQuery.isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-500">Error al cargar las categorías.</p>
      </div>
    );
  }
  const categorias = Array.isArray(categoriasQuery.data) ? categoriasQuery.data : [];
  // Mapa id → nombre para resolver el nombre de la madre de cada subcategoría.
  const nombrePorId = new Map(categorias.map((c) => [c.id, c.nombre]));
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Categorías
      </h1>
      {categorias.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">
            No hay categorías disponibles.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categorias.map((categoria) => (
            <TiendaCategoriaCard
              key={categoria.id}
              categoria={categoria}
              parentNombre={
                categoria.parent_id != null
                  ? nombrePorId.get(categoria.parent_id) ?? null
                  : null
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default CategoriesPage;