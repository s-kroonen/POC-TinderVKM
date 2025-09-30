// src/stores/classes.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from "js-cookie";
import {
  getClasses,
  mergePreferences,
  setPreferences,
  type Class,
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
      // guest → use cookies
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
  function like(cls: Class) {
    liked.value.push(cls);
    remove(cls);
    saveToCookies();
  }

  function skip(cls: Class) {
    skipped.value.push(cls);
    remove(cls);
    saveToCookies();
  }

  function remove(cls: Class) {
    classes.value = classes.value.filter((c) => c._id !== cls._id);
  }

  // ---------- Cookies ----------
  function saveToCookies() {
    Cookies.set(
      "liked",
      JSON.stringify(liked.value.map((c) => c._id))
    );
    Cookies.set(
      "skipped",
      JSON.stringify(skipped.value.map((c) => c._id))
    );
  }

  function loadFromCookies() {
    const likedIds = JSON.parse(Cookies.get("liked") || "[]");
    const skippedIds = JSON.parse(Cookies.get("skipped") || "[]");

    liked.value = classes.value.filter((c) => likedIds.includes(c._id));
    skipped.value = classes.value.filter((c) => skippedIds.includes(c._id));
  }

  async function syncToBackendOnLogout() {
    const token = getToken();
    if (!token) return;

    const likedIds = liked.value.map((c) => c._id);
    const skippedIds = skipped.value.map((c) => c._id);
    await setPreferences(likedIds, skippedIds, token);
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
    syncToBackendOnLogout,
    clearCookies,
  };
});
