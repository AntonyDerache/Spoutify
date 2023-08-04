<script setup lang="ts">
import { ref, watch, type Ref, inject } from 'vue'

import Input from '@/components/Input/Input.vue'
import Button from '@/components/Buttons/Button.vue'
import { searchItem } from '@/api/searchItem'
import type { SearchItems } from '@/types/Search.types'
import ArtistsList from '@/pages/Home/ArtistsList.vue'
import AlbumsList from '@/pages/Home/AlbumsList.vue'
import TracksList from '@/pages/Home/TracksList.vue'
import { Device } from '@/tools/defineDevice'

const inputValue = ref('')
let searchResults: Ref<SearchItems | null> = ref(null)
let device = inject('device')

watch(inputValue, async (newV, oldV) => {
  if (oldV === '') {
    searchResults.value = null
  }
  if (newV !== '') {
    const result = await searchItem(newV, ['artist', 'track', 'album'])
    searchResults.value = result
  }
})
</script>

<template>
  <section
    :class="`flex gap-6 justify-center items-center flex-col padding-section ${
      inputValue === '' ? 'section-centered' : ''
    }`"
  >
    <div class="input-container">
      <Input v-model:value="inputValue" placeholder="Rechercher" />
    </div>
    <div
      v-if="device === Device.Mobile && inputValue === ''"
      class="flex gap-4 w-full h-full justify-center items-center flex-wrap text-center"
    >
      <p class="text-md">Find your new style in the recommendations!</p>
      <Button
        label="Recommendations"
        size=""
        @click="() => $router.push('/recommendations')"
      ></Button>
    </div>
    <div v-if="searchResults && inputValue.length > 0" class="flex flex-col gap-6">
      <ArtistsList
        v-if="searchResults.artists.items.length > 0"
        :artists="searchResults.artists.items"
      />
      <AlbumsList
        v-if="searchResults.albums.items.length > 0"
        :albums="searchResults.albums.items"
      />
      <TracksList
        v-if="searchResults.tracks.items.length > 0"
        :tracks="searchResults.tracks.items"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-centered {
  padding-top: 0;
  transform: translateY(calc(100vh / 2 - 50%));
  transition: 0.15s ease-in-out;
}
</style>
