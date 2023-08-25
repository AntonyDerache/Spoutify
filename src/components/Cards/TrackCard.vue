<script setup lang="ts">
import {
  ref,
  type PropType,
  computed,
  inject,
} from 'vue';

import IconButton from '@/components/Buttons/IconButton.vue';
import PlayButton from '@/components/PlayButton/PlayButton.vue';
import RoundedSkeleton from '../Skeletons/RoundedSkeleton.vue';
import TextSkeleton from '../Skeletons/TextSkeleton.vue';
import SquareSkeleton from '../Skeletons/SquareSkeleton.vue';
import ProgressBar from '@/components/ProgressBar/ProgressBar.vue';
import type { SearchTrack } from '@/types/search.types';
import type { IAudioManager } from '@/tools/audioManager';

const props = defineProps({
  track: { type: Object as PropType<SearchTrack> | undefined, required: false },
  currentUrlTrackPlaying: { type: String, required: false },
  setCurrentUrlTrackPlaying: { type: Function, required: false },
  isSkeleton: { type: Boolean, required: false, default: false },
});

const audioManager: IAudioManager | undefined = inject('audioManager');
let isPlaying = ref(false);

isPlaying = computed(() => props.currentUrlTrackPlaying === props.track?.preview_url);

const playTrack = () => {
  if (!props.track?.preview_url || !props.setCurrentUrlTrackPlaying) {
    return;
  }
  props.setCurrentUrlTrackPlaying(props.track.preview_url);
  audioManager?.setSrc(props.track.preview_url);
};

const pauseTrack = () => {
  if (!props.setCurrentUrlTrackPlaying) {
    return;
  }
  audioManager?.pauseAudio();
  props.setCurrentUrlTrackPlaying('');
};
</script>

<template>
  <div v-if="track && !isSkeleton" class="track-card">
    <img
      class="album-cover"
      :src="track.album?.images[1]?.url"
      :alt="`${track.name} album cover`"
    />
    <div class="card-content">
      <div class="button-container">
        <div v-if="track.preview_url" class="play-button">
          <PlayButton :isPlaying="isPlaying" @click="isPlaying ? pauseTrack() : playTrack()" />
        </div>
        <a :href="track.uri">
          <IconButton icon="fa-brands fa-spotify" size="md" iconSize="xl" />
        </a>
      </div>
      <div class="progress-bar">
        <ProgressBar :isPlaying="isPlaying" :hideIfNotPlaying="true" />
      </div>
      <p class="track-name">
        {{ track.name }}
      </p>
      <p>
        {{ track.artists[0].name }}
      </p>
    </div>
  </div>
  <div v-else class="track-card skeleton">
    <div class="album-cover">
      <SquareSkeleton />
    </div>
    <div class="card-content">
      <div class="button-container">
        <div class="play-button">
          <RoundedSkeleton />
        </div>
        <div class="play-button">
          <RoundedSkeleton />
        </div>
      </div>
    </div>
    <div class="flex gap-2 flex-col w-full">
      <p>
        <TextSkeleton height="0.25rem" />
      </p>
      <p>
        <TextSkeleton height="1.5rem" />
      </p>
      <p>
        <TextSkeleton height="1.5rem" />
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.track-card {
  background-color: rgba($color: #aa7ce5, $alpha: 0.3);
  border-radius: var(--border-radius-xl);
  transition: 0.2s ease-in-out;
  padding: 2rem;
  height: 100%;
  max-width: 16rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    max-width: unset;
    width: 15rem;
  }

  .card-content {
    padding-top: 1rem;
    text-align: start;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .album-cover {
    color: blue;
    width: 6rem;
  }

  .button-container {
    padding: 0.5rem 0;
    display: flex;
    gap: 0.5rem;
  }

  .play-button {
    width: 2.5rem;
    height: 2.5rem;
  }

  .progress-bar {
    width: 100%;
  }

  .track-name {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: bold;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;
    word-wrap: break-word;
  }
}
.skeleton {
  &.track-card {
    animation: bounce 1s infinite;
  }

  .album-cover {
    width: 6rem;
    height: 6rem;
  }
}
</style>
