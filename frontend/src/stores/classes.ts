// src/stores/classes.ts
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import Cookies from "js-cookie";
import { getClasses, mergePreferences, type Class, likeClassApi, skipClassApi, getPreferences } from "../services/apiService";

export const useClassesStore = defineStore("classes", () => {
  const classes = ref<Class[]>([]);
  const liked = ref<Class[]>([]);
  const skipped = ref<Class[]>([]);
  const token = ref<string | null>(Cookies.get("token") || null);

  async function fetchClasses() {
    classes.value = await getClasses();
  }

  async function fetchPreferences() {
    if (!token.value) return; // not logged in
    const prefs = await getPreferences(token.value);
    liked.value = prefs.liked;
    skipped.value = prefs.skipped;
  }

  async function like(cls: Class) {
    if (token.value) {
      await likeClassApi(cls._id, token.value);
    }
    liked.value.push(cls);
    remove(cls);
    saveToCookies();
  }

  async function skip(cls: Class) {
    if (token.value) {
      await skipClassApi(cls._id, token.value);
    }
    skipped.value.push(cls);
    remove(cls);
    saveToCookies();
  }

  async function mergeCookiesToBackend() {
    if (!token.value) return;

    const likedIds = JSON.parse(Cookies.get("liked") || "[]");
    const skippedIds = JSON.parse(Cookies.get("skipped") || "[]");

    if (likedIds.length || skippedIds.length) {
      await mergePreferences(likedIds, skippedIds, token.value);

      // clear cookies after syncing
      Cookies.remove("liked");
      Cookies.remove("skipped");

      // refresh from DB
      await fetchPreferences();
    }
  }


  function remove(cls: Class) {
    classes.value = classes.value.filter(c => c._id !== cls._id);
  }

  function saveToCookies() {
    Cookies.set("liked", JSON.stringify(liked.value.map(c => c._id)));
    Cookies.set("skipped", JSON.stringify(skipped.value.map(c => c._id)));
  }

  function loadFromCookies() {
    const likedIds = JSON.parse(Cookies.get("liked") || "[]");
    const skippedIds = JSON.parse(Cookies.get("skipped") || "[]");

    classes.value = classes.value.filter(
      c => !likedIds.includes(c._id) && !skippedIds.includes(c._id)
    );

    liked.value = classes.value.filter(c => likedIds.includes(c._id));
    skipped.value = classes.value.filter(c => skippedIds.includes(c._id));

    console.log("Loaded from cookies → liked:", liked.value, "skipped:", skipped.value);
  }

  function setToken(newToken: string) {
    token.value = newToken;
    Cookies.set("token", newToken);
  }

  return {
    classes,
    liked,
    skipped,
    token,
    fetchClasses,
    fetchPreferences,
    like,
    skip,
    loadFromCookies,
    setToken,
    mergeCookiesToBackend
  };
});
