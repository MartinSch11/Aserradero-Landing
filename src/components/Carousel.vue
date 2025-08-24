<template>
  <section class="carousel-wrap" role="region" aria-label="Galería de imágenes del aserradero">
    <!-- Track que scrollea -->
    <div ref="track" class="carousel-track" tabindex="0">
      <div class="slide"><img src="/images/hero1.jpg" alt="Bosque y troncos" /></div>
      <div class="slide"><img src="/images/hero2.webp" alt="Aserradero en acción" /></div>
      <div class="slide"><img src="/images/hero3.jpg" alt="Madera cepillada" /></div>
    </div>

    <!-- Flechas (fuera del track) -->
    <button class="nav prev" type="button" aria-label="Imagen anterior" @click="prev">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button class="nav next" type="button" aria-label="Imagen siguiente" @click="next">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const track = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
let slideWidth = 0;

const updateSlideWidth = () => {
  const firstSlide = track.value?.querySelector(".slide") as HTMLElement | null;
  if (firstSlide) {
    slideWidth = firstSlide.offsetWidth;
    if (track.value) {
      track.value.scrollTo({ left: currentIndex.value * slideWidth });
    }
  }
};

const scrollToIndex = (index: number) => {
  const el = track.value;
  if (!el || slideWidth === 0) return;
  const maxIndex = el.querySelectorAll(".slide").length - 1;
  currentIndex.value = Math.min(Math.max(index, 0), maxIndex);
  el.scrollTo({ left: currentIndex.value * slideWidth, behavior: "smooth" });
};

const next = () => scrollToIndex(currentIndex.value + 1);
const prev = () => scrollToIndex(currentIndex.value - 1);

// Solo prevenimos el scroll cuando PODEMOS mover el carrusel.
const onWheel = (e: WheelEvent) => {
  const el = track.value;
  if (!el) return;

  const down = e.deltaY > 0;
  const EPS = 2;

  const atStart = el.scrollLeft <= EPS || currentIndex.value === 0;
  const totalSlides = el.querySelectorAll(".slide").length;
  const atEnd =
    el.scrollLeft + el.clientWidth >= el.scrollWidth - EPS ||
    currentIndex.value >= totalSlides - 1;

  if (down && !atEnd) {
    e.preventDefault();
    next();
  } else if (!down && !atStart) {
    e.preventDefault();
    prev();
  }
};

const onKeyDown = (e: KeyboardEvent) => {
  const el = track.value;
  if (!el) return;

  const totalSlides = el.querySelectorAll(".slide").length;
  const atStart = currentIndex.value === 0;
  const atEnd = currentIndex.value >= totalSlides - 1;

  if (e.key === "ArrowRight" && !atEnd) {
    e.preventDefault();
    next();
  } else if (e.key === "ArrowLeft" && !atStart) {
    e.preventDefault();
    prev();
  }
};

const onScroll = () => {
  const el = track.value;
  if (!el || slideWidth === 0) return;
  currentIndex.value = Math.round(el.scrollLeft / slideWidth);
};

onMounted(() => {
  const el = track.value;
  if (!el) return;

  updateSlideWidth();
  window.addEventListener("resize", updateSlideWidth);
  el.addEventListener("wheel", onWheel, { passive: false });
  el.addEventListener("keydown", onKeyDown);
  el.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  const el = track.value;
  window.removeEventListener("resize", updateSlideWidth);
  if (!el) return;
  el.removeEventListener("wheel", onWheel);
  el.removeEventListener("keydown", onKeyDown);
  el.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.carousel-wrap {
  position: relative;
  height: 70vh;
}

.carousel-track {
  position: relative;
  display: flex;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;
  touch-action: pan-y; /* en mobile permite scroll vertical de página */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.carousel-track::-webkit-scrollbar { width: 0; height: 0; display: none; }

.slide { flex: 0 0 100%; scroll-snap-align: start; }
.slide img { width: 100%; height: 100%; object-fit: cover; }

/* Flechas visibles también en mobile */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 9999px;
  border: none;
  background: rgba(0,0,0,0.45);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .2s, opacity .2s;
  pointer-events: auto;
}
.nav svg { width: 22px; height: 22px; }
.nav:hover { background: rgba(0,0,0,0.7); }
.nav.prev { left: max(12px, env(safe-area-inset-left)); }
.nav.next { right: max(12px, env(safe-area-inset-right)); }

/* Mejoras para pantallas táctiles: botones un poco más grandes y con más opacidad */
@media (max-width: 640px) {
  .nav {
    width: 56px;
    height: 56px;
    background: rgba(0,0,0,0.55);
  }
  .nav svg { width: 24px; height: 24px; }
}

/* Opcional: en desktop, que se “insinúen” y aparezcan al pasar el mouse */
@media (hover: hover) and (pointer: fine) {
  .nav { opacity: .85; }
  .carousel-wrap:hover .nav { opacity: 1; }
}
</style>
