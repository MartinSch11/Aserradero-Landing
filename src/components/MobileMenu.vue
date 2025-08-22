<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { scrollToSection } from '@/composables/scrollToSection';

const props = defineProps<{
    open: boolean
}>();
const emit = defineEmits<{
    (e: 'close'): void
}>();

const panelRef = ref<HTMLElement | null>(null);

// Cerrar con ESC
function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') emit('close');
}

// Focus trap mínimo
let prevFocused: Element | null = null;
watch(() => props.open, (val) => {
    if (val) {
        prevFocused = document.activeElement;
        setTimeout(() => panelRef.value?.focus(), 0);
        document.body.style.overflow = 'hidden';
    } else {
        if (prevFocused instanceof HTMLElement) prevFocused.focus();
        document.body.style.overflow = '';
    }
});

onMounted(() => document.addEventListener('keydown', onKeydown));
onUnmounted(() => {
    document.removeEventListener('keydown', onKeydown);
    document.body.style.overflow = '';
});

function go(hash: string) {
    emit('close');
    requestAnimationFrame(() => scrollToSection(hash));
}
</script>

<template>
    <!-- Backdrop -->
    <div v-show="open" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" @click="$emit('close')" />

    <!-- Panel -->
    <aside v-show="open" ref="panelRef" tabindex="-1" role="dialog" aria-modal="true" aria-label="Menú de navegación"
        class="fixed z-50 inset-y-0 left-0 w-72 max-w-[85vw] bg-white text-gray-800 shadow-2xl outline-none
         transition-transform duration-300 data-[open=false]:-translate-x-full" :data-open="open">
        <div class="flex items-center justify-between p-4 border-b">
            <h2 class="font-semibold text-steel-800">Menú</h2>
            <button class="p-2 rounded-md hover:bg-steel-100" @click="$emit('close')" aria-label="Cerrar menú">
                ✕
            </button>
        </div>

        <nav class="p-2">
            <ul class="space-y-1">
                <li><button class="w-full text-left px-4 py-3 rounded-md hover:bg-steel-50"
                        @click="go('#quienes-somos')">Quienes Somos</button></li>
                <li><button class="w-full text-left px-4 py-3 rounded-md hover:bg-steel-50"
                        @click="go('#servicios')">Servicios</button></li>
                <li><button class="w-full text-left px-4 py-3 rounded-md hover:bg-steel-50"
                        @click="go('#especies')">Especies</button></li>
                <li><button class="w-full text-left px-4 py-3 rounded-md hover:bg-steel-50"
                        @click="go('#calidad')">Calidad</button></li>
                <li><button class="w-full text-left px-4 py-3 rounded-md hover:bg-steel-50"
                        @click="go('#contacto')">Contacto</button></li>
            </ul>
        </nav>
    </aside>
</template>

<style scoped>
/* v-show + data attr para animación */
aside[data-open="false"] {
    transform: translateX(-100%);
}
</style>
