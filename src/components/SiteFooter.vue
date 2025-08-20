<script setup lang="ts">
const SITE = import.meta.env.VITE_SITE_NAME as string;
const CITY = import.meta.env.VITE_CITY as string;
const PROV = import.meta.env.VITE_PROVINCE as string;
const HOURS = import.meta.env.VITE_HOURS as string;
const PHONE = import.meta.env.VITE_PHONE as string;
const EMAIL = import.meta.env.VITE_EMAIL as string;
// TODO: CUIT, políticas, redes
</script>

<template>
  <footer class="mt-16 border-t bg-slate-50">
    <div class="mx-auto max-w-7xl px-4 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <section>
        <h2 class="text-sm font-semibold text-steel-700">Empresa</h2>
        <p class="mt-2 text-sm text-slate-700">{{ SITE }} · {{ CITY }}, {{ PROV }}</p>
        <p class="mt-1 text-sm text-slate-700">Horarios: {{ HOURS }}</p>
      </section>
      <section>
        <h2 class="text-sm font-semibold text-steel-700">Contacto</h2>
        <ul class="mt-2 text-sm">
          <li>Tel: {{ PHONE }}</li>
          <li>Email: {{ EMAIL }}</li>
        </ul>
      </section>
      <section>
        <h2 class="text-sm font-semibold text-steel-700">Legales</h2>
        <ul class="mt-2 text-sm">
          <li>CUIT: <!-- TODO --></li>
          <li><a href="#" class="underline">Política de privacidad</a> <!-- TODO --></li>
          <li><a href="#" class="underline">Términos</a> <!-- TODO --></li>
        </ul>
      </section>
      <section>
        <h2 class="text-sm font-semibold text-steel-700">Redes</h2>
        <p class="mt-2 text-sm"><!-- TODO: links redes --></p>
      </section>
    </div>
    <div class="py-4 text-center text-xs text-slate-500">© {{ new Date().getFullYear() }} {{ SITE }}</div>
  </footer>
</template>
