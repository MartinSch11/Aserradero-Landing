<template>
    <section ref="carousel" class="carousel" role="region" aria-label="Galería de imágenes del aserradero" tabindex="0">
        <!-- Slides -->
        <div class="slide"><img src="/images/hero1.jpg" alt="Bosque y troncos" /></div>
        <div class="slide"><img src="/images/hero2.jpg" alt="Aserradero en acción" /></div>
        <div class="slide"><img src="/images/hero3.jpg" alt="Madera cepillada" /></div>

        <!-- Flechas -->
        <button class="nav prev" type="button" aria-label="Imagen anterior" @click="prev">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
        <button class="nav next" type="button" aria-label="Imagen siguiente" @click="next">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const carousel = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
let slideWidth = 0;

const updateSlideWidth = () => {
    const firstSlide = carousel.value?.querySelector(".slide") as HTMLElement | null;
    if (firstSlide) slideWidth = firstSlide.offsetWidth;
};

const scrollToIndex = (index: number) => {
    const el = carousel.value;
    if (!el || slideWidth === 0) return;
    const maxIndex = el.querySelectorAll(".slide").length - 1;
    currentIndex.value = Math.min(Math.max(index, 0), maxIndex);
    el.scrollTo({ left: currentIndex.value * slideWidth, behavior: "smooth" });
};

const next = () => scrollToIndex(currentIndex.value + 1);
const prev = () => scrollToIndex(currentIndex.value - 1);

const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    e.deltaY > 0 ? next() : prev();
};

const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
    }
};

const onScroll = () => {
    const el = carousel.value;
    if (!el || slideWidth === 0) return;
    const idx = Math.round(el.scrollLeft / slideWidth);
    currentIndex.value = idx;
};

onMounted(() => {
    const el = carousel.value;
    if (!el) return;

    updateSlideWidth();
    window.addEventListener("resize", updateSlideWidth);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("keydown", onKeyDown);
    el.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
    const el = carousel.value;
    window.removeEventListener("resize", updateSlideWidth);
    if (!el) return;
    el.removeEventListener("wheel", onWheel);
    el.removeEventListener("keydown", onKeyDown);
    el.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.carousel {
    position: relative;
    display: flex;
    height: 70vh;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    overscroll-behavior-x: contain;
    touch-action: pan-y;
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

/* Flechas */
.nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
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
