<script setup>
    const { $auth,  $navbar } = useNuxtApp()

    function activateDropdown(active) {
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
                        <ul class="flex flex-col lg:flex-row justify-start lg:justify-center items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-5 ">
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
                        </ul>
                    </template>
    
                    <template #action>
                        <div class="flex justify-center items-center">
    
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
    
                            <div v-if="!$auth.isLoggedIn"  class="w-10 h-full flex items-center justify-center" >
    
                            </div>
    
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
            <slot  />
        </template>

        <template #footer>

        </template>

        <template #addons>
        </template>
    </x-layout>
</template>