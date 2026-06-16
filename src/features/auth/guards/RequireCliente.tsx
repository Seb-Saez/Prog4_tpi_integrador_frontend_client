import { Guard } from "@/components/guard/Guard";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/router/routes";

/**
 * Allows only authenticated users with the CLIENTE role into the storefront.
 *
 * ADMIN / COCINA have their own panel, so they are bounced to a public
 * dead-end page. The redirect target MUST NOT be a GuestOnly route (e.g.
 * /login), otherwise an authenticated non-cliente user loops forever:
 * RequireCliente -> /login -> GuestOnly bounces back -> RequireCliente ...
 *
 * Mount this NESTED inside RequireAuth so the "no session" case still lands
 * on /login, while only the "wrong role" case lands on /sin-acceso.
 */
export function RequireCliente() {
  const { user, isLoading } = useAuth();

  return (
    <Guard
      isLoading={isLoading}
      isAllowed={user?.roles?.includes("CLIENT") ?? false}
      redirectTo={ROUTES.SIN_ACCESO}
    />
  );
}
