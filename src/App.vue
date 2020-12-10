<template>
  MAJOR TODO: USE ROUTE GUARDS FOR LOGGING IN
  <LoginPage v-if="!isAuthenticated" />
  <MainPage v-else />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

import LoginPage from './views/LoginPage.vue'
import MainPage from './views/MainPage.vue'

import { useAppState } from './state/app.state'
import { loadLocalStorage } from './utils/localStorage.util'

export default defineComponent({
  components: { LoginPage, MainPage },
  setup () {
    onMounted(() => {
      loadLocalStorage()
    // TODO: Add some sort of backend check for valid JWT on mounted
    })
    const { isAuthenticated, user } = useAppState()

    return { isAuthenticated, user }
  }
})
</script>
