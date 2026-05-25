import { useQuery } from "@tanstack/react-query";
import { getPedido } from "../api/pedidosService";

export const pedidoQueryKey = (id: number | string | undefined) =>
  ["pedido", id] as const;

export function usePedido(id: number | string | undefined) {
  return useQuery({
    queryKey: pedidoQueryKey(id),
    queryFn: () => getPedido(id!),
    enabled: !!id,
  });
}
