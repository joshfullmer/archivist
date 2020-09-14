<template>
  <div
    v-if="isOpenInternal"
    class="overlay"
    @click="overlayClick"
  >
    <div
      class="modal-contents"
      @click.stop
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  props: {
    isOpen: Boolean
  },

  emits: ['close'],

  setup (props, { emit }) {
    const isOpenInternal = ref(props.isOpen)

    watch(() => props.isOpen, () => { isOpenInternal.value = props.isOpen })

    const overlayClick = () => {
      isOpenInternal.value = false
      emit('close')
    }

    return { isOpenInternal, overlayClick }
  }
})
</script>

<style scoped>
  @keyframes pop {
    0% {
      transform: scale(.65);
    }

    100% {
      transform: scale(1);
    }
  }

  .overlay {
    @apply
      flex
      items-start
      justify-center
      absolute
      inset-0
      bg-black
      bg-opacity-25 ;
  }

  .modal-contents {
    @apply
      bg-white
      mt-8
      rounded
      shadow;
    animation: pop .2s ease-in-out;
  }
</style>
