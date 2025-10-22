import * as classApi from "@/infrastructure/api/classApi";
import * as cookieStore from "@/infrastructure/persistence/cookieStore";
import type { Class } from "@/domain/classService";

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
