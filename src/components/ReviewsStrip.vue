<template>
  <section id="reseñas" class="scroll-mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-6 items-start">
        <!-- Columna izquierda: resumen -->
        <aside class="rounded-2xl border border-steel-200 bg-white/95 backdrop-blur p-6 text-center">
          <p class="text-sm font-semibold uppercase text-steel-700">Excelente</p>
          <div class="mt-2 flex justify-center" aria-label="Valoración promedio">
            <Stars :value="average" />
          </div>
          <p class="mt-2 text-sm text-steel-600">A base de {{ total }} reseñas</p>
          <div class="mt-3 flex items-center justify-center gap-2">
            <GoogleLogo class="h-6 w-auto" />
            <span class="sr-only">Google</span>
          </div>

          <!-- Slot opcional para widget externo (Trustindex / Elfsight / etc.) -->
          <div v-if="$slots.external" class="mt-5">
            <slot name="external" />
          </div>
        </aside>

        <!-- Columna derecha: tarjetas -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <article
            v-for="(r, i) in reviews"
            :key="i"
            class="rounded-xl border border-steel-200 bg-steel-50 p-5 shadow-[0_1px_2px_rgba(16,24,40,0.06)]"
          >
            <header class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-full bg-brand-600 text-white grid place-items-center font-bold">
                  {{ initials(r.author) }}
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-steel-900">{{ r.author }}</h3>
                  <time :datetime="r.dateISO" class="text-xs text-steel-500">{{ r.date }}</time>
                </div>
              </div>
              <GoogleGlyph class="h-5 w-5 shrink-0" />
            </header>

            <div class="mt-3">
              <Stars :value="r.rating" />
            </div>

            <p class="mt-2 text-sm text-steel-700 line-clamp-5">
              {{ r.text }}
            </p>

            <a
              v-if="r.url"
              :href="r.url"
              target="_blank"
              rel="noopener"
              class="mt-2 inline-block text-sm font-medium text-brand-700 hover:underline"
            >
              Leer más
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue'

type Review = {
  author: string
  rating: number   // 0..5
  text: string
  date: string     // legible
  dateISO?: string // ISO para <time>
  url?: string
}

const props = withDefaults(defineProps<{
  average?: number
  total?: number
  reviews: Review[]
}>(), {
  average: 5,
  total: 0
})

function initials (name: string) {
  return name.split(' ').map(s => s[0]?.toUpperCase()).slice(0, 2).join('') || '★'
}

/* Subcomponentes locales */
const Stars = defineComponent({
  name: 'Stars',
  props: { value: { type: Number, required: true } },
  setup (p) {
    return () =>
      h(
        'div',
        { class: 'flex gap-1', 'aria-hidden': 'true' },
        Array.from({ length: 5 }).map((_, i) =>
          h(
            'svg',
            {
              key: i,
              viewBox: '0 0 24 24',
              class: 'h-5 w-5',
              fill: i < Math.round(p.value) ? 'currentColor' : 'none',
              stroke: 'currentColor'
            },
            [h('path', { d: 'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' })]
          )
        )
      )
  }
})

const GoogleLogo = defineComponent({
  name: 'GoogleLogo',
  setup () {
    return () =>
      h('svg', { viewBox: '0 0 74 24', class: 'text-steel-500' }, [
        h('text', { x: 0, y: 18, fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 18 }, 'Google')
      ])
  }
})

const GoogleGlyph = defineComponent({
  name: 'GoogleGlyph',
  setup () {
    return () =>
      h('svg', { viewBox: '0 0 24 24' }, [
        h('path', {
          fill: '#4285F4',
          d: 'M12 12v3.6h5.1c-.2 1.3-1.5 3.8-5.1 3.8-3.1 0-5.7-2.6-5.7-5.8s2.6-5.8 5.7-5.8c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.9 5.1 14.6 4 12 4 6.9 4 2.7 8.2 2.7 13.4S6.9 22.8 12 22.8c6.9 0 9.3-4.8 9.3-7.2 0-.5-.1-.8-.1-1.2H12z'
        })
      ])
  }
})
</script>

<style scoped>
/* Si no tenés plugin @tailwindcss/line-clamp, este fallback sirve */
.line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
