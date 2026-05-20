import { createContext } from "react";
import type {
  usuarioPublico,
  usuariosLogin,
  usuariosRegister,
} from "../types/usuario";

export type AuthContextType = {
  user: usuarioPublico | null;
  isLoading: boolean;
  login: (data: usuariosLogin) => Promise<void>;
  register: (data: usuariosRegister) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
