<script setup lang="ts">
const props = defineProps({
  icon: String,
  size: { type: String, default: 'md' },
  iconSize: { type: String, default: 'lg' },
  onClick: Function,
})

const handleClick = () => {
  if (props.onClick) {
    props.onClick();
  }
}

</script>

<template>
  <button :class="`flex gap-2 justify-center items-center ${size}`">
    <font-awesome-icon class="cursor-pointer" :size="iconSize" :icon="icon" @click="handleClick" />
  </button>
</template>

<style lang="scss" scoped>
button {
  border: 1px solid transparent;
  border-radius: 100%;
  color: var(--secondary-color);
  transition: .1s ease-in-out;
  background-color: var(--primary-color);

  &.sm {
    width: 1rem;
    height: 1rem;
  }

  &.md {
    width: 2.5rem;
    height: 2.5rem;
  }

  &.lg {
    width: 4rem;
    height: 4rem;
  }

  &.xl {
    width: 6rem;
    height: 6rem;
  }

  &:hover {
    border-color: var(--primary-color);
    background-color: transparent;
    color: var(--primary-color);
    transition: .1s ease-in-out;
  }
}
</style>