<template>
  <section>
    {{ book.title }}
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import { Book } from '../types/book'

const book = reactive<Book>({
  id: '1',
  title: 'Title 1',
  wordCount: 1000
})

export default defineComponent({
  setup () {
    return { book }
  }
})
</script>
