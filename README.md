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
```
src/
  api/                  # Instancia base de axios con baseURL       
  components/           # Componentes compartidos
  context/              # Contextos de React
  config/               # Configuracion global de las env
  features/             # Módulos por dominio (feature-based)
    auth/               # Autenticación (login, registro)
    products/           # Catálogo de productos
    cart/               # Carrito de compras
    pedidos/            # Pedidos del usuario
  hooks/                # Custom hooks
  router/               # Configuración de rutas
```
Tecnologías Utilizadas
- React 19 + TypeScript - UI y tipado
- Vite - Build tool y dev server
- React Router DOM - Navegación SPA
- TanStack Query - Fetching, caching y estado del servidor
- Zustand - Estado global del cliente (carrito)
- TanStack Form - Formularios con validación
- Axios - Cliente HTTP
- Tailwind CSS - Estilos utilitarios
