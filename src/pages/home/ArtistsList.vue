<script setup lang="ts">
import type { PropType } from 'vue';

import ArtistPhoto from '@/components/artistsPhoto/ArtistsPhoto.vue';
import type { SearchArtist } from '@/types/search.types';

defineProps({
  artists: { type: Object as PropType<Array<SearchArtist> | undefined> },
  isLoading: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <p class="text-4xl font-bold p-4">Artists</p>
  <div v-if="!isLoading && artists" class="artists-list">
    <div
      v-for="artist in artists.slice(0, 5)"
      :key="artist.name"
      class="artist-frame"
    >
      <ArtistPhoto
        :name="artist.name"
        :img="artist.images[1]?.url"
        :data-testid="`${artist.name}-search-artist-item`"
        @click="() => $router.push(`/artists/${artist.id}`)"
      />
    </div>
  </div>
  <div v-else class="artists-list">
    <div v-for="item in new Array(5)" :key="item" class="artist-frame">
      <ArtistPhoto isSkeleton />
    </div>
  </div>
</template>

<style scoped lang="scss">
.artists-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
}

.artist-frame {
  width: 10rem;
  height: 10rem;

  @media (min-width: 768px) {
    width: 12rem;
    height: 12rem;
  }
}
</style>
