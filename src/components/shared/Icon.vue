<template>
  <svg
    :stroke="small ? null : 'currentColor'"
    :fill="small ? 'currentColor': 'none'"
    :class="['icon', `text-${color}`, { small }]"
    :viewBox="small ? '0 0 20 20' : '0 0 24 24'"
    role="img"
  >
    <!-- TODO: Add accessible elements, title and desc -->
    <path
      v-for="(path, i) in paths"
      :key="i"
      :fill-rule="small ? 'evenodd' : null"
      :stroke-linecap="small ? null : 'round'"
      :stroke-linejoin="small ? null : 'round'"
      :stroke-width="small ? null : '2'"
      :d="path"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { filledIcons, outlineIcons } from './icon-paths'

export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'gray-800'
    },
    name: {
      type: String,
      required: true
    },
    small: Boolean
  },

  setup (props) {
    const paths = computed(() => props.small ? filledIcons[props.name] : outlineIcons[props.name])

    return { paths }
  }
})
</script>

<style scoped>
  .icon {
    @apply h-6 w-6;
  }

  .small {
    @apply h-5 w-5;
  }
</style>
