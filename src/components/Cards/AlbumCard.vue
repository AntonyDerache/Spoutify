<script setup lang="ts">
import TextSkeleton from '../Skeletons/TextSkeleton.vue'
import SquareSkeleton from '../Skeletons/SquareSkeleton.vue'

defineProps({
  name: String,
  coverURL: String,
  isSkeleton: Boolean
})
</script>

<template>
  <div v-if="!isSkeleton" class="album-card">
    <img :src="coverURL" :alt="`${name} album cover`" class="cover" />
    <p>{{ name }}</p>
  </div>
  <div v-else class="album-card">
    <div class="w-3/4 h-3/4">
      <SquareSkeleton />
    </div>
    <div class="w-3/4">
      <TextSkeleton />
    </div>
  </div>
</template>

<style scoped lang="scss">
.album-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;

  &:hover {
    cursor: pointer;
  }

  .cover {
    width: 75%;
    height: 75%;
  }
}
</style>
