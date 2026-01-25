import axios from "axios";

const api = axios.create({baseURL: import.meta.env.VITE_API_URL});

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
            headers: {Authorization: `Bearer ${token}`},
        })
    ).data;
}

export async function setPreferences(liked: string[], skipped: string[], token: string) {
    return (
        await api.post(
            "/api/classes/me/set-preferences",
            {liked, skipped},
            {headers: {Authorization: `Bearer ${token}`}}
        )
    ).data;
}

export async function fetchClassById(id: string): Promise<ClassDTO> {
    return (await api.get(`/api/classes/${id}`)).data;
}

export async function createClass(data: Partial<ClassDTO>, token: string) {
    return (
        await api.post("/api/classes", data, {
            headers: {Authorization: `Bearer ${token}`},
        })
    ).data;
}

export async function updateClass(id: string, data: Partial<ClassDTO>, token: string) {
    return (
        await api.put(`/api/classes/${id}`, data, {
            headers: {Authorization: `Bearer ${token}`},
        })
    ).data;
}

export async function deleteClass(id: string, token: string) {
    await api.delete(`/api/classes/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
    });
}
