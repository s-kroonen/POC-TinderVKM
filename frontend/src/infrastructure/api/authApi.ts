import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export async function login(email: string, password: string) {
  return (await api.post("/api/auth/login", { email, password })).data;
}

export async function register(email: string, password: string) {
  return (await api.post("/api/auth/register", { email, password })).data;
}

export function microsoftLoginUrl() {
  return `${import.meta.env.VITE_API_URL}/api/auth/microsoft`;
}
