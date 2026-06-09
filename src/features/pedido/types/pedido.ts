export type ModalidadEntrega = "DELIVERY" | "RETIRO_LOCAL";

export interface EstadoPedido {
  codigo: string;
  nombre: string;
  orden: number;
  es_terminal: boolean;
  permite_cancelar: boolean;
}

export interface DetallePedidoInput {
  producto_id: number;
  cantidad: number;
  personalizacion: number[];
}

export interface PedidoCreate {
  modalidad_entrega: ModalidadEntrega;
  forma_pago_id: number;
  direccion_id?: number | null;
  items: DetallePedidoInput[];
  notas?: string | null;
}

export interface DetallePedidoOut {
  producto_id: number;
  cantidad: number;
  nombre_snap: string;
  precio_unit_snap: string;
  subtotal_snap: string;
  personalizacion: number[];
}

export interface HistorialEstadoOut {
  estado_anterior: string | null;
  estado_nuevo: string;
  usuario_id: number;
  fecha_cambio: string;
}

export interface PedidoResumen {
  id: number;
  usuario_id: number;
  modalidad_entrega: ModalidadEntrega;
  estado_pedido: EstadoPedido;
  subtotal: string;
  costo_envio: string;
  total: string;
  created_at: string;
}

export interface PedidoResponse extends PedidoResumen {
  direccion_id: number | null;
  forma_pago_id: number;
  notas: string | null;
  forma_pago_snap: string | null;
  direccion_snap: string | null;
  detalles: DetallePedidoOut[];
  historial_estado_pedido: HistorialEstadoOut[];
}
