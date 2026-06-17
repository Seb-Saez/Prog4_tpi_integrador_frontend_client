export const ROUTES = {
    // Públicas
    INICIO: "/",
    PRODUCTOS: "/productos",
    PRODUCTO_DETALLE: "/productos/:id",
    CARRITO: "/carrito",
    CATEGORIAS: "/categorias",
    CATEGORIA_DETALLE: "/categorias/:id",
    // Protegidas (requieren sesión + rol CLIENTE)
    PEDIDOS: "/pedidos",
    PEDIDO_DETALLE: "/pedidos/:id",
    DIRECCIONES: "/direcciones",
    // Solo invitados
    INGRESAR: "/login",
    REGISTRO: "/register",
    // Pública — destino de redirección post-pago (MercadoPago back_urls)
    PAGO_RESULTADO: "/pago/resultado",
    // Pública sin guard — destino de rebote para usuarios sin rol CLIENTE.
    // No puede tener guard (ni GuestOnly) o se genera un loop de redirección.
    SIN_ACCESO: "/sin-acceso",
  } as const;
  // helpers para construir URLs con id real (links / navigate)
  export const productoDetalle = (id: number | string) => `/productos/${id}`;
  export const pedidoDetalle = (id: number | string) => `/pedidos/${id}`;
  export const categoriaDetalle = (id: number | string) => `/categorias/${id}`;