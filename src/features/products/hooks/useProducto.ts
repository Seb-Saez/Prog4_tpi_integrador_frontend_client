import { useQuery } from "@tanstack/react-query";
import { getProducto } from "../api/productsService";

// Key dependiente del id: cada producto se cachea por separado
export const productoQueryKey = (id: string | undefined) =>
  ["producto", id] as const;

export function useProducto(id: string | undefined) {
  return useQuery({
    queryKey: productoQueryKey(id),
    queryFn: () => getProducto(id!),
    enabled: !!id, // no dispara la query hasta tener un id
  });
}
