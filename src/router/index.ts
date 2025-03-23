import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameHomeView from '@/views/GameHomeView.vue'
import GameSelectCardView from '@/views/GameSelectCardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    { 
      path: '/game',
      component: GameHomeView },
    { 
      path: '/game/select',
      component: GameSelectCardView 
    },
  ],
})

export default router
