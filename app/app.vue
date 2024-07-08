<script setup lang="ts">
  const { $general, $metaTags, $social, $categories, $homepage, $contact } = useNuxtApp()

  const {
    cookiesEnabled,
    cookiesEnabledIds,
    isConsentGiven,
    isModalActive,
    moduleOptions,
  } = useCookieControl()

  console.log('App mounted: ',);
  onMounted(async () => {
    $general.isLoading = true;
    try {
      await $general.get();
      await $metaTags.get();
      await $social.get();
      await $categories.getActiveCategories();
      await $contact.get();
    } catch (error) {
      console.error(error);
    } finally {
      $general.isLoading = false;
    }

    if (cookiesEnabledIds.value?.includes('ccc')) {
      await $homepage.get();
    }
  });


  useHead({
    title: "Portal Internetowy Miasto Suwałki",
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "description",
        content:
          "Odkryj urok Miasta Suwałki online – Twoje źródło lokalnych informacji i inspiracji!",
      },
      {
        name: "keywords",
        content:
          "Miasto Suwałki, Suwałki, inspiracje, informacje, powiat suwalski, Historia Suwałki, Kultura Suwałki, Wydarzenia Suwałki,  Region suwalskim, Suwalszczyzna, Podlasie ",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Portal Internetowy Miasto Suwałki" },
      {
        property: "og:description",
        content:
          "Odkryj urok Miasta Suwałki online – Twoje źródło lokalnych informacji i inspiracji!",
      },
      { property: "og:url", content: "https://miastosuwalki.pl" },

      { property: "og:site_name", content: "Portal Internetowy Miasto Suwałki" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  })

  // example: react to a cookie being accepted
  watch(
    () => cookiesEnabledIds.value,
    async (current, previous) => {
      if (
        !previous?.includes('google-analytics') &&
        current?.includes('google-analytics')
      ) {
        // cookie with id `google-analytics` got added
        window.location.reload() // placeholder for your custom change handler
      }

      if (previous?.includes('ccc') && !current?.includes('ccc')) {

        window.location.reload()
      }

      if (!previous?.includes('ccc') && current?.includes('ccc')) {
        await $homepage.get();
      }
    },
    { deep: true },
  )
</script>

<template>
  <NuxtLayout>
    <NuxtPage />

    <x-toast />

    <CookieControl locale="en" />
  </NuxtLayout>
</template>

<style>
  /* .page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from {
  transform: translateY(100%);
  filter: blur(64px);
} */

  /* .page-leave-to {
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
