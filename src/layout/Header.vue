<script setup lang="ts">
import logo from '../assets/logo.svg'
</script>

<template>
  <header class="px-5 xl:px-0">
    <div class="header-content flex w-full h-full">
      <div
        class="header-logo flex items-center text-white gap-3 cursor-pointer"
        v-on:click="() => $router.push('/')"
      >
        <img :src="logo" alt="logo-spoutify" />
        <p class="font-bold">Spoutify</p>
      </div>
      <nav class="flex w-full justify-end items-center gap-16 pl-10">
        <p @click="() => $router.push('/recommendations')">Recommendations</p>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: var(--header-height);
  transition: 0.1s ease-in-out;
  z-index: 1000;

  .header-content {
    max-width: var(--max-screen-width);
    margin: 0 auto;
  }

  .header-logo {
    width: 10rem;
    height: 100%;

    img {
      height: calc(var(--header-height) - 1rem);
      width: var(--header-height) - 1rem;
    }
  }

  nav {
    p {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
