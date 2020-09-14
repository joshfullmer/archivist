<template>
  <input
    ref="editableInput"
    class="editable-field"
    :class="`text-${fontSize}`"
    :value="modelValue"
    :placeholder="placeholder"
    :type="type"
    @input="handleInput"
  >
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

import { resizeInput } from '../../utils/input.util'

export default defineComponent({
  props: {
    fontSize: {
      type: String,
      default: 'base'
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    resize: {
      type: Boolean
    },
    type: {
      type: String,
      default: 'text'
    },
    validator: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  setup (props, context) {
    const editableInput = ref<HTMLInputElement | null>(null)

    const handleInput = (e: KeyboardEvent) => {
      const { value } = (e.target as HTMLInputElement)

      const regex = RegExp(props.validator || '', 'g')
      if (value && !regex.test(value) && editableInput.value) {
        editableInput.value.value = ''
      } else {
        context.emit('update:modelValue', value)
      }

      if (editableInput.value && props.resize) resizeInput(editableInput.value, `text-${props.fontSize}`)
    }

    onMounted(() => {
      if (editableInput.value && props.resize) resizeInput(editableInput.value, `text-${props.fontSize}`)
    })

    return { editableInput, handleInput }
  }
})
</script>

<style scoped>
  .editable-field {
    @apply transition duration-200 border border-transparent rounded px-2;
  }

  .editable-field:hover {
    @apply border-gray-400;
  }

  .editable-field:placeholder-shown {
    @apply italic;
  }
</style>
