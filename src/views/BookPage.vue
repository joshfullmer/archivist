<template>
  <section class="book-page">
    <div class="back-container group">
      <IconButton
        name="arrow-left"
        @click="goToBooks"
      />

      <span class="back-label group-hover:opacity-100 group-hover:translate-x-0">Back to library</span>
    </div>

    <header class="book-header">
      <EditableField
        v-model="book.title"
        font-size="3xl"
        placeholder="untitled"
        resize
        @input="createOrUpdateBook"
      />

      <IconButton
        v-if="!isBookNewRoute"
        name="trash"
        color="red-600"
        @click="deleteCurrentBook"
      />
    </header>

    <div>
      <QuillEditor
        v-model="book.synopsis"
        placeholder="book synopsis"
      />
    </div>

    <div class="chapters">
      <ChapterCard
        v-for="chapter in book.chapters"
        :key="chapter.id"
        :chapter="chapter"
      />

      <IconButton
        v-if="!isBookNewRoute"
        name="plus-circle"
        @click="createChapterForBook"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import debounce from 'lodash.debounce'
import router from '../router'

import ChapterCard from '../components/ChapterCard.vue'

import { getBookById, createBook, deleteBook, updateBook, createChapter } from '@/api'
import { Book, Chapter } from '@/types'

import { INPUT_DELAY } from '../constants/delays'

export default defineComponent({
  components: { ChapterCard },

  async setup () {
    const book = ref<Book>({} as Book)
    const { currentRoute } = router
    const isBookNewRoute = computed(() => currentRoute.value.name === 'book.new')

    const createOrUpdateBook = debounce(async () => {
      if (!isBookNewRoute.value) {
        updateBook(book.value)
      } else {
        book.value = await createBook(book.value)
        router.replace({ name: 'book.edit', params: { id: book.value.id } })
      }
    }, INPUT_DELAY)

    const deleteCurrentBook = async () => {
      await deleteBook(book.value.id)
      router.push({ name: 'books' })
    }

    const createChapterForBook = async () => {
      const { id } = await createChapter({
        bookId: book.value.id,
        chapter: {} as Chapter
      })
      router.push({ name: 'chapter.edit', params: { id } })
    }

    const goToBooks = () => {
      router.push({ name: 'books' })
    }

    watch(() => book.value.synopsis, () => createOrUpdateBook())

    if (!isBookNewRoute.value) {
      const { id } = currentRoute.value.params
      book.value = await getBookById(id as string)
    }

    return {
      book,
      createOrUpdateBook,
      createChapterForBook,
      deleteCurrentBook,
      goToBooks,
      isBookNewRoute
    }
  }
})
</script>

<style lang="scss" scoped>
  @import "~quill/dist/quill.core.css";

  .book-page {
    @apply p-4 overflow-y-auto;
  }

  .back-container {
    @apply flex items-center gap-2 pb-1;
  }

  .back-label {
    @apply
      transition
      duration-500
      ease-in-out
      opacity-0
      transform
      translate-x-4
      italic
      text-sm
      text-gray-500
      font-hairline;
  }

  .book-header {
    @apply flex items-center justify-between;
  }

  .chapters {
    @apply flex flex-wrap gap-2 items-center;
  }
</style>
