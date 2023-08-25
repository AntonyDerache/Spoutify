<script setup lang="ts">
import {
  inject,
  onMounted,
  ref,
  type Ref,
} from 'vue';
import { useRoute } from 'vue-router';

import Modal from '@/components/Modal/Modal.vue';
import Button from '@/components/Buttons/Button.vue';
import getRecommendations from '@/api/getRecommendations';
import TracksListing from '@/layout/trackListing/TracksListing.vue';
import type { SearchTrack } from '@/types/search.types';
import TracklistModalContent from './TracklistModalContent.vue';
import { Device } from '@/tools/defineDevice';

const device = inject('device');
const tracks: Ref<Array<SearchTrack>> = ref([]);
const isTracklistModalOpen: Ref<boolean> = ref(false);
const currentTrackIndex: Ref<number> = ref(0);

onMounted(async () => {
  const { genre } = useRoute().params;
  const response: { tracks: Array<SearchTrack> } = await getRecommendations(
    'genres',
    genre as string,
  );
  tracks.value = response.tracks;
});

const closeTracklistModal = () => {
  isTracklistModalOpen.value = false;
};

const openTracklistModal = () => {
  isTracklistModalOpen.value = true;
};

const onNewTrackSelected = (index: number) => {
  currentTrackIndex.value = index;
};
</script>

<template>
  <section>
    <div v-if="device !== Device.Mobile">
      <Modal :isOpen="isTracklistModalOpen" :onClose="closeTracklistModal">
        <TracklistModalContent :tracks="tracks" :currentTrackIndex="currentTrackIndex" />
      </Modal>
      <div class="flex justify-center pt-10">
        <Button label="See tacklist" class="cursor-pointer" @click="openTracklistModal" />
      </div>
    </div>
    <TracksListing :tracks="tracks" @newTrackSelected="onNewTrackSelected" />
  </section>
</template>
