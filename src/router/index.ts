import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home/Home.vue";
import Recommendation from "@/pages/Recommendations/Recommendation.vue";
import Recommendations from "@/pages/Recommendations/Recommendations.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: "Home", component: Home },
    { path: '/recommendations', name: "Recommendations", component: Recommendations },
    { path: '/recommendations/:genre', name: "Recommendation", component: Recommendation },
  ],
});

export default router;