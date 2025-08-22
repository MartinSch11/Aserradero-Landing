<script setup lang="ts">
const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();
</script>

<template>
    <div v-show="open" class="absolute right-0 mt-2 w-44 rounded-lg border bg-white shadow-lg z-50">
        <ul class="py-1 text-sm">
            <li><a class="block px-4 py-2 hover:bg-steel-50" href="/login">Iniciar sesión</a></li>
            <li><a class="block px-4 py-2 hover:bg-steel-50" href="/registro">Crear cuenta</a></li>
        </ul>
    </div>
</template>
