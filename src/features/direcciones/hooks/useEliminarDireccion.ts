import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDireccion } from "../api/direccionService";
import { direccionesQueryKey } from "./useDirecciones";

export function useEliminarDireccion() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteDireccion,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: direccionesQueryKey });
    },
  });
}
