<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue';

const props = defineProps({
  isPlaying: { type: Boolean, default: false },
})

let left = 0;
let timeOnStart = new Date();
let bar: HTMLElement | null;
let intervalId: Ref<number> = ref(0);

onMounted(() => {
  bar = document.getElementById("bar");
})

watch(() => props.isPlaying, (newVal) => {
  newVal ? startTimer() : stopTimer()
})

const startTimer = () => {
  timeOnStart = new Date();
  if (bar) {
    bar.style.transition = "1s linear"
    intervalId.value = setInterval(() => {
      if (bar) {
        const durationPourcentage = new Date(new Date().getTime() - timeOnStart.getTime()).getSeconds();
        left = ((durationPourcentage / 30) * 100);
        bar.style.transform = `translateX(${left}%)`
      }
    }, 1000)
  }
}

const stopTimer = () => {
  clearInterval(intervalId.value);
  if (bar) {
    left = 0
    bar.style.transition = ".2s linear"
    bar.style.transform = `translateX(${left}%)`
  }
}
</script>

<template>
  <div class="progress-bar">
    <div id="bar"></div>
  </div>
</template>

<style scoped lang="scss">
.progress-bar {
  width: 100%;
  height: .25rem;
  background-color: var(--secondary-color);
  border-radius: var(--border-radius-xl);
  margin: .5rem 0;
  position: relative;
  overflow: hidden;

  #bar {
    // transition: 1s linear;
    z-index: 10;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    top: 0;
    left: -100%;
    background-color: var(--primary-color);
    border-radius: var(--border-radius-xl);
  }
}
</style>