<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { useRouter } from 'vue-router';

import Input from '@/components/Input/Input.vue';
import IconButton from '@/components/Buttons/IconButton.vue';
import Badge from '@/components/Badge/Badge.vue';
import Card from '@/components/Cards/Card.vue';
import genresData from '@/assets/genres.json';
import searchInAnArray from '@/tools/searchInAnArray';

const inputValue = ref('');
const router = useRouter();
const genres: Ref<string[]> = ref(genresData.list);
const selectedGenres: Ref<Array<string>> = ref([]);

watch(inputValue, (newV) => {
  if (newV.length > 0) {
    genres.value = searchInAnArray(inputValue.value, genresData.list);
  } else {
    genres.value = genresData.list;
  }
});

const selectGenre = (genre: string) => {
  const indexGenre = selectedGenres.value.findIndex((elem) => elem === genre);
  if (indexGenre === -1) {
    if (selectedGenres.value.length >= 5) {
      return;
    }
    selectedGenres.value.push(genre);
  } else {
    selectedGenres.value.splice(indexGenre, 1);
  }
};

const removeASelectedGenre = (badgeLabel: string) => {
  const indexGenre = selectedGenres.value.findIndex((elem) => elem === badgeLabel);
  if (indexGenre !== -1) {
    selectedGenres.value.splice(indexGenre, 1);
  }
};

const goToRecommendations = () => {
  let queryParams = '';
  selectedGenres.value.forEach((element) => { queryParams = queryParams.concat(`${element},`); });
  queryParams = queryParams.slice(0, -1);
  router.push(`/recommendations/${queryParams}`);
};
</script>

<template>
  <section class="w-full flex justify-center items-center flex-col padding-section">
    <div class="input-container">
      <Input v-model:value="inputValue" placeholder="Find a genre" />
    </div>
    <div class="flex w-full py-4 md:py-8 gap-4 flex-wrap">
      <IconButton
        v-if="selectedGenres.length > 0"
        class="white-color"
        icon="paper-plane"
        @click="goToRecommendations"
      />
      <div v-for="selectedGenre in selectedGenres" :key="selectedGenre">
        <Badge :label="selectedGenre" :onRemove="removeASelectedGenre" />
      </div>
    </div>
    <div v-if="genres.length === 0" class="absolute top-1/2">
      <p class="text-2xl">There is no matching genres</p>
    </div>
    <ul class="w-full justify-center">
      <li v-for="genre in genres" :key="genre" class="flex justify-center">
        <Card
          :label="genre"
          :isSelected="selectedGenres.includes(genre)"
          @click="() => selectGenre(genre)"
        />
      </li>
    </ul>
  </section>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: auto;
  grid-gap: 2rem;

  @media (min-width: 320px) {
    grid-template-columns: auto auto;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(210px, max-content));
  }

  @media (min-width: 1024px) {
    grid-gap: 2.5rem;
    padding: 1rem;
  }
}

.white-color {
  color: white;
}
</style>
