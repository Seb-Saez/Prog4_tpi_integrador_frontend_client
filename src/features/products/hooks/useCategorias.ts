import { useQuery } from "@tanstack/react-query";
import { getCategorias } from "../api/categoriasService";

// Exportada para poder invalidarla desde mutaciones (ej: alta/edición de categoría)
export const categoriasQueryKey = ["categorias"] as const;

export function useCategorias() {
  return useQuery({
    queryKey: categoriasQueryKey,
    queryFn: getCategorias,
  });
}
