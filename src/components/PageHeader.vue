<template>
  <header class="header">
    <router-link to="/">Archivist</router-link>

    <button @click="$emit('toggle-nav')">Toggle nav</button>
  </header>
</template>

<style scoped>
  .header {
    @apply h-12 bg-gray-300;
  }
</style>
