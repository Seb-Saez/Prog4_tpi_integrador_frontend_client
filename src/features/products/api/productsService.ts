import api from "@/api/api";
import type { Producto } from "../types/producto";

export function getProductos(params?: Record<string, string | number | boolean | undefined>) {
  return api.get<Producto[]>("/productos", { params }).then((r) => r.data);
}

export function getProducto(id: string) {
  return api.get<Producto>(`/productos/${id}`).then((r) => r.data);
}

export function createProducto(data: Omit<Producto, "id">) {
  return api.post<Producto>("/productos", data).then((r) => r.data);
}

export function updateProducto(id: number, data: Partial<Producto>) {
  return api.patch<Producto>(`/productos/${id}`, data).then((r) => r.data);
}

export function deleteProducto(id: number) {
  return api.delete(`/productos/${id}`);
}
