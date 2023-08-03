<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

import { getRecommendations } from '@/api/getRecommendations'
import TrackCard from '@/components/Cards/TrackCard.vue'
import type { SearchTrack } from '@/types/Search.types'
import type { IAudioManager } from '@/Tools/AudioManager'

const tracks: Ref<Array<SearchTrack>> = ref([])
let currentUrlTrackPlaying: Ref<string> = ref('')
const audioManager: IAudioManager | undefined = inject('audioManager')

onMounted(async () => {
  audioManager?.setOnEndedCallback(() => newTrackIsBeingPlay(''))
  const genre = ref(useRoute().params.genre)
  const response: { tracks: Array<SearchTrack> } = await getRecommendations(
    'genres',
    genre.value as string
  )
  tracks.value = response.tracks
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
  <section>
    <ul class="w-full">
      <li class="" v-for="(track, index) in tracks" :key="index">
        <TrackCard
          :track="track"
          :currentUrlTrackPlaying="currentUrlTrackPlaying"
          :setCurrentUrlTrackPlaying="newTrackIsBeingPlay"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
ul {
  display: grid;
  grid-template-columns: repeat(4, minmax(210px, max-content));
  grid-gap: 2.5rem;
  justify-content: center;
  padding: 2rem;
}
</style>
