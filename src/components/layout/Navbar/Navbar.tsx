import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCartStore } from "@/features/cart/store/cartStore";
import { ROUTES } from "@/router/routes";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "text-orange-600"
      : "text-stone-600 hover:text-stone-900"
  }`;

const Navbar = () => {
  const { user, isLoading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const itemCount = useCartStore((s) =>
    s.items.reduce((acc, item) => acc + item.cantidad, 0),
  );

  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#fffdf9]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Marca */}
        <Link to={ROUTES.INICIO} onClick={close} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm shadow-orange-500/30">
            <svg
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            </svg>
          </span>
          <span className="font-['Fraunces'] text-xl font-semibold tracking-tight text-stone-900">
            Food<span className="text-orange-500">Store</span>
          </span>
        </Link>

        {/* Navegación desktop */}
        <div className="hidden items-center gap-1 md:flex">
          <NavLink to={ROUTES.INICIO} end className={linkClass}>
            Productos
          </NavLink>
          {user && (
            <NavLink to={ROUTES.PEDIDOS} className={linkClass}>
              Mis Pedidos
            </NavLink>
          )}

          {/* Carrito con contador */}
          <NavLink
            to={ROUTES.CARRITO}
            className="relative ml-1 grid h-10 w-10 place-items-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
            aria-label="Carrito"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white shadow-sm">
                {itemCount}
              </span>
            )}
          </NavLink>

          {/* Sesión */}
          <div className="ml-3 flex items-center gap-3 border-l border-stone-200 pl-4">
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-orange-500" />
            ) : user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                    {user.full_name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-medium text-stone-700">
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

        {/* Acciones mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <NavLink
            to={ROUTES.CARRITO}
            onClick={close}
            className="relative grid h-10 w-10 place-items-center rounded-full text-stone-600 hover:bg-stone-100"
            aria-label="Carrito"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </NavLink>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-stone-700 hover:bg-stone-100"
            aria-label="Menú"
            aria-expanded={open}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Panel mobile desplegable */}
      {open && (
        <div className="border-t border-stone-200/70 bg-[#fffdf9] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <NavLink to={ROUTES.INICIO} end onClick={close} className={linkClass}>
              Productos
            </NavLink>
            {user && (
              <NavLink to={ROUTES.PEDIDOS} onClick={close} className={linkClass}>
                Mis Pedidos
              </NavLink>
            )}
          </div>

          <div className="mt-3 border-t border-stone-200/70 pt-3">
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-orange-500" />
            ) : user ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                    {user.full_name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-medium text-stone-700">
                    {user.full_name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to={ROUTES.INGRESAR}
                  onClick={close}
                  className="rounded-lg px-3 py-2 text-center text-sm font-medium text-stone-700 hover:bg-stone-100"
                >
                  Ingresar
                </Link>
                <Link
                  to={ROUTES.REGISTRO}
                  onClick={close}
                  className="rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm shadow-orange-500/30"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
