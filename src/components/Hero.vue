<script setup lang="ts">
import CTAButtons from './CTAButtons.vue';
const CITY = import.meta.env.VITE_CITY as string;
const PROV = import.meta.env.VITE_PROVINCE as string;
</script>

<template>
  <section id="hero" class="relative isolate">
    <img
      src="/images/hero.avif"
      alt="Madera cepillada en aserradero"
      class="absolute inset-0 -z-10 h-full w-full object-cover"
      loading="eager"
      fetchpriority="high"
    />
    <div class="bg-white/70">
      <div class="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <h1 class="max-w-2xl text-4xl font-extrabold tracking-tight text-ink">
          Madera a medida con entrega confiable en {{ CITY }}, {{ PROV }}
        </h1>
        <p class="mt-4 max-w-2xl text-lg text-slate-800">
          Cepillado, secado, impregnado y fabricación de pallets/tableros.
          Cotizá en minutos por teléfono o WhatsApp.
        </p>
        <div class="mt-6">
          <CTAButtons />
        </div>
        <ul class="mt-6 flex flex-wrap gap-2 text-sm text-slate-700">
          <li class="rounded bg-white/70 px-2 py-1">✔️ Entregas en {{ PROV }}</li>
          <li class="rounded bg-white/70 px-2 py-1">✔️ Calidad controlada</li>
          <li class="rounded bg-white/70 px-2 py-1">✔️ Facturación A/B</li>
        </ul>
      </div>
    </div>
  </section>
</template>
