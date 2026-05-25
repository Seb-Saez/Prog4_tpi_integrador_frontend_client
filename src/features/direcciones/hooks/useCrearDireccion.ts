import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDireccion } from "../api/direccionService";
import { direccionesQueryKey } from "./useDirecciones";

export function useCrearDireccion() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createDireccion,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: direccionesQueryKey });
    },
  });
}
