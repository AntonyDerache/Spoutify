<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

import { getAlbum } from '@/api/getAlbum'
import type { Album } from '@/types/AlbumTypes'
import AlbumRow from './AlbumRow.vue'
import type { IAudioManager } from '@/Tools/AudioManager'

const album: Ref<Album | undefined> = ref(undefined)
let currentUrlTrackPlaying: Ref<string> = ref('')
const audioManager: IAudioManager | undefined = inject('audioManager')

onMounted(async () => {
  audioManager?.setOnEndedCallback(() => newTrackIsBeingPlay(''))
  const albumId = useRoute().params.id
  const result = await getAlbum(albumId as string)
  album.value = result
  console.log(album.value)
})

const newTrackIsBeingPlay = (trackUrl: string) => {
  currentUrlTrackPlaying.value = trackUrl
}

onUnmounted(() => {
  audioManager?.pauseAudio()
  audioManager?.setOnEndedCallback(() => {})
})
</script>

<template>
  <section class="padding-section">
    <div v-if="album">
      <div class="album-description flex m-auto items-center w-full gap-6 mb-6">
        <div class="w-1/2 flex items-center justify-end">
          <img :src="album.images[1].url" :alt="`${album.name}'s cover`" />
        </div>
        <div class="w-1/2">
          <h2 class="text-4xl text-start">{{ album.name }}</h2>
          <h3 class="text-1xl text-start">{{ album.artists[0].name }}</h3>
        </div>
      </div>
      <ul class="album-tracks flex flex-col">
        <li v-for="track in album.tracks.items" :key="track.id" class="flex justify-between px-4">
          <AlbumRow
            :track="track"
            :currentUrlTrackPlaying="currentUrlTrackPlaying"
            :setCurrentUrlTrackPlaying="newTrackIsBeingPlay"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.album-tracks {
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius-xl);
  max-width: 80%;
  margin: auto;
  text-overflow: ellipsis;
  background-color: rgba(58, 28, 93, 0.3);

  // &:nth-child(1n+2) {
  //   background-color: rgba(89, 50, 132, .3);
  // }
}

.album-description {
}

img {
  justify-self: center;
  width: 10rem;
  height: 10rem;
}
</style>
