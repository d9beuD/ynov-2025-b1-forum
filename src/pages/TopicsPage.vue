<script setup lang="ts">
import api from '@/api'
import type { Collection } from '@/types/api'
import type { Topic } from '@/types/topic'
import { onMounted, reactive, ref } from 'vue'

const topics = reactive<Collection<Topic>>({
  totalItems: 0,
  search: {},
  view: {},
  member: [],
})

const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  const fetchedTopics = await api.topic.getCollection().catch(() => [])
  Object.assign(topics, fetchedTopics)
  isLoading.value = false
})
</script>

<template>
  <div class="p-4">
    <ul v-if="!isLoading">
      <li v-for="topic in topics.member" :key="topic.id">
        <RouterLink
          class="mb-2 block rounded border p-4"
          :to="{ name: 'topics.show', params: { id: topic.id } }"
        >
          <span class="font-bold">{{ topic.title }}</span>
          <p class="text-slate-500">{{ topic.description }}</p>
        </RouterLink>
      </li>
    </ul>
    <div v-else>Chargement...</div>
  </div>
</template>
