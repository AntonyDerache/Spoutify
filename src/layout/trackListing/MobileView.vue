<script setup lang="ts">
import TrackCard from '@/components/Cards/TrackCard.vue'
import type { SearchTrack } from '@/types/Search.types'

defineProps({
  tracks: { type: Array<SearchTrack>, required: true },
  currentUrlTrackPlaying: { type: String, required: true },
  newTrackIsBeingPlay: { type: Function, required: true }
})
</script>

<template>
  <ul class="flex flex-col gap-4 items-center py-6">
    <li v-for="track in tracks" :key="track.id" class="flex justify-center w-full">
      <TrackCard
        :track="track"
        :currentUrlTrackPlaying="currentUrlTrackPlaying"
        :setCurrentUrlTrackPlaying="newTrackIsBeingPlay"
      />
    </li>
  </ul>
</template>
