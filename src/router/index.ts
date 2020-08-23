import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import BooksPage from '../views/BooksPage.vue'
import BookPage from '../views/BookPage.vue'
import Characters from '../views/Characters.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/books',
    name: 'Books',
    component: BooksPage
  },
  {
    path: '/books/:id',
    name: 'Book',
    component: BookPage
  },
  {
    path: '/characters',
    name: 'Characters',
    component: Characters
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
