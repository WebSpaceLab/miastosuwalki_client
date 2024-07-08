<script setup></script>

<template>
  <div class="w-screen relative min-h-screen box-border font-sans bg-background-light dark:bg-background-dark text-basic-light dark:text-basic-dark">
    <div v-if="!$general.isLoading" class="flex flex-col justify-start items-center">
      <span
        class="animate-spin fixed -right-40 -top-40 w-130 h-130 dark:bg-gradient-to-r dark:from-indigo-500 from-10% dark:via-sky-500 via-30% dark:to-emerald-500 to-90% rounded-full blur-160"
      />
      <header
        id="main-header"
        class="relative z-50 lg:relative box-border transition-all duration-500"
      >
        <slot name="header" />
      </header>

      <main
        class="w-full h-full box-border relative flex justify-center items-start duration-500"
      >
        <slot name="main" />
      </main>

      <footer class="relative w-full">
        <slot name="footer" />
      </footer>
    </div>

    <div
      v-else
      class="w-full relative h-screen flex justify-start items-center"
    >
      <SpinnerBear :loading="$general.isLoading" class="z-10" />
    </div>

    <slot name="addons" />
  </div>
</template>
