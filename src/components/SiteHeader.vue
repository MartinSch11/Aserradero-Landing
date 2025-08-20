<script setup lang="ts">
const SITE = import.meta.env.VITE_SITE_NAME as string;
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between" aria-label="Principal">
      <a href="/" class="font-semibold text-steel-700">{{ SITE }}</a>
      <ul class="hidden md:flex gap-6">
        <li><a href="/#servicios" class="hover:text-brand-600">Servicios</a></li>
        <li><a href="/#especies" class="hover:text-brand-600">Especies</a></li>
        <li><a href="/#calidad" class="hover:text-brand-600">Calidad</a></li>
        <li><a href="/#logistica" class="hover:text-brand-600">Logística</a></li>
        <li><a href="/#contacto" class="hover:text-brand-600">Contacto</a></li>
      </ul>
      <a href="/#contacto" class="ml-3 rounded-md bg-brand-500 px-3 py-2 text-sm text-white hover:bg-brand-600">Cotizar</a>
    </nav>
  </header>
</template>
