<template>
  <fieldset class="input-field">
    <label
      v-if="label"
      :for="label"
    >{{ label }}</label>

    <input
      :ref="inputField"
      :name="label"
      :type="type"
      :value="modelValue"
      @input="handleInput"
    >
  </fieldset>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const inputField = ref<HTMLInputElement | null>(null)

    const handleInput = (e: KeyboardEvent) => {
      const { value } = (e.target as HTMLInputElement)

      emit('update:modelValue', value)
    }

    return {
      handleInput,
      inputField
    }
  }
})
</script>

<style scoped>
  .input-field {
    @apply flex flex-col gap-1;
  }

  label {
    @apply text-xs text-gray-600 font-thin;
  }

  input {
    @apply px-2 py-1 border border-gray-300 rounded;
  }

  input:hover {
    @apply border-gray-500;
  }
</style>
