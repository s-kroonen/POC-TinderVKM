<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useClassesStore } from "../stores/classes";
import GameCardsStack from "../components/GameCardsStack.vue";

const store = useClassesStore();

onMounted(() => {
  store.fetchClasses();
});

function handleCardAccepted(cls) {
  store.like(cls);
  console.log("Card accepted:", cls.name);
}

function handleCardRejected(cls) {
  store.skip(cls);
  console.log("Card rejected:", cls.name);
}

function handleCardSkipped(cls) {
  store.skip(cls);
  console.log("Card skipped:", cls.name);
}

function removeCardFromDeck(cls) {
  store.skip(cls);
  console.log("Card removed from deck:", cls.name);
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Mobile swipe view -->
    <div class="md:hidden p-4">
      <h1 class="text-xl font-bold mb-4">Swipe Classes</h1>
      <GameCardsStack :cards="store.classes" @cardAccepted="handleCardAccepted" @cardRejected="handleCardRejected"
        @cardSkipped="handleCardSkipped" @hideCard="removeCardFromDeck" />
    </div>

    <!-- Desktop view -->
    <div class="hidden md:grid grid-cols-3 gap-4 p-6">
      <div class="col-span-2">
        <h1 class="text-2xl font-bold mb-4">Available Classes</h1>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="cls in store.classes" :key="cls._id" class="bg-white p-4 rounded-lg shadow">
            <h2 class="font-semibold">{{ cls.name }}</h2>
            <p class="text-sm text-gray-600">{{ cls.description }}</p>
            <div class="mt-2 flex gap-2">
              <!-- <button @click="skip(cls)" class="px-3 py-1 bg-red-500 text-white rounded">Skip</button>
              <button @click="like(cls)" class="px-3 py-1 bg-green-500 text-white rounded">Like</button> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar liked -->
      <div>
        <h2 class="text-xl font-bold mb-2">Liked Classes</h2>
        <ul class="space-y-2">
          <li v-for="cls in store.liked" :key="cls._id" class="bg-green-50 p-3 rounded border border-green-200">
            <h3 class="font-medium">{{ cls.name }}</h3> 
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
