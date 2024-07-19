<script setup>
definePageMeta({
  layout: "default",
});
</script>

<template>
  <div class="w-screen min-h-screen">

    <section-hero
      :town="$homepage.data.hero.town"
      :history="$homepage.data.hero.history"
      :technology="$homepage.data.hero.technology"
      :culture="$homepage.data.hero.culture"
      :sport="$homepage.data.hero.sport"
      :nature="$homepage.data.hero.nature"
      :ads="$homepage.data.advertisements"
      :loading="$homepage.isLoading"
    />

    <section-last-articles />
    
    <!--TODO Slider -->
    <div class="w-screen bg-slate-900 dark:bg-white">
      <section-last-articles-town />
    </div>

    <section-last-articles-history />
    
    <div class="w-screen bg-slate-900">
      <section-last-articles-nature />
    </div>

    <section-last-articles-culture />
    
    <section-last-articles-sport />
    
    <div class="w-screen bg-slate-900 dark:bg-white">
      <section-last-articles-technology />
    </div>

    <div class="w-screen bg-slate-900 dark:bg-background-dark">
      <section-about
        :about="$homepage.data.about"
        :loading="$homepage.isLoading"
      />
    </div>

    <div class="w-screen dark:bg-white">
      <section-partners :items="$homepage.data.partners" />
    </div>

    <!--
      <section-contact />
      
      <lazy-section-features />
      
      <lazy-section-team />
      
      <lazy-section-price-list />
      <section-movie />
      <section-google-reviews />
    -->

    <div
      class="hidden fixed bottom-5 right-18 z-50 lg:flex justify-center items-center space-x-5"
    >
      <x-btn-scroll-page
        :sectionIds="[
          'hero',
          'article-cards',
          'article-cards-town',
          'article-cards-history',
          'about',
          'partners',
          ''
        ]"
      />
    </div>
  </div>
</template>
