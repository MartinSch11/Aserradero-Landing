<template>
  <div ref="el" class="inline-block" />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = withDefaults(defineProps<{
  siteKey?: string
  theme?: 'auto' | 'light' | 'dark'
  size?: 'normal' | 'compact'
  onToken?: (token: string | null) => void
}>(), {
  siteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '',
  theme: 'auto',
  size: 'normal',
  onToken: () => {}
})

const el = ref<HTMLElement | null>(null)
let widgetId: any = null

function render () {
  if (!(window as any).turnstile || !el.value) return
  widgetId = (window as any).turnstile.render(el.value, {
    sitekey: props.siteKey,
    theme: props.theme,
    size: props.size,
    callback: (token: string) => props.onToken?.(token),
    'error-callback': () => props.onToken?.(null),
    'expired-callback': () => props.onToken?.(null),
  })
}

onMounted(() => {
  // carga de script si no está presente
  if (!(window as any).turnstile) {
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    s.async = true
    s.defer = true
    s.onload = () => render()
    document.head.appendChild(s)
  } else {
    render()
  }
})

onBeforeUnmount(() => {
  try {
    if ((window as any).turnstile && widgetId) {
      (window as any).turnstile.remove(widgetId)
    }
  } catch {}
})
</script>
