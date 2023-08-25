<script setup lang="ts">
import type { SearchTrack } from '@/types/search.types';

defineProps({
  currentTrackIndex: Number,
  tracks: Array<SearchTrack>,
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="(track, index) in tracks" :key="track.id" class="flex gap-2 items-center ju">
      <img :src="track.album.images[2].url" />
      <p :class="`${currentTrackIndex === index ? 'color-primary' : ''}`">{{ track.name }}</p>
      <p class="text-gray-300 italic">{{ track.artists[0].name }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  width: 3rem;
  height: 3rem;
}
</style>
