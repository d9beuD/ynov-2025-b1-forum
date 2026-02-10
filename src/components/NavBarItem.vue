<script setup lang="ts">
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'

const props = defineProps<{
  label: string
  to: RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
}>()
</script>

<template>
  <li>
    <RouterLink
      class="block rounded p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
      :to="props.to"
      >{{ props.label }}</RouterLink
    >
  </li>
</template>
