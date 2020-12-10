<template>
  <section class="component-page">
    <pre>{{ component }}</pre>
    <header class="component-page-header">
      <EditableField
        v-model="component.name"
        font-size="3xl"
        placeholder="component name"
        resize
        @input="updateComponent"
      />
    </header>

    <table class="component-table">
      <thead>
        <tr>
          <th />
          <th>
            Name
          </th>
          <th
            v-for="field in component.fields"
            :key="field.id"
            class="group"
          >
            <div class="component-header">
              <span>{{ field.name }}</span>

              <div class="transition duration-200 opacity-0 group-hover:opacity-100">
                <IconButton
                  name="trash"
                  color="red-600"
                />
              </div>
            </div>
          </th>
          <th>
            <IconButton
              name="plus-circle"
              @click="isAddComponentFieldModalOpen = true"
            />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="{ values, name, id } in component.records"
          :key="id"
          class="group"
        >
          <td>
            <!-- TODO: Implement reordering -->
            <IconButton name="dots-vertical" />
          </td>

          <td>
            TODO: Implement field for adding record name
            {{ name }}
          </td>

          <td
            v-for="field in component.fields"
            :key="field.id"
            class="component-data"
          >
            TODO: Implement editing data
            {{ values }}
            <!-- <input
              v-model="data[field.name]"
              class="row-input"
              @input="updateComponentData(id, data)"
            > -->
          </td>

          <td>
            <div class="transition duration-200 opacity-0 group-hover:opacity-100">
              <IconButton
                name="trash"
                color="red-600"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- TODO: Add fade-in-out animation -->
    <FilledButton
      with-icon
      class="add-row-button"
      @click="createComponentRecord"
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
import { getComponentById, updateComponentMutation, createComponentRecordMutation } from '@/api'
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

    const createComponentRecord = async () => {
      const componentRecord = await createComponentRecordMutation({ componentId: component.value.id })

      component.value.records.push(componentRecord)
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
      createComponentRecord,
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

  .component-table {
    @apply table-auto;
  }

  .component-header {
    @apply flex items-center justify-between px-2;
  }

  .component-data {
    @apply border;
  }

  tr:nth-child(2n) .component-data {
    @apply bg-blue-100;
  }

  .row-input {
    @apply bg-transparent p-2;
  }

  .add-row-button {
    @apply m-2;
  }
</style>
