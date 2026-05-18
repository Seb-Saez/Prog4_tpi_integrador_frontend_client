import { Routes, Route, Navigate } from "react-router-dom";
import ProductListPage from "../features/products/pages/ProductListPage";
import ProductDetailPage from "../features/products/pages/ProductDetailPage";
import CartPage from "../features/cart/pages/CartPage";
import OrdersPage from "../features/orders/pages/OrdersPage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import { ProtectedRoute, PublicRoute } from "../components/ProtectedRoute/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/productos" element={<Navigate to="/" replace />} />
      <Route path="/productos/:id" element={<ProductDetailPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route
        path="/pedidos"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
