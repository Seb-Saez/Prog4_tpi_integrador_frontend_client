import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/router/routes";

/**
 * Public dead-end shown to authenticated users whose role is not CLIENTE.
 * Offers a logout so they can sign in with a customer account instead.
 */
export default function SinAccesoPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate(ROUTES.INGRESAR, { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          Acceso no permitido
        </h1>
        <p className="text-gray-600">
          Esta tienda es solo para clientes. Tu cuenta no tiene permiso para
          acceder a este panel.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
