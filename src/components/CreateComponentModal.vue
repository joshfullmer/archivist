<template>
  <Modal
    :is-open="isOpen"
    @close="onClose"
  >
    <form
      class="create-component-modal"
      @submit.prevent="handleCreate"
    >
      <span>Create Component</span>

      <InputField
        v-model="componentName"
        label="Component name"
      />

      <FilledButton
        type="submit"
        class="create-component-button"
      >
        Create
      </FilledButton>
    </form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import router from '@/router'
import { createComponent } from '@/api'

export default defineComponent({
  props: {
    isOpen: Boolean
  },

  emits: ['close'],

  setup (props, { emit }) {
    const componentName = ref('')

    const onClose = () => emit('close')

    const handleCreate = async () => {
      if (!componentName.value) {
        // TODO handle error
      } else {
        const component = await createComponent(componentName.value)

        emit('close')
        router.push({ name: 'component', params: { id: component.id } })
      }
    }

    return { componentName, handleCreate, onClose }
  }
})
</script>

<style scoped>
  .create-component-modal {
    @apply flex flex-col items-start px-8 py-4 gap-4;
  }

  .create-component-button {
    @apply self-end;
  }
</style>
