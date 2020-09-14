<template>
  <button class="text-button">
    <slot />
  </button>
</template>

<style scoped>
  .text-button {
    @apply flex items-center gap-2 px-4 py-2 rounded;
  }

  .text-button:hover {
    @apply bg-gray-100;
  }

  .text-button:active {
    @apply bg-gray-200;
  }
</style>
