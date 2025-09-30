// src/stores/classes.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from "js-cookie";
import {
  getClasses,
  mergePreferences,
  type Class,
  likeClassApi,
  skipClassApi,
  getPreferences,
} from "../services/apiService";
import { useAuthStore } from "./auth";

export const useClassesStore = defineStore("classes", () => {
  const classes = ref<Class[]>([]);
  const liked = ref<Class[]>([]);
  const skipped = ref<Class[]>([]);

  function getToken(): string | null {
    const auth = useAuthStore();
    return auth.token;
  }

  // ---------- Init ----------
  async function initClasses() {
    await fetchClasses();

    const token = getToken();
    if (token) {
      // logged in → only backend
      await fetchPreferences();
    } else {
      // not logged in → use cookies
      loadFromCookies();
    }

    filterClasses();
  }

  function filterClasses() {
    const likedIds = liked.value.map((c) => c._id);
    const skippedIds = skipped.value.map((c) => c._id);

    classes.value = classes.value.filter(
      (c) => !likedIds.includes(c._id) && !skippedIds.includes(c._id)
    );
  }

  // ---------- Fetch ----------
  async function fetchClasses() {
    classes.value = await getClasses();
  }

  async function fetchPreferences() {
    const token = getToken();
    if (!token) return;

    const prefs = await getPreferences(token);

    liked.value = prefs.liked || [];
    skipped.value = prefs.skipped || [];
  }

  // ---------- Actions ----------
  async function like(cls: Class) {
    const token = getToken();
    if (token) {
      await likeClassApi(cls._id, token);
    } else {
      saveToCookies(cls._id, "liked");
    }
    liked.value.push(cls);
    remove(cls);
  }

  async function skip(cls: Class) {
    const token = getToken();
    if (token) {
      await skipClassApi(cls._id, token);
    } else {
      saveToCookies(cls._id, "skipped");
    }
    skipped.value.push(cls);
    remove(cls);
  }

  function remove(cls: Class) {
    classes.value = classes.value.filter((c) => c._id !== cls._id);
  }

  // ---------- Cookie helpers (guest mode only) ----------
  function saveToCookies(classId: string, type: "liked" | "skipped") {
    const existing = JSON.parse(Cookies.get(type) || "[]");
    if (!existing.includes(classId)) {
      existing.push(classId);
      Cookies.set(type, JSON.stringify(existing));
    }
  }

  function loadFromCookies() {
    const likedIds = JSON.parse(Cookies.get("liked") || "[]");
    const skippedIds = JSON.parse(Cookies.get("skipped") || "[]");

    liked.value = classes.value.filter((c) => likedIds.includes(c._id));
    skipped.value = classes.value.filter((c) => skippedIds.includes(c._id));

    console.log(
      "Loaded from cookies → liked:",
      liked.value,
      "skipped:",
      skipped.value
    );
  }

  async function mergeCookiesToBackend() {
    const token = getToken();
    if (!token) return;

    const likedIds = JSON.parse(Cookies.get("liked") || "[]");
    const skippedIds = JSON.parse(Cookies.get("skipped") || "[]");

    if (likedIds.length || skippedIds.length) {
      await mergePreferences(likedIds, skippedIds, token);

      Cookies.remove("liked");
      Cookies.remove("skipped");

      await fetchPreferences();
    }
  }

  function clearCookies() {
    Cookies.remove("liked");
    Cookies.remove("skipped");
    liked.value = [];
    skipped.value = [];
  }

  return {
    classes,
    liked,
    skipped,
    initClasses,
    fetchPreferences,
    like,
    skip,
    mergeCookiesToBackend,
    clearCookies,
  };
});
