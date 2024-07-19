<script setup>
const { $dashboard, $auth} = useNuxtApp()

function typeLinks(type) {
    const links = [];

    $dashboard.sidebar.links.forEach(link => {
        if(link.type === type) {
            $auth.roles.forEach(role => {
            if(link.access === role) {
                links.push(link)
            }
        })
        }
    });

    return links;
}
</script>

<template>
    <transition
        enter-active-class="transition ease-out duration-500"
        :enter-from-class="`transform ${ $dashboard.sidebar.isRightSide ? 'translate-x-64' : '-translate-x-64'}`"
        enter-to-class="transform  translate-x-0"
        leave-active-class="transition ease-in duration-500"
        leave-from-class="transform translate-x-0"
        :leave-to-class="`transform  ${ $dashboard.sidebar.isRightSide ? 'translate-x-64' : '-translate-x-64'}`"
    >
        <div
            v-show="$dashboard.sidebar.isShow"
            class="fixed w-full z-30 h-screen top-0 transition-all duration-500"
            :class="[
                $dashboard.sidebar.isRightSide ? 'right-0' : 'left-0',
                $dashboard.sidebar.isRail ? 'w-24' : ' w-64'
            ]"
        >
        
            <nav
                :class="[
                    $dashboard.sidebar.isRail ? 'w-24' : 'w-64',
                ]"
                class="w-full h-screen transition-all duration-500 top-0 box-border flex justify-center rounded-xl p-4 "
            >

                <div 
                    class="h-full pt-20 flex flex-col justify-between transition-all duration-500  box-border"
                    :class="[
                        $dashboard.sidebar.isRail ? 'w-14' : 'w-60',
                    ]"
                > 

                    <div class="w-full h-full flex flex-col justify-center  overscroll-contain overflow-y-hidden hover:overflow-y-auto overflow-x-hidden scrollbar scrollbar-left scrollbar-blue-600 scrollbar-rounded scrollbar-w-2px scrollbar-radius-2 scrollbar-track-radius-2 scrollbar-thumb-radius-2">
                        <div class="w-full flex flex-col mt-20">
        
                            <div class="w-full">
                                <div class="w-full bg-second-light/80 bg-gradient-to-r dark:from-background-dark/80 dark:to-prime-dark/80 backdrop-blur rounded-lg">
                                    <ul class="list-none overflow-y-auto flex flex-col justify-center items-start p-0 px-4 box-border" :class="[$dashboard.sidebar.isRail ? 'w-10' : 'w-full']">
                                        <template v-for="(link, index) in typeLinks('basic')" :key="index">
                                            <x-sidebar-item :link="link" />
                                        </template>
                                    </ul>
                                </div>
                            </div>
                        </div>
    
                        <div class="w-full relative">
                            <div class="bg-second-light/80  bg-gradient-to-r dark:from-background-dark/80 dark:to-prime-dark/80 backdrop-blur rounded-lg">
                                <ul class="list-none overflow-y-auto flex flex-col justify-center items-start p-0 px-4 box-border" :class="[$dashboard.sidebar.isRail ? 'w-10' : 'w-full']">
                                    <template v-for="(link, index) in typeLinks('settings')" :key="index">
                                        <x-sidebar-item :link="link" />
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </transition>

    <transition
        enter-active-class="transition ease-out duration-500"
        :enter-from-class="`transform ${ $dashboard.sidebar.isRightSide ? '-translate-x-10' : 'translate-x-10'}`"
        enter-to-class="transform  translate-x-0"
        leave-active-class="transition ease-in duration-500"
        leave-from-class="transform translate-x-0"
        :leave-to-class="`transform  ${ $dashboard.sidebar.isRightSide ? '-translate-x-10' : 'translate-x-10'}`"
    >
        <div
        v-if="$auth.isLoggedIn && $dashboard.sidebar.isShowMenuBar"
        class="fixed z-50 top-[50%] bg-second-light/80  bg-gradient-to-r dark:from-background-dark/80 dark:to-prime-dark/80 p-2 "
        :class="[
            $dashboard.sidebar.isRightSide ? 'left-0 rounded-r-xl' : 'right-0 rounded-l-xl',
        ]"
        >
            <div
                class="flex flex-col justify-start items-center space-y-2 "
            >
                <x-btn @click="$dashboard.sidebar.isShow = !$dashboard.sidebar.isShow" class="bg-slate-400/80 hover:bg-slate-600/80" strip  rounded icon>
                    <Icon v-if="$dashboard.sidebar.isShow" class="text-2xl text-black dark:text-slate-200 hover:text-white" name="mdi:close" />
                    <Icon v-else class="text-2xl dark:text-slate-200 hover:text-white" name="material-symbols:menu-rounded" />
                </x-btn>
    
                <x-btn v-if="$dashboard.sidebar.isShow" @click="$dashboard.sidebar.isRail = !$dashboard.sidebar.isRail"  class="bg-slate-400/80 hover:bg-slate-600/80" strip rounded icon>
                    <Icon class="text-2xl transition-all duration-300 ease-in text-black dark:text-slate-200 hover:text-white" name="material-symbols:swap-horizontal-circle-rounded" :class="{'rotate-180' : $dashboard.sidebar.isRail}"/>
                </x-btn>
    
                <x-btn v-if="$dashboard.sidebar.isShow" @click="$dashboard.sidebar.isRightSide = !$dashboard.sidebar.isRightSide"  class="bg-slate-400/80 hover:bg-slate-600/80" strip rounded icon>
                    <Icon v-if="$dashboard.sidebar.isRightSide" class="text-2xl text-black dark:text-slate-200 hover:text-white transition-all duration-300 ease-in" name="streamline:interface-layout-5-column-header-layout-layouts-masthead-sidebar" />
                    <Icon v-else class="text-2xl text-black dark:text-slate-200 hover:text-white transition-all duration-300 ease-in" name="streamline:interface-layout-4-column-header-layout-layouts-masthead-sidebar"/>
                </x-btn>
    
                <x-btn @click="$dashboard.sidebar.isShowHelperBar = !$dashboard.sidebar.isShowHelperBar" class="bg-slate-400/80 hover:bg-slate-600/80" strip rounded icon>
                    <Icon class="text-2xl text-black dark:text-slate-200 hover:text-white" name="octicon:sidebar-expand-16" :class="$dashboard.sidebar.isShowHelperBar ? 'rotate-90' : 'rotate-270'" />
                </x-btn>
            </div>
        </div>
    </transition>
</template>