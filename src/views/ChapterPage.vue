<template>
  <section class="chapter-page">
    <div class="back-container group">
      <IconButton
        name="arrow-left"
        @click="goToBook"
      />

      <span class="back-label group-hover:opacity-100 group-hover:translate-x-0">Back to book</span>
    </div>

    <header class="chapter-header">
      <span class="chapter-number">Chapter </span>

      <EditableField
        v-model="chapter.number"
        font-size="3xl"
        placeholder="#"
        resize
        validator="[0-9]"
        @input="createOrUpdateChapter"
      />

      <span class="chapter-divider"> - </span>

      <EditableField
        v-model="chapter.title"
        font-size="3xl"
        placeholder="no title"
        resize
        @input="createOrUpdateChapter"
      />

      <IconButton
        class="delete-chapter-button"
        color="red-600"
        name="trash"
        @click="deleteCurrentChapter"
      />
    </header>

    <div>
      <QuillEditor
        v-model="chapter.epigraph"
        placeholder="chapter epigraph"
      />
    </div>

    <div>
      <QuillEditor
        v-model="chapter.content"
        placeholder="chapter content"
      />
    </div>

    <pre>{{ chapter }}</pre>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import debounce from 'lodash.debounce'

import router from '../router'
import { Chapter } from '@/types'
import { getChapterById, updateChapter, deleteChapter } from '@/api'

const inputDelay = 500

export default defineComponent({
  async setup () {
    const chapter = ref<Chapter>({} as Chapter)

    const { currentRoute } = router
    const isChapterNewRoute = computed(() => currentRoute.value.name === 'chapter.new')

    const createOrUpdateChapter = debounce(async () => {
      if (!isChapterNewRoute.value) {
        updateChapter(chapter.value)
      }
    }, inputDelay)

    const deleteCurrentChapter = async () => {
      await deleteChapter(chapter.value.id)
      router.push({ name: 'book.edit', params: { id: chapter.value.bookId } })
    }

    const goToBook = () => {
      router.push({ name: 'book.edit', params: { id: chapter.value.bookId } })
    }

    watch(() => chapter.value.epigraph, () => createOrUpdateChapter())
    watch(() => chapter.value.content, () => createOrUpdateChapter())

    if (!isChapterNewRoute.value) {
      const { id } = currentRoute.value.params
      chapter.value = await getChapterById(id as string)
    }

    return {
      chapter,
      createOrUpdateChapter,
      deleteCurrentChapter,
      goToBook
    }
  }
})
</script>

<style scoped>
  .chapter-page {
    @apply p-4 overflow-y-auto;
  }

  .back-container {
    @apply flex items-center gap-2;
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

  .chapter-header {
    @apply flex items-center gap-2;
  }

  .delete-chapter-button {
    @apply ml-auto;
  }

  .chapter-number,
  .chapter-divider {
    @apply text-3xl;
  }
</style>
