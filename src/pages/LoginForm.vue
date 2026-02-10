<script setup lang="ts">
import { login } from '@/api'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/user'
import { computed, reactive, ref } from 'vue'

const userForm = reactive<Pick<User, 'email'> & { password: string }>({
  email: '',
  password: '',
})

const isLoading = ref<boolean>(false)

const submitLabel = computed(() => (isLoading.value ? 'Chargement...' : 'Se connecter'))

const authStore = useAuthStore()

const onSubmit = async () => {
  isLoading.value = true

  await login(userForm.email, userForm.password)

  authStore.loadUser()
  isLoading.value = false
}
</script>

<template>
  <div class="p-4">
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <label for="email">Adresse email</label>
        <input v-model="userForm.email" type="email" id="email" placeholder="Adresse email" />
      </div>

      <div class="mb-4">
        <label for="password">Mot de passe</label>
        <input
          v-model="userForm.password"
          type="password"
          id="password"
          placeholder="Mot de passe"
        />
      </div>

      <input class="rounded bg-blue-600 px-2 py-1 text-white" type="submit" :value="submitLabel" />
    </form>
  </div>
</template>
