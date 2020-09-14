<template>
  <section class="components-page">
    <header class="components-page-header">
      <span>Book Components</span>

      <IconButton
        name="plus-circle"
        @click="createComponent"
      />
    </header>

    <div class="components">
      <ComponentCard
        v-for="component in components"
        :key="component.id"
        :component="component"
      />
    </div>

    <CreateComponentModal
      :is-open="isCreateComponentModalOpen"
      @close="isCreateComponentModalOpen = false"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import ComponentCard from '../components/ComponentCard.vue'
import CreateComponentModal from '../components/CreateComponentModal.vue'
import { getComponents } from '../api'

export default defineComponent({
  components: { ComponentCard, CreateComponentModal },

  async setup () {
    const isCreateComponentModalOpen = ref(false)

    const components = await getComponents()

    const createComponent = () => {
      isCreateComponentModalOpen.value = true
    }

    return { components, createComponent, isCreateComponentModalOpen }
  }
})
</script>

<style scoped>
  .components-page {
    @apply p-4 overflow-y-auto;
  }

  .components-page-header {
    @apply flex justify-between items-center mx-4 my-2;
  }

  .components {
    @apply flex flex-wrap gap-2 items-center;
  }
</style>
