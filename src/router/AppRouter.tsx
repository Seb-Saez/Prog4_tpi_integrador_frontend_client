import { Routes,Route } from "react-router-dom";
import {ROUTES} from "@/router/routes";

//layouts 
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import AuthLayout from "@/components/layout/AuthLayout/AuthLayout";

//guards para ver si esta logueado o si solo es visitante
import { RequireAuth } from "@/features/auth/guards/RequireAuth";
//import { GuestOnly } from "@/features/auth/guards/GuestOnly";

//paginas
import ProductListPage from "@/features/products/pages/ProductListPage";
import ProductDetailPage from "@/features/products/pages/ProductDetailPage";
import CartPage from "@/features/cart/pages/CartPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";

export function AppRouter() {
  return (
    <Routes>
      {/* Rutas publicas-Tienda */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.INICIO} element={<ProductListPage />} />
        <Route path={ROUTES.PRODUCTO_DETALLE} element={<ProductDetailPage />} />
        <Route path={ROUTES.CARRITO} element={<CartPage />} />
        
        {/* Rutas protegidas */}
        <Route element={<RequireAuth />}>
          <Route path={ROUTES.PEDIDOS} element={<OrdersPage />} />
        </Route>
      </Route>

      {/* Rutas Auth */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.INGRESAR} element={<LoginPage />} />
        <Route path={ROUTES.REGISTRO} element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}