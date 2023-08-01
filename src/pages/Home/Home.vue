<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'

import Input from '@/components/Input/Input.vue'
import Button from '@/components/Buttons/Button.vue'
import { searchItem } from '@/api/searchItem'
import type { SearchItems } from '@/types/types'
import ArtistsList from '@/pages/Home/ArtistsList.vue'
import AlbumsList from '@/pages/Home/AlbumsList.vue'
import TracksList from '@/pages/Home/TracksList.vue'

const inputValue = ref('')
let searchResults: Ref<SearchItems | null> = ref(null)

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
    <div class="flex gap-4 w-full h-full justify-center items-center">
      <p class="text-md">Find your new style in the recommendations!</p>
      <Button
        label="Recommendations"
        size="sm"
        @click="() => $router.push('/recommendations')"
      ></Button>
    </div>
    <div v-if="searchResults && inputValue.length > 0" class="w-full flex flex-col gap-6">
      <ArtistsList :artists="searchResults.artists.items" />
      <AlbumsList :albums="searchResults.albums.items" />
      <TracksList :tracks="searchResults.tracks.items" />
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
