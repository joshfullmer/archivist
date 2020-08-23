<template>
  <section class="books">
    <BookCard v-for="(book, i) in books" :key="i" :book="book" />
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import BookCard from '../components/BookCard.vue'

import { Book } from '../types/book'

const books = reactive<Book[]>([
  {
    id: '1',
    title: 'Title 1',
    wordCount: 2000
  },
  {
    id: '2',
    title: 'Title 2',
    wordCount: 1500
  },
  {
    id: '3',
    title: 'Title 3',
    wordCount: 3000
  },
  {
    id: '4',
    title: 'Title 4',
    wordCount: 2000
  },
  {
    id: '5',
    title: 'Title 5',
    wordCount: 1500
  },
  {
    id: '6',
    title: 'Title 6',
    wordCount: 3000
  },
  {
    id: '7',
    title: 'Title 7',
    wordCount: 2000
  },
  {
    id: '8',
    title: 'Title 8',
    wordCount: 1500
  },
  {
    id: '9',
    title: 'Title 9',
    wordCount: 3000
  },
  {
    id: '10',
    title: 'Title 10',
    wordCount: 2000
  },
  {
    id: '11',
    title: 'Title 11',
    wordCount: 1500
  },
  {
    id: '12',
    title: 'Title 12',
    wordCount: 3000
  },
  {
    id: '13',
    title: 'Title 13',
    wordCount: 2000
  },
  {
    id: '14',
    title: 'Title 14',
    wordCount: 1500
  },
  {
    id: '15',
    title: 'Title 15',
    wordCount: 3000
  }
])

export default defineComponent({
  components: { BookCard },

  setup () {
    return { books }
  }
})
</script>

<style scoped>
  .books {
    @apply w-full p-12 items-end grid grid-cols-3 gap-4 overflow-y-scroll;
  }
</style>
