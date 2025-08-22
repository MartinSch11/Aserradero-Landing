<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import Carousel from '@/components/Carousel.vue'
import ContactSection from '@/components/ContactSection.vue'
</script>

<template>
  <SiteHeader />

  <main class="space-y-12 md:space-y-12 pt-16 md:pt-0"> <!-- 👈 agregá pt-16 -->
    <Carousel />
    <div id="page-slot">
      <router-view />
    </div>
    <ContactSection />
  </main>

  <SiteFooter />
</template>
