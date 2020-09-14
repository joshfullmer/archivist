<template>
  <button
    class="button"
    :type="type"
  >
    <Icon
      :color="color"
      :name="name"
      :small="small"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
    small: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'button'
    }
  }
})
</script>

<style scoped>
  .button {
    @apply transition duration-200 flex p-2 w-auto rounded;
  }

  .button:hover {
    @apply bg-gray-100;
  }

  .button:active {
    @apply bg-gray-200;
  }
</style>
