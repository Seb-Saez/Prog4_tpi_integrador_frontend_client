import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_URL;

// se sube el .env para ejecutar los llamados a la api, sino es http://localhost:8000

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

export default api;
