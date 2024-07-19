<script setup>
  useHead({
    title: "Portal Internetowy Miasto Suwałki",
    link: [
      { rel: "icon",  href: "https://miastosuwalki.pl/favicon.ico" }
    ],

    meta: [
      {
         name: "viewport", 
         content: "width=device-width, initial-scale=1" 
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "description",
        content: "Odkryj urok Miasta Suwałki online – Twoje źródło lokalnych informacji i inspiracji!",
      },
      {
        name: "keywords",
        content: "Miasto Suwałki, Suwałki, inspiracje, informacje, powiat suwalski, Historia Suwałki, Kultura Suwałki, Wydarzenia Suwałki,  Region suwalskim, Suwalszczyzna, Podlasie ",
      },
    ],
  })

  const { $general, $metaTags, $social, $categories, $homepage, $contact } = useNuxtApp()

  let { cookiesEnabledIds } = useCookieControl()

  onMounted(async () => {
    $general.isLoading = true;
    try {
      await $general.get();
      await $metaTags.get();
      await $social.get();
      await $homepage.get();
      await $categories.getActiveCategories();
      await $contact.get();
    } catch (error) {
      console.error(error);
    } finally {
      $general.isLoading = false;
    }
  });

  watch(() => cookiesEnabledIds.value, async (current, previous) => {
      if (!previous?.includes('ga') && current?.includes('ga')) {
        window.location.reload() 
      }
      window.location.reload() 
    }, { deep: true },
  )
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <x-toast />
    <CookieControl locale="pl" />
  </div>
</template>

<style>
  /* .page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from {
  transform: translateY(100%);
  filter: blur(64px);
}

  .page-leave-to {
  transform: translateX(-100%);
  filter: blur(64px);
} */

  /* .layout-enter-active,
.layout-leave-active {
  transition: all 0.3s;
}

.layout-enter-from {
  transform: translateX(-100%);
  filter: blur(64px);
}

.layout-leave-to {
  transform: translateX(100%);
  filter: blur(64px);
} */
</style>
