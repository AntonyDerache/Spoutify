<script setup lang="ts">
import { inject, ref } from 'vue';

import TrackCard from '@/components/Cards/TrackCard.vue';
import type { IAudioManager } from '@/tools/audioManager';
import type { SearchTrack } from '@/types/search.types';

const props = defineProps({
  tracks: { type: Array<SearchTrack>, required: true },
  currentUrlTrackPlaying: { type: String, required: true },
  newTrackIsBeingPlay: { type: Function, required: true },
});
const emits = defineEmits(['newTrackSelected']);

const audioManager: IAudioManager | undefined = inject('audioManager');
let currentTrack: HTMLElement | null;
let rightGhostTrack: HTMLElement | null;
let leftGhostTrack: HTMLElement | null;
const currentTrackIndex = ref(0);
const animating = ref(false);

const setAnimNext = () => {
  currentTrack = document.getElementById('current-track');
  rightGhostTrack = document.getElementById('right-ghost-track');
  currentTrack?.classList.add('anim-next');
  rightGhostTrack?.classList.add('anim');
  setTimeout(() => {
    currentTrack?.classList.remove('anim-next');
    rightGhostTrack?.classList.remove('anim');
    currentTrackIndex.value++;
    animating.value = false;
    emits('newTrackSelected', currentTrackIndex.value);
  }, 300);
};

const setAnimPrev = () => {
  currentTrack = document.getElementById('current-track');
  leftGhostTrack = document.getElementById('left-ghost-track');
  currentTrack?.classList.add('anim-prev');
  leftGhostTrack?.classList.add('anim');
  setTimeout(() => {
    currentTrack?.classList.remove('anim-prev');
    leftGhostTrack?.classList.remove('anim');
    currentTrackIndex.value--;
    animating.value = false;
    emits('newTrackSelected', currentTrackIndex.value);
  }, 300);
};

const nextTrack = () => {
  if (currentTrackIndex.value === props.tracks.length - 1 || animating.value) {
    return;
  }
  animating.value = true;
  audioManager?.pauseAudio();
  props.newTrackIsBeingPlay('');
  setAnimNext();
};

const prevTrack = () => {
  if (currentTrackIndex.value === 0 || animating.value) {
    return;
  }
  audioManager?.pauseAudio();
  props.newTrackIsBeingPlay('');
  animating.value = true;
  setAnimPrev();
};
</script>

<template>
  <div class="track-container">
    <span v-if="currentUrlTrackPlaying !== ''" class="background-play-lightning" />
    <div class="track-listing">
      <div class="direction-icon">
        <font-awesome-icon
          v-if="currentTrackIndex > 0"
          icon="arrow-left"
          size="xl"
          @click="prevTrack"
          class="cursor-pointer"
        />
      </div>
      <div id="left-ghost-track" class="ghost-track left">
        <TrackCard v-if="currentTrackIndex > 0" :track="tracks[currentTrackIndex - 1]" />
      </div>
      <div id="current-track" :class="`track ${audioManager?.isPlaying ? '' : ''}`">
        <TrackCard
          :track="tracks[currentTrackIndex]"
          :currentUrlTrackPlaying="currentUrlTrackPlaying"
          :setCurrentUrlTrackPlaying="newTrackIsBeingPlay"
        />
      </div>
      <div id="right-ghost-track" class="ghost-track right">
        <TrackCard
          v-if="currentTrackIndex < tracks.length - 1"
          :track="tracks[currentTrackIndex + 1]"
        />
      </div>
      <div class="direction-icon">
        <font-awesome-icon
          v-if="currentTrackIndex < tracks.length - 1"
          icon="arrow-right"
          size="xl"
          @click="nextTrack"
          class="cursor-pointer"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.track-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: -1;
}

.track-listing {
  position: relative;
  margin: auto;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .track {
    position: relative;
    width: 15rem;
    height: 100%;
    border-radius: var(--border-radius-xl);
    margin: 2rem;

    &.anim-next,
    &.anim-prev {
      transition: 0.3s ease-in-out;
      border-radius: var(--border-radius-xl) 0 0 var(--border-radius-xl);
      height: 70%;
    }

    &.anim-next {
      transform: translateX(calc(-100% - (2.5rem + 2rem)));
    }

    &.anim-prev {
      transform: translateX(calc(100% + (2.5rem + 2rem)));
    }
  }

  .direction-icon {
    color: var(--primary-color);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;

    & > * {
      width: inherit;
      height: inherit;
    }
  }
}

.background-play-lightning {
  z-index: -10;
  background-color: blue;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0.5;
  transition: 0.2s ease-in-out;
  box-shadow: rgba(249, 239, 255, 0.25) 0px 0px 900px 300px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  animation: bounce 2s infinite;
  animation-delay: 0.3s;
}

.ghost-track {
  position: absolute;
  z-index: -1;
  width: 15rem;
  height: 70%;
  border-radius: var(--border-radius-xl);
  margin: auto;

  &.left {
    left: calc(-15rem - 4rem);
  }

  &.right {
    left: calc(100% + 4rem);
  }

  &.anim {
    transition: 0.3s ease-in-out;
    border-radius: var(--border-radius-xl);
    height: 100%;
    left: 4.5rem;
  }
}
</style>
