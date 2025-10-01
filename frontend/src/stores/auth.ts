import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from "js-cookie";
import { loginApi, registerApi } from "@/services/apiService";
import { useClassesStore } from "./classes";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(Cookies.get("token") || null);
  const userEmail = ref<string | null>(null); // optional

  function isLoggedIn() {
    return !!token.value;
  }

  async function login(email: string, password: string) {
    const res = await loginApi(email, password);
    token.value = res.token;
    Cookies.set("token", res.token);
    userEmail.value = email;

    // merge cookies into backend preferences
    const classesStore = useClassesStore();
    await classesStore.fetchPreferences();
  }

  async function register(email: string, password: string) {
    await registerApi(email, password);
    // auto-login after register
    // await login(email, password);
  }

  function logout() {
    const classesStore = useClassesStore();
    classesStore.syncToBackendOnLogout();
    token.value = null;
    userEmail.value = null;
    Cookies.remove("token");
  }
  // in auth store
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
    setToken
  };
});
