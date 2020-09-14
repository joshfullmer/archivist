<template>
  <div class="text-area-field">
    <label
      v-if="label"
      :for="label"
    >{{ label }}</label>

    <textarea
      :name="label"
      :value="modelValue"
      @input="handleInput"
    />

    <slot name="description" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      required: true
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const handleInput = (e: Event) => {
      const { value } = (e.target as HTMLTextAreaElement)

      emit('update:modelValue', value)
    }

    return { handleInput }
  }
})
</script>

<style scoped>
  .text-area-field {
    @apply flex flex-col gap-1;
  }

  label {
    @apply text-xs text-gray-600 font-thin;
  }

  textarea {
    @apply resize-none px-2 py-1 border border-gray-300 rounded;
  }

  textarea:hover {
    @apply border-gray-500;
  }
</style>
