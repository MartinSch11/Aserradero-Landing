<script setup lang="ts">
import { buildTelLink, buildWhatsAppLink } from '@/utils/links';
import { track } from '@/utils/analytics';

const PHONE = import.meta.env.VITE_PHONE as string;
const WHATSAPP = import.meta.env.VITE_WHATSAPP as string;

const telHref = buildTelLink(PHONE);
const waHref = buildWhatsAppLink(WHATSAPP, 'Hola, quiero una cotización.'); // TODO: personalizar
function onClick(name: string) { track('cta_click', { name }); }
</script>

<template>
  <div class="flex flex-wrap gap-3">
    <a :href="telHref"
      class="inline-flex items-center rounded-lg bg-brand-500 px-5 py-3 text-white shadow hover:bg-brand-600 focus-visible:outline-none"
      @click="onClick('telefono')">
      📞 Llamar
    </a>
    <a :href="waHref" target="_blank" rel="noopener"
      class="inline-flex items-center rounded-lg border border-steel-500 px-5 py-3 text-steel-700 hover:bg-slate-50"
      @click="onClick('whatsapp')">
      💬 WhatsApp
    </a>
  </div>
</template>
