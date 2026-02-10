<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="w-3/12 border-e">
    <Navbar />
  </div>

  <div class="w-9/12">
    <RouterView />
  </div>
</template>
