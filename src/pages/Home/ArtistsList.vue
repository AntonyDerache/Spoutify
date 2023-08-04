<script setup lang="ts">
import type { PropType } from 'vue'

import ArtistPhoto from '@/components/ArtistsPhoto/ArtistsPhoto.vue'
import Button from '@/components/Buttons/Button.vue'
import type { SearchArtist } from '@/types/Search.types'

defineProps({
  artists: { type: Object as PropType<Array<SearchArtist>>, required: true }
})
</script>

<template>
  <p class="text-4xl font-bold p-4">Artists</p>
  <div class="flex flex-wrap gap-2 justify-center md:justify-start">
    <div v-for="artist in artists.slice(0, 5)" :key="artist.name" class="artist-frame">
      <ArtistPhoto
        :name="artist.name"
        :img="artist.images[1]?.url"
        @click="() => $router.push(`/artists/${artist.id}`)"
      />
    </div>
  </div>
  <div class="flex justify-center">
    <Button label="View more"></Button>
  </div>
</template>

<style scoped lang="scss">
.artist-frame {
  width: 10rem;
  height: 10rem;

  @media (min-width: 768px) {
    width: 12rem;
    height: 12rem;
  }
}
</style>
