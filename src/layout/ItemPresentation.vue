<script setup lang="ts"></script>

<template>
  <div class="flex m-auto items-center w-full gap-6 my-10 relative">
    <div class="absolute left-0 cursor-pointer" @click="() => $router.back()">
      <font-awesome-icon class="back-icon" icon="arrow-left" size="xl" />
    </div>
    <div class="w-1/2 flex items-center justify-end box">
      <slot name="img"></slot>
    </div>
    <div class="w-1/2">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.back-icon {
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 50%;
  padding: 0.25rem 0.25rem;
  width: 2rem;
  height: 2rem;
}
</style>
