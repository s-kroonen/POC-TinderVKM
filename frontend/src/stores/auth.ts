import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from "js-cookie";
import * as authApi from "@/infrastructure/api/authApi";
import { useClassesStore } from "./classes";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(Cookies.get("token") || null);
  const userEmail = ref<string | null>(null);

  function isLoggedIn() {
    return !!token.value;
  }

  async function login(email: string, password: string) {
    const res = await authApi.login(email, password);
    token.value = res.token;
    userEmail.value = email;
    Cookies.set("token", res.token);

    // fetch backend preferences
    const classesStore = useClassesStore();
    await classesStore.initClasses();
  }

  async function register(email: string, password: string) {
    await authApi.register(email, password);
    // optional: auto-login
    // await login(email, password);
  }

  function logout() {
    const classesStore = useClassesStore();
    classesStore.syncToBackendOnLogout();
    token.value = null;
    userEmail.value = null;
    Cookies.remove("token");
  }

  function setToken(newToken: string, email?: string) {
    token.value = newToken;
    if (email) userEmail.value = email;
    Cookies.set("token", newToken);
  }

  return {
    token,
    userEmail,
    isLoggedIn,
    login,
    register,
    logout,
    setToken,
  };
});
