<script setup>

</script>

<template>
<!-- ====== Cards Section Start -->
<section id="article-cards-culture" class="w-full container mx-auto px-10 relative flex flex-col justify-center items-center py-4 lg:py-6 lg:pt-20 box-border">
    <header class="w-full mb-10 flex flex-col box-border">
        <div class="mb-1 w-full bg-red-500 flex justify-center items-center rounded-t-lg">
            <h2 class="text-2xl m-0 text-background-light dark:text-background-dark uppercase font-extrabold"> Kultura </h2>
        </div>

        <span class="w-full border border-solid border-b-1 border-red-500"/>
    </header>

    <div class="w-full h-full">
        <div class="w-full h-full hidden lg:max-h-150 lg:grid lg:grid-cols-2  lg:grid-rows-4 gap-6 box-border">
            <div data-aos="zoom-in"  data-aos-offset="0" data-aos-duration="500" class="row-span-4">
                <CardArticle :article="$homepage.data.culture.first" :loading="$homepage.data.culture.first.isLoading" >
                    <template #decoration>
                        <span class="absolute hidden lg:flex -left-5 -top-5 z-[-1]">
                            <DecorationDots color="#64748b" />
                        </span>
                    </template>
                </CardArticle>
            </div>

            <div v-for="(article, index) in $homepage.data.culture.last" :key="index" data-aos="zoom-in" data-aos-duration="1000" >
                <CardArticleSmall  :article="article" :loading="article.isLoading" />
            </div>
        </div>

        <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4 box-border">
            <div data-aos="zoom-in" data-aos-duration="500">
                <CardArticleMedium :article="$homepage.data.culture.first" :loading="$homepage.data.culture.first.isLoading" />
            </div>

            <div v-for="(article, index) in $homepage.data.culture.last" :key="index" data-aos="zoom-in" data-aos-duration="500" >
                <CardArticleMedium  :article="article" :loading="article.isLoading" />
            </div>
        </div>
    </div>

    <footer v-if="$homepage.data.culture?.length !== 0" class="w-full flex flex-col justify-center items-center ">
        <div class="w-full flex justify-end">
            <x-btn link strip class="text-primary-600" to="/article/kultura">Zobacz więcej >></x-btn>
        </div>
    </footer>
</section>
<!-- ====== Cards Section End -->
</template>
