<script setup>
definePageMeta({
    layout: "default",
})

const {  $navbar } = useNuxtApp()

    let openSM1 = ref(false)
    let openSM2 = ref(false)
    
    onMounted(() => {
        setTimeout(() => {
            $navbar.showLogin()
        }, 1000)
    }) 

    watch(() => openSM1.value, (value) => {
        if(value) {
            openSM2.value = false
        }
    })

    watch(() => openSM2.value, (value) => {
        if(value) {
            openSM1.value = false
        }
    })
</script>

<template>
    <div class="w-screen h-screen">
        <img src="/images/suwalki.jpg" alt="Suwałki" class="w-full h-full object-cover">
    </div>
</template>