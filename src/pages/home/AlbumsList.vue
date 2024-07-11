<script setup lang="ts">
import type { PropType } from 'vue';

import AlbumCard from '@/components/cards/AlbumCard.vue';
import type { SearchAlbum } from '@/types/search.types';

defineProps({
  albums: { type: Object as PropType<Array<SearchAlbum> | undefined> },
  isLoading: { type: Boolean, required: false, default: false },
});
</script>

<template>
  <p class="text-4xl font-bold p-4">Albums</p>
  <div v-if="!isLoading && albums" class="albums-list">
    <div v-for="album in albums.slice(0, 5)" :key="album.name" class="album-frame">
      <AlbumCard
        :name="album.name"
        :coverURL="album.images[1]?.url"
        :data-testid="`${album.name}-search-album-item`"
        @click="() => $router.push(`/albums/${album.id}`)"
      />
    </div>
  </div>
  <div v-else class="albums-list">
    <div v-for="item in new Array(5)" :key="`skeleton-${item}`" class="album-frame">
      <AlbumCard isSkeleton />
    </div>
  </div>
</template>

<style scoped lang="scss">
.albums-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;

  .album-frame {
    width: 10rem;
    height: 10rem;

    @media (min-width: 768px) {
      width: 12rem;
      height: 12rem;
    }
  }
}
</style>
