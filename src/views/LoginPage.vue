<template>
  <form @submit.prevent="handleSubmit">
    <InputField
      v-model="username"
      label="Username"
    />
    <InputField
      v-model="password"
      label="Password"
      type="password"
    />
    <button type="submit">
      Submit
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { login } from '../api/auth'

export default defineComponent({
  setup () {
    const username = ref('')
    const password = ref('')

    const handleSubmit = () => {
      login(username.value, password.value)
    }

    return { username, password, handleSubmit }
  }
})
</script>
