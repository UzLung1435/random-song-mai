import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MusicListView from '@/views/MusicListView.vue'
import MusicCard from '@/components/MusicCard.vue'
import RandomView from '@/views/RandomView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/songLists',
      name: 'songLists',
      component: MusicListView,
    },
    {
      path: '/test',
      name: 'test',
      component: MusicCard,
    },
    {
      path: '/random',
      name: 'random',
      component: RandomView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    }
  ],
})

export default router
