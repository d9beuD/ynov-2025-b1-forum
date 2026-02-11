<script setup lang="ts">
import api from '@/api'
import type { HydraContext } from '@/types/api'
import type { Topic } from '@/types/topic'
import { onMounted, reactive, ref } from 'vue'

const props = defineProps<{
  id: number
}>()

const defaultTopic = (): HydraContext<Topic> => ({
  id: 0,
  title: '',
  description: '',
  '@context': '',
  '@id': '',
  '@type': '',
})

const topic = reactive<HydraContext<Topic>>(defaultTopic())
const isLoading = ref(false)

onMounted(() => {
  isLoading.value = true

  api.topic
    .get(props.id)
    .then((data) => Object.assign(topic, data))
    .catch(() => Object.assign(topic, defaultTopic()))
    .finally(() => (isLoading.value = false))
})
</script>

<template>
  {{ topic }}
</template>
