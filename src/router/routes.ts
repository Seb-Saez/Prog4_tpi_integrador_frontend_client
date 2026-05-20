 export const ROUTES = {
    // Públicas
    INICIO: "/",
    PRODUCTO_DETALLE: "/productos/:id",
    CARRITO: "/carrito",

    // Protegidas (requieren sesión)
    REALIZAR_PEDIDO: "/realizar-pedido",
    PEDIDOS: "/pedidos",
    PEDIDO_DETALLE: "/pedidos/:id",
    DIRECCIONES: "/direcciones",

    // Solo invitados
    INGRESAR: "/login",
    REGISTRO: "/register",
  } as const;


  // helpers para construir URLs con id real (links / navigate)
  export const productoDetalle = (id: number | string) => `/productos/${id}`;
  export const pedidoDetalle = (id: number | string) => `/pedidos/${id}`;