<template>
  <div class="cards">
    <GameCard
      v-for="(card, index) in cards"
      :key="card._id"
      :card="card"
      :is-current="index === 0"
      @cardAccepted="$emit('cardAccepted',card);"
      @cardRejected="$emit('cardRejected',card);"
      @cardSkipped="$emit('cardSkipped',card);"
      @hideCard="$emit('hideCard',card);"
    />
  </div>
</template>

<script setup lang="ts">
import GameCard from "./GameCard.vue";
import type { Class } from "@/domain/classService";


defineProps<{
  cards: Class[];
}>();

defineEmits(["cardAccepted", "cardRejected", "cardSkipped", "hideCard"]);

// watch(() => props.cards, (newVal) => {
//   console.log("Cards updated in stack:", newVal.map(c => c.name));
// }, { deep: true });

</script>


<style lang="scss" scoped>
.cards {
  position: relative;
  display: flex;
  margin: 50px;
  width: 300px;
}
</style>
