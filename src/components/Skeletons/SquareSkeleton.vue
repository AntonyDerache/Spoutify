<script setup lang="ts">
defineProps({
  borderRadius: { type: String, default: "0" }
})
</script>

<template>
  <div class="square-skeleton" :style="`border-radius: ${borderRadius}`" ></div>
</template>

<style scoped lang="scss">
.square-skeleton {
  animation: bounce 1s infinite;
  background-color: rgba($color: #3a1c5d, $alpha: 1);
  height: 100%;
  width: 100%;
}
</style>