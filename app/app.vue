<script setup>
const { $general, $metaTags, $social, $categories, $homepage, $contact } =
useNuxtApp()

onMounted(async () => {
  $general.isLoading = true;

  try {
    await $general.get();
    await $metaTags.get();
    await $social.get();
    await $categories.getActiveCategories();
    await $homepage.get();
    await $contact.get();
  } catch (error) {
    console.error(error);
  } finally {
    $general.isLoading = false;
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
});
</script>

<template>
  <NuxtLayout>
      <NuxtPage />
      <x-toast />
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
