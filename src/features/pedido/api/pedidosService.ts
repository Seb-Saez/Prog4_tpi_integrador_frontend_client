import api from "@/api/api";
import type { PedidoCreate, PedidoResponse, PedidoResumen } from "../types/pedido";

export function crearPedido(data: PedidoCreate) {
  return api.post<PedidoResponse>("/pedidos/", data).then((r) => r.data);
}

export function getMisPedidos(offset = 0, limit = 20) {
  return api
    .get<PedidoResumen[]>("/pedidos/mios", { params: { offset, limit } })
    .then((r) => r.data);
}

export function getPedido(id: number | string) {
  return api.get<PedidoResponse>(`/pedidos/${id}`).then((r) => r.data);
}

export function cancelarPedido(id: number | string) {
  return api
    .patch<PedidoResponse>(`/pedidos/${id}/cancelar`)
    .then((r) => r.data);
}
