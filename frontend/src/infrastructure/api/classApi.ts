import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export interface ClassDTO {
  _id: string;
  name: string;
  description: string;
  categories: string[];
}

export async function fetchClasses(): Promise<ClassDTO[]> {
  return (await api.get<ClassDTO[]>("/api/classes")).data;
}

export async function fetchPreferences(token: string) {
  return (
    await api.get("/api/classes/me/preferences", {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}

export async function setPreferences(liked: string[], skipped: string[], token: string) {
  return (
    await api.post(
      "/api/classes/me/set-preferences",
      { liked, skipped },
      { headers: { Authorization: `Bearer ${token}` } }
    )
  ).data;
}
