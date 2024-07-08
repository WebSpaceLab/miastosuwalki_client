<script setup>
    const { $partner } = useNuxtApp()

    const sliders = ref()

    let count = ref(0)

    function switchToNextCard() {
        setInterval(() => {
            count.value ++

            if(count.value >= $partner.data.length - 1) {
                count.value = 0
            } 

        }, 2000);
    }

    function scrollRight() {
        sliders.value.scrollLeft = sliders.value.children[1].clientWidth * count.value
    }

    watch(() => count.value, () => {
        scrollRight()
    })

    onMounted(() => {
        switchToNextCard()
    })
</script>

<template>
    <section id="partners" class="container mx-auto relative scroll-mt-50 snap-start my-20 lg:mb-0 pt-4 lg:pt-6 box-border ">
        <header class="w-full flex flex-col">
            <div class="mb-1 w-full bg-slate-500 flex justify-center items-center rounded-t-lg">
                <h2 class="text-2xl m-0 text-background-light dark:text-background-dark uppercase font-extrabold">Nasi Partnerzy </h2>
            </div>

            <span class="w-full border border-solid border-b-1 border-slate-500"/>
        </header>

        <div ref="sliders" class="mb-20 px-5 h-55 hidden lg:flex snap-mandatory snap-x overflow-x-scroll scroll-smooth scrollbar scrollbar-track-color-blue-600/0 scrollbar-thumb-color-blue-600/0 whitespace-wrap overflow-hidden  py-4">
            <template v-for="(item, index) in $partner.data" :key="index">
                <div class="h-full flex justify-center items-center min-w-[300px] ml-5 snap-start transform duration-500 ease-in-out" >
                     <img :src="item.src" alt="Partner" class="h-30 mr-4 text-white" />
                </div>
            </template>
        </div>

        <div class="mb-20 px-5 h-55 flex lg:hidden  snap-mandatory snap-x overflow-x-scroll scroll-smooth scrollbar scrollbar-track-color-blue-600/0 scrollbar-thumb-color-blue-600/0 whitespace-wrap overflow-hidden  py-4">
            <template v-for="(item, index) in $partner.data" :key="index">
                <div class="h-full flex justify-center items-center w-full snap-start transform duration-500 ease-in-out" >
                     <img :src="item.src" alt="Partner" class="h-30 mr-4 text-white" />
                </div>
            </template>
        </div>
    </section>
</template>