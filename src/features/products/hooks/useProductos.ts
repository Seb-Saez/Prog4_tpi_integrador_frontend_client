import { useQuery } from "@tanstack/react-query";
import { getProductos } from "../api/productsService";

// Exportada para poder invalidarla desde mutaciones (ej: alta/edición de producto)
export const productosQueryKey = ["productos"] as const;

export function useProductos() {
  return useQuery({
    queryKey: productosQueryKey,
    queryFn: () => getProductos(),
  });
}
