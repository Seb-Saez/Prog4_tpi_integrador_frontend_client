import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/router/routes";

// layouts
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import AuthLayout from "@/components/layout/AuthLayout/AuthLayout";

// guards
import { RequireAuth } from "@/features/auth/guards/RequireAuth";
import { RequireCliente } from "@/features/auth/guards/RequireCliente";
import { GuestOnly } from "@/features/auth/guards/GuestOnly";

// páginas
import ProductListPage from "@/features/productos/pages/ProductListPage";
import ProductDetailPage from "@/features/productos/pages/ProductDetailPage";
import CategoriesPage from "@/features/categorias/pages/CategoriesPage";
import CategoryDetailPage from "@/features/categorias/pages/CategoryDetailPage";
import CartPage from "@/features/cart/pages/CartPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import OrdersPage from "@/features/pedido/pages/OrdersPage";
import OrderDetailPage from "@/features/pedido/pages/OrderDetailPage";
import DireccionesPage from "@/features/direcciones/pages/DireccionesPage";
import SinAccesoPage from "@/features/auth/pages/SinAccesoPage";
import PagoResultadoPage from "@/features/pago/pages/PagoResultadoPage";

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas protegidas - Requieren sesión (RequireAuth) y rol CLIENTE (RequireCliente) */}
      <Route element={<RequireAuth />}>
        <Route element={<RequireCliente />}>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.INICIO} element={<ProductListPage />} />
            <Route path={ROUTES.PRODUCTOS} element={<ProductListPage />} />
            <Route path={ROUTES.PRODUCTO_DETALLE} element={<ProductDetailPage />} />
            <Route path={ROUTES.CATEGORIAS} element={<CategoriesPage />} />
            <Route path={ROUTES.CATEGORIA_DETALLE} element={<CategoryDetailPage />} />
            <Route path={ROUTES.CARRITO} element={<CartPage />} />
            <Route path={ROUTES.PEDIDOS} element={<OrdersPage />} />
            <Route path={ROUTES.PEDIDO_DETALLE} element={<OrderDetailPage />} />
            <Route path={ROUTES.DIRECCIONES} element={<DireccionesPage />} />
          </Route>
        </Route>
      </Route>

      {/* Pública sin guard - destino de rebote para roles no-CLIENTE */}
      <Route path={ROUTES.SIN_ACCESO} element={<SinAccesoPage />} />

      {/* Pública - destino de back_urls de MercadoPago (sin guard, viene de redirect externo) */}
      <Route path={ROUTES.PAGO_RESULTADO} element={<PagoResultadoPage />} />

      {/* Rutas Auth - Solo para invitados */}
      <Route element={<GuestOnly />}>
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.INGRESAR} element={<LoginPage />} />
          <Route path={ROUTES.REGISTRO} element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
}