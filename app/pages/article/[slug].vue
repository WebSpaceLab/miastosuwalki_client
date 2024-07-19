<script setup>
  const {slug } = useRoute().params
  const { $article } = useNuxtApp()
const {show } = storeToRefs($article)

  definePageMeta({
    layout: "default",
  })

  onMounted(async () => {
    await $article.getArticle(slug)
  })

  useSeoMeta({
      title: () => show.value.data.title,
      description: () => show.value.data.description,
  })
</script>

<template>
  <div class="relative w-screen min-h-screen container mx-auto flex flex-col">
    <!--Article-->
    <div
      class="relative rounded-lg h-20 sm:h-30 md:h-40 lg:h-60 xl:h-80 2xl:h-96 mb-8"
      v-if="$article.advertisements.top.length != 0"
    >
      <x-slider-carousel
        :items="$article.advertisements.top"
        :indicator="false"
        :interval-time="7000"
      >
        <template
          v-for="(item, index) in $article.advertisements.top"
          :key="index"
          #[`slide-${index}`]
        >
          <nuxtLink
            @mouseover="isTooltip = true"
            @mouseleave="isTooltip = false"
            class="w-auto relative h-full flex justify-center items-center"
            :href="item.targetUrl"
            rel="nofollow"
            alt="ads tobar"
            target="_blank"
          >
            <img
            :src="item.previewUrl"
            :alt="item.name"
            class="w-auto h-full object-cover rounded-lg"
            />

            <x-tooltip
            class="hidden lg:flex top-0 left-0 w-[80%] text-white text-sm lg:text-lg rounded-lg p-2"
            v-if="item.description && isTooltip"
            :text="item.description"
            />
          </nuxtLink>
        </template>
      </x-slider-carousel>
    </div>

    <div class="relative w-full h-full flex flex-col lg:flex-row justify-end lg:space-x-5 overflow-hidden">
      <div class="w-full">

        <transition 
          enter-active-class="ease-out duration-600"
          enter-from-class="opacity-0 blur-100"
          enter-to-class="opacity-100 blur-0"
          leave-active-class="transition ease-in duration-300"
          leave-from-class="opacity-100 blur-0"
          leave-to-class="opacity-0 blur-100"
        >
          <x-section-article
            v-if="!$article.isLoading"
            :article="$article.show?.data"
          />

          <div v-else class="w-full h-120 flex justify-center items-center">
            <spinner :loading="$article.isLoading" class="w-20 h-20" />
          </div>
        </transition>
      </div>

      <SidebarArticle />
    </div>
</div>
</template>
