<script setup>
    defineProps({
        slide: {
            type: Object,
            default: () => {}
        },
        visible: {
            type: Boolean,
            default: false
        },
        dir: {
            type: String,
            default: 'left'
        }
    })

    // const dir = computed(() => {
    //     return props.dir === 'left' ? 'slide-left' : 'slide-right'
    // })
</script>

<!-- <template>
    <transition :name="dir">
        <div  class="w-full h-full">
            <slot></slot>
        </div>
    </transition>
</template> -->

<template>
    <div class="w-full h-full">
        <slot/>
    </div>
</template>

<style scoped>
    .slide-left-enter-active {
        animation: slide-left-in 0.5s ease-in;
    }
    .slide-left-leave-active {
        animation: slide-left-out 0.5s ease-in;
    }
    @keyframes slide-left-in{
        from  { transform: translateX(-100%);}
        to { transform: translateX(0);} 
    }
    @keyframes slide-left-out{
        from  { transform: translateX(0%);}
        to { transform: translateX(100%);} 
    }
    
    .slide-right-enter-active {
        animation: slide-right-in 0.5s ease-in;
    }
    .slide-right-leave-active {
        animation: slide-right-out 0.5s ease-in;
    }
    @keyframes slide-right-out{
        from  { transform: translateX(0%);}
        to { transform: translateX(-100%);} 
    }
    @keyframes slide-right-in{
        from  { transform: translateX(100%);}
        to { transform: translateX(0);} 
    }
</style>