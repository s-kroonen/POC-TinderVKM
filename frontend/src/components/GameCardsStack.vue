<template>
  <div class="cards">
    <GameCard
      v-for="(card, index) in cards"
      :key="card + '-' + index + (index === 0 ? '-active' : '')"
      :card="card + '-' + index + (index === 0 ? '-active' : '')"
      :is-current="index === 0"
      @cardAccepted="$emit('cardAccepted');"
      @cardRejected="$emit('cardRejected');"
      @cardSkipped="$emit('cardSkipped');"
      @hideCard="$emit('hideCard');"
    />
  </div>
</template>

<script setup lang="ts">
import GameCard from "./GameCard.vue";
import { type Class } from "../services/classService";

defineProps<{
  cards: Class[];
}>();

defineEmits(["cardAccepted", "cardRejected", "cardSkipped", "hideCard"]);
</script>


<style lang="scss" scoped>
.cards {
  position: relative;
  display: flex;
  margin: 50px;
  width: 300px;
}
</style>
