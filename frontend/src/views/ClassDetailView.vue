<script setup lang="ts">
import {useClassesStore} from "@/stores/classes";
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";
import router from "@/router";

const store = useClassesStore();
const route = useRoute();
onMounted(async () => {
  if (store.classes.length === 0) {
    await store.initClasses();
  }
});

async function onDelete() {
  if (!cls.value) return;

  await store.remove(cls.value._id);
  router.push("/");
}

const cls = computed(() =>
    store.classes.find(c => c._id === route.params.id)
);
</script>
<template>
  <div v-if="!cls && store.classes.length === 0">
    Loading…
  </div>

  <div v-else-if="!cls">
    Class not found
  </div>

  <div class="p-6 max-w-3xl mx-auto">
    <div v-if="!cls">Class not found</div>

    <div v-else>
      <h1 class="text-2xl font-bold">{{ cls.name }}</h1>
      <p class="text-gray-600 mt-2">{{ cls.description }}</p>

      <div class="mt-4 space-y-2">
        <p><strong>Credits:</strong> {{ cls.studycredit ?? "N/A" }}</p>
        <p><strong>Level:</strong> {{ cls.level ?? "N/A" }}</p>
        <p><strong>Location:</strong> {{ cls.location ?? "N/A" }}</p>
        <p><strong>Start date:</strong> {{ cls.start_date ?? "N/A" }}</p>
      </div>

      <router-link
          :to="{ name: 'class-edit', params: { id: cls._id }}"
          class="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Edit
      </router-link>
    </div>
    <button
        class="mt-4 text-red-600"
        @click="onDelete"
    >
      Delete
    </button>

  </div>
</template>
