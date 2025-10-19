<script setup lang="ts">
import DesktopHeader from "@/Header.vue";


</script>

<template>
  <div id="app" class="min-h-screen flex flex-col">

    <DesktopHeader />


    <main class="flex-1 p-4">
      <router-view />
    </main>

    <footer class="bg-gray-200 text-center p-2 text-sm">
      © 2025 VKM-Tinder (Storm Kroonen)
    </footer>
  </div>
</template>
