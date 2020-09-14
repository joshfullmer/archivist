<template>
  <button
    class="filled-button"
    :class="{ 'with-icon': withIcon }"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    withIcon: Boolean
  }
})
</script>

<style scoped>
  .filled-button {
    @apply flex gap-2 w-auto px-4 py-2 bg-blue-500 rounded text-white;
  }

  .with-icon {
    @apply pl-2;
  }

  .filled-button:hover {
    @apply shadow;
  }

  .filled-button:active {
    @apply bg-blue-600;
  }
</style>
