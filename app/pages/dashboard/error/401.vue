<script setup>
    definePageMeta({
        layout: "default",
        middleware: ['auth']
    })
</script>

<template>
    <div class="w-full h-screen flex justify-center items-center text-xl">
        <h1>
            401 Unauthorized
        </h1>
    </div>
</template>