<script setup lang="ts">
import { ref } from 'vue'
import { login } from './api'

const email = ref<string>('')
const password = ref<string>('')

const onSubmit = async () => {
  const data = await login(email.value, password.value)
  console.log(data)
}
</script>

<template>
  <form action="" @submit.prevent="onSubmit">
    <input v-model="email" type="email" placeholder="Adresse email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <input type="submit" value="Se connecter" />
  </form>
</template>
