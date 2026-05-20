import axios from "axios";

// El prefijo /api/v1 vive acá (no en cada service). Default para desarrollo local.
export const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

export default api;
