<template>
  <header class="header">
    <IconButton
      name="menu"
      @click="$emit('toggle-nav')"
    />

    <router-link
      to="/"
      class="archivist"
    >
      <span>Archivist</span>
    </router-link>

    <FilledButton
      class="logout"
      @click="logout"
    >
      Logout
    </FilledButton>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useAppState } from '../../state/app.state'

export default defineComponent({
  emits: ['toggle-nav'],

  setup () {
    const logout = () => {
      const { setJwt } = useAppState()

      setJwt('')
    }

    return { logout }
  }
})
</script>

<style scoped>
  .header {
    @apply p-2 flex items-center shadow;
  }

  .archivist {
    @apply p-2 transition duration-200 ease-in-out;
  }

  .archivist:hover {
    @apply transform scale-105 font-semibold;
  }

  .logout {
    @apply ml-auto;
  }
</style>
