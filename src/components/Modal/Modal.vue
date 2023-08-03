<script setup lang="ts">
defineProps({
  isOpen: { type: Boolean, required: true, default: false },
  onClose: { type: Function, required: false }
})
</script>

<template>
  <div v-if="isOpen" class="modal-container">
    <div class="black-background cursor-pointer" @click="onClose ? onClose() : null"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-container {
  z-index: 10;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgb(black, .3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.black-background {
  position: absolute;
  width: 100vw;
  height: 100vh;
}

.modal-content {
  z-index: 11;
  background-color: var(--secondary-color);
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--primary-color);
  padding: 2rem;
  max-height: 50%;
  overflow: scroll;
}
</style>