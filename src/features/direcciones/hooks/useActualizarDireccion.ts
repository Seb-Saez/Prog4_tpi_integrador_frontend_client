import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDireccion } from "../api/direccionService";
import { direccionesQueryKey } from "./useDirecciones";

export function useActualizarDireccion() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateDireccion>[1] }) =>
      updateDireccion(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: direccionesQueryKey });
    },
  });
}
