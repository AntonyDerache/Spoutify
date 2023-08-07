<script setup lang="ts">
import { ref, type PropType, computed, inject } from 'vue'

import IconButton from '@/components/Buttons/IconButton.vue'
import PlayButton from '@/components/PlayButton/PlayButton.vue'
import type { SearchTrack } from '@/types/Search.types'
import type { IAudioManager } from '@/tools/audioManager'

const props = defineProps({
  track: { type: Object as PropType<SearchTrack>, required: true },
  currentUrlTrackPlaying: { type: String, required: false },
  setCurrentUrlTrackPlaying: { type: Function, required: false }
})

const audioManager: IAudioManager | undefined = inject('audioManager')
let isPlaying = ref(false)

isPlaying = computed(() => {
  return props.currentUrlTrackPlaying === props.track.preview_url
})

const playTrack = () => {
  if (!props.track.preview_url || !props.setCurrentUrlTrackPlaying) {
    return
  }
  props.setCurrentUrlTrackPlaying(props.track.preview_url)
  audioManager?.setSrc(props.track.preview_url)
}

const pauseTrack = () => {
  if (!props.setCurrentUrlTrackPlaying) {
    return
  }
  audioManager?.pauseAudio()
  props.setCurrentUrlTrackPlaying('')
}
</script>

<template>
  <div class="track-card flex flex-col items-center justify-center">
    <img :src="track.album?.images[1]?.url" :alt="`${track.name} album cover`" />
    <div class="pt-4 text-start w-full flex flex-col items-center">
      <div class="py-2">
        <div class="flex gap-2">
          <div v-if="track.preview_url" class="play-button">
            <PlayButton :isPlaying="isPlaying" @click="isPlaying ? pauseTrack() : playTrack()" />
          </div>
          <a :href="track.uri">
            <IconButton icon="fa-brands fa-spotify" size="md" iconSize="xl" />
          </a>
        </div>
      </div>
      <p class="text-xl font-bold">
        {{ track.name }}
      </p>
      <p>
        {{ track.artists[0].name }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.track-card {
  background-color: rgba(170, 124, 229, 0.3);
  border-radius: var(--border-radius-xl);
  transition: 0.2s ease-in-out;
  padding: 2rem;
  height: 100%;
  max-width: 16rem;
  width: 100%;

  @media (min-width: 768px) {
    max-width: unset;
    width: 15rem;
  }

  .play-button {
    width: 2.5rem;
    height: 2.5rem;
  }

  p {
    width: 100%;
    word-wrap: break-word;
  }

  img {
    color: blue;
    border-radius: var(--border-radius);
    width: 6rem;
    // height: 6rem;
  }
}
</style>
