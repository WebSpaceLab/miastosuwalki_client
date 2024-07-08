<script setup>
const emits = defineEmits(['isHover']);
const isShowAction = ref(false)

watch(() => isShowAction.value, (value) => {
    emits('isHover', value)
})
</script>

<template>
    <div 
        class="w-full rounded-xl  transition-all duration-500 box-border relative"
        :class="{'border-solid border-1 border-blueGray shadow-xl shadow-blueGray': isShowAction}"
        @mouseenter="isShowAction = true"
        @mouseleave="isShowAction = false" 
    >
        <transition
            enter-active-class="ease-out duration-500"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-0"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="isShowAction" class="w-full h-12 absolute -top-12 left-0 flex justify-end index-center px-3 box-border">
                <div class="h-full flex items-center space-x-3 px-3 box-border bg-blueGray/30 rounded-t-xl">
                    <slot name="action"/>
                </div>
            </div>
        </transition>

        <slot/>
    </div>
</template>