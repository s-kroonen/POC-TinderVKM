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
  const res = await api.get<Class[]>("/classes");
  return res.data;
}

export async function likeClassApi(id: string, token: string) {
  await api.post(`/classes/${id}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function skipClassApi(id: string, token: string) {
  await api.post(`/classes/${id}/skip`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function mergePreferences(liked: string[], skipped: string[], token: string) {
  const res = await api.post(
    `/classes/merge-preferences`,
    { liked, skipped },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}


export async function getPreferences(token: string) {
  const res = await api.get(`/classes/me/preferences`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}