<script setup>
const { $dashboard } = useNuxtApp()

defineProps({
    link: {
        type: Object,
        default: () => ({})
    },
});

const open = ref(false);

watch(() => $dashboard.sidebar.isRail, (event) => {
    if(event === true) {
        open.value = false
    }
})
</script>

<template>
    <li class="w-full mt-4 ease-in list-none">
        <NuxtLink
            v-if="!link?.children?.length"
            :class="$dashboard.sidebar.isRail ? '' : 'overflow-hidden'"
            :to="{path: link.path }"
            class="h-10 w-full flex decoration-none text-muted-light  dark:text-muted-dark hover:text-hover-800  dark:hover:text-hover-200 rounded"
            active-class="link-active"
        >
            <div class="w-10">
                <Icon class="text-2xl" :name="link.icon"/>
            </div>

            <span v-if="!$dashboard.sidebar.isRail" class="ml-3 transition-all duration-500">
                {{ link.title }}
            </span>

        </NuxtLink>
        
        <div v-else class="w-full h-full flex flex-between items-center">
            <NuxtLink
                 :to="{ path: link.path }"
                 :class="[
                     $dashboard.sidebar.isRail ? '' : 'overflow-hidden',
                     open ? 'font-semibold text-blue-600' : 'font-medium hover:text-hover-200'
                 ]"
                 class="flex justify-between items-center cursor-pointer decoration-none h-10 w-full rounded  dark:text-muted-dark hover:text-hover-800  dark:hover:text-hover-200"
                 active-class="link-active"
             >
                <div v-if="!$dashboard.sidebar.isRail" class="flex items-start transition-all duration-500">
                    <div  class="flex justify-start w-10 items-center">
                        <Icon class="text-2xl" :name="link.icon"/>
                    </div>
     
                    <span class="ml-3" >{{ link.title }}</span>
                </div>
             </NuxtLink>
     
             <span
                v-if="link?.children?.length"
                 class="flex justify-center  items-center w-10 transition-all duration-500  h-full cursor-pointer"
             >
                 <Icon v-if="$dashboard.sidebar.isRail && !open" class="text-2xl  transition-all duration-500 hover:text-hover-200" :name="link.icon"/>
     
                 <Icon
                     v-else
                     :class="open ? 'rotate-90 text-blue-600' : 'fa-rotate-0 text-muted-light dark:text-muted-dark hover:text-hover-200'"
                     class="text-2xl transition-all duration-200 ease-in"
                     name="material-symbols:play-arrow-outline"
                     @click="open = !open"
                 />
             </span>
        </div>

        <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="transform opacity-0 -translate-x-64"
            enter-to-class="transform opacity-100 translate-x-0"
            leave-active-class="transition ease-in duration-300"
            leave-from-class="transform opacity-100 translate-x-0"
            leave-to-class="transform opacity-0 -translate-x-64"
        >
            <ul v-if="link?.children?.length && open" :class="[$dashboard.sidebar.isRail ? 'w-10 p-0' : 'w-[90%] pl-5']" class="list-none">
                <template v-for="(child, index) in link.children" :key="index">
                    <x-sidebar-item :link="child" />
                </template>
            </ul>
        </transition>
    </li>
</template>

<style lang="scss" scoped>
.link-active {
    @apply text-active-400 hover:text-active-400 font-medium cursor-default;
}
</style>