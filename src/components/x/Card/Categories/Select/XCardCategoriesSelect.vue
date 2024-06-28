<script setup>
const emits = defineEmits(['update:category'])
const props = defineProps({
    categories: {
        type: Array,
        default: () => [
         
        ]
    },
    selectedCategory: {
        type: Number,
        default: null
    }
})

const form = reactive({
    category_id: props.selectedCategory ? props.selectedCategory : null,
})

// const resetForm = () => {
//     form.category_id = null
// }

const items = ref([])

const selectCategory = (categoryId) => {
    items.value.forEach(category => {
        if(category.id === categoryId) {
            form.category_id = categoryId; 
            category.selected = true;
            return;
        }
        
        category.selected = false;
    })
}

watch(() => form.category_id, (event) => {
    emits('update:category', event)
})

watch(() => props.selectedCategory, (event) => {
    selectCategory(event)
})


onMounted(() => {
    items.value = props.categories.map(category => {
        return {
            ...category,
            selected: false
        }
    })
    
    if(props.selectedCategory) selectCategory(props.selectedCategory)
})
</script>

<template>
    <ul class="w-full px-2 flex justify-center items-center overflow-hidden">
        <div v-if="items" class="w-full grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-3">
            <li v-for="category in items" :key="category.id" class="flex justify-start items-center space-x-2">
                <input 
                    v-model="category.selected" 
                    class="w-6 h-6 rounded bg-slate-300 lg:w-4 lg:h-4 focus:ring-focus-600" 
                    type="checkbox" 
                    :style="{
                        'border-color': category.color,
                        'background-color': category.color,
                    }"
                    :value="category.selected" @change="selectCategory(category.id)" 
                >
    
                <div 
                    class="text-sm" 
                    :style="{
                        'color': category.color,
                    }"
                >
                    {{ category.name }}
                </div>
            </li>
        
        </div>

        <div v-else class="flex justify-center items-center text-lg text-bold">
            Please add category
        </div>
    </ul>
</template>