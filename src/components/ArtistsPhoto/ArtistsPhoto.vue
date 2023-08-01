<script setup lang="ts">
defineProps({
  name: String,
  img: String,
})
</script>

<template>
  <div class="artist-thumbnail flex flex-col justify-center items-center gap-4 cursor-pointer">
    <img :src="img" :alt="`${name}'s' spotify profile picture`"/>
    <p>{{ name }}</p>
  </div>
</template>

<style scoped lang="scss">
.artist-thumbnail {
  width: 100%;
  height: 100%;

  img {
    border-radius: 50%;
    width: 75%;
    height: 75%;
  }
}
</style>