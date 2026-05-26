import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearPedido } from "../api/pedidosService";
import { misPedidosQueryKey } from "./useMisPedidos";

export function useCrearPedido() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: crearPedido,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: misPedidosQueryKey });
    },
  });
}
