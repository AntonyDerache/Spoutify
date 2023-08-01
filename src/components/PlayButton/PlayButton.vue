<script setup lang="ts">
defineProps({
  isPlaying: Boolean,
})
</script>

<template>
  <div class="play-button cursor-pointer mx-auto">
    <button class="logo">
      <font-awesome-icon v-if="isPlaying" icon="pause" size="lg"/>
      <font-awesome-icon class="play" v-else icon="play" size="lg"/>
    </button>
  </div>
</template>

<style scoped lang="scss">
.play-button {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid var(--primary-color);
  background-color: var(--primary-color);
  color: var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .logo {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    display: inline-block;

    .play {
      position: absolute;
      transform: translate(-40%, -50%);
      top: 50%;
      left: 50%;
    }
  }

  &:hover {
    border-color: var(--primary-color);
    background-color: transparent;
    color: var(--primary-color);
    transition: .1s ease-in-out;
  }
}
</style>