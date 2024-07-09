<script setup lang="ts">
defineProps({
  label: String,
  icon: String,
  onRemove: Function,
});
</script>

<template>
  <span :class="`badge flex items-center ${onRemove ? 'padding-xl' : ''}`">
    <p v-if="label" class="font-bold uppercase">{{ label }}</p>
    <font-awesome-icon v-if="icon" class="cursor-pointer" size="lg" :icon="icon" />
    <font-awesome-icon
      v-if="onRemove"
      class="icon"
      icon="xmark"
      size="lg"
      @click="() => (onRemove ? onRemove(label) : null)"
    />
  </span>
</template>

<style scoped lang="scss">
.badge {
  height: 2.5rem;
  background-color: var(--primary-color);
  border-radius: 20px;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  color: white;
  position: relative;
  text-align: center;
  vertical-align: middle;

  p {
    border-bottom: 1px solid transparent;
  }

  &.padding-xl {
    padding-right: 2rem;
  }

  .icon {
    position: absolute;
    right: 10px;
    transition: 0.2s ease-in-out;

    &:hover {
      transition: 0.2s ease-in-out;
      transform: rotate(90deg);
    }
  }
}
</style>
