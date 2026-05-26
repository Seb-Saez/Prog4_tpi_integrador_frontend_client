import { useQuery } from "@tanstack/react-query";
import { getCategorias, getCategoria } from "../api/categoriasService";

// Exportada para poder invalidarla desde mutaciones (ej: alta/edición de categoría)
export const categoriasQueryKey = ["categorias"] as const;

export function useCategorias() {
  return useQuery({
    queryKey: categoriasQueryKey,
    queryFn: () => getCategorias(),
  });
}

export const categoriaQueryKey = (id: string | undefined) =>
  ["categoria", id] as const;
export function useCategoria(id: string | undefined) {
  return useQuery({
    queryKey: categoriaQueryKey(id),
    queryFn: () => getCategoria(id!),
    enabled: !!id,
  });
}
