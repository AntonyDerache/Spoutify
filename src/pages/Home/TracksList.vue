<script setup lang="ts">
import { ref, type PropType, type Ref, inject, onUnmounted, onMounted } from 'vue'

import TrackCard from '@/components/Cards/TrackCard.vue'
import Button from '@/components/Buttons/Button.vue'
import type { SearchTrack } from '@/types/Search.types'
import type { IAudioManager } from '@/tools/audioManager'

defineProps({
  tracks: { type: Object as PropType<Array<SearchTrack> | undefined> },
  isLoading: { type: Boolean, required: false, default: false }
})

let currentUrlTrackPlaying: Ref<string> = ref('')
const audioManager: IAudioManager | undefined = inject('audioManager')

onMounted(() => {
  audioManager?.setOnEndedCallback(() => newTrackIsBeingPlay(''))
})

const newTrackIsBeingPlay = (trackUrl: string) => {
  currentUrlTrackPlaying.value = trackUrl
}

onUnmounted(() => {
  audioManager?.pauseAudio()
  audioManager?.setOnEndedCallback(() => {})
})
</script>

<template>
  <p class="text-4xl font-bold p-4">Tracks</p>
  <div v-if="!isLoading && tracks" class="track-list">
    <div v-for="track in tracks.slice(0, 5)" :key="track.name">
      <TrackCard
        :track="track"
        :currentUrlTrackPlaying="currentUrlTrackPlaying"
        :setCurrentUrlTrackPlaying="newTrackIsBeingPlay"
      />
    </div>
  </div>
  <div v-else class="track-list">
    <div v-for="item in new Array(5)" :key="item">
      <TrackCard isSkeleton />
    </div>
  </div>
  <div class="flex justify-center">
    <Button label="View more"></Button>
  </div>
</template>


<style scoepd lang="scss">
  .track-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    justify-content: center;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }
</style>