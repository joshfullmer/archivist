<template>
  <PageHeader @toggle-nav="toggleNav" />
  <div class="content">
    <MainNav :open="showNav" />

    <PageMain />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import PageHeader from '../components/app/PageHeader.vue'
import MainNav from '../components/app/MainNav.vue'
import PageMain from '../components/app/PageMain.vue'

export default defineComponent({
  name: 'App',
  components: { PageHeader, MainNav, PageMain },
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
  .content {
    @apply flex flex-1 overflow-hidden;
  }
</style>
