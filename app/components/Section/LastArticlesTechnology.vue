<script setup>
</script>

<template>
    <!-- ====== Cards Section Start -->
    <section id="article-cards-technology" class="w-full container mx-auto px-10 relative flex flex-col justify-center items-center py-6 lg:pt-10 box-border">
        <header class="w-full mb-10 flex flex-col box-border">
            <div class="mb-1 w-full bg-indigo-600 flex justify-center items-center rounded-t-lg">
                <h2 class="text-2xl m-0 text-background-light dark:text-background-dark uppercase font-extrabold"> Technologia</h2>
            </div>

            <span class="w-full border border-solid border-b-1 border-indigo-600"/>
        </header>

        <div class="w-full">
            <div  class="w-full">
                <div class="w-full hidden lg:grid lg:grid-cols-5 gap-6 box-border">
                    <div v-for="(article, index) in $homepage.data.technology" :key="index" class="w-full h-56 rounded-lg"  data-aos="zoom-in" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                        <CardArticleMedium v-if="article"  :article="article" :loading="article.isLoading" >
                            <template v-if="(index === 0)" #decoration>
                                <span class="absolute hidden lg:flex -left-5 -top-5 z-[-1]">
                                    <DecorationDots />
                                </span>
                            </template>
                        </CardArticleMedium>
                    </div>
                </div>

                <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4 box-border">
                    <template v-for="(article, index) in $homepage.data.technology" :key="index" >
                        <div v-if="article.title" class="w-full h-56" data-aos="zoom-in" data-aos-duration="500">
                            <CardArticleMedium v-if="article" :article="article" :loading="article.isLoading" />
                        </div>
                    </template>
                </div>

                <div class="w-full flex justify-end items-center">
                    <x-btn link strip class="text-primary-600" to="/categories/technologia">Zobacz więcej >></x-btn>
                </div>
            </div>
        </div>
    </section>
    <!-- ====== Cards Section End -->
</template>
