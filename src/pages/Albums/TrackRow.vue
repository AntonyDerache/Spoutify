<script setup lang="ts">
import { inject, ref, type PropType, computed } from 'vue'
import PlayButton from '@/components/PlayButton/PlayButton.vue'
import IconButton from '@/components/Buttons/IconButton.vue'
import type { AlbumTrack } from './Album.types'
import type { IAudioManager } from '@/Tools/AudioManager'
import { millisecondsToMinutesAndSeconds } from '@/tools/millisecondsToMinutesAndSecdonds'
import type { SearchTrack } from '@/types/Search.types'

const props = defineProps({
  track: { type: Object as PropType<AlbumTrack | SearchTrack>, required: true },
  albumCover: String,
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
</script>

<template>
  <div
    class="flex items-center gap-4 justify-between"
    @click="isPlaying ? pauseTrack() : playTrack()"
  >
    <div class="play-button m-2">
      <PlayButton v-if="track.preview_url" :isPlaying="isPlaying" />
    </div>
    <img v-if="albumCover" :src="albumCover" :alt="`${track.name}'s album cover`" />
    <p :class="`track-name ${isPlaying ? 'color-primary' : ''}`">{{ track.name }}</p>
  </div>
  <div class="flex gap-4 items-center">
    <a :href="track.uri">
      <IconButton class="spotify-button" icon="fa-brands fa-spotify" iconSize="lg" />
    </a>
    <p :class="`track-duration ${isPlaying ? 'color-primary' : ''}`">
      {{ millisecondsToMinutesAndSeconds(track.duration_ms) }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.play-button,
.spotify-button {
  width: 2rem !important;
  height: 2rem !important;
}

img {
  width: 3rem;
  height: 3rem;
}

.track-name:hover {
  cursor: pointer;
  color: var(--primary-color);
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