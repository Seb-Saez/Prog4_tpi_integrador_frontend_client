import api from "@/api/api";

export interface PreferenciaResponse {
  init_point: string;
  preference_id: string;
}

export async function crearPreferencia(
  pedidoId: number,
): Promise<PreferenciaResponse> {
  const { data } = await api.post<PreferenciaResponse>(
    `/pagos/preferencia/${pedidoId}`,
  );
  return data;
}
