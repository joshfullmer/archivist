<template>
  <Modal
    :is-open="isOpen"
    @close="close"
  >
    <form
      class="add-component-field-modal"
      @submit.prevent="addComponentField"
    >
      <span>Add Component Field</span>

      <InputField
        v-model="fieldName"
        label="Field name"
      />

      <SelectField
        v-model="fieldType"
        label="Field type"
        :options="fieldTypeOptions"
      />

      <TextAreaField
        v-if="fieldType === 'select'"
        v-model="fieldOptions"
        label="Field options"
        description="Enter dropdown options, one per line"
      >
        <template #description>
          <span class="dropdown-description">Enter dropdown options, one per line</span>
        </template>
      </TextAreaField>

      <FilledButton
        type="submit"
        class="add-component-field-button"
      >
        Add
      </FilledButton>
    </form>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FieldType } from '@/types'
import { addComponentFieldMutation } from '@/api'

const fieldTypeOptions = [
  { label: 'Text', value: 'text' },
  { label: 'Dropdown', value: 'select' },
  { label: 'Checkbox', value: 'boolean' }
]

export default defineComponent({
  props: {
    componentId: {
      type: String,
      required: true
    },
    isOpen: Boolean
  },

  emits: ['add', 'close'],

  setup (props, { emit }) {
    const fieldName = ref('')
    const fieldType = ref<FieldType>('text')
    const fieldOptions = ref('')

    const close = () => emit('close')

    const reset = () => {
      fieldName.value = ''
      fieldType.value = 'text'
      fieldOptions.value = ''
    }

    const addComponentField = async () => {
      const options = fieldOptions.value.split('\n')

      const componentField = await addComponentFieldMutation({
        componentId: props.componentId,
        name: fieldName.value,
        ...(fieldType.value === 'select' && { options }),
        type: fieldType.value
      })

      emit('add', componentField)
      reset()
      close()
    }

    return {
      addComponentField,
      close,
      fieldName,
      fieldOptions,
      fieldType,
      fieldTypeOptions
    }
  }
})
</script>

<style scoped>
  .add-component-field-modal {
    @apply flex flex-col px-8 py-4 gap-4;
  }

  .add-component-field-button {
    @apply self-end;
  }

  .dropdown-description {
    @apply text-xs text-gray-600 font-thin;
  }
</style>
