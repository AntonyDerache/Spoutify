<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';

const props = defineProps({
  isPlaying: { type: Boolean, default: false },
  hideIfNotPlaying: { type: Boolean, default: false },
});

let left = 0;
let timeOnStart = new Date();
const bar: Ref<HTMLElement | null> = ref(null);
const intervalId: Ref<number> = ref(0);

const moveTimer = () => {
  if (bar.value) {
    const durationPourcentage = new Date(new Date().getTime() - timeOnStart.getTime()).getSeconds();
    left = (durationPourcentage / 29) * 100;
    bar.value.style.transform = `translateX(${left}%)`;
  }
};

const startTimer = () => {
  timeOnStart = new Date();
  if (bar.value) {
    bar.value.style.transition = '1s linear';
    intervalId.value = setInterval(() => moveTimer(), 1000);
  }
};

const stopTimer = () => {
  clearInterval(intervalId.value);
  if (bar.value) {
    left = 0;
    bar.value.style.transition = '.2s linear';
    bar.value.style.transform = `translateX(${left}%)`;
  }
};

watch(
  () => props.isPlaying,
  (newVal) => {
    if (newVal) {
      startTimer();
    } else {
      stopTimer();
    }
  },
);
</script>

<template>
  <div :class="`progress-bar ${hideIfNotPlaying && !isPlaying ? 'hide' : ''}`">
    <div ref="bar" class="bar"></div>
  </div>
</template>

<style scoped lang="scss">
.progress-bar {
  width: 100%;
  height: 0.25rem;
  background-color: #5c3f61;
  border-radius: var(--border-radius-xl);
  margin: 0.5rem 0;
  position: relative;
  overflow: hidden;

  .bar {
    z-index: 10;
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    top: 0;
    left: -100%;
    background-color: white;
    background-color: var(--primary-color);
    border-radius: var(--border-radius-xl);
  }
}

.hide {
  visibility: hidden;
}
</style>
