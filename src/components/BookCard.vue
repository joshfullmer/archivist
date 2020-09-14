<template>
  <router-link
    :to="to"
    class="book-container"
  >
    <div class="book">
      <div class="back" />
      <div class="page page6" />
      <div class="page page5" />
      <div class="page page4">
        <span
          class="title"
          :title="book.title"
        >{{ book.title }}</span>
      </div>
      <div class="page page3" />
      <div class="page page2" />
      <div class="page page1" />
      <div class="front">
        <span
          class="title"
          :title="book.title"
        >{{ book.title }}</span>
        <!-- <em class="word-count">{{ book.wordCount }} words</em> -->
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
    const to = { name: 'book.edit', params: { id: props.book.id } }

    return { to }
  }
})
</script>

<style lang="scss" scoped>
  .title {
    @apply px-2 w-full text-center font-semibold truncate;
  }

  .book {
    @apply relative h-64;
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
    @apply flex flex-col items-center justify-between font-serif pt-4;

    .word-count {
      @apply text-xs font-light;
    }
  }

  .page4 {
    @apply flex justify-center pt-4;
  }

  .book-container {
    width: 32%;

    &:nth-child(5n + 1) {
      .front, .back {
        @apply bg-gradient-to-tl from-indigo-300 via-indigo-200 to-teal-300;
      }
    }

    &:nth-child(5n + 2) {
      .front, .back {
        @apply bg-gradient-to-tl from-pink-300 via-red-300 to-orange-300;
      }
    }

    &:nth-child(5n + 3) {
      .front, .back {
        @apply bg-gradient-to-tl from-green-300 via-green-200 to-yellow-300;
      }
    }

    &:nth-child(5n + 4) {
      .front, .back {
        @apply bg-gradient-to-tl from-yellow-300 via-orange-200 to-orange-300;
      }
    }

    &:nth-child(5n) {
      .front, .back {
        @apply bg-gradient-to-tl from-blue-400 via-blue-200 to-gray-300;
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
      box-shadow: 0 .5em 1em 0 rgba(0, 0, 0, .2);
    }

    .front {
      transform: rotateY(-170deg);
    }

    .page1 {
      transform: rotateY(-160deg);
    }

    .page2 {
      transform: rotateY(-155deg);
    }

    .page3 {
      transform: rotateY(-150deg);
    }

    .page4 {
      transform: rotateY(-16deg);
    }

    .page5 {
      transform: rotateY(-12deg);
    }

    .page6 {
      transform: rotateY(-8deg);
    }

    .back {
      transform: rotateY(-4deg);
    }
  }
</style>
