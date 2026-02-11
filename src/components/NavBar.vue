<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import NavBarItem from './NavBarItem.vue'

const authStore = useAuthStore()
</script>

<template>
  <nav class="p-4">
    VueReddit
    <ul>
      <template v-if="authStore.isLoggedIn">
        <NavBarItem label="Accueil" :to="{ name: 'homepage' }" />
        <NavBarItem label="Topics" :to="{ name: 'topics' }" />
      </template>
      <template v-else>
        <NavBarItem label="Connexion" :to="{ name: 'login' }" />
        <NavBarItem label="Inscription" :to="{ name: 'login' }" />
      </template>
    </ul>
  </nav>
</template>
