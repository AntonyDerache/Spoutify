<script setup lang="ts">
defineProps({
  label: String,
  icon: String,
  size: { type: String, default: 'md' },
});
</script>

<template>
  <button :class="`flex gap-2 justify-center items-center ${size}`">
    <p>
      {{ label }}
    </p>
    <font-awesome-icon v-if="icon" class="cursor-pointer" size="lg" :icon="icon" />
  </button>
</template>

<style lang="scss" scoped>
button {
  border: 1px solid transparent;
  border-radius: 100px;
  height: 2.5rem;
  color: var(--secondary-color);
  transition: 0.1s ease-in-out;
  background-color: var(--primary-color);
  padding: 0 1rem;

  &.sm {
    min-width: 4rem;
  }

  &.md {
    min-width: 8rem;
  }

  &.lg {
    min-width: 10rem;
  }

  &.xl {
    min-width: 12rem;
    height: 3rem;
  }
}

button:hover {
  border-color: var(--primary-color);
  background-color: transparent;
  color: var(--primary-color);
  transition: 0.1s ease-in-out;
}
</style>
