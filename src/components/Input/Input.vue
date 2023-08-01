<script setup lang="ts">
defineProps({
  value: String,
  label: String,
  placeholder: String,
})
defineEmits(['update:value'])
</script>

<template>
  <input
    type="text"
    :value="value"
    @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
  />
</template>

<style lang="scss" scoped>
input {
  background-color: transparent;
  border: 1px solid rgb(112, 112, 112, .5);
  border-radius: var(--border-radius-lg);
  color: white;
  padding: 0 1.5rem;
  transition: .2s ease-in-out;
  width: 100%;
  height: 100%;

  &:hover {
    border-color: transparent;
    background-color: rgba(149, 149, 149, 0.2);
    transition: .2s ease-in-out;
  }

  &:focus {
    outline: none;
  }
}
</style>