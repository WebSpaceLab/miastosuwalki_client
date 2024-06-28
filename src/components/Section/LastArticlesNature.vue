<script setup>

</script>

<template>
    <!-- ====== Cards Section Start -->
    <section id="article-cards-nature" class="w-full container mx-auto px-10 relative flex flex-col justify-center items-center py-6 lg:pt-20 box-border">
        <header class="w-full mb-6 lg:mb-10 flex flex-col box-border">
            <div class="mb-1 w-full bg-lime-400 flex justify-center items-center rounded-t-lg">
                <h2 class="text-2xl m-0 text-background-light dark:text-background-dark uppercase font-extrabold">Natura</h2>
            </div>

            <span class="w-full border border-solid border-b-1 border-lime-400"/>
        </header>

        <div class="relative w-full h-full hidden lg:grid md:grid-cols-3 lg:grid-cols-4  lg:grid-rows-2 gap-6 box-border">            
            <div data-aos="zoom-in"  data-aos-offset="0" data-aos-duration="500" class=" sm:row-span-2 sm:col-span-2 h-56 sm:h-118">
                <CardArticle :article="$homepage.data.nature.first" :loading="$homepage.data.nature.first.isLoading" >
                    <template #decoration>
                        <span class="absolute hidden lg:flex -left-5 -top-5 z-[-1]">
                            <DecorationDots color="#a3e635" />
                        </span>
                    </template>
                </CardArticle>
            </div>

            
            <div v-for="(article, index) in $homepage.data.nature.last" :key="index" class=" h-56" data-aos="zoom-in" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                <CardArticleMedium  :article="article" :loading="article.isLoading" />
            </div>
        </div>
        
        <div v-if="$homepage.data.nature?.first?.title" class="relative w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden box-border">
            <div data-aos="zoom-in" data-aos-duration="500" class="h-56">
                <CardArticleMedium :article="$homepage.data.history.first" :loading="$homepage.data.nature.first.isLoading" />
            </div>

            <template v-for="(article, index) in $homepage.data.nature.last" :key="index">
                <div v-if="article.title" class="w-full h-56" data-aos="zoom-in" data-aos-duration="500">
                    <CardArticleMedium v-if="article" :article="article" :loading="article.isLoading" />
                </div>
            </template>
        </div>  

        <footer  class="w-full flex justify-end items-center">
            <div class="w-full flex justify-end">
                <x-btn link strip class="text-primary-600" to="/categories/natura">Zobacz więcej >></x-btn>
            </div>
        </footer>
    </section>
    <!-- ====== Cards Section End -->
</template>
