import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../store/authStore";

/**
 * Thin bootstrapper: calls store.hydrate() once on mount to fetch the current
 * session from the backend. No state lives here — all state lives in authStore.
 * Keep this wrapper in App.tsx so hydration fires before any guard renders.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}
