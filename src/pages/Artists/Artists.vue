<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'

import { getArtists, getArtistsAlbums, getArtistsTopTracks } from '@/api/getArtists'
import type { IAudioManager } from '@/Tools/AudioManager'
import type { SearchArtist } from '@/types/Search.types'
import ArtistsTopTracks from './ArtistsTopTracks.vue'
import ArtistsAlbums from './ArtistsAlbums.vue'
import type { ArtistTracks, ArtistAlbums } from './Artists.types'
import ItemPresentation from '@/layout/ItemPresentation.vue'

const audioManager: IAudioManager | undefined = inject('audioManager')
const artist: Ref<SearchArtist | undefined> = ref(undefined)
const artistTopTracks: Ref<ArtistTracks | undefined> = ref(undefined)
const artistAlbums: Ref<ArtistAlbums | undefined> = ref(undefined)
let currentUrlTrackPlaying: Ref<string> = ref('')

onMounted(async () => {
  audioManager?.setOnEndedCallback(() => newTrackIsBeingPlay(''))
  const artistId = useRoute().params.id
  getArtist(artistId as string)
  getArtistTopTracks(artistId as string)
  getArtistAlbums(artistId as string)
})

const getArtist = async (artistId: string) => {
  const result = await getArtists(artistId)
  artist.value = result
}

const getArtistTopTracks = async (artistId: string) => {
  const result = await getArtistsTopTracks(artistId)
  artistTopTracks.value = result
  console.log(result.tracks)
}

const getArtistAlbums = async (artistId: string) => {
  const result = await getArtistsAlbums(artistId)
  artistAlbums.value = result
}

onUnmounted(() => {
  audioManager?.pauseAudio()
  audioManager?.setOnEndedCallback(() => {})
})

const newTrackIsBeingPlay = (trackUrl: string) => {
  currentUrlTrackPlaying.value = trackUrl
}

const displayLargeNumber = (number: number) => {
  let numberStr = number.toString().split('').reverse().join('')
  let finalStr = ''

  for (let i = 0; i < numberStr.length; i++) {
    finalStr = finalStr.concat(numberStr[i])
    if (i % 3 === 2) {
      finalStr = finalStr.concat(' ')
    }
  }
  finalStr = finalStr.split('').reverse().join('')
  return finalStr
}
</script>

<template>
  <section class="padding-section">
    <div v-if="artist">
      <ItemPresentation>
        <template v-slot:img>
          <img :src="artist.images[2].url" />
        </template>
        <template v-slot:text>
          <div>
            <h1 class="text-5xl">{{ artist.name }}</h1>
            <h3 class="text-md">{{ displayLargeNumber(artist.followers.total) }} Followers</h3>
          </div>
        </template>
      </ItemPresentation>
      <div class="w-4/5 m-auto">
        <div v-if="artistTopTracks" class="pb-16">
          <p class="text-start text-4xl pb-6">Top Tracks</p>
          <ArtistsTopTracks :tracks="artistTopTracks.tracks" />
        </div>
        <div v-if="artistAlbums">
          <ArtistsAlbums :albums="artistAlbums.items" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
}
</style>
