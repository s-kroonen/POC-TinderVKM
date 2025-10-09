import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export interface ClassDTO {
  _id: string;
  d: number;
    name: string;
    shortdescription?: string;
    description?: string;
    content?: string;
    studycredit?: number;
    location?: string;
    contact_id?: number;
    level?: string;
    learningoutcomes?: string;
    Rood?: number;
    Groen?: number;
    Blauw?: number;
    Geel?: number;
    module_tags?: string[];
    interests_match_score?: number;
    popularity_score?: number;
    estimated_difficulty?: number;
    available_spots?: number;
    start_date?: string;
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
