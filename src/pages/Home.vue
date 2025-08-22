<template>
  <main class="space-y-24 md:space-y-36">
    <!-- QUIÉNES SOMOS -->
    <section id="quienes-somos" class="relative scroll-mt-20 overflow-hidden">
      <!-- fondo decorativo sobrio -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0">
        <div class="absolute inset-0 bg-brand-700"></div>
        <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl"></div>
        <div class="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-brand-500/25 blur-3xl"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div v-reveal class="max-w-3xl">
          <p class="text-sm font-semibold uppercase text-brand-100 tracking-wide">Quiénes somos</p>
          <h2 class="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
            Suabia Maderas
          </h2>
          <p class="mt-4 text-brand-100/90 leading-relaxed text-lg">
            Somos una empresa ubicada en Eldorado, Misiones, especializada en la producción
            de madera de alta calidad. Con una trayectoria sólida y reconocimiento regional, se destaca
            por la variedad de productos, la satisfacción plena de sus clientes y un firme compromiso
            con la sostenibilidad.
          </p>
          <p class="mt-3 text-brand-100/80 leading-relaxed">
            Nuestra ubicación estratégica nos permite trabajar con madera sustentable, consolidándonos como un
            referente confiable en la industria maderera argentina.
          </p>
        </div>

        <!-- KPIs de reputación -->
        <div class="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
          <div class="text-center p-4 rounded-xl border border-white/20 bg-white/95 backdrop-blur">
            <div class="text-3xl md:text-4xl font-extrabold text-steel-900">+20 años</div>
            <div class="mt-1 text-sm font-semibold uppercase text-steel-600">Trayectoria</div>
          </div>
          <div class="text-center p-4 rounded-xl border border-white/20 bg-white/95 backdrop-blur">
            <div class="text-3xl md:text-4xl font-extrabold text-steel-900">5.0</div>
            <div class="mt-1 text-sm font-semibold uppercase text-steel-600">Valoración clientes</div>
          </div>
          <div class="hidden sm:block text-center p-4 rounded-xl border border-white/20 bg-white/95 backdrop-blur">
            <div class="text-3xl md:text-4xl font-extrabold text-steel-900">100%</div>
            <div class="mt-1 text-sm font-semibold uppercase text-steel-600">Madera sustentable</div>
          </div>
        </div>
      </div>
    </section>
    <!-- SERVICIOS (estilo SIRO) -->
    <section id="servicios" class="relative scroll-mt-20">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Kicker + H2 -->
        <div v-reveal class="max-w-3xl">
          <p class="text-sm font-semibold uppercase text-brand-700 tracking-wide">Servicios</p>
          <h2 class="mt-1 text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-steel-900">
            Corte, cepillado y secado profesional
          </h2>
          <p class="mt-3 text-steel-700">
            Estándares de calidad consistentes y plazos de entrega predecibles para tu obra.
          </p>
        </div>

        <!-- Grid de servicios -->
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="(s, i) in servicios" :key="s.title" v-reveal :style="{ '--reveal-delay': `${i * 90}ms` }"
            class="group relative rounded-2xl border border-steel-200 bg-white/90 backdrop-blur p-6
                   shadow-[0_1px_2px_rgba(16,24,40,0.06)] transition-all duration-200
                   hover:-translate-y-0.5 hover:shadow-lg">
            <!-- Header con icono -->
            <div class="flex items-center gap-3">
              <span class="inline-grid place-items-center h-11 w-11 rounded-xl text-white ring-1 ring-inset ring-steel-200
                       bg-gradient-to-br from-brand-500 to-brand-600" aria-hidden="true">
                <!-- ícono genérico -->
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 7h10M3 12h10M3 17h7" />
                  <path d="M14 7l7 7-3 3-7-7z" />
                </svg>
              </span>
              <h3 class="text-steel-900 font-semibold tracking-tight uppercase">{{ s.title }}</h3>
            </div>

            <p class="mt-3 text-steel-600 leading-relaxed">{{ s.desc }}</p>

            <!-- Línea sutil -->
            <div class="my-5 h-px bg-steel-200/70"></div>

            <!-- CTA -->
            <div class="mt-5 flex items-center justify-between">
              <a href="#contacto"
                class="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-white transition hover:bg-brand-700">
                Solicitar cotización
              </a>
              <span class="text-xs text-steel-500">Respuesta <strong>&lt; 24h</strong></span>
            </div>

            <!-- ring sutil al hover -->
            <span
              class="pointer-events-none absolute inset-0 rounded-2xl transition group-hover:ring-2 group-hover:ring-brand-500/25"></span>
          </article>
        </div>
      </div>
    </section>

    <!-- ESPECIES -->
    <section id="especies" class="relative scroll-mt-20 overflow-hidden">
      <!-- Fondo decorativo sutil -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0">
        <div class="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"></div>
        <div class="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-brand-600/15 blur-3xl"></div>
      </div>

      <div class="relative">
        <SectionHeading v-reveal title="Especies" subtitle="Elliotti y Taeda." />
        <div class="mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <article v-for="(e, i) in especies" :key="e" v-reveal :style="{ '--reveal-delay': `${i * 70}ms` }" class="group relative rounded-2xl border border-steel-200 bg-white/90 backdrop-blur p-4
                     shadow-[0_1px_2px_rgba(16,24,40,0.06)]
                     transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
              <div class="flex items-center gap-3">
                <!-- Badge/ícono -->
                <span class="inline-grid place-items-center h-10 w-10 rounded-xl text-white ring-1 ring-inset ring-steel-200
                             bg-gradient-to-br from-brand-500 to-brand-600" aria-hidden="true">
                  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v20M7 7l5-5 5 5M6 12h12M8 16h8" />
                  </svg>
                </span>

                <h3 class="text-steel-900 font-semibold tracking-tight">
                  {{ e }}
                </h3>
              </div>

              <span class="pointer-events-none absolute inset-0 rounded-2xl transition
                           group-hover:ring-2 group-hover:ring-brand-500/25" />
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- CALIDAD -->
    <section id="calidad" class="relative scroll-mt-20 overflow-hidden">
      <!-- Fondo decorativo con diagonales suaves -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0">
        <div class="absolute inset-0 opacity-60" style="
          background:
            linear-gradient(135deg, rgba(0,0,0,0) 40%, rgba(2,6,23,0.035) 41%, rgba(0,0,0,0) 60%),
            linear-gradient(135deg, rgba(0,0,0,0) 55%, rgba(2,6,23,0.035) 56%, rgba(0,0,0,0) 75%);
          background-size: 900px 900px, 1100px 1100px;
          background-position: -200px -150px, 300px 120px;">
        </div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="max-w-2xl" v-reveal>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-steel-900 leading-tight">
            <span class="uppercase block">Somos referentes en</span>
            <span class="uppercase block text-brand-600">Calidad y selección</span>
          </h2>

          <p class="mt-4 text-lg font-semibold text-steel-800">
            Humedad controlada, cepillado uniforme, y estabilidad superior.
          </p>

          <p class="mt-2 text-steel-600 leading-relaxed">
            Nuestras piezas pasan por controles en cada etapa para que recibas madera
            con dimensiones consistentes y terminación lista para trabajar.
          </p>

          <ul class="mt-5 space-y-2">
            <li class="flex items-start gap-3">
              <span class="mt-0.5 inline-grid place-items-center h-5 w-5 rounded-full text-white bg-brand-600"
                aria-hidden="true">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="3"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span class="text-steel-800 font-medium">Curva de secado controlada</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5 inline-grid place-items-center h-5 w-5 rounded-full text-white bg-brand-600"
                aria-hidden="true">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="3"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span class="text-steel-800 font-medium">Cepillado parejo y sin rebabas</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5 inline-grid place-items-center h-5 w-5 rounded-full text-white bg-brand-600"
                aria-hidden="true">
                <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="3"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              <span class="text-steel-800 font-medium">Trazabilidad por lote</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import reveal from '@/directives/reveal'

