
<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- Example header (you can style or remove) -->
    <header class="bg-blue-600 text-white p-4">
      <h1 class="text-xl font-bold">Student Classes</h1>
    </header>

    <!-- Routed content -->
    <main class="flex-1 p-4">
      <router-view />   <!-- 👈 Loads Home.vue or any other route -->
    </main>

    <!-- Example footer -->
    <footer class="bg-gray-200 text-center p-2 text-sm">
      © 2025 LearnTinder
    </footer>
  </div>
</template>

<style scoped>
/* optional extra layout tweaks */
</style>
