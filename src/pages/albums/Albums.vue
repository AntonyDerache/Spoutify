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

import getAlbums from '@/api/getAlbums';
import type { Album, AlbumTrack } from './album.types';
import TrackRow from './TrackRow.vue';
import type { IAudioManager } from '@/tools/audioManager';
import millisecondsToMinutesAndSeconds from '@/tools/millisecondsToMinutesAndSeconds';
import ItemPresentation from '@/layout/ItemPresentation.vue';

const audioManager: IAudioManager | undefined = inject('audioManager');
const album: Ref<Album | undefined> = ref(undefined);
const currentUrlTrackPlaying: Ref<string> = ref('');

const calculAlbumDuration = (tracks: Array<AlbumTrack> | undefined) => {
  let durationMs = 0;
  if (!tracks) return durationMs;
  tracks.forEach((track: AlbumTrack) => {
    durationMs += track.duration_ms;
  });
  return durationMs;
};

const albumDuration = computed(() => calculAlbumDuration(album.value?.tracks.items));

const newTrackIsBeingPlay = (trackUrl: string) => {
  currentUrlTrackPlaying.value = trackUrl;
};

onMounted(async () => {
  const getAlbum = async () => {
    const albumId = useRoute().params.id;
    const result = await getAlbums(albumId as string);
    album.value = result;
  };

  audioManager?.setOnEndedCallback(() => newTrackIsBeingPlay(''));
  getAlbum();
});

onUnmounted(() => {
  audioManager?.pauseAudio();
  audioManager?.setOnEndedCallback(() => {});
});
</script>

<template>
  <section class="padding-section md:w-4/5 md:m-auto">
    <div v-if="album">
      <ItemPresentation>
        <template v-slot:img>
          <img
            :src="album.images[1]?.url"
            :alt="`${album.name}'s cover`"
            :class="`${currentUrlTrackPlaying !== '' ? ' box-shadow' : ''}`"
          />
        </template>
        <template v-slot:text>
          <h2
            class="text-4xl text-start font-bold"
            :data-testid="`${album?.name}-album-name`"
          >
            {{ album.name }}
          </h2>
          <h3
            class="text-1xl text-start font-bold hover:underline cursor-pointer"
            :data-testid="`${album?.artists[0].name}-album-artist`"
            @click="() => $router.push(`/artists/${album?.artists[0].id}`)"
          >
            {{ album.artists[0].name }}
          </h3>
          <div class="flex gap-2 font-light">
            <p>{{ new Date(album.release_date).getFullYear() }}</p>
            <p>-</p>
            <p>{{ millisecondsToMinutesAndSeconds(albumDuration) }}</p>
          </div>
        </template>
      </ItemPresentation>
      <ul class="album-tracks flex flex-col">
        <li v-for="track in album.tracks.items" :key="track.id" class="flex justify-between px-4">
          <TrackRow
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
  text-overflow: ellipsis;
  background-color: rgba(58, 28, 93, 0.3);

  li:nth-child(2n) {
    background-color: rgba(64, 28, 99, 0.3);
  }
}

img {
  justify-self: center;
  width: 10rem;
  height: 10rem;
  transition: 0.2s ease-in-out;
}

.box-shadow {
  box-shadow: rgba(255, 255, 255, 0.5) 0px 0px 40px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  transition: 0.2s ease-in-out;
}
</style>
