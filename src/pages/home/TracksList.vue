<script setup lang="ts">
import {
  ref,
  type PropType,
  type Ref,
  inject,
  onUnmounted,
  onMounted,
} from 'vue';

import TrackCard from '@/components/cards/TrackCard.vue';
import Button from '@/components/buttons/Button.vue';
import type { SearchTrack } from '@/types/search.types';
import type { IAudioManager } from '@/tools/audioManager';

defineProps({
  tracks: { type: Object as PropType<Array<SearchTrack> | undefined> },
  isLoading: { type: Boolean, required: false, default: false },
  inputValue: { type: String, required: true, default: '' },
});

const currentUrlTrackPlaying: Ref<string> = ref('');
const audioManager: IAudioManager | undefined = inject('audioManager');

const newTrackIsBeingPlay = (trackUrl: string) => {
  currentUrlTrackPlaying.value = trackUrl;
};

onMounted(() => {
  audioManager?.setOnEndedCallback(() => newTrackIsBeingPlay(''));
});

onUnmounted(() => {
  audioManager?.pauseAudio();
  audioManager?.setOnEndedCallback(() => {});
});
</script>

<template>
  <p class="text-4xl font-bold p-4">Tracks</p>
  <ul v-if="!isLoading && tracks" class="track-list">
    <li v-for="track in tracks.slice(0, 4)" :key="track.name">
      <TrackCard
        :track="track"
        :currentUrlTrackPlaying="currentUrlTrackPlaying"
        :setCurrentUrlTrackPlaying="newTrackIsBeingPlay"
      />
    </li>
  </ul>
  <ul v-else class="track-list">
    <li v-for="item in new Array(4)" :key="item">
      <TrackCard isSkeleton />
    </li>
  </ul>
  <div class="flex justify-center">
    <Button
      label="View more"
      @click="() => $router.push(`/tracks?searchValue=${inputValue}`)"
    ></Button>
  </div>
</template>

<style scoepd lang="scss">
.track-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}
</style>
