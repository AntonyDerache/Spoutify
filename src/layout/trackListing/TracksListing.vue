<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, type Ref } from 'vue'

import type { IAudioManager } from '@/tools/audioManager'
import type { SearchTrack } from '@/types/Search.types'
import { Device } from '@/tools/defineDevice'
import MobileView from './MobileView.vue'
import DesktopView from './DesktopView.vue'

defineProps({
  tracks: { type: Array<SearchTrack>, required: true }
})

const device: Device | undefined = inject('device')
const audioManager: IAudioManager | undefined = inject('audioManager')
let currentUrlTrackPlaying: Ref<string> = ref('')

onMounted(async () => {
  audioManager?.setOnEndedCallback(() => newTrackIsBeingPlay(''))
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
  <DesktopView
    v-if="device !== Device.Mobile"
    :tracks="tracks"
    :currentUrlTrackPlaying="currentUrlTrackPlaying"
    :newTrackIsBeingPlay="newTrackIsBeingPlay"
  />
  <MobileView
    v-else
    :tracks="tracks"
    :currentUrlTrackPlaying="currentUrlTrackPlaying"
    :newTrackIsBeingPlay="newTrackIsBeingPlay"
  />
</template>
