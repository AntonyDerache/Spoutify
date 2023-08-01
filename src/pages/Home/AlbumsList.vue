<script setup lang="ts">
import type { PropType } from 'vue'

import AlbumCard from '@/components/Cards/AlbumCard.vue'
import Button from '@/components/Buttons/Button.vue'
import type { Album } from '@/types/SearchTypes'

defineProps({
  albums: { type: Object as PropType<Array<Album>>, required: true }
})
</script>

<template>
  <p class="text-4xl font-bold p-4">Albums</p>
  <div class="flex flex-wrap gap-5">
    <div v-for="album in albums.slice(0, 5)" :key="album.name">
      <AlbumCard
        :name="album.name"
        :coverURL="album.images[1]?.url"
        @click="() => $router.push(`/albums/${album.id}`)"
      />
    </div>
  </div>
  <div class="flex justify-center">
    <Button label="View more..."></Button>
  </div>
</template>
