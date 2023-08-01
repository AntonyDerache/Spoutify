<script setup lang="ts">
import Header from '@/layout/Header.vue'
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
