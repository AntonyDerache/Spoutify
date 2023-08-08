<script setup lang="ts">
defineProps({
  height: { type: String, default: "1.25rem"}
})
</script>

<template>
  <div class="text-skeleton" :style="`height: ${height}`"></div>
</template>

<style scoped lang="scss">
.text-skeleton {
  animation: bounce 1s infinite;
  background-color: rgba($color: #3a1c5d, $alpha: 1);
  width: 100%;
  border-radius: var(--border-radius)
}
</style>