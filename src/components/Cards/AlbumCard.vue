<script setup lang="ts">
defineProps({
  name: String,
  coverURL: String,
})
</script>

<template>
  <div class="album-card flex flex-col gap-4 cursor-pointer">
    <img :src="coverURL" :alt="`${name} album cover`"/>
    <p>{{ name }}</p>
  </div>
</template>

<style scoped lang="scss">
.album-card {
  width: 10rem;
  border-radius: var(--border-radius-xl);
  text-align: center;
}
</style>