<script setup lang="ts">
import type { PropType } from "vue";

import ArtistPhoto from "@/components/ArtistsPhoto/ArtistsPhoto.vue"
import type { Artist } from "@/types/types";

defineProps({
  artists: { type: Object as PropType<Array<Artist>>, required: true },
})
</script>

<template>
  <p class="text-4xl font-bold p-4">Artists</p>
  <div class="w-full flex pb-5">
    <div v-for="item in artists.slice(0, 5)" :key="item.name" class="artist-frame">
      <ArtistPhoto :name="item.name" :img="item.images[1]?.url"></ArtistPhoto>
    </div>
  </div>
  <div class="flex justify-center ">
    <Button label="View more..."></Button>
  </div>
</template>

<style scoped lang="scss">
.artist-frame {
  width: 12rem;
  height: 12rem;
}
</style>