<script setup lang="ts">
import { ref, type PropType, type Ref, inject, onUnmounted, onMounted } from 'vue'

import TrackCard from '@/components/Cards/TrackCard.vue'
import Button from '@/components/Buttons/Button.vue'
import type { SearchTrack } from '@/types/Search.types'
import type { IAudioManager } from '@/tools/audioManager'

defineProps({
  tracks: { type: Object as PropType<Array<SearchTrack>>, required: true }
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
  <div class="flex flex-wrap gap-5 justify-center md:justify-start">
    <div v-for="item in tracks.slice(0, 5)" :key="item.name">
      <TrackCard
        :track="item"
        :currentUrlTrackPlaying="currentUrlTrackPlaying"
        :setCurrentUrlTrackPlaying="newTrackIsBeingPlay"
      />
    </div>
  </div>
  <div class="flex justify-center">
    <Button label="View more"></Button>
  </div>
</template>
