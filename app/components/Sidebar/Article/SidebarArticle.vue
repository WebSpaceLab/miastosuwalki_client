<script setup>
</script>

<template>
    <div class="w-full h-full lg:w-[320px] relative py-4">
        <aside
            class="w-full sticky top-0 flex flex-col items-center space-y-4 z-10"
        >
            <div class="w-full sticky top-0 rounded-lg flex flex-col space-y-2 p-2 bg-secondary dark:bg-secondary-dark">
                <div class="w-full m-0 flex flex-col">
                    <div
                        class="mb-1 w-full bg-slate-500 flex justify-center items-center rounded-t-lg"
                    >
                        <h2
                        class="text-2xl m-0 text-background-light dark:text-background-dark uppercase font-extrabold"
                        >
                            Wiadomości
                        </h2>
                    </div>

                    <span class="border border-solid border-b-1 border-slate-500" />
                </div>

                <CardArticleSmaller :article="$homepage.data.latest.first" />

                <div
                    v-for="(article, index) in $homepage.data.latest.last"
                    :key="index"
                    class="w-full bg-primary dark:bg-primary-dark rounded-lg max-h-32"
                >
                    <CardArticleSmaller :article="article" />
                </div>
            </div>

            <div
                v-if="$article.advertisements.sidebar"
                class="relative rounded-lg w-full max-h-[600px] md:max-w-[300px] overflow-hidden mt-8 sm:mt-0"
            >
                <x-slider-carousel
                    :items="$article.advertisements.sidebar"
                    :indicator="false"
                    :interval-time="7000"
                >
                    <template
                        v-for="(item, index) in $article.advertisements.sidebar"
                        :key="index"
                        #[`slide-${index}`]
                    >
                        <a
                            v-if="item.position === 'sidebar'"
                            class="w-auto h-full flex justify-center items-center"
                            href=""
                            rel="nofollow"
                            alt="ads tobar"
                            target="_blank"
                        >
                            <img
                                :src="item.previewUrl"
                                :alt="item.name"
                                class="w-full object-cover"
                            />
                        </a>
                    </template>
                </x-slider-carousel>
            </div>

            <div
                v-if="$article.show?.data?.gallery"
                class="w-full rounded-lg flex flex-col space-y-2 bg-secondary dark:bg-secondary-dark box-border"
            >
                <div class="w-full mb-1 box-border">
                    <div
                        class="mb-1 w-full bg-slate-500 flex justify-center items-center rounded-t-lg"
                    >
                        <h2
                        class="text-xl text-background dark:text-background-dark uppercase font-medium"
                        >
                        Galeria zdjęć
                        </h2>
                    </div>

                    <x-border yb="0" yt="0" color="slate" />
                </div>

                <div class="w-full">
                    <x-card-photo-gallery
                        v-if="$article.show?.data?.gallery.media.length != 0"
                        :gallery="$article.show?.data?.gallery"
                        :to="`/galleries/${$article.show?.data?.gallery.slug}`"
                        :is-title="false"
                    />
                </div>
            </div>
        </aside>
    </div>
</template>