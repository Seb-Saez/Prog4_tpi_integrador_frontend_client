import api from "@/api/api";
import type { Direccion, DireccionCreate, DireccionUpdate } from "../types/direccion";

export function getDirecciones() {
  return api.get<Direccion[]>("/direcciones/").then((r) => r.data);
}

export function createDireccion(data: DireccionCreate) {
  return api.post<Direccion>("/direcciones/", data).then((r) => r.data);
}

export function updateDireccion(id: number, data: DireccionUpdate) {
  return api.patch<Direccion>(`/direcciones/${id}`, data).then((r) => r.data);
}

export function deleteDireccion(id: number) {
  return api.delete(`/direcciones/${id}`);
}
