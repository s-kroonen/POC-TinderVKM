<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

function goAuth() {
  router.push("/auth");
}

function goProfile() {
  alert(`Logged in as ${auth.userEmail}`);
}
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col">
    <header class="bg-blue-600 text-white p-4 flex justify-between">
      <h1 class="text-xl font-bold">Student Classes</h1>

      <div>
        <button
          v-if="!auth.isLoggedIn()"
          @click="goAuth"
          class="bg-white text-blue-600 px-3 py-1 rounded"
        >
          Login
        </button>

        <div v-else class="flex gap-2 items-center">
          <button
            @click="goProfile"
            class="bg-white text-blue-600 px-3 py-1 rounded"
          >
            Profile
          </button>
          <button
            @click="auth.logout"
            class="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 p-4">
      <router-view />
    </main>

    <footer class="bg-gray-200 text-center p-2 text-sm">
      © 2025 LearnTinder
    </footer>
  </div>
</template>
