import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCartStore } from "@/features/cart/store/cartStore";
import { ROUTES } from "@/router/routes";
type NavbarProps = {
  onToggleSidebar: () => void;
};
const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { user, isLoading, logout } = useAuth();
  const itemCount = useCartStore((s) =>
    s.items.reduce((acc, item) => acc + item.cantidad, 0),
  );
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/70 bg-[#fffdf9]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Izquierda: botón hamburguesa + logo mobile */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="grid h-10 w-10 place-items-center rounded-full text-stone-700 hover:bg-stone-100 md:hidden"
            aria-label="Menú"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <Link to={ROUTES.PRODUCTOS} className="flex items-center gap-2.5">
            
            
          </Link>
        </div>
        {/* Derecha: carrito + sesión */}
        <div className="flex items-center gap-2">
          {/* Carrito */}
          <Link
            to={ROUTES.CARRITO}
            className="relative grid h-10 w-10 place-items-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
            aria-label="Carrito"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white shadow-sm">
                {itemCount}
              </span>
            )}
          </Link>
          {/* Sesión */}
          <div className="ml-2 flex items-center gap-3 border-l border-stone-200 pl-3">
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-orange-500" />
            ) : user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                    {user.full_name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-medium text-stone-700 hidden sm:inline">
                    {user.full_name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  to={ROUTES.INGRESAR}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:text-stone-900"
                >
                  Ingresar
                </Link>
                <Link
                  to={ROUTES.REGISTRO}
                  className="rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-orange-500/30 transition-transform hover:scale-[1.03] active:scale-95"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;