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
  </header>
</template>

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
</style>
