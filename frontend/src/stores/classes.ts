import { defineStore } from "pinia";
import { ref } from "vue";
import * as classService from "@/application/classService";
import type { Class } from "@/domain/classService";
import { useAuthStore } from "./auth";

export const useClassesStore = defineStore("classes", () => {
  const classes = ref<Class[]>([]);
  const liked = ref<Class[]>([]);
  const skipped = ref<Class[]>([]);

  function getToken(): string | null {
    return useAuthStore().token;
  }

  // ---------- Init ----------
  async function initClasses() {
    classes.value = await classService.loadClasses();

    const token = getToken();
    const prefs = await classService.loadPreferences(token || undefined);

    liked.value = prefs.liked;
    skipped.value = prefs.skipped;

    classes.value = classService.filterClasses(classes.value, liked.value, skipped.value);
  }

  // ---------- Actions ----------
  function like(cls: Class) {
    liked.value.push(cls);
    classes.value = classService.likeClass(classes.value, cls);
    classService.savePreferences(liked.value, skipped.value, getToken() || undefined);
  }

  function skip(cls: Class) {
    skipped.value.push(cls);
    classes.value = classService.skipClass(classes.value, cls);
    classService.savePreferences(liked.value, skipped.value, getToken() || undefined);
  }

  async function syncToBackendOnLogout() {
    const token = getToken();
    if (!token) return;
    await classService.savePreferences(liked.value, skipped.value, token);
  }

  function clearPreferences() {
    classService.clearPreferences();
    liked.value = [];
    skipped.value = [];
  }

  return {
    classes,
    liked,
    skipped,
    initClasses,
    like,
    skip,
    syncToBackendOnLogout,
    clearPreferences,
  };
});
