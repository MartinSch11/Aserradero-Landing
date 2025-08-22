<script setup lang="ts">
import { scrollToSection } from '@/composables/scrollToSection';
import MobileNavbar from './MobileNavbar.vue';

const SITE = import.meta.env.VITE_SITE_NAME as string;
</script>

<template>
  <!-- Desktop / Tablet -->
  <header
    class="hidden md:block sticky top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between" aria-label="Principal">
      <a href="/" class="font-semibold text-steel-700">{{ SITE }}</a>

      <ul class="flex gap-2 text-brand-600">
        <li><button class="px-3 py-2 rounded-md hover:bg-brand-500 hover:text-white"
            @click="scrollToSection('#quienes-somos')">Quienes Somos</button></li>
        <li><button class="px-3 py-2 rounded-md hover:bg-brand-500 hover:text-white"
            @click="scrollToSection('#servicios')">Servicios</button></li>
        <li><button class="px-3 py-2 rounded-md hover:bg-brand-500 hover:text-white"
            @click="scrollToSection('#especies')">Especies</button></li>
        <li><button class="px-3 py-2 rounded-md hover:bg-brand-500 hover:text-white"
            @click="scrollToSection('#calidad')">Calidad</button></li>
        <li><button class="px-3 py-2 rounded-md hover:bg-brand-500 hover:text-white"
            @click="scrollToSection('#contacto')">Contacto</button></li>
      </ul>

      <button @click="scrollToSection('#contacto')"
        class="ml-3 rounded-md bg-brand-500 px-3 py-2 text-sm text-white hover:bg-brand-600">
        Cotizar
      </button>
    </nav>
  </header>

  <!-- Móvil -->
  <MobileNavbar :logoSrc="'/favicon.svg'" :showAccount="false" />
</template>
