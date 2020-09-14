<template>
  <router-link :to="route.to">
    <div class="nav-item">
      <Icon
        class="nav-icon"
        :name="route.iconName"
      />

      <span>{{ route.label }}</span>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { NavRoute } from '@/types'

export default defineComponent({
  props: {
    route: {
      type: Object as PropType<NavRoute>,
      required: true
    }
  }
})
</script>

<style scoped>
  .nav-item {
    @apply flex items-center p-2 pr-4;
  }

  .nav-item:hover {
    @apply bg-gray-200;
  }

  .nav-icon {
    @apply m-2;
  }
</style>
