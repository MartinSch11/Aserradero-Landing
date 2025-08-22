<script setup lang="ts">
import { ref } from 'vue';
import MobileMenu from './MobileMenu.vue';
import DropdownMenu from './DropdownMenu.vue';

const props = defineProps<{
    logoSrc?: string;
    showAccount?: boolean; // si no lo usás, pasá :showAccount="false"
}>();

const menuOpen = ref(false);
const ddOpen = ref(false);

function toggleMenu() {
    ddOpen.value = false;
    menuOpen.value = !menuOpen.value;
}
function toggleDD() {
    menuOpen.value = false;
    ddOpen.value = !ddOpen.value;
}
</script>

<template>
    <!-- Solo móvil -->
    <header class="md:hidden fixed top-0 w-full z-50 text-white" role="banner">
        <div class="py-3 px-5 flex items-center bg-black/10 backdrop-blur supports-[backdrop-filter]:bg-black/20">
            <!-- Botón hamburguesa -->
            <button class="p-2 -ml-2 rounded-md hover:bg-white/10" aria-label="Abrir menú" @click="toggleMenu">
                <!-- Ícono menú -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <!-- Logo centrado -->
            <div class="absolute left-1/2 -translate-x-1/2">
                <img :src="logoSrc ?? '/favicon.svg'" alt="Logo" class="w-12 h-12 rounded-full" loading="lazy"
                    decoding="async" />
            </div>

            <!-- Lado derecho: cuenta (opcional) -->
            <div class="ml-auto relative" v-if="showAccount !== false">
                <button class="p-2 rounded-md hover:bg-white/10" aria-haspopup="menu" :aria-expanded="ddOpen"
                    aria-label="Abrir menú de cuenta" @click="toggleDD">
                    <!-- user icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </button>
                <DropdownMenu :open="ddOpen" @close="ddOpen = false" />
            </div>
        </div>

        <!-- Menú lateral -->
        <MobileMenu :open="menuOpen" @close="menuOpen = false" />
    </header>
</template>
