<template>
  <div class="app">
    <PageHeader @toggle-nav="toggleNav" />
    <div class="content">
      <PageNav v-if="showNav" />
      <PageMain />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import PageHeader from './components/PageHeader.vue'
import PageNav from './components/PageNav.vue'
import PageMain from './components/PageMain.vue'

export default defineComponent({
  name: 'App',
  components: { PageHeader, PageNav, PageMain },
  setup () {
    const showNav = ref(true)
    const toggleNav = () => { showNav.value = !showNav.value }

    return {
      showNav,
      toggleNav
    }
  }
})
</script>

<style scoped>
  .app {
    @apply h-screen font-sans;
  }

  .content {
    @apply h-full flex;
  }
</style>
