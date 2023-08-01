<script setup lang="ts">
import { inject, ref, type PropType, computed } from 'vue'
import PlayButton from '@/components/PlayButton/PlayButton.vue'
import IconButton from '@/components/Buttons/IconButton.vue'
import type { Track } from '@/types/AlbumTypes'
import type { IAudioManager } from '@/Tools/AudioManager'

const props = defineProps({
  track: { type: Object as PropType<Track>, required: true },
  currentUrlTrackPlaying: { type: String, required: true },
  setCurrentUrlTrackPlaying: { type: Function, required: true }
})

const audioManager: IAudioManager | undefined = inject('audioManager')
let isPlaying = ref(false)

isPlaying = computed(() => props.currentUrlTrackPlaying === props.track.preview_url)

const playTrack = () => {
  if (!props.track.preview_url) {
    return
  }
  audioManager?.setSrc(props.track.preview_url)
  props.setCurrentUrlTrackPlaying(props.track.preview_url)
}

const pauseTrack = () => {
  audioManager?.pauseAudio()
  props.setCurrentUrlTrackPlaying('')
}

function millisToMinutesAndSeconds(millis: number) {
  const minutes: number = Math.floor(millis / 60000)
  const seconds = Number.parseFloat(((millis % 60000) / 1000).toFixed(0))
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}
</script>

<template>
  <div class="flex justify-start items-center gap-4">
    <div v-if="track.preview_url" class="play-button m-2">
      <PlayButton :isPlaying="isPlaying" @click="isPlaying ? pauseTrack() : playTrack()" />
    </div>
    <p :class="`${isPlaying ? 'color-primary' : ''}`">{{ track.name }}</p>
  </div>
  <div class="flex gap-4 items-center">
    <a :href="track.uri">
      <IconButton class="spotify-button" icon="fa-brands fa-spotify" iconSize="lg" />
    </a>
    <p :class="`track-duration ${isPlaying ? 'color-primary' : ''}`">
      {{ millisToMinutesAndSeconds(track.duration_ms) }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.play-button,
.spotify-button {
  width: 2rem !important;
  height: 2rem !important;
}

p {
  padding: 1rem 0;
}

.track-duration {
  width: 1.5rem;
}

.color-primary {
  color: var(--primary-color);
}
</style>
