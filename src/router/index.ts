import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/home/Home.vue'
import Recommendation from '@/pages/recommendations/Recommendation.vue'
import Recommendations from '@/pages/recommendations/Recommendations.vue'
import Albums from '@/pages/albums/Albums.vue'
import Artists from '@/pages/artists/Artists.vue'
import Tracks from '@/pages/tracks/Tracks.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/recommendations', name: 'Recommendations', component: Recommendations },
    { path: '/recommendations/:genre', name: 'Recommendation', component: Recommendation },
    { path: '/albums/:id', name: 'Album', component: Albums },
    { path: '/artists/:id', name: 'Artist', component: Artists },
    { path: '/tracks', name: 'Tracks', component: Tracks }
  ]
})

export default router
