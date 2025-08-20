<script setup lang="ts">
import Hero from '@/components/Hero.vue';
import { onMounted } from 'vue';
import { setSEO } from '@/utils/seo';
import { injectLocalBusinessJSONLD } from '@/utils/schema';
import { track } from '@/utils/analytics';

const SITE = import.meta.env.VITE_SITE_NAME as string;
const CITY = import.meta.env.VITE_CITY as string;
const PROV = import.meta.env.VITE_PROVINCE as string;

// ✅ mover import.meta.* a constantes para usar en template
const SERVICE_AREA = import.meta.env.VITE_SERVICE_AREA as string;
const WHATSAPP = import.meta.env.VITE_WHATSAPP as string;
const PHONE = import.meta.env.VITE_PHONE as string;

onMounted(() => {
  setSEO({
    title: `${SITE} · Aserradero en ${CITY}, ${PROV}`,
    description:
      'Servicios de aserrado a medida, cepillado, secado, impregnado y fabricación de pallets/tableros. Envíos en la región. Pedí tu cotización.',
    url: import.meta.env.VITE_SITE_URL
  });
  injectLocalBusinessJSONLD();
});

async function onSubmit(e: Event) {
  e.preventDefault();
  const form = e.target as HTMLFormElement | null;
  if (!form) return;

  const fd = new FormData(form);
  const res = await fetch('/api/contact', { method: 'POST', body: fd });
  const ok = res.ok;
  track('form_submit', { ok });
  if (ok) form.reset();
  window.alert(ok ? '¡Mensaje enviado!' : 'Error al enviar. Probá de nuevo.');
}
</script>

<template>
  <main>
    <Hero />

    <!-- Servicios -->
    <section id="servicios" class="mx-auto max-w-7xl px-4 py-16">
      <h2 class="text-2xl font-bold text-ink">Servicios</h2>
      <p class="mt-2 text-slate-700">
        <!-- TODO: {{SERVICIOS}} descripción -->
        A medida, cepillado, secado, impregnado, pallets/tableros.
      </p>
      <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article class="rounded-lg border p-4">
          <h3 class="font-semibold">Cortes a medida</h3>
          <p class="text-sm text-slate-700">Precisión y mínimos ajustados.</p>
        </article>
        <article class="rounded-lg border p-4">
          <h3 class="font-semibold">Cepillado</h3>
          <p class="text-sm text-slate-700">Terminación lista para uso.</p>
        </article>
        <article class="rounded-lg border p-4">
          <h3 class="font-semibold">Secado</h3>
          <p class="text-sm text-slate-700">Control de humedad.</p>
        </article>
        <article class="rounded-lg border p-4">
          <h3 class="font-semibold">Impregnado</h3>
          <p class="text-sm text-slate-700">Protección y durabilidad.</p>
        </article>
      </div>
    </section>

    <!-- Especies -->
    <section id="especies" class="mx-auto max-w-7xl px-4 py-16 bg-slate-50">
      <h2 class="text-2xl font-bold text-ink">Especies</h2>
      <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article class="rounded-lg border bg-white p-4">
          <h3 class="font-semibold">Pino</h3>
          <p class="text-sm text-slate-700">Usos: construcción ligera. Humedad: 12–18%. Corte: blando.</p>
        </article>
        <article class="rounded-lg border bg-white p-4">
          <h3 class="font-semibold">Eucalipto</h3>
          <p class="text-sm text-slate-700">Usos: estructuras. Humedad: 10–16%. Corte: medio.</p>
        </article>
        <article class="rounded-lg border bg-white p-4">
          <h3 class="font-semibold">Algarrobo</h3>
          <p class="text-sm text-slate-700">Usos: muebles/tableros. Humedad: 8–12%. Corte: duro.</p>
        </article>
        <!-- TODO: más especies -->
      </div>
    </section>

    <!-- Calidad & Certificaciones -->
    <section id="calidad" class="mx-auto max-w-7xl px-4 py-16">
      <h2 class="text-2xl font-bold text-ink">Calidad & Certificaciones</h2>
      <p class="mt-2 text-slate-700">
        Procesos estandarizados. <!-- TODO: {{CERTIFICACIONES}} (FSC/PEFC) si aplica -->
      </p>
    </section>

    <!-- Logística -->
    <section id="logistica" class="mx-auto max-w-7xl px-4 py-16 bg-slate-50">
      <h2 class="text-2xl font-bold text-ink">Logística</h2>
      <p class="mt-2 text-slate-700">
        Cobertura: {{ SERVICE_AREA }}. Plazos y condiciones: <!-- TODO -->
      </p>
    </section>

    <!-- Galería -->
    <section id="galeria" class="mx-auto max-w-7xl px-4 py-16">
      <h2 class="text-2xl font-bold text-ink">Galería</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <!-- TODO: imágenes en WebP/AVIF con srcset/sizes y loading="lazy" -->
        <img src="/images/hero.avif" alt="Ejemplo de calidad de corte" loading="lazy" />
      </div>
    </section>

    <!-- Testimonios -->
    <section id="testimonios" class="mx-auto max-w-7xl px-4 py-16 bg-slate-50">
      <h2 class="text-2xl font-bold text-ink">Testimonios</h2>
      <blockquote class="mt-4 rounded border bg-white p-4 text-slate-800">
        “Excelente atención y entrega en tiempo.” — Cliente verificado
      </blockquote>
      <!-- TODO: más testimonios -->
    </section>

    <!-- FAQs -->
    <section id="faqs" class="mx-auto max-w-7xl px-4 py-16">
      <h2 class="text-2xl font-bold text-ink">Preguntas frecuentes</h2>
      <details class="mt-4 rounded border p-4">
        <summary class="font-semibold">¿Cómo se cotiza?</summary>
        <p class="mt-2 text-slate-700">Compartí medidas, especie y cantidad. Respondemos en el día.</p>
      </details>
      <!-- TODO: precios, mínimos, plazos, facturación -->
    </section>

    <!-- Contacto -->
    <section id="contacto" class="mx-auto max-w-3xl px-4 py-16 bg-slate-50">
      <h2 class="text-2xl font-bold text-ink">Contacto</h2>
      <form
        class="mt-6 grid gap-4"
        method="post"
        action="/api/contact"
        @submit.prevent="onSubmit"
      >
        <div class="grid gap-2">
          <label for="name" class="text-sm">Nombre</label>
          <input id="name" name="name" required class="rounded border px-3 py-2" />
        </div>
        <div class="grid gap-2">
          <label for="phone" class="text-sm">Teléfono</label>
          <input id="phone" name="phone" class="rounded border px-3 py-2" />
        </div>
        <div class="grid gap-2">
          <label for="email" class="text-sm">Email</label>
          <input id="email" name="email" type="email" required class="rounded border px-3 py-2" />
        </div>
        <div class="grid gap-2">
          <label for="message" class="text-sm">Mensaje</label>
          <textarea id="message" name="message" rows="4" required class="rounded border px-3 py-2"></textarea>
        </div>

        <!-- Honeypot -->
        <div class="hp" aria-hidden="true">
          <label for="company">Empresa</label>
          <input id="company" name="company" tabindex="-1" autocomplete="off" />
        </div>

        <button class="rounded bg-brand-500 px-4 py-2 text-white hover:bg-brand-600">Enviar</button>
        <p class="text-xs text-slate-600">
          También podés escribir a <strong>{{ WHATSAPP }}</strong> o llamar al
          <strong>{{ PHONE }}</strong>.
        </p>
      </form>
    </section>
  </main>
</template>
