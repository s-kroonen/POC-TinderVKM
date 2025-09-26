<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Class {
  _id: string;
  name: string;
  description: string;
  categories: string[];
}

const classes = ref<Class[]>([]);

onMounted(async () => {
  const res = await axios.get("https://yourdomain.com/api/classes");
  classes.value = res.data;
});

function like(cls: Class) {
  console.log("Liked", cls.name);
}
function skip(cls: Class) {
  console.log("Skipped", cls.name);
}
</script>

<template>
  <div class="stack">
    <div
      v-for="cls in classes"
      :key="cls._id"
      class="card"
    >
      <h2>{{ cls.name }}</h2>
      <p>{{ cls.description }}</p>
      <small>{{ cls.categories.join(", ") }}</small>
      <div class="actions">
        <button @click="skip(cls)">❌</button>
        <button @click="like(cls)">❤️</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 1rem; }
.card { background: #fff; border-radius: 10px; padding: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.actions { display: flex; justify-content: space-around; margin-top: 1rem; }
</style>
