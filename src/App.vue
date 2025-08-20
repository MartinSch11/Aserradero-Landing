<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import Carousel from '@/components/Carousel.vue';
</script>

<template>
  <SiteHeader />
  <Carousel />
  <router-view />
  <SiteFooter />
</template>
