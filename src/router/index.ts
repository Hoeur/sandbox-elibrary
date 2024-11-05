import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Result from '../views/Result.vue'
import UpdateLaws from '../views/UpdateLaws.vue'
import Document from '../views/Document.vue'
import PostNews from '../views/PostNews.vue'
import LawsRegister from '../views/LawsRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: Home
    },
    {
      path: '/result',
      name: 'result',
      component: Result
    },
    {
      path: '/document/:id',
      name: 'document',
      component: Document
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: () => import('../views/Notfound.vue')
    },
    {
      path: '/update-laws',
      name: 'updateLaws',
      component: UpdateLaws
    },
    {
      path: '/laws-register',
      name: 'lawsRegister',
      component: LawsRegister
    },
    {
      path: '/news',
      name: 'news',
      component: PostNews
    },
  ]
})

export default router
