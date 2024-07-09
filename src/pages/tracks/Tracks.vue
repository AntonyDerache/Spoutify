<script setup lang="ts">
import {
  type Ref,
  onMounted,
  ref,
  inject,
  onUnmounted,
  watch,
} from 'vue';
import { useRoute } from 'vue-router';
import searchItems from '@/api/searchItems';
import type { SearchTrack } from '@/types/search.types';
import TrackCard from '@/components/cards/TrackCard.vue';
import Input from '@/components/input/Input.vue';
import type { IAudioManager } from '@/tools/audioManager';

const audioManager: IAudioManager | undefined = inject('audioManager');
const tracks: Ref<Array<SearchTrack> | null> = ref(null);
const inputValue: Ref<string> = ref('');
const currentUrlTrackPlaying: Ref<string> = ref('');
const isLoading: Ref<boolean> = ref(false);

const newTrackIsBeingPlay = (trackUrl: string) => {
  currentUrlTrackPlaying.value = trackUrl;
};

onMounted(() => {
  const querySearchValue = useRoute().query.searchValue;
  if (querySearchValue) {
    inputValue.value = querySearchValue as string;
  }
  audioManager?.setOnEndedCallback(() => newTrackIsBeingPlay(''));
});

watch(inputValue, async (newV, oldV) => {
  if (oldV === '') {
    tracks.value = null;
  }
  if (newV !== '') {
    isLoading.value = true;
    const result = await searchItems(newV, ['track']);
    tracks.value = result.tracks.items;
    isLoading.value = false;
  }
});

onUnmounted(() => {
  audioManager?.pauseAudio();
  audioManager?.setOnEndedCallback(() => {});
});
</script>

<template>
  <section class="padding-section flex gap-6 items-center justify-center flex-col">
    <div class="input-container">
      <Input v-model:value="inputValue" placeholder="Find a track" />
    </div>
    <div v-if="tracks?.length === 0" class="absolute top-1/2">
      <p class="text-2xl">There is no matches</p>
    </div>
    <div v-if="inputValue.length > 0" class="w-full justify-center">
      <ul v-if="!isLoading">
        <li v-for="track in tracks" :key="track.name" class="flex justify-center">
          <TrackCard
            :track="track"
            :currentUrlTrackPlaying="currentUrlTrackPlaying"
            :setCurrentUrlTrackPlaying="newTrackIsBeingPlay"
          />
        </li>
      </ul>
      <ul v-else>
        <li v-for="item in new Array(15)" :key="item" class="flex justify-center">
          <TrackCard isSkeleton />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
ul {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 2rem;

  @media (min-width: 320px) {
    grid-template-columns: auto auto;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(210px, max-content));
  }

  @media (min-width: 1024px) {
    grid-gap: 2.5rem;
    padding: 1rem;
  }
}
</style>
