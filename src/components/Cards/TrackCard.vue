<script setup lang="ts">
import { ref, type PropType, computed, inject } from "vue";
import IconButton from "@/components/Buttons/IconButton.vue";
import PlayButton from "@/components/PlayButton/PlayButton.vue";
import type { Track } from '@/types/types';
import type { IAudioManager } from "@/Tools/AudioManager";

const props = defineProps({
  'track': { type: Object as PropType<Track>, required: true },
  'currentUrlTrackPlaying': { type: String, required: true },
  'setCurrentUrlTrackPlaying': { type: Function, required: true },
});

const audioManager: IAudioManager | undefined = inject("audioManager");
let isPlaying = ref(false);

isPlaying = computed(() =>  props.currentUrlTrackPlaying === props.track.preview_url);

const playTrack = () => {
  if (!props.track.preview_url) {
    return;
  }
  audioManager?.setSrc(props.track.preview_url);
  props.setCurrentUrlTrackPlaying(props.track.preview_url);
}

const pauseTrack = () => {
  audioManager?.pauseAudio();
  props.setCurrentUrlTrackPlaying("");
}
</script>

<template>
  <div class="track-card flex items-center flex-col">
    <img :src="track.album.images[1]?.url" :alt="`${track.name} album cover`" />
    <div class="pt-4 text-start w-full flex flex-col items-center">
      <div class="py-2">
        <div class="flex gap-2">
          <PlayButton v-if="track.preview_url" :isPlaying="isPlaying" @click="isPlaying ? pauseTrack() : playTrack()" />
          <a :href="track.uri">
            <IconButton icon="fa-brands fa-spotify" size="md" iconSize="xl"/>
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
  min-width: 12rem;
  background-color: rgba(170, 124, 229, 0.3);
  border-radius: var(--border-radius-xl);
  transition: .2s ease-in-out;
  padding: 2rem;

  p {
    width: 12rem;
    word-wrap: break-word;
  }

  img {
    color: blue;
    border-radius: var(--border-radius);
    width: 6rem;
    height: 6rem;
  }
}
</style>