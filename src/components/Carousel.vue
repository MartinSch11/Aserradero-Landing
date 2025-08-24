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
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button class="nav next" type="button" aria-label="Imagen siguiente" @click="next">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
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
    // Re-snap al slide actual tras un resize
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
// En los bordes, dejamos que la página scrollee.
const onWheel = (e: WheelEvent) => {
  const el = track.value;
  if (!el) return;

  const down = e.deltaY > 0;
  const EPS = 2; // tolerancia

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
  // Si estamos en el borde, NO prevenimos: dejamos pasar el scroll de la página.
};

// Misma idea para teclado: solo prevenimos cuando el carrusel puede moverse.
const onKeyDown = (e: KeyboardEvent) => {
  const el = track.value;
  if (!el) return;

  const totalSlides = el.querySelectorAll(".slide").length;
  const atStart = currentIndex.value === 0;
  const atEnd = currentIndex.value >= totalSlides - 1;

  if (e.key === "ArrowRight") {
    if (!atEnd) {
      e.preventDefault();
      next();
    }
  } else if (e.key === "ArrowLeft") {
    if (!atStart) {
      e.preventDefault();
      prev();
    }
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
/* Wrapper posicionado: referencia para las flechas */
.carousel-wrap {
  position: relative;
  height: 70vh;
}

/* Track: el que scrollea */
.carousel-track {
  position: relative;
  display: flex;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overscroll-behavior-x: contain;
  touch-action: pan-y;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel-track::-webkit-scrollbar {
  width: 0; height: 0; display: none;
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

/* Flechas fijas respecto del wrapper */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.4);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  pointer-events: auto;
}

.nav:hover { background: rgba(0,0,0,0.7); }
.nav.prev { left: 16px; }
.nav.next { right: 16px; }

@media (max-width: 640px) {
  .nav { display: none; }
}
</style>
