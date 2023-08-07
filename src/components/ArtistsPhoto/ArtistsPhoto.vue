<script setup lang="ts">
import TextSkeleton from "@/components/Skeletons/TextSkeleton.vue";
import RoundedSkeleton from "@/components/Skeletons/RoundedSkeleton.vue";

defineProps({
  name: String,
  img: String,
  isSkeleton: Boolean,
})
</script>

<template>
  <div v-if="!isSkeleton" class="artist-thumbnail">
    <img :src="img" :alt="`${name}'s' spotify profile picture`" class="cover" />
    <p>{{ name }}</p>
  </div>
  <div v-else class="artist-thumbnail skeleton">
    <div class="w-3/4 h-3/4">
      <RoundedSkeleton />
    </div>
    <div class="w-3/4">
      <TextSkeleton />
    </div>
  </div>
</template>

<style scoped lang="scss">
.artist-thumbnail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  &:hover {
    cursor: pointer;
  }

  .cover {
    border-radius: 50%;
    width: 75%;
    height: 75%;
  }
}
</style>
