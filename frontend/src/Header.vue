<template>
  <header>
    <!-- Top: Logo area -->
    <div class="bg-white p-4 flex justify-center border-b border-gray-200">
      <router-link to="/">
        <img src="./public/icons/XL_Logo.svg" alt="Avans" class="h-12 cursor-pointer" />
      </router-link>
    </div>

    <!-- Bottom: Red nav bar -->
    <div class="bg-red-600">
      <div class="max-w-6xl mx-auto px-4">
        <nav class="flex gap-6 items-center text-white py-2">
          <!-- External link -->
          <a
            href="https://github.com/s-kroonen/POC-TinderVKM"
            target="_blank"
            rel="noopener"
            class="hover:underline"
          >
            GitHub
          </a>

          <!-- Help dropdown -->
          <div class="dropdown" @click="toggleHelp">
            <button class="flex items-center gap-1">
              <span>Help</span>
              <span class="chevron">▼</span>
            </button>
            <ul v-if="helpOpen" class="dropdown-menu">
              <li><a href="#">Privacy Statement (NL)</a></li>
              <li><a href="#">Privacy Statement (EN)</a></li>
              <li><a href="#">ServicePunt</a></li>
              <li><a href="#">Student Support</a></li>
              <li><a href="#">Vragen?</a></li>
            </ul>
          </div>

          <!-- Profile/Login -->
          <div class="ml-auto">
            <button
              v-if="!auth.isLoggedIn()"
              @click="goAuth"
              class="bg-white text-red-600 px-3 py-1 rounded"
            >
              Login
            </button>

            <div v-else class="dropdown" @click="toggleProfile">
              <button class="flex items-center gap-1">
                <span>Profile</span>
                <span class="chevron">▼</span>
              </button>
              <ul v-if="profileOpen" class="dropdown-menu right-0">
                <li>
                  <button @click="goProfile" class="w-full text-left">
                    Account
                  </button>
                </li>
                <li>
                  <button @click="auth.logout" class="w-full text-left">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const helpOpen = ref(false);
const profileOpen = ref(false);

const auth = useAuthStore();
const router = useRouter();

const toggleHelp = () => {
  helpOpen.value = !helpOpen.value;
  profileOpen.value = false;
};
const toggleProfile = () => {
  profileOpen.value = !profileOpen.value;
  helpOpen.value = false;
};

function goAuth() {
  router.push("/auth");
}
function goProfile() {
  alert(`Logged in as ${auth.userEmail}`);
}
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  padding: 0.5rem;
  list-style: none;
  min-width: 200px;
  z-index: 1000;
}

.dropdown-menu li {
  padding: 0.25rem 0;
}

.dropdown-menu li a,
.dropdown-menu li button {
  color: #333;
  text-decoration: none;
  width: 100%;
}

.chevron {
  font-size: 0.8em;
}
</style>
