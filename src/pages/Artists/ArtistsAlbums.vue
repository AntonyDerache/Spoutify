<script setup lang="ts">
import type { SearchAlbum } from '@/types/Search.types'
import { computed, ref } from 'vue'

const props = defineProps({
  albums: { type: Array<SearchAlbum>, required: true }
})

const showMoreSingles = ref(false)
const showMoreAlbums = ref(false)
let singlesList = computed(() => props.albums.filter((album) => album.album_type === 'single'))
let albumsList = computed(() => props.albums.filter((album) => album.album_type === 'album'))
</script>

<template>
  <div class="flex flex-col">
    <p class="text-4xl pb-10">Albums</p>
    <ul class="flex flex-wrap gap-4 pb-16">
      <li
        v-for="album in showMoreAlbums ? albumsList : albumsList.slice(0, 6)"
        :key="album.id"
        class="cursor-pointer"
        @click="() => $router.push(`/albums/${album.id}`)"
      >
        <div class="flex flex-col gap-4 items-center">
          <img :src="album.images[1].url" />
          <p class="text-md">{{ album.name }}</p>
        </div>
      </li>
    </ul>
    <p v-if="albumsList.length > 6" @click="() => (showMoreAlbums = !showMoreAlbums)">
      {{ showMoreAlbums ? 'Reduce' : 'See all' }}
    </p>
    <p class="text-4xl pb-10">Singles</p>
    <ul class="flex flex-wrap gap-4">
      <li
        v-for="single in showMoreSingles ? singlesList : singlesList.slice(0, 6)"
        :key="single.id"
        class="cursor-pointer"
        @click="() => $router.push(`/albums/${single.id}`)"
      >
        <div class="flex flex-col gap-4 items-center">
          <img :src="single.images[1].url" />
          <p class="text-md">{{ single.name }}</p>
        </div>
      </li>
    </ul>
    <p v-if="singlesList.length > 6" @click="() => (showMoreSingles = !showMoreSingles)">
      {{ showMoreSingles ? 'Reduce' : 'See all' }}
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
</style>
