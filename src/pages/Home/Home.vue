<script setup lang="ts">
import {
  ref,
  watch,
  type Ref,
  inject,
} from 'vue';

import Input from '@/components/input/Input.vue';
import Button from '@/components/buttons/Button.vue';
import searchItems from '@/api/searchItems';
import type { SearchItems } from '@/types/search.types';
import ArtistsList from '@/pages/home/ArtistsList.vue';
import AlbumsList from '@/pages/home/AlbumsList.vue';
import TracksList from '@/pages/home/TracksList.vue';
import { Device } from '@/tools/defineDevice';

const inputValue = ref('');
const searchResults: Ref<SearchItems | null> = ref(null);
const device = inject('device');
const isLoading: Ref<boolean> = ref(false);

watch(inputValue, async (newV, oldV) => {
  if (oldV === '') {
    searchResults.value = null;
  }
  if (newV !== '') {
    isLoading.value = true;
    const result = await searchItems(newV, ['artist', 'track', 'album']);
    searchResults.value = result;
    isLoading.value = false;
  }
});
</script>

<template>
  <section
    :class="`flex gap-6 justify-center items-center flex-col padding-section md:w-4/5 md:m-auto ${
      inputValue === '' ? 'section-centered' : ''
    }`"
  >
    <div class="input-container" data-testid="home-page-input">
      <Input v-model:value="inputValue" placeholder="Find anything..." />
    </div>
    <div
      v-if="device !== Device.Mobile && inputValue === ''"
      class="flex gap-4 w-full h-full justify-center items-center flex-wrap text-center"
    >
      <p class="text-md">Find your new style in the recommendations!</p>
      <Button
        label="Recommendations"
        size=""
      ></Button>
    </div>
    <div v-if="inputValue.length > 0" class="flex flex-col gap-6">
      <ArtistsList :artists="searchResults?.artists.items" :isLoading="isLoading" />
      <AlbumsList :albums="searchResults?.albums.items" :isLoading="isLoading" />
      <TracksList
        :tracks="searchResults?.tracks.items"
        :isLoading="isLoading"
        :inputValue="inputValue"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-centered {
  padding-top: 0 !important;
  transform: translateY(calc(100vh / 2 - 50%));
  transition: 0.15s ease-in-out;
}
</style>
