import { useAuthStore } from "../store/authStore";

/**
 * Public hook — API contract unchanged: { user, isLoading, login, register, logout }.
 * Now backed by Zustand instead of React Context.
 * Drop-in replacement: all consumers (guards, pages) require zero changes.
 */
export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const logout = useAuthStore((s) => s.logout);

  return { user, isLoading, login, register, logout };
}
