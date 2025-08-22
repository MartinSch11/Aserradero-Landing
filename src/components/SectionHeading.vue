<template>
  <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl sm:text-3xl font-semibold text-steel-800">{{ title }}</h2>
    <p v-if="subtitle" class="mt-2 text-steel-600">{{ subtitle }}</p>
  </header>
</template>

<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>();
</script>
