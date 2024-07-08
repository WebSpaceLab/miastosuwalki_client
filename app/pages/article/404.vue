<template>
  <div class="w-full  h-screen flex justify-end items-center">
    <div class="relative w-full h-full p-10 flex justify-center lg:justify-start items-start">
      <div class="hidden absolute top-0 left-0 right-0 mx-auto w-full h-full lg:flex justify-center items-center">
        <img src="/images/404.jpg" alt="error 404" class=" lg:h-full object-cover hue-rotate-300">
      </div>

      <div class="lg:hidden absolute top-30 left-0 right-0 mx-auto w-full h-full flex justify-center items-start">
        <img src="/images/404.jpg" alt="error 404" class=" w-full object-cover hue-rotate-300">
      </div>
      
      <NuxtLink to="/" class="z-10  decoration-none text-3xl text-white bg-background-dark py-2 px-4 hover:text-red rounded-xl">Go back home</NuxtLink>
    
      </div>
    </div>
</template>

<script setup>
definePageMeta({
  layout: "errors",
});

const setColorTheme = (newTheme) => {
    useColorMode().preference = newTheme
}
onMounted(() => {
    setColorTheme('light' )
})

</script>
