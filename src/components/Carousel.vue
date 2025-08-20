<template>
    <section ref="carousel" class="carousel" role="region" aria-label="Galería de imágenes del aserradero" tabindex="0">
        <!-- Slides -->
        <div class="slide"><img src="/images/hero1.jpg" alt="Bosque y troncos" /></div>
        <div class="slide"><img src="/images/hero2.jpg" alt="Aserradero en acción" /></div>
        <div class="slide"><img src="/images/hero3.jpg" alt="Madera cepillada" /></div>

        <!-- Flechas -->
        <button class="nav prev" type="button" aria-label="Imagen anterior" @click="prev">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <!-- Flecha hacia la izquierda -->
                <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>

        <button class="nav next" type="button" aria-label="Imagen siguiente" @click="next">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <!-- Flecha hacia la derecha -->
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>

    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const carousel = ref<HTMLDivElement | null>(null); // ⬅️ tipado explícito
const currentIndex = ref(0);
let slideWidth = 0;
let slideCount = 0;
let resizeObs: ResizeObserver | null = null;

// Util: obtener el elemento del carrusel con tipo sólido
function getCarousel(): HTMLDivElement {
    const el = carousel.value;
    if (!el) throw new Error("Carousel element not mounted");
    return el;
}

const recalcMetrics = () => {
    const el = carousel.value;
    if (!el) return;
    slideWidth = el.clientWidth; // ancho del viewport del carrusel
    slideCount = el.querySelectorAll<HTMLDivElement>(".slide").length; // solo slides
};

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const scrollToIndex = (index: number) => {
    if (!carousel.value || slideWidth === 0 || slideCount === 0) return;
    currentIndex.value = clamp(index, 0, slideCount - 1);
    getCarousel().scrollTo({
        left: currentIndex.value * slideWidth,
        behavior: "smooth",
    });
};

const next = () => scrollToIndex(currentIndex.value + 1);
const prev = () => scrollToIndex(currentIndex.value - 1);

// Handlers tipados y estables (misma referencia en add/remove)
const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    e.deltaY > 0 ? next() : prev();
};

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
    }
};

const handleScroll = () => {
    if (slideWidth === 0) return;
    const el = getCarousel();
    currentIndex.value = clamp(Math.round(el.scrollLeft / slideWidth), 0, slideCount - 1);
};

onMounted(async () => {
    await nextTick();
    recalcMetrics();
    const el = getCarousel();
    // ⬅️ sin optional chaining; el está tipado y definido
    el.addEventListener("wheel", handleWheel as EventListener, { passive: false });
    el.addEventListener("keydown", handleKeyDown as EventListener);
    el.addEventListener("scroll", handleScroll as EventListener);
});

onBeforeUnmount(() => {
    if (resizeObs) {
        try { resizeObs.unobserve(getCarousel()); } catch { /* no-op */ }
        resizeObs = null;
    }
    // remover con la misma referencia
    try {
        const el = getCarousel();
        el.removeEventListener("wheel", handleWheel as EventListener);
        el.removeEventListener("keydown", handleKeyDown as EventListener);
        el.removeEventListener("scroll", handleScroll as EventListener);
    } catch { /* el podría no existir si no montó */ }
});

// Exponer para el template
defineExpose({ next, prev });
</script>


<style scoped>
.carousel {
    position: relative;
    /* para posicionar flechas */
    display: flex;
    width: 100%;
    /* importante: que mida el ancho del contenedor */
    height: 70vh;

    overflow-x: auto;
    overflow-y: hidden;

    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scroll-padding: 0;
    /* sin padding para el snap */
    /* fuerza a encajar en cada slide */
    /* algunos navegadores mejoran con esto: */
    /* scroll-snap-stop: always; */

    overscroll-behavior-x: contain;
    touch-action: pan-y;

    /* ocultar scrollbars */
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.carousel::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
}

.slide {
    flex: 0 0 100%;
    scroll-snap-align: start;
}

.slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Flechas centradas */
.nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;

    width: 48px;
    height: 48px;
    padding: 0;

    display: grid;
    /* ⬅️ centra contenido */
    place-items: center;
    /* ⬅️ centra contenido */

    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.45);
    color: #fff;
    font-size: 28px;
    font-weight: 600;
    line-height: 1;
    /* evita desalineo vertical del glifo */
    font-family: system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
    cursor: pointer;
    transition: background 0.2s, transform 0.05s;
}

.nav:active {
    transform: translateY(-50%) scale(0.98);
}

.nav:hover {
    background: rgba(0, 0, 0, 0.7);
}

.nav.prev {
    left: 16px;
}

.nav.next {
    right: 16px;
}

@media (max-width: 640px) {
    .nav {
        display: none;
    }
}
</style>
