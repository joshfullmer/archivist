<template>
  <router-link :to="to" class="book-container">
    <div class="book">
      <div class="back" />
      <div class="page page6" />
      <div class="page page5" />
      <div class="page page4">
        <span class="title">{{ book.title }}</span>
      </div>
      <div class="page page3" />
      <div class="page page2" />
      <div class="page page1" />
      <div class="front">
        <span class="title">{{ book.title }}</span>
        <em class="word-count">{{ book.wordCount }} words</em>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Book } from '../types/book'

export default defineComponent({
  props: {
    book: {
      type: Object as PropType<Book>,
      required: true
    }
  },
  setup (props) {
    const to = `/books/${props.book.id}`
    return { to }
  }
})
</script>

<style lang="scss" scoped>
  .title {
    @apply font-semibold antialiased;
  }

  .book {
    @apply relative h-64 flex items-end;
    transform-style: preserve-3d;
    backface-visibility: visible;
  }

  .front, .back, .page {
    @apply absolute h-full w-1/2 top-0 right-0 rounded-r-lg shadow-md;
    transform-style: preserve-3d;
    transform-origin: left center;
    transition: transform .25s ease-in-out, box-shadow .25s ease-in-out;
  }

  .front {
    @apply flex flex-col items-center font-serif pt-4;

    .title {
      @apply flex-1;
    }

    .word-count {
      @apply text-xs font-light;
    }
  }

  .page4 {
    @apply flex justify-center pt-4;
  }

  .book-container {
    &:nth-child(5n + 1) {
      .front, .back {
        @apply bg-gradient-to-tl from-indigo-400 via-indigo-300 to-teal-300;
      }
    }

    &:nth-child(5n + 2) {
      .front, .back {
        @apply bg-gradient-to-tl from-pink-400 via-red-400 to-orange-400;
      }
    }

    &:nth-child(5n + 3) {
      .front, .back {
        @apply bg-gradient-to-tl from-green-300 via-green-300 to-yellow-300;
      }
    }

    &:nth-child(5n + 4) {
      .front, .back {
        @apply bg-gradient-to-tl from-yellow-500 via-yellow-400 to-orange-300;
      }
    }

    &:nth-child(5n) {
      .front, .back {
        @apply bg-yellow-600 border border-yellow-800;
      }
    }
  }

  .page1, .page6 {
    @apply bg-gray-300;
  }

  .page2, .page5 {
    @apply bg-gray-200;
  }

  .page3 {
    @apply bg-gray-100;
  }

  .page4 {
    @apply bg-white;
  }

  .book:hover {
    .front, .page {
      box-shadow: 0 1em 3em 0 rgba(0, 0, 0, .2);
    }

    .front {
      transform: rotateY(-175deg);
    }

    .page1 {
      transform: rotateY(-170deg);
    }

    .page2 {
      transform: rotateY(-165deg);
    }

    .page3 {
      transform: rotateY(-160deg);
    }

    .page4 {
      transform: rotateY(-20deg);
    }

    .page5 {
      transform: rotateY(-15deg);
    }

    .page6 {
      transform: rotateY(-10deg);
    }

    .back {
      transform: rotateY(-5deg);
    }
  }
</style>
