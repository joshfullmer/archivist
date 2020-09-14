<template>
  <div ref="editorContainer" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Quill from 'quill'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    let editor: Quill
    const editorContainer = ref<Element | null>(null)

    onMounted(() => {
      if (!editorContainer.value) return
      editor = new Quill(editorContainer.value, {
        placeholder: props.placeholder
      })
      editor.on('text-change', () => emit('update:modelValue', editor.getText()))
      editor.setText(props.modelValue || '')
    })

    return { editorContainer }
  }
})
</script>

<style scoped>
  .editor {
    @apply font-sans;
  }
</style>
