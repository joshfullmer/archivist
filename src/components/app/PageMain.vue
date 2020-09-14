<template>
  <main class="main">
    <Suspense>
      <template #default>
        <router-view />
      </template>

      <template #fallback>
        <Spinner />
      </template>
    </Suspense>
  </main>
</template>

<style scoped>
  .main {
    @apply flex flex-col flex-1 overflow-hidden;
  }
</style>
