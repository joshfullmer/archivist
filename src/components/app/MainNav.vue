<template>
  <TransitionCollapseWidth>
    <nav
      v-show="open"
      class="side-nav"
    >
      <NavItem
        v-for="route in routes"
        :key="route.to"
        :route="route"
      />
    </nav>
  </TransitionCollapseWidth>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import NavItem from './NavItem.vue'

import { NavRoute } from '@/types'

export default defineComponent({
  components: { NavItem },
  props: {
    open: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const routes: NavRoute[] = [
      {
        to: '/books',
        label: 'Library',
        iconName: 'book-open'
      },
      {
        to: '/components',
        label: 'Components',
        iconName: 'puzzle'
      }
    ]

    return { routes }
  }
})
</script>

<style lang="scss" scoped>
  .side-nav {
    @apply py-2 w-auto shadow-inner bg-gray-100;
  }
</style>
