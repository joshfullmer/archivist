<template>
  <div class="select-field">
    <label
      v-if="label"
      :for="label"
    >{{ label }}</label>

    <div class="select">
      <select
        :name="label"
        :value="modelValue"
        @input="handleInput"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="chevron-down">
        <Icon
          name="chevron-down"
          small
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type Option = {
  name: string;
  value: string;
}

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
    options: {
      type: Array as PropType<Option[]>,
      required: true
    }
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const handleInput = (e: Event) => {
      const { value } = (e.target as HTMLSelectElement)

      emit('update:modelValue', value)
    }

    return { handleInput }
  }
})
</script>

<style scoped>
  .select-field {
    @apply flex flex-col gap-1;
  }

  .select {
    @apply inline-block relative;
  }

  label {
    @apply text-xs text-gray-600 font-thin;
  }

  select {
    @apply
      appearance-none
      px-2
      py-1
      w-full
      border
      border-gray-300
      rounded;
  }

  select:hover {
    @apply border-gray-500;
  }

  .chevron-down {
    @apply pointer-events-none absolute inset-y-0 right-0 flex items-center mx-2;
  }
</style>
