import api from "@/api/api";
import type { Ingrediente } from "../types/ingrediente";

export const getIngredientes = () =>
  api.get<Ingrediente[]>("/ingredientes").then((r) => r.data);
