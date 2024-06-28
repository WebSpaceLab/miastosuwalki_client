<script setup lang="ts">
const route = useRoute();
const res: any = await $fetch(`/api/ogImage/` + route.params.slug)

useSeoMeta({
    title: () => res.ogImage.title,
    description: () => res.ogImage.description,
    ogImage: () => res.ogImage.image,
    ogUrl: () => 'https://miastosuwalki.pl/article/' + route.params.slug,
    ogType: () => 'article',
    ogSiteName: () => 'Portal Internetowy Miasto Suwałki',
    ogLocale: () => 'pl_PL',
    ogTitle: () => res.ogImage.title,
    ogDescription: () => res.ogImage.description,
    ogImageWidth: () => 1200,
    ogImageHeight: () => 630,
    ogImageType: () => 'image/jpeg',
    ogImageAlt: () => res.ogImage.title,
    ogImageSecureUrl: () => res.ogImage.image,
})

useSchemaOrg([
    defineArticle({
        '@type': 'NewsArticle',
        '@id': 'https://miastosuwalki.pl/article/' + route.params.slug,
        headline: res.ogImage.title,
        image: res.ogImage.image,
        description: res.ogImage.description,
        inLanguage: 'pl-PL',
        datePublished: res.ogImage.datePublished,
        dateModified: res.ogImage.dateModified,
        publisher: 'Miasto Suwałki',
        author: res.ogImage.author,
        isPartOf: 'https://miastosuwalki.pl',
        mainEntityOfPage: 'https://miastosuwalki.pl/article/' + route.params.slug,
    })
])

// defineOgImageComponent("Article", {
//     headline: "Zapraszamy do Artykułu",
//     title: res.ogImage.title,
//     description: res.ogImage.description,
//     theme: "#22c55e",
//     colorMode: "light",
//     image: res.ogImage.image,
//     icon: "https://miastosuwalki.pl/images/Logo.png",
//     siteName: "Portal Internetowy Miasto Suwałki",
// })

const { $auth,  $navbar, $article } = useNuxtApp()

const setColorTheme = (newTheme: string) => {
    useColorMode().preference = newTheme
}

const isTooltip = ref(false);

function activateDropdown(active: any) {
    if(active) {
        $navbar.activate()
    } else {
        $navbar.close()
    }
}
</script>

