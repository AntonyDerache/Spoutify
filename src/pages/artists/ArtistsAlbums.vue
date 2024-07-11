<script setup lang="ts">
import { ref } from 'vue';

import type { SearchAlbum } from '@/types/search.types';

defineProps({
  albums: { type: Array<SearchAlbum>, required: true },
  title: { type: String, required: true },
});
const showMore = ref(false);
</script>

<template>
  <p class="text-4xl">{{ title }}</p>
  <ul class="flex flex-wrap gap-4">
    <li
      v-for="album in showMore ? albums : albums.slice(0, 6)"
      :key="album.id"
      class="cursor-pointer"
      :data-testid="`${album.name}-album`"
      @click="() => $router.push(`/albums/${album.id}`)"
    >
      <div class="flex flex-col gap-4 items-center">
        <img :src="album.images[1]?.url" />
        <p class="text-md">{{ album.name }}</p>
      </div>
    </li>
  </ul>
  <div class="flex">
    <p
      v-if="albums.length > 6"
      @click="() => (showMore = !showMore)"
      class="show-more cursor-pointer"
    >
      {{ showMore ? 'Reduce' : 'See all' }}
    </p>
  </div>
</template>

<style scoped lang="scss">
li {
  width: 8rem;

  &:hover {
    color: var(--primary-color);
  }
}

.show-more {
  &:hover {
    color: var(--primary-color);
  }
}
</style>
