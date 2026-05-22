import axios from "axios";

// API_BASE sin /api/v1 — el backend expone auth con ese prefijo y el resto sin él.
export const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

export default api;
