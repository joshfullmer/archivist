<template>
  <section class="component-page">
    <header class="component-page-header">
      <EditableField
        v-model="component.name"
        font-size="3xl"
        placeholder="component name"
        resize
        @input="updateComponent"
      />

      <IconButton
        name="plus-circle"
        @click="isAddComponentFieldModalOpen = true"
      />
    </header>

    <table class="component-data">
      <thead>
        <tr>
          <th
            v-for="field in component.fields"
            :key="field.id"
          >
            {{ field.name }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="{ data, id } in component.data"
          :key="id"
        >
          <td
            v-for="field in component.fields"
            :key="field.id"
          >
            <input
              v-model="data[field.name]"
              class="row-input"
              @input="updateComponentData(id, data)"
            >
          </td>
        </tr>
      </tbody>
    </table>

    <!-- TODO: Add fade-in-out animation -->
    <FilledButton
      with-icon
      class="add-row-button"
      @click="createComponentData"
    >
      <Icon
        name="plus"
        color="white"
      />
      Add row
    </FilledButton>

    <AddComponentFieldModal
      :component-id="component.id"
      :is-open="isAddComponentFieldModalOpen"
      @add="addComponentField"
      @close="isAddComponentFieldModalOpen = false"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import debounce from 'lodash.debounce'

import AddComponentFieldModal from '../components/AddComponentFieldModal.vue'
import { BookComponent, Data, BookComponentField } from '@/types'
import router from '@/router'
import { getComponentById, updateComponentMutation, createComponentDataMutation } from '@/api'
import { updateComponentDataMutation } from '@/api/components'
import { INPUT_DELAY } from '@/constants/delays'

export default defineComponent({
  components: { AddComponentFieldModal },

  async setup () {
    const component = ref<BookComponent>({} as BookComponent)

    const isAddComponentFieldModalOpen = ref(false)

    const updateComponent = debounce(() => {
      updateComponentMutation(component.value)
    }, INPUT_DELAY)

    const addComponentField = (componentField: BookComponentField): void => {
      component.value.fields.push(componentField)
    }

    const createComponentData = async () => {
      const componentData = await createComponentDataMutation({ componentId: component.value.id })

      component.value.data.push(componentData)
    }

    const updateComponentData = debounce((id: string, componentData: Data) => {
      updateComponentDataMutation({ id, componentData })
    }, INPUT_DELAY)

    const { currentRoute } = router
    const { id } = currentRoute.value.params
    component.value = await getComponentById(id as string)

    return {
      addComponentField,
      component,
      createComponentData,
      isAddComponentFieldModalOpen,
      updateComponent,
      updateComponentData
    }
  }
})
</script>

<style scoped>
  .component-page {
    @apply p-4 overflow-y-auto;
  }

  .component-page-header {
    @apply flex justify-between items-center;
  }

  .component-data {
    @apply table-auto;
  }

  th {
    @apply px-4 py-2;
  }

  td {
    @apply border px-4 py-2;
  }

  tr:nth-child(2n) {
    @apply bg-pink-100;
  }

  .row-input {
    @apply bg-transparent;
  }

  .add-row-button {
    @apply m-2;
  }
</style>
