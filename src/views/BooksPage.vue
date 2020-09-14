<template>
  <Suspense>
    <template #default>
      <header class="books-page-header">
        <span>Your Books</span>

        <IconButton
          name="plus-circle"
          @click="createBook"
        />
      </header>

      <section class="books">
        <BookCard
          v-for="(book, i) in books"
          :key="i"
          :book="book"
        />
      </section>
    </template>

    <template #fallback>
      <Spinner />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import router from '../router'

import BookCard from '../components/BookCard.vue'
import { getBooks } from '@/api'
import { Book } from '@/types'

export default defineComponent({
  components: { BookCard },

  async setup () {
    const books = ref<Book[]>([])

    books.value = await getBooks()

    const createBook = () => {
      router.push({ name: 'book.new' })
    }

    return {
      books,
      createBook
    }
  }
})
</script>

<style scoped>
  .books-page-header {
    @apply flex justify-between items-center mx-4 my-2;
  }

  .books {
    @apply p-12 pt-1 flex flex-wrap items-stretch overflow-y-scroll;
    gap: 1rem;
  }
</style>
