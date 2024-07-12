<script setup lang="ts">
import {
  inject,
  ref,
  type PropType,
  computed,
} from 'vue';

import PlayButton from '@/components/playButton/PlayButton.vue';
import IconButton from '@/components/buttons/IconButton.vue';
import type { IAudioManager } from '@/tools/audioManager';
import millisecondsToMinutesAndSeconds from '@/tools/millisecondsToMinutesAndSeconds';
import type { SearchTrack } from '@/types/search.types';
import type { AlbumTrack } from './album.types';
import ProgressBar from '@/components/progressBar/ProgressBar.vue';

const props = defineProps({
  track: { type: Object as PropType<AlbumTrack | SearchTrack>, required: true },
  albumCover: String || undefined,
  currentUrlTrackPlaying: { type: String, required: true },
  setCurrentUrlTrackPlaying: { type: Function, required: true },
});

const audioManager: IAudioManager | undefined = inject('audioManager');
let isPlaying = ref(false);

isPlaying = computed(() => props.currentUrlTrackPlaying === props.track.preview_url);

const playTrack = () => {
  if (!props.track.preview_url) {
    return;
  }
  audioManager?.setSrc(props.track.preview_url);
  props.setCurrentUrlTrackPlaying(props.track.preview_url);
};

const pauseTrack = () => {
  audioManager?.pauseAudio();
  props.setCurrentUrlTrackPlaying('');
};
</script>

<template>
  <div
    class="flex items-center gap-4 justify-start w-5/6"
    @click="isPlaying ? pauseTrack() : playTrack()"
  >
    <div class="play-button m-2">
      <PlayButton v-if="track.preview_url" :isPlaying="isPlaying" />
    </div>
    <img v-if="albumCover" :src="albumCover" :alt="`${track.name}'s album cover`" />
    <p :class="`track-name ${isPlaying ? 'color-primary' : ''}`">{{ track.name }}</p>
    <div class="progress-bar">
      <ProgressBar :isPlaying="isPlaying" :hideIfNotPlaying="true" />
    </div>
  </div>
  <div class="flex gap-4 items-center justify-end w-1/6">
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

.progress-bar {
  display: flex;
  flex-grow: 1;
  max-width: 20rem;
}
</style>
