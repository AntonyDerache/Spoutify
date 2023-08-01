<script setup lang="ts">
defineProps({
  label: String,
  isSelected: Boolean
})
</script>

<template>
  <div
    :class="`card flex items-center justify-center cursor-pointer ${
      isSelected ? 'isSelected' : ''
    }`"
  >
    <p>
      {{ label }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 12rem;
  height: 12rem;
  background-color: rgba(170, 124, 229, 0.3);
  border-radius: 15% 30% / 20% 30%;
  transition: 0.2s ease-in-out;

  &:hover,
  &.isSelected {
    background-color: rgba(170, 124, 229, 0.6);
    transform: scale(1.05, 1.05);
    transition: 0.2s ease-in-out;
    box-shadow: rgba(42, 10, 93, 0) 0px 0px 0px 2px inset,
      rgba(198, 166, 238, 0.4) 10px -10px 0px -3px;
  }

  p {
    padding: 0.5rem;
    font-size: 1.5rem;
    text-align: center;
  }
}
</style>