<template>
    <x-layout >
        <template #header>
            <div class="relative w-screen">
                <Navbar>
                    <template #logo>
                        <div class="flex justify-center items-center transition-all duration-500 linear" :class="[ $navbar.isScroll ? 'lg:w-20 lg:h-20' : 'lg:w-30 lg:h-30']">
                            <div class=" w-40 h-40 transition-all duration-500 linear left-7" :class="[$navbar.isScroll ? 'relative scale-30 lg:scale-60 ' : 'relative scale-30 lg:scale-100 lg:pl-6 ']">
                                <div  class="w-full h-full flex items-center transition-all duration-500 linear lg:cursor-pointer" >
                                    <logo class="w-40 h-40 absolute -bottom-8" />
                                </div>
                            </div>
                        </div>
                    </template>

                    <template  #content>
                        <ul class="flex flex-col lg:flex-row justify-start lg:justify-center items-center -translate-x-5 lg:translate-x-0 lg:items-center space-y-4 lg:space-y-0 lg:space-x-5 box-border">
                            <!--
                            -->
                            <li class="list-none ">
                                <x-link @click="$navbar.closeMenuSm" :color="$navbar.isScroll ? 'basic' : 'white'"  :to="{path: '/'}"  text="Strona główna"  stress  @mousemove="activateDropdown(null)"></x-link>
                            </li>

                            <li class="list-none ">
                                <x-link @click="$navbar.closeMenuSm" :color="$navbar.isScroll ? 'basic' : 'white'" :to="{path: '/article'}" stress  @mousemove="activateDropdown(true)" text="Wiadomości"></x-link>
                            </li>

                            <li  class="list-none">
                                <x-link @click="$navbar.closeMenuSm" :color="$navbar.isScroll ? 'basic' : 'white'" :to="{path: '/galleries'}"  text="Galerie"  stress hash="#team" @mousemove="activateDropdown(null)"></x-link>
                            </li> 

                            <li  class="list-none ">
                                <x-link-hash @click="$navbar.closeMenuSm" :color="$navbar.isScroll ? 'basic' : 'white'" :to="{path: '/', hash: '#about'}"  text="O Stronie"  stress hash="#about" @mousemove="activateDropdown(null)"></x-link-hash>
                            </li>
                            <!--
                                <li  class="list-none ">
                                    <x-link-hash @click="$navbar.closeMenuSm"  :to="{path: '/', hash: '#movie'}"  text="Filmy"  stress hash="#movie" @mousemove="activateDropdown(null)"></x-link-hash>
                                </li> 

                                <li  class="list-none">
                                    <x-link-hash @click="$navbar.closeMenuSm"  :to="{path: '/', hash: '#contact'}"  text="Kontakt"  stress hash="#contact" @mousemove="activateDropdown(null)"></x-link-hash>
                                </li> 
                            -->
                            <li class="list-none ">
                                <x-link @click="$navbar.closeMenuSm" to="/kontakt" :color="$navbar.isScroll ? 'basic' : 'white'" text="Kontakt" stress @mousemove="activateDropdown(null)"></x-link>
                            </li>

                            <li class="lg:hidden list-none flex">
                                <template v-for="(item, index) in $social.data" :key="index">
                                    <x-link
                                        v-if="item.isActive"
                                        :to="item.path"
                                        class="w-8 h-8 flex items-center justify-center rounded-full text-basic-light dark:text-basic-dark mr-3 sm:mr-4 lg:mr-3 xl:mr-4"
                                        target="_blank"
                                    >
                                        <Icon :name="item.icon" class="text-2xl" />
                                    </x-link>
                                </template>
                            </li>
                        </ul>
                    </template>

                    <template #action>
                        <div class="flex justify-center items-center">
                            <x-btn @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')" color="secondary" :tooltip="{text: `Zmień motyw na ${$colorMode.value == 'dark' ? 'jasny' : 'ciemny'}`}" ring strip icon class="mr-3">
                                <template #icon>
                                    <div>
                                        <Icon v-if="$colorMode.value == 'dark'" class="text-lg" name="line-md:moon-filled-loop" />
                                        <Icon v-else class="text-lg" name="line-md:moon-filled-to-sunny-filled-loop-transition" />
                                    </div>
                                </template>
                            </x-btn>
    
                            <template v-for="(item, index) in $social.data" :key="index">
                                <x-link
                                    v-if="item.isActive"
                                    :to="item.path"
                                    class="w-8 h-8 flex items-center justify-center rounded-full text-basic-light dark:text-basic-dark mr-3 sm:mr-4 lg:mr-3 xl:mr-4"
                                    target="_blank"
                                >
                                    <Icon :name="item.icon" class="text-2xl" />
                                </x-link>
                            </template>
    
                            <div v-if="$auth.isLoggedIn"  class="h-full flex items-center justify-center" >
                                <x-dropdown-manage-account :user="$auth.user" >
                                    <template #links>
                                        <x-dropdown-link to="/dashboard" class="text-muted-light dark:text-muted-dark mb-2">
                                            Panel główny
                                        </x-dropdown-link>
                        
                                        <x-dropdown-link to="/dashboard/profile" class="text-muted-light dark:text-muted-dark mb-2"  >
                                            Profil
                                        </x-dropdown-link>
    
                                        <!-- Authentication -->
                                        <x-dropdown-link @click="$auth.logout()" class="mt-2 bg-danger-600 rounded">
                                            <span class="text-red-200 uppercase font-bold">Logout</span>
                                        </x-dropdown-link>
                                    </template>
                                </x-dropdown-manage-account>
                            </div>
                        </div>
                    </template>

                    <template #dropdown-field>
                        <navbar-dropdown >
                            <div class="w-auto py-4 flex justify-between items-center space-x-20">
                                <div class="w-full grid grid-cols-2 gap-6">
                                    <div v-for="category in $categories.activeCategories" :key="category.id" class="">
                                        <li class="list-none ">
                                            <x-link
                                                @click="$navbar.closeMenuSm"
                                                :to="`/categories/${category.slug}`" 
                                                :text="category.name" 
                                                stress 
                                                :style="{
                                                    'color': category.color,
                                                }"
                                            />
                                        </li>
                                    </div>
                                </div>
        
                                <a href="#" class="relative w-150 h-40 text-left bg-local bg-gray-500 bg-center bg-no-repeat bg-cover rounded-lg bg-blend-multiply hover:bg-blend-soft-light dark:hover:bg-blend-darken" >
                                    <img src="/images/miastosuwalki.jpg" class="w-full h-full object-cover rounded-lg" alt="image" />
                                </a>
                            </div>
                       </navbar-dropdown>
                    </template>
                </Navbar>
            </div>
        </template>

        <template #main>
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

                <div class="relative w-full h-full flex flex-col lg:flex-row lg:space-x-5 overflow-hidden">
                    <slot/>

                    <SidebarArticle/>
                </div>
            </div>
        </template>

        <template #footer>
            <Footer />
        </template>

        <template #addons>
            <div>
                <x-modal-auth-forgot-password
                    :show="$navbar.isShowForgotPassword"
                    :minimization="null"
                    max-width="max"
                    :closeable="true"
                    @close="(event) => $navbar.switchForgotPassword(event)"
                />
            </div>
        </template>
    </x-layout>
</template>