import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import BooksPage from '../views/BooksPage.vue'
import BookPage from '../views/BookPage.vue'
import ChapterPage from '../views/ChapterPage.vue'
import ComponentsPage from '../views/ComponentsPage.vue'
import ComponentPage from '../views/ComponentPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/books',
    name: 'books',
    component: BooksPage
  },
  {
    path: '/books/new',
    name: 'book.new',
    component: BookPage
  },
  {
    path: '/books/:id',
    name: 'book.edit',
    component: BookPage
  },
  {
    path: '/chapter/:id',
    name: 'chapter.edit',
    component: ChapterPage
  },
  {
    path: '/components',
    name: 'components',
    component: ComponentsPage
  },
  {
    path: '/components/:id',
    name: 'component',
    component: ComponentPage
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
