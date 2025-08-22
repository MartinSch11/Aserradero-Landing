<template>
  <section id="contacto" class="relative scroll-mt-20 overflow-hidden">
    <HexDecor class="z-0" />
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading v-reveal title="Dejanos tu consulta"
        subtitle="Respondemos a la brevedad. Cotizaciones sin compromiso." />

      <form v-reveal class="mt-8 grid gap-4 max-w-2xl card p-6" @submit.prevent="onSubmit" novalidate>
        <!-- Nombre -->
        <div class="form-field">
          <label for="name" class="sr-only">Nombre y Apellido</label>
          <div class="field-with-icon">
            <span class="icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input id="name" v-model.trim="form.name" name="name" type="text" autocomplete="name"
              placeholder="Nombre y Apellido" class="input" required />
          </div>
        </div>

        <!-- Teléfono + Email -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="form-field">
            <label for="phone" class="sr-only">Teléfono</label>
            <div class="field-with-icon">
              <span class="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.88.32 1.74.6 2.56a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.52-1.17a2 2 0 0 1 2.11-.45c.82.28 1.68.48 2.56.6A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <input id="phone" v-model.trim="form.phone" name="phone" type="tel" inputmode="tel" autocomplete="tel"
                placeholder="Teléfono" class="input" />
            </div>
          </div>

          <div class="form-field">
            <label for="email" class="sr-only">Correo electrónico</label>
            <div class="field-with-icon">
              <span class="icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16v16H4z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </span>
              <input id="email" v-model.trim="form.email" name="email" type="email" inputmode="email"
                autocomplete="email" placeholder="Correo electrónico" class="input" required />
            </div>
          </div>
        </div>

        <!-- Asunto -->
        <div class="form-field">
          <label for="subject" class="sr-only">Asunto</label>
          <input id="subject" v-model.trim="form.subject" name="subject" type="text" placeholder="Asunto"
            class="input" />
        </div>

        <!-- Mensaje -->
        <div class="form-field">
          <label for="message" class="sr-only">Comentarios</label>
          <textarea id="message" v-model.trim="form.message" name="message" rows="5" maxlength="200"
            placeholder="En qué podemos ayudarte..." class="input !h-auto resize-y" required></textarea>
        </div>

        <!-- Honeypot (anti-spam simple) -->
        <input type="text" v-model="form._honey" name="_honey" tabindex="-1" autocomplete="off" style="display:none" />

        <!-- Botón -->
        <div class="pt-2 flex grow items-center justify-center">
          <button :disabled="submitting"
            class="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-white transition hover:bg-brand-700 disabled:opacity-60">
            <svg v-if="submitting" class="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" stroke-width="4" />
            </svg>
            Enviar
          </button>
        </div>
      </form>
    </div>

    <!-- TOAST (éxito / error) -->
    <transition enter-active-class="duration-300 ease-out" enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-2">
      <div v-if="toast.show" class="fixed bottom-6 right-6 z-[60]">
        <div class="pointer-events-auto relative flex items-start gap-3 rounded-xl p-4 shadow-2xl ring-1" :class="toast.type === 'success'
          ? 'bg-emerald-600 text-white ring-emerald-500/30'
          : 'bg-red-600 text-white ring-red-500/30'" role="status" aria-live="polite"
          :style="{ '--toast-duration': toast.duration + 'ms' }">
          <!-- Icono -->
          <svg v-if="toast.type === 'success'" class="h-5 w-5 flex-none mt-0.5" viewBox="0 0 24 24" fill="none"
            stroke="currentColor">
            <path stroke-width="2" d="M20 7l-11 11-5-5" />
          </svg>
          <svg v-else class="h-5 w-5 flex-none mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-width="2" d="M18 6L6 18M6 6l12 12" />
          </svg>

          <!-- Texto -->
          <div class="pr-8">
            <p class="font-medium">{{ toast.text }}</p>
            <p v-if="toast.sub" class="text-white/80 text-sm mt-0.5">{{ toast.sub }}</p>
          </div>

          <!-- Cerrar -->
          <button type="button" @click="toast.show = false"
            class="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-md/2 bg-white/10 hover:bg-white/20"
            aria-label="Cerrar notificación">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-width="2" d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <!-- Barra de progreso -->
          <span class="pointer-events-none absolute left-0 bottom-0 h-1 w-full bg-white/40"
            style="transform-origin:left; animation: toastbar var(--toast-duration) linear forwards;"></span>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, onBeforeUnmount } from 'vue'
import SectionHeading from '@/components/SectionHeading.vue'
import reveal from '@/directives/reveal'
import HexDecor from '@/components/HexDecor.vue'
defineOptions({ directives: { reveal } })

// ID invisible de FormSubmit (cámbialo por el tuyo)
const FORMSUBMIT_ID = 'e6f14c21a0dfe195fdb810c1794ef0e7'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  _honey: ''
})

const submitting = ref(false)

// --- Toast minimal ---
type ToastType = 'success' | 'error'
const toast = reactive<{ show: boolean; type: ToastType; text: string; sub?: string; duration: number }>({
  show: false,
  type: 'success',
  text: '',
  sub: '',
  duration: 3500
})
let toastTimer: number | undefined
function showToast(text: string, type: ToastType = 'success', duration = 3500, sub?: string) {
  toast.text = text
  toast.type = type
  toast.duration = duration
  toast.sub = sub
  toast.show = true
  if (toastTimer) window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => (toast.show = false), duration)
}
onBeforeUnmount(() => { if (toastTimer) window.clearTimeout(toastTimer) })

async function onSubmit() {
  // honeypot
  if (form._honey) {
    showToast('¡Gracias! Tu consulta fue enviada.', 'success', 2000)
    return
  }

  submitting.value = true
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject || '[Aserradero] Consulta',
        message: form.message
      })
    })
    if (!res.ok) throw new Error('Bad status')
    const data = await res.json()
    if (data?.success === 'true' || data?.success === true) {
      // reset form
      form.name = ''
      form.email = ''
      form.phone = ''
      form.subject = ''
      form.message = ''
      form._honey = ''
      // toast OK (3.5s)
      showToast('¡Consulta enviada!', 'success', 3500, 'Te respondemos a la brevedad.')
    } else {
      throw new Error('API error')
    }
  } catch (_e) {
    // toast error (4s)
    showToast('No pudimos enviar tu mensaje', 'error', 4000, 'Probá de nuevo en unos segundos.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* Helpers inputs con ícono */
.field-with-icon {
  position: relative;
}

.field-with-icon .icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(107 114 128);
}

.input {
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgb(203 213 225);
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  color: rgb(31 41 55);
  outline: none;
  transition: box-shadow .2s, border-color .2s;
}

.input:focus {
  box-shadow: 0 0 0 2px rgba(16, 185, 129, .35);
  border-color: rgb(16 185 129);
}

.form-field {
  display: flex;
  flex-direction: column;
}

/* Barra de tiempo del toast */
@keyframes toastbar {
  from {
    transform: scaleX(1);
  }

  to {
    transform: scaleX(0);
  }
}
</style>
