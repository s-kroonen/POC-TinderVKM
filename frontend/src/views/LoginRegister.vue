<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const mode = ref<"login" | "register">("login");
const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

async function submit() {
  try {
    if (mode.value === "login") {
      await auth.login(email.value, password.value);
    } else {
      await auth.register(email.value, password.value);
    }
    router.push("/"); // redirect home
  } catch (err: any) {
    console.error(err);
    alert("Auth failed");
  }
}

// Open Microsoft login in a popup
function loginWithMicrosoft() {
  function handleMessage(event: MessageEvent) {

    if (event.origin !== import.meta.env.VITE_API_URL) return;

    const { token, user } = event.data;
    if (token) {
      auth.setToken(token, user.email);
      router.push("/");
    }
    window.removeEventListener("message", handleMessage);
  }

  // Attach listener first
  window.addEventListener("message", handleMessage);

  const width = 600;
  const height = 700;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  window.open(
    `${import.meta.env.VITE_API_URL}/api/auth/microsoft`,
    "Microsoft Login",
    `width=${width},height=${height},top=${top},left=${left}`
  );
}

</script>

<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h1 class="text-2xl font-bold mb-4">
      {{ mode === "login" ? "Login" : "Register" }}
    </h1>

    <form @submit.prevent="submit" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded" required />
      <input v-model="password" type="password" placeholder="Password" class="w-full border p-2 rounded" required />
      <button @click="loginWithMicrosoft" class="mt-4 w-full bg-green-600 text-white py-2 rounded">
        Login with Microsoft
        <img src="../public/icons/microsoft.svg" alt="Microsoft" width="50" height="50" />
      </button>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">
        {{ mode === "login" ? "Login" : "Register" }}
      </button>
    </form>



    <p class="mt-4 text-sm text-center">
      <span v-if="mode === 'login'">
        No account?
        <button class="text-blue-600" @click="mode = 'register'">Register</button>
      </span>
      <span v-else>
        Already registered?
        <button class="text-blue-600" @click="mode = 'login'">Login</button>
      </span>
    </p>
  </div>
</template>
