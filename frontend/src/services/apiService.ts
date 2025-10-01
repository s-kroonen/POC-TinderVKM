// src/services/classService.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export interface Class {
  _id: string;
  name: string;
  description: string;
  categories: string[];
}

export async function getClasses(): Promise<Class[]> {
  const res = await api.get<Class[]>("/api/classes");
  return res.data;
}

export async function mergePreferences(liked: string[], skipped: string[], token: string) {
  const res = await api.post(
    `/api/classes/me/merge-preferences`,
    { liked, skipped },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
export async function setPreferences(liked: string[], skipped: string[], token: string) {
  const res = await api.post(
    `/api/classes/me/set-preferences`,
    { liked, skipped },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
export async function getPreferences(token: string) {
  const res = await api.get(`/api/classes/me/preferences`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function loginApi(email: string, password: string) {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data;
}

export async function registerApi(email: string, password: string) {
  const res = await api.post("/api/auth/register", { email, password });
  return res.data;
}
