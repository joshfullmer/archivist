<template>
  <nav class="side-nav">
    <router-link to="/books">
      Books
    </router-link>

    <router-link to="/characters">
      Characters
    </router-link>
  </nav>
</template>

<style scoped>
  .side-nav {
    @apply w-20 bg-blue-400;
  }
</style>
