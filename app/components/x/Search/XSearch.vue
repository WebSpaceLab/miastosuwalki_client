<script setup>
const props = defineProps({
    color: {
        type: String,
        default: 'gray'
    },
    placeholder: {
        type: String,
        default: 'Search'
    },
    icon: {
        type: Boolean,
        default: false
    },
    rightIcon: {
        type: Boolean,
        default: false
    },
    iconPosition: {
        type: String,
        default: 'left'
    },
    iconColor: {
        type: String,
        default: 'gray'
    },
    modelValue: {
        type: String,
        required: true
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    filter: {
        type: Boolean,
        default: true,
    },
    answer: {
        type: Boolean,
        default: true,
    },
});

const emits = defineEmits([
    'update:modelValue',
]);

const isShowFieldAction = ref(false)

const inputColor = computed(() => {
    return {
        'blue' : 'text-blue-500 focus:text-blue-600 border-blue-500 focus:border-blue-600 placeholder-blue-600 bg-transparent',
        'red' : 'text-red-500 focus:text-red-600 border-red-500 focus:border-red-600 placeholder-red-600 bg-transparent',
        'green' : 'text-green-500 focus:text-green-600 border-green-500 focus:border-green-600 placeholder-green-600 bg-transparent',
        'gray' : 'text-gray-500 focus:text-gray-600 border-gray-500 focus:border-gray-600 placeholder-gray-600 bg-transparent',
        'info' : 'text-info focus:text-info border-info focus:border-info placeholder-info bg-transparent',
        'error' : 'text-error focus:text-error border-error focus:border-error placeholder-error bg-transparent',
        'success' : 'text-success focus:text-success border-success focus:border-success placeholder-success bg-transparent',
    } [ props.color]
});

const iconColor = computed(() => {
    return {
        'blue' : 'text-blue-600',
        'red' : 'text-red-600',
        'green' : 'text-green-600',
        'gray' : 'text-gray-600',
        'info' : 'text-info ',
        'error' : 'text-error',
        'success' : 'text-success',
    } [props.iconColor ? props.iconColor : props.color]
});
</script>

<template>
    <div class="relative w-full">
        <div class="flex space-x-3">
            <div class="hidden md:flex">
                <div
                    v-if="icon"
                    :class="[iconColor, iconPosition === 'left' ? 'left-0' : 'right-0']"
                    class="absolute inset-y-0 flex items-center p-3"
                >
                    <Icon name="bi:search" class="text-xl"/>
                </div>
        
                <div
                    v-if="rightIcon"
                    :class="[iconColor]"
                    class="absolute inset-y-0 right-0 flex items-center p-3"
                >
                    <Icon name="bi:search" class="text-xl"/>
                </div>
        
                <input
                    :value="modelValue"
                    :class="[inputColor, icon & iconPosition === 'left' ? 'pl-10' : 'pl-3']"
                    :placeholder="placeholder"
                    class="block px-3 pb-2 h-9 pt-2 w-full text-sm rounded-2xl border-1 bg-background dark:bg-background-dark appearance-none focus:right-1 focus:outline-none focus:ring-1 left-3"
                    type="search"
                    autofocus
                    @input="event => emits('update:modelValue', event.target.value)"
                >
            </div>
            
            <x-btn
                v-if="filter"
                class="h-9 w-9"
                color="secondary-outline"
                :tooltip="{text: 'Filters'}"
                shadow
                rounded
                icon
                @click="isShowFieldAction = true"
            >
                <Icon name="ic:sharp-manage-search" class="text-xl" />
            </x-btn>
        </div>

        <x-modal
            :show="isShowFieldAction"
            max-width="max"
            :closeable="closeable"
            @close="event => isShowFieldAction = event"
        >   
            <div 
                class="w-full  bg-prime-light dark:bg-prime-dark max-h-[calc(100vh-40px)] flex flex-col"
                :class="[
                    answer ? 'h-screen lg:h-150' : 'h-full',
                ]"
            >
                <div class="w-full h-full flex flex-col items-center">
                    <div class="relative w-full flex h-15 rounded-t-lg">
                        <div
                            v-if="icon"
                            :class="[iconColor, iconPosition === 'left' ? 'left-0' : 'right-0']"
                            class="absolute inset-y-0 flex items-center p-3"
                        >
                            <Icon name="bi:search" class="text-xl"/>
                        </div>
                
                        <v-btn
                            :class="[iconColor]"
                            class="absolute top-4 right-3 h-7 box-border bg-gray-600 inset-y-0 right-0 flex items-center p-3"
                            rounded
                            @click="isShowFieldAction = false"
                        >
                            <Icon name="mdi:keyboard-esc" class="text-xl text-gray-400"/>
                        </v-btn>
                
                        <input
                            :value="modelValue"
                            :class="[inputColor, icon & iconPosition === 'left' ? 'pl-10' : 'pl-3']"
                            :placeholder="placeholder"
                            class="block px-3 h-15 w-full text-xl border-1 rounded-t-lg bg-background dark:bg-background-dark appearance-none focus:right-1 focus:outline-none focus:ring-1 left-3"
                            type="search"
                            autofocus
                            @input="event => emits('update:modelValue', event.target.value)"
                        >
                    </div>

                    <div v-if="filter" class="w-full h-auto md:px-3 py-2 z-10 flex flex-col space-y-3 box-border">
                        <div class="w-full h-auto pb-3 flex justify-center items-center box-border transition-all duration-300">
                            <slot  name="selectedAction"/>
                        </div>
                    </div>

                    <div v-if="answer" class="w-full h-full flex flex-col space-y-3 box-border">
                        <div class="w-full h-full py-3 md:px-3 overflow-y-scroll box-border mb-36">
                            <slot name="answer"/>
                        </div>
                    </div>
                </div>
            </div>
        </x-modal>
    </div>
</template>
