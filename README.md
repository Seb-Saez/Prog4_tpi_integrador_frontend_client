# Frontend - Programación 4

Este repositorio contiene el frontend del cliente de la materia **Programación 4**.

## Integrantes

### Comisión 4
- Chirino Fausto
- Gonzalez Ezequiel
- Saez Sebastian

## Instrucciones para correr el frontend de cliente

1. Levantar el backend.
2. Ejecutar en este repositorio de frontend:

pnpm install
Iniciar el proyecto con:
pnpm run dev


## Variables de Entorno
El proyecto requiere un archivo `.env` en la raíz del proyecto. Podés copiar el archivo `.env.example` y ajustar los valores:


## Estructura de Carpetas
src/
  api/                  
    api.ts              # Instancia base de axios con baseURL
  components/           # Componentes compartidos
    Navbar/             # Navegación principal
    ProtectedRoute/     # Rutas protegidas/públicas
  context/              # Contextos de React
    AuthContext.tsx     # Manejo de sesión de usuario
  features/             # Módulos por dominio (feature-based)
    auth/               # Autenticación (login, registro)
      pages/
        LoginPage.tsx
        RegisterPage.tsx
    products/           # Catálogo de productos
      components/       # Cards de productos/categorías
      pages/
        ProductListPage.tsx    # Listado con filtros
        ProductDetailPage.tsx  # Detalle con ingredientes
    cart/               # Carrito de compras
      pages/
        CartPage.tsx     # Gestión del carrito
    orders/             # Pedidos del usuario
      pages/
        OrdersPage.tsx   # Historial de pedidos
  hooks/                # Custom hooks
    useAuth.ts          # Hook para acceder a AuthContext
  services/             # Llamadas a la API
    authService.ts      # Login, register, logout, me
  store/                # Estado global (Zustand)
    cartStore.ts        # Carrito de compras
  types/                # Interfaces TypeScript
    producto.ts
    categoria.ts
    ingrediente.ts
    usuario.ts
  router/               # Configuración de rutas
    AppRouter.tsx       # Definición de todas las rutas
Tecnologías Utilizadas
- React 19 + TypeScript - UI y tipado
- Vite - Build tool y dev server
- React Router DOM - Navegación SPA
- TanStack Query - Fetching, caching y estado del servidor
- Zustand - Estado global del cliente (carrito)
- TanStack Form - Formularios con validación
- Axios - Cliente HTTP
- Tailwind CSS - Estilos utilitarios