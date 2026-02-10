<script setup lang="ts">
import NavbarItem from './NavbarItem.vue'
</script>

<template>
  <nav class="p-4">
    VueReddit
    <ul>
      <NavbarItem label="Accueil" :to="{ name: 'homepage' }" />
      <NavbarItem label="Connexion" :to="{ name: 'login' }" />
      <NavbarItem label="Inscription" :to="{ name: 'login' }" />
    </ul>
  </nav>
</template>
