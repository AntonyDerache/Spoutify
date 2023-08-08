<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, type Ref } from 'vue'

import type { SearchTrack } from '@/types/Search.types'
import TrackRow from '../albums/TrackRow.vue'
import type { IAudioManager } from '@/tools/audioManager'

defineProps({
  tracks: { type: Array<SearchTrack>, required: true }
})

const audioManager: IAudioManager | undefined = inject('audioManager')
const showMore = ref(false)
let currentUrlTrackPlaying: Ref<string> = ref('')

onMounted(async () => {
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
  <div class="flex flex-col gap-2 top-tracks p-4">
    <div
      v-for="track in showMore ? tracks : tracks.slice(0, 5)"
      :key="track.id"
      class="flex items-center justify-between gap-5 w-full"
    >
      <TrackRow
        :track="track"
        :albumCover="track.album.images[1].url"
        :currentUrlTrackPlaying="currentUrlTrackPlaying"
        :setCurrentUrlTrackPlaying="newTrackIsBeingPlay"
      />
    </div>
  </div>
  <p
    class="p-2 cursor-pointer text-violet-400 hover:text-violet-200 transition-all"
    @click="() => (showMore = !showMore)"
  >
    {{ showMore ? 'See less' : 'See more' }}
  </p>
</template>

<style scoped lang="scss">
img {
  width: 3rem;
  height: 3rem;
}

.top-tracks {
  background-color: rgba(58, 28, 93, 0.3);
  border-radius: var(--border-radius-xl);

  .play-button {
    width: 2rem !important;
    height: 2rem !important;
  }
}
</style>
