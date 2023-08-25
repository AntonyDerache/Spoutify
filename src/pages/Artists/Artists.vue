<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  ref,
  type Ref,
} from 'vue';
import { useRoute } from 'vue-router';

import { getArtists, getArtistsAlbums, getArtistsTopTracks } from '@/api/getArtists';
import type { IAudioManager } from '@/tools/audioManager';
import type { SearchArtist } from '@/types/search.types';
import largeNumberToString from '@/tools/largeNumberToString';
import ArtistsTopTracks from './ArtistsTopTracks.vue';
import ArtistsAlbums from './ArtistsAlbums.vue';
import type { ArtistTracks, ArtistAlbums } from './Artists.types';
import ItemPresentation from '@/layout/ItemPresentation.vue';

const audioManager: IAudioManager = inject('audioManager') as IAudioManager;
const artist: Ref<SearchArtist | undefined> = ref(undefined);
const artistTopTracks: Ref<ArtistTracks | undefined> = ref(undefined);
const artistAlbums: Ref<ArtistAlbums | undefined> = ref(undefined);
const currentUrlTrackPlaying: Ref<string> = ref('');

const singlesList = computed(() => artistAlbums.value?.items.filter((album) => album.album_type === 'single'));
const albumsList = computed(() => artistAlbums.value?.items.filter((album) => album.album_type === 'album'));

const newTrackIsBeingPlay = (trackUrl: string) => {
  currentUrlTrackPlaying.value = trackUrl;
};

onMounted(async () => {
  const getArtist = async (artistId: string) => {
    const result = await getArtists(artistId);
    artist.value = result;
  };

  const getArtistTopTracks = async (artistId: string) => {
    const result = await getArtistsTopTracks(artistId);
    artistTopTracks.value = result;
  };

  const getArtistAlbums = async (artistId: string) => {
    const result = await getArtistsAlbums(artistId);
    artistAlbums.value = result;
  };

  audioManager.setOnEndedCallback(() => newTrackIsBeingPlay(''));
  const artistId = useRoute().params.id;
  getArtist(artistId as string);
  getArtistTopTracks(artistId as string);
  getArtistAlbums(artistId as string);
});

onUnmounted(() => {
  audioManager.pauseAudio();
  audioManager.setOnEndedCallback(() => { });
});

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
            <h3 class="text-md">{{ largeNumberToString(artist.followers.total) }} Followers</h3>
          </div>
        </template>
      </ItemPresentation>
      <div class="w-4/5 m-auto">
        <div v-if="artistTopTracks" class="pb-16">
          <p class="text-start text-4xl pb-6">Top Tracks</p>
          <ArtistsTopTracks :tracks="artistTopTracks.tracks" />
        </div>
        <div v-if="artistAlbums">
          <div class="flex flex-col gap-10">
            <ArtistsAlbums
              v-if="albumsList && albumsList.length > 0"
              :albums="albumsList" title="Albums"
            />
            <ArtistsAlbums
              v-if="singlesList && singlesList.length > 0"
              :albums="singlesList" title="Singles"
            />
          </div>
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
