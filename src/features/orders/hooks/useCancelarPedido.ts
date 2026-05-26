import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelarPedido } from "../api/pedidosService";
import { misPedidosQueryKey } from "./useMisPedidos";
import { pedidoQueryKey } from "./usePedido";

export function useCancelarPedido() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: cancelarPedido,
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: misPedidosQueryKey });
      qc.invalidateQueries({ queryKey: pedidoQueryKey(id) });
    },
  });
}