type Service = { title: string; desc: string }

const servicios: Service[] = [
  { title: 'Maderas Aserradas', desc: 'Producción estándar y a medida según especificación.' },
  { title: 'Machimbres', desc: 'Perfiles uniformes, encastre preciso y terminación prolija.' },
  { title: 'Block', desc: 'Bloques para múltiples usos industriales y de embalaje.' },
  { title: 'Maderas Cepilladas 4 caras', desc: 'Acabado S4S, listo para uso y con mejor estabilidad.' },
  { title: 'APG S4S', desc: 'APG cepillado cuatro caras con tolerancias parejas.' },
  { title: 'Tablas', desc: 'Diversos anchos/espesores; calibradas y clasificadas.' },
  { title: 'Tirantes', desc: 'Estructurales con control dimensional y humedad.' },
  { title: 'Listones', desc: 'Listonería selecta para carpintería y obra fina.' },
  { title: 'Pallets', desc: 'Componentes y armado según norma, trazabilidad por lote.' },
]

const especies = ['Pino Elliotti', 'Pino Taeda']

function submit() {
  // TODO: implementar envío real
  alert('Gracias, te contactamos a la brevedad.')
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  directives: { reveal },
})
</script>

<style scoped>
/* Podés usar variantes .reveal-x o .reveal-up si querés direcciones distintas */
</style>
