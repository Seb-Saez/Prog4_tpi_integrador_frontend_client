import { useQuery } from "@tanstack/react-query";
import { getDirecciones } from "../api/direccionService";

export const direccionesQueryKey = ["direcciones"] as const;

export function useDirecciones() {
  return useQuery({
    queryKey: direccionesQueryKey,
    queryFn: () => getDirecciones(),
  });
}
