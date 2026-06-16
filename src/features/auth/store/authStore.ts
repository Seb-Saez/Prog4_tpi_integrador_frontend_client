import { create } from "zustand";
import type { usuarioPublico, usuariosLogin, usuariosRegister } from "../types/usuario";
import * as authService from "../api/authService";

interface AuthState {
  user: usuarioPublico | null;
  isLoading: boolean;
  // Actions
  hydrate: () => Promise<void>;
  login: (data: usuariosLogin) => Promise<void>;
  register: (data: usuariosRegister) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  hydrate: async () => {
    set({ isLoading: true });
    try {
      const user = await authService.getCurrentUser();
      set({ user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  login: async (data: usuariosLogin) => {
    await authService.login(data);
    const user = await authService.getCurrentUser();
    set({ user });
  },

  register: async (data: usuariosRegister) => {
    await authService.register(data);
  },

  logout: async () => {
    await authService.logout();
    set({ user: null });
  },
}));
