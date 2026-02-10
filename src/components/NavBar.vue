<script setup lang="ts">
import NavBarItem from './NavBarItem.vue'
</script>

<template>
  <nav class="p-4">
    VueReddit
    <ul>
      <NavBarItem label="Accueil" :to="{ name: 'homepage' }" />
      <NavBarItem label="Connexion" :to="{ name: 'login' }" />
      <NavBarItem label="Inscription" :to="{ name: 'login' }" />
    </ul>
  </nav>
</template>
