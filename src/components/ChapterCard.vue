<template>
  <router-link
    :to="to"
    class="chapter-card"
  >
    <div class="chapter">
      Chapter {{ chapter.number }} - {{ chapter.title }}
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Chapter } from '@/types'

export default defineComponent({
  props: {
    chapter: {
      type: Object as PropType<Chapter>,
      required: true
    }
  },

  setup (props) {
    const to = { name: 'chapter.edit', params: { id: props.chapter.id } }

    return { to }
  }
})
</script>

<style scoped>
  .chapter {
    @apply transition-shadow duration-200 flex p-4 bg-teal-100 rounded;
  }

  .chapter:hover {
    @apply shadow;
  }

  .chapter:active {
    @apply bg-teal-200;
  }
</style>
