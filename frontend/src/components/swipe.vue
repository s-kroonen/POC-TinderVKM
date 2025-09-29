<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import { useDrag } from "@vueuse/gesture";
import type { Class } from "../services/apiService";
import { useMotion } from '@vueuse/motion';

const props = defineProps<{
  initialLiked: Class[];
  classes?: Class[];
}>();
const emit = defineEmits<{
  (e: "like", cls: Class): void;
  (e: "skip", cls: Class): void;
}>();

const cards = ref<Class[]>([]);
watch(
  () => props.classes,
  (newVal) => {
    if (newVal) {
      cards.value = [...newVal];
    }
  },
  { immediate: true }
);

const currentIndex = ref(0);
const currentCard = computed(() => cards.value[currentIndex.value]);

const cardRef = ref<HTMLElement | null>(null);

// swipe threshold in px
const threshold = 120;

const releaseHandler = ({ movement: [mx, my] }) => {
  if (!currentCard.value) return;

  if (Math.abs(mx) > threshold) {
    const cls = currentCard.value;
    if (mx > 0) emit('like', cls);
    else emit('skip', cls);
    currentIndex.value++;
  }

  // reset card after release
  set({ x: 0, y: 0, rotate: 0, cursor: 'grab' });
};
let motionSet: any;

watch(cardRef, (el) => {
  if (!el) return;

  const { set, stop } = useMotion(el);
  
  const dragHandler = ({ movement: [mx, my], dragging }) => {
    if (!currentCard.value) return;

    if (dragging) {
      set({ x: mx, y: my, rotate: mx / 20, cursor: 'grabbing' });
    } else {
      if (Math.abs(mx) > threshold) {
        const cls = currentCard.value;
        if (mx > 0) emit('like', cls);
        else emit('skip', cls);
        currentIndex.value++;
      }

      set({ x: 0, y: 0, rotate: 0, cursor: 'grab' });
    }
  };

  useDrag(dragHandler, { domTarget: el });
});

</script>

<template>
  <div class="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
    <div v-if="currentCard" ref="cardRef"
      class="card absolute w-72 h-96 bg-white shadow-lg rounded-xl p-6 transition-transform duration-200 ease-out">
      <h2 class="text-lg font-bold mb-2">{{ currentCard.name }}</h2>
      <p class="text-sm text-gray-600 mb-4">{{ currentCard.description }}</p>
      <p class="text-xs text-gray-400">Categories: {{ currentCard.categories }}</p>
    </div>

    <div v-else class="text-gray-500">No more classes</div>
  </div>
</template>
<style>
.card {
  user-select: none;
  -webkit-user-drag: none;
  touch-action: none;
  cursor: grab;
}

</style>