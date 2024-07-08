<script setup lang="ts">
const {slug } = useRoute().params;
const { $article } = useNuxtApp();

definePageMeta({
  layout: "reading",
})

onMounted(async () => {
  await $article.getArticle(slug);
});
</script>

<template>
  <div class="w-full">
    <x-section-article
    v-if="!$article.isLoading"
    :article="$article.show?.data"
    />

    <div v-else class="w-full flex justify-center items-start">
      <spinner w-full :loading="$article.isLoading" />
    </div>
</div>
</template>
