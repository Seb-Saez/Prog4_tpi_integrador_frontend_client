import { NavLink } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/router/routes";
type SidebarProps = {
  open: boolean;
  onClose: () => void;
};
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
    isActive
      ? "bg-orange-50 text-orange-700"
      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
  }`;
export default function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = useAuth();
  return (
    <>
      {/* Overlay en mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-stone-200/70 
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:z-auto
          flex flex-col
        `}
      >
        <div className="p-4 border-b border-stone-200/70">
          <span className="font-display text-xl font-semibold tracking-tight text-stone-900">
            Food<span className="text-orange-500">Store</span>
          </span>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <NavLink
            to={ROUTES.PRODUCTOS}
            onClick={onClose}
            className={navLinkClass}
            end
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Productos
          </NavLink>
          <NavLink
            to={ROUTES.CATEGORIAS}
            onClick={onClose}
            className={navLinkClass}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Categorías
          </NavLink>
          {user && (
            <NavLink
              to={ROUTES.PEDIDOS}
              onClick={onClose}
              className={navLinkClass}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Pedidos
            </NavLink>
          )}
        </nav>
      </aside>
    </>
  );
}