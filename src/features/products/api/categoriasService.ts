import api from "@/api/api";
import type { Categoria } from "../types/categoria";

export const getCategorias = () =>
  api.get<Categoria[]>("/categorias").then((r) => r.data);
