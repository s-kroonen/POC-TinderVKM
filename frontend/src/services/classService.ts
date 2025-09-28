// src/services/classService.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL // ✅ must be prefixed with VITE_
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
