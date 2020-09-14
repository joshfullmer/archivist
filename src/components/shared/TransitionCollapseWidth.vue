<template>
  <transition
    name="slide"
    @before-enter="beforeEnter"
    @enter="enter"
    @before-leave="beforeLeave"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    let width: number

    const beforeEnter = (element: HTMLElement) => {
      element.style.marginLeft = `-${width}px`
    }

    const enter = (element: HTMLElement) => {
      setTimeout(() => {
        element.style.marginLeft = '0'
      }, 0)
    }

    const beforeLeave = (element: HTMLElement) => {
      element.style.marginLeft = '0'
    }

    const leave = (element: HTMLElement) => {
      setTimeout(() => {
        element.style.marginLeft = `-${element.offsetWidth}px`
        width = element.offsetWidth
      }, 0)
    }

    return {
      beforeEnter,
      enter,
      beforeLeave,
      leave
    }
  }
})
</script>

<style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 1s;
  }
</style>
