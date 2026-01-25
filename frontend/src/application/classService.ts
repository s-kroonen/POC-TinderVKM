import * as classApi from "@/infrastructure/api/classApi";
import * as cookieStore from "@/infrastructure/persistence/cookieStore";
import type { Class } from "@/domain/classService";

import { ClassSchema } from "@/domain/class.schema";
import { ZodError } from "zod";

function mapZodError(err: ZodError) {
    const errors: Record<string, string> = {};
    err.issues.forEach(e => {
        if (e.path[0]) {
            errors[e.path[0].toString()] = e.message;
        }
    });
    return errors;
}

export async function create(cls: Partial<Class>, token: string) {
    try {
        const parsed = ClassSchema.parse(cls);
        return await classApi.createClass(parsed, token);
    } catch (err: any) {
        if (err instanceof ZodError) {
            throw { type: "validation", errors: mapZodError(err) };
        }
        throw err;
    }
}

export async function update(id: string, data: Partial<Class>, token: string) {
    try {
        const parsed = ClassSchema.parse(data);
        return await classApi.updateClass(id, parsed, token);
    } catch (err: any) {
        if (err instanceof ZodError) {
            throw { type: "validation", errors: mapZodError(err) };
        }
        throw err;
    }
}

export async function remove(id: string, token: string) {
    return await classApi.deleteClass(id, token);
}



// --- Load all classes from backend ---
export async function loadClasses(): Promise<Class[]> {
  return await classApi.fetchClasses();
}

// --- Load user preferences from backend or cookies ---
export async function loadPreferences(token?: string): Promise<{ liked: Class[]; skipped: Class[] }> {
  if (token) {
    const prefs = await classApi.fetchPreferences(token);
    return { liked: prefs.liked || [], skipped: prefs.skipped || [] };
  }

  // Guest mode → load from cookies
  const likedIds = cookieStore.loadLiked();
  const skippedIds = cookieStore.loadSkipped();

  const all = await classApi.fetchClasses(); // need to match IDs to classes
  return {
    liked: all.filter(c => likedIds.includes(c._id)),
    skipped: all.filter(c => skippedIds.includes(c._id)),
  };
}

// --- Save preferences (to backend or cookies) ---
export function savePreferences(liked: Class[], skipped: Class[], token?: string) {
  if (token != null) {
    return classApi.setPreferences(
      liked.map(c => c._id),
      skipped.map(c => c._id),
      token
    );
  }


  // Guest → save to cookies
  cookieStore.saveLiked(liked.map(c => c._id));
  cookieStore.saveSkipped(skipped.map(c => c._id));
  return Promise.resolve();
}

// --- Clear all locally stored preferences ---
export function clearPreferences() {
  cookieStore.clearPreferences();
}
