import api from "@/api/api";
import type { Producto } from "../types/producto";

export const getProductos = () =>
  api.get<Producto[]>("/productos").then((r) => r.data);

export const getProducto = (id: string) =>
  api.get<Producto>(`/productos/${id}`).then((r) => r.data);
