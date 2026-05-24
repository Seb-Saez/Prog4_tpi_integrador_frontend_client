import { Routes, Route } from "react-router-dom";
import { ROUTES } from "@/router/routes";

// layouts
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import AuthLayout from "@/components/layout/AuthLayout/AuthLayout";

// guards
import { RequireAuth } from "@/features/auth/guards/RequireAuth";
import { GuestOnly } from "@/features/auth/guards/GuestOnly";

// páginas
import ProductListPage from "@/features/products/pages/ProductListPage";
import ProductDetailPage from "@/features/products/pages/ProductDetailPage";
import CategoriesPage from "@/features/categorias/pages/CategoriesPage";
import CategoryDetailPage from "@/features/categorias/pages/CategoryDetailPage";
import CartPage from "@/features/cart/pages/CartPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas protegidas - Requieren sesión */}
      <Route element={<RequireAuth />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.INICIO} element={<ProductListPage />} />
          <Route path={ROUTES.PRODUCTOS} element={<ProductListPage />} />
          <Route path={ROUTES.PRODUCTO_DETALLE} element={<ProductDetailPage />} />
          <Route path={ROUTES.CATEGORIAS} element={<CategoriesPage />} />
          <Route path={ROUTES.CATEGORIA_DETALLE} element={<CategoryDetailPage />} />
          <Route path={ROUTES.CARRITO} element={<CartPage />} />
          <Route path={ROUTES.PEDIDOS} element={<OrdersPage />} />
        </Route>
      </Route>

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