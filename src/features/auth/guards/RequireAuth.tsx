import { Guard } from "@/components/guard/Guard";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {ROUTES} from "@/router/routes";

export function RequireAuth(){
    const { user, isLoading } = useAuth();
    return(
        <Guard
            isLoading={isLoading}
            isAllowed={!!user}
            redirectTo={ROUTES.INGRESAR}
        />
    )
}

/**
Cómo se comporta:

  RequireAuth es delgadísimo a propósito: no tiene lógica de render, solo traduce y delega.

  useAuth() te da → { user, isLoading }
                          ↓ RequireAuth traduce
  Guard recibe → { isAllowed: !!user, isLoading, redirectTo: "/login" }
  RequireAuth es delgadísimo a propósito: no tiene lógica de render, solo traduce y delega.

  useAuth() te da → { user, isLoading }
                          ↓ RequireAuth traduce
  Guard recibe → { isAllowed: !!user, isLoading, redirectTo: "/login" }
                          ↓ Guard decide (los 3 caminos que ya viste)
          loading → spinner | sin user → /login | con user → <Outlet/>

  El reparto de responsabilidades es lo lindo:
  - useAuth → de dónde sale la verdad (la sesión).
  - RequireAuth → traduce esa verdad a un permiso (!!user) y elige el destino.
  - Guard → ejecuta la mecánica de redirigir/esperar/mostrar.

  Cada uno hace UNA cosa. Por eso el Guard es reutilizable (mañana un RequireAdmin haría
  isAllowed={user?.rol === "ADMIN"} usando el MISMO Guard).
 */