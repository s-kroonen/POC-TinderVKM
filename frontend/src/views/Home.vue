<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useClassesStore } from "@/stores/classes";
import type { Class } from "@/domain/classService";
import GameCardsStack from "../components/GameCardsStack.vue";

const store = useClassesStore();

const searchName = ref("");
const searchLocation = ref("");
const showOnlyLiked = ref(false);

onMounted(() => store.initClasses());
onBeforeUnmount(() => store.syncToBackendOnLogout());

// --- Toggle Like / Unlike ---
function toggleLike(cls: Class) {
  const alreadyLiked = store.liked.some((c) => c._id === cls._id);
  if (alreadyLiked) {
    store.unlike(cls);
  } else {
    store.like(cls);
  }
}

// --- Filtered Classes ---
const filteredClasses = computed(() => {
  return store.classes.filter((cls) => {
    const matchesName = cls.name
      .toLowerCase()
      .includes(searchName.value.toLowerCase());
    const matchesLocation = cls.location
      ? cls.location.toLowerCase().includes(searchLocation.value.toLowerCase())
      : true;
    const matchesLiked = !showOnlyLiked.value
      ? true
      : store.liked.some((c) => c._id === cls._id);

    return matchesName && matchesLocation && matchesLiked;
  });
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- MOBILE -->
    <div class="md:hidden p-4">
      <h1 class="text-xl font-bold mb-4">Swipe Classes</h1>
      <GameCardsStack :cards="store.classes" @cardAccepted="store.like" @cardRejected="store.skip" />
    </div>

    <!-- DESKTOP -->
    <div class="hidden md:block p-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Available Classes</h1>
      </div>

      <!-- FILTERS -->
      <div class="flex gap-3 mb-6">
        <input v-model="searchName" type="text" placeholder="Filter by name" class="border rounded-md p-2 flex-1" />
        <input v-model="searchLocation" type="text" placeholder="Filter by location"
          class="border rounded-md p-2 flex-1" />
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="showOnlyLiked" />
          <span>Show liked only</span>
        </label>
      </div>

      <!-- CLASSES GRID -->
      <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div v-for="cls in filteredClasses" :key="cls._id" data-testid="class-card"
          class="bg-white p-4 rounded-lg shadow flex justify-between items-start">
          <div>
            <h2 class="font-semibold">{{ cls.name }}</h2>
            <p class="text-sm text-gray-600">{{ cls.description }}</p>
            <p v-if="cls.location" class="text-xs text-gray-500 mt-1">
              📍 {{ cls.location }}
            </p>
          </div>

          <!-- LIKE TOGGLE -->
          <button @click="toggleLike(cls)"
            class="rounded-md p-2.5 border border-transparent text-center text-sm transition-all shadow-sm focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
            :class="store.liked.some((c) => c._id === cls._id)
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-white text-red-600 border-red-300 hover:bg-red-100'" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218
                   25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174
                   2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1
                   12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437
                   2.322 5.437 5.25 0 3.925-2.438 7.111-4.739
                   9.256a25.175 25.175 0 0 1-4.244
                   3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752
                   0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
