<template>
  <router-link
    :to="to"
    class="component-card"
  >
    <div class="component">
      <span>{{ component.name }}</span>

      <span class="fields">{{ fieldNames }}</span>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BookComponent } from '@/types'

export default defineComponent({
  props: {
    component: {
      type: Object as PropType<BookComponent>,
      required: true
    }
  },

  setup (props) {
    const to = { name: 'component', params: { id: props.component.id } }

    const fieldNames = props.component.fields.map(field => field.name).join(', ')

    return { fieldNames, to }
  }
})
</script>

<style scoped>
  .component {
    @apply transition-shadow duration-200 flex flex-col p-4 bg-indigo-100 rounded;
  }

  .component:hover {
    @apply shadow;
  }

  .component:active {
    @apply bg-indigo-200;
  }

  .fields {
    @apply text-xs text-gray-700;
  }
</style>
