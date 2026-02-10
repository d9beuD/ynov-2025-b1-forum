import api from '@/api'
import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = reactive<User | object>({})

  const isLoggedIn = computed(() => getUser(user) !== null)

  const loadUser = async () => {
    const fetchedUser = await api.users.getCurrent().catch(() => null)

    if (fetchedUser !== null) {
      Object.assign(user, fetchedUser)
    }
  }

  const getUser = (user: User | object): User | null =>
    Object.keys(user).length > 0 ? (user as User) : null

  return { isLoggedIn, user, loadUser, getUser }
})
