import { useQuery } from "@tanstack/react-query";
import { getIngredientes } from "../api/ingredientesService";

export const ingredientesQueryKey = ["ingredientes"] as const;

export function useIngredientes() {
  return useQuery({
    queryKey: ingredientesQueryKey,
    queryFn: getIngredientes,
  });
}
