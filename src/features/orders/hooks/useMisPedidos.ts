import { useQuery } from "@tanstack/react-query";
import { getMisPedidos } from "../api/pedidosService";

export const misPedidosQueryKey = ["mis-pedidos"] as const;

export function useMisPedidos(offset = 0, limit = 20) {
  return useQuery({
    queryKey: [...misPedidosQueryKey, offset, limit],
    queryFn: () => getMisPedidos(offset, limit),
  });
}
