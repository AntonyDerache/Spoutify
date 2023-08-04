<script setup lang="ts">
import Header from '@/layout/Header.vue'
import { inject, onMounted, onUnmounted } from 'vue';
import { defineDevice } from './tools/defineDevice';

let device = inject("device")

onMounted(() => {
  window.addEventListener('resize', setDevice)
})

const setDevice = () => {
  device = defineDevice()
}

onUnmounted(() => {
  window.removeEventListener('resize', setDevice)
})
</script>

<template>
  <Header />
  <div id="app-content">
    <RouterView class="padding-header" />
  </div>
</template>

<style scoped>
.padding-header {
  padding-top: calc(var(--header-height) + 2rem);
}
</style>
