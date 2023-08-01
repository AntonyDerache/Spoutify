<script setup lang="ts">
import type { PropType } from "vue";

import AlbumCard from '@/components/Cards/AlbumCard.vue';
import type { Album } from "@/types/types";

defineProps({
  albums: { type: Object as PropType<Array<Album>>, required: true },
})
</script>

<template>
  <p class="text-4xl font-bold p-4">Albums</p>
  <div class="flex flex-wrap gap-5">
    <div v-for="item in albums.slice(0, 5)" :key="item.name">
      <AlbumCard :name="item.name" :coverURL="item.images[1]?.url" />
    </div>
  </div>
  <div class="flex justify-center">
    <Button label="View more..."></Button>
  </div>
</template>