<script setup>
import axios from '~/plugins/axios'
const { $advertisement, $auth, $flash} = useNuxtApp()

const emits = defineEmits(['close', 'addedToLibrary']);
const $axios = axios().provide.axios
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '4xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    category: {
        type: Object
    },
    title: {
        type: String,
        default: 'Photo details'
    },
    offer: {
        type: Object 
    }
});

let dragging = ref(false)

// const file = ref(null)

const previewImage = ref(null)

const close = () => {
    resetForm()
    emits('close')
}

const form = reactive({
    name: '',
    description: '',
    file: {
        filename: '',
        path: '',
    },
    targetUrl: '',
    startAt: '',
    endAt: '',
    status: 'no active',
    isActive: false,
    pagePaths: [],
    adPositions: [],
})

const resetForm = () => {
    form.name = ''
    form.description = ''
    form.file = {
        filename: '',
        path: '',
    }
    form.targetUrl = ''
    form.startAt = ''
    form.endAt = ''
    form.status = 'no active'
    form.isActive =  false
    form.pagePaths = []
    form.adPositions = []
    resetPreviewImage()
}

const create = async () => {
    await $advertisement.create(form)
    
    if($advertisement.errors) {
        return
    }

    addedToLibrary(true)
    close()
}

async function deletedPreviewImage(mediaId) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {
        try {
            // await $mediaStore.deletedMedia(mediaId)

            resetPreviewImage()
        } catch (error) {
            console.error(error)
        }
    }
}

const getUploadedImage = (e) => {
    const file = e.target.files[0]
 
    previewImage.value = URL.createObjectURL(file)
    let data = new FormData;

    data.append('file', file)
    $axios.post('/api/admin/advertisements/create-file', data, {
                headers: {
                    "Authorization": 'Bearer ' + $auth.token,
                },
                onUploadProgress: (event) => {
                    media.progress = Math.round(event.loaded * 100 / event.total);
                },
            })
            .then(response => {
                return response.data
            })
            .then(({data, flash}) => {
                form.file.filename = data.filename
                form.file.path = data.path
                $flash.success(flash.message)
            })
            .catch(error => {
                $flash.error(error)
            })


}

const resetPreviewImage = () => {
    previewImage.value = null
    form.file.filename = ''
    form.file.path = ''
}

const allPagePaths = ref([
    {
        id: 1,
        name: 'Strona główna',
        value: 'homepage',
        selected: false
    },
    {
        id: 2,
        name: 'Artykuł',
        value: 'article',
        selected: false
    }
])

const allPositions = ref([
    {
        id: 1,
        name: 'Pasek górny',
        value: 'top',
        selected: false
    },
    {
        id: 2,
        name: 'Pasek boczny',
        value: 'bottom',
        selected: false
    }
])


function addPagePath(pagePath) {
    const page = allPagePaths.value.find(page => page.value === pagePath)
    // page.selected = !page.selected

    if(page.selected) {
        form.pagePaths.push(pagePath)
    } else {
        form.pagePaths = form.pagePaths.filter(path => path !== pagePath)
    }
}

function addAdPosition(adPosition) {
    const position = allPositions.value.find(position => position.value === adPosition)
    // position.selected = !position.selected

    if(position.selected) {
        form.adPositions.push(adPosition)
    } else {
        form.adPositions = form.adPositions.filter(path => path !== adPosition)
    }
}

function addedToLibrary(event) {
    emits('addedToLibrary', event)
}
// TODO: fix this function to drag and drop image
// function onDroppedFiles($event) {
//     dragging.value = false;
//     // console.log($event.target.files[0])
//     let files = [...$event.dataTransfer.items]
//         .filter(item => item.kind === 'file')
//         .map(item => item.getAsFile());

//         getUploadedImage(files);
// }


watch(() => form.isActive, (event) => {
    form.status = event ? 'active' : 'no active'
})


</script>

<template>
    <x-modal-dialog
        :show="show"
        max-width="max"
        :closeable="closeable"
        @close="close"
        :title="title"
    >
        <x-dump :value="form" />
        <form class="w-full h-full flex flex-col justify-center items-start space-y-6 py-6">
            <div class="w-full h-60 mb-10">
                <div v-if="previewImage" class="w-full h-full flex justify-center items-center">
                    <img :src="previewImage" class="w-full h-full object-cover" alt="">
                </div>

                <div
                    v-else 
                    @drop.prevent="onDroppedFiles"
                    @dragover.prevent="dragging = true"
                    @dragleave.prevent="dragging = false"
                    :class="[dragging ? 'border-indigo-500' :'border-basic-light dark:border-basic-dark', 'flex flex-col items-center py-6 px-6 rounded-xl border-2 border-dashed']"
                >
                    <svg
                        class="w-12 h-12 text-gray-500"
                        aria-hidden="true" fill="none" stroke="currentColor"
                        viewBox="0 0 48 48"
                    >

                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        />

                    </svg>

                    <p class="text-xl text-gray-700">Select image to upload</p>

                    <p class="mb-2 text-gray-700">or</p>

                    <label class="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 cursor-pointer hover:shadow-xl shadow-black shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        Select files

                        <input
                            @input="getUploadedImage"
                            class="sr-only"
                            name="file"
                            ref="file"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                        >
                    </label>

                    <p class="text-xs text-gray-600 mt-4">Maximum upload image size: 512MB.</p>
                </div>
            </div>

            <div class="w-full h-full flex flex-col space-y-6">
                <x-input
                    label="Nazwa"
                    v-model="form.name"
                    :error="$advertisement.errors?.name ? $advertisement.errors.name[0] : ''"
                />

                <x-input
                    label="Scieżka URL do strony reklamowanej"
                    v-model="form.targetUrl"
                    :error="$advertisement.errors?.targetUrl ? $advertisement.errors.targetUrl[0] : ''"
                />
                
                <x-textarea
                    label="Opis reklamy"
                    v-model="form.description"
                    :error="$advertisement.errors?.description ? $advertisement.errors.description[0] : ''"
                />


                <div class="w-full flex space-x-3">
                    <x-input
                        label="Od kiedy reklama jest aktywna"
                        v-model="form.startAt"
                        :error="$advertisement.errors?.startAt ? $advertisement.errors.startAt[0] : ''"
                        type="date"
                    />
                    
                    <x-input
                        label="Kiedy reklama kończy się"
                        v-model="form.endAt"
                        :error="$advertisement.errors?.endAt ? $advertisement.errors.endAt[0] : ''"
                        type="date"
                    />
                </div>

                <div class="w-full flex space-x-3 text-slate-900 dark:text-slate-100">
                    <div class="flex flex-col border-solid border-gray-300 p-3 rounded-xl">
                        <div class="border border-b-solid border-gray-300">
                            <label class="block text-sm font-medium ">Wybierz strony</label>
                        </div>

                        <ul class="w-full px-2 flex justify-center items-center overflow-hidden">
                            <div class="w-full grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-3">
                                <li v-for="page in allPagePaths" :key="page.id" class="flex justify-start items-center space-x-2">
                                    <input type="checkbox" v-model="page.selected" :value="page.selected" @change="addPagePath(page.value)" class="w-6 h-6 rounded bg-slate-300 lg:w-4 lg:h-4 focus:ring-focus-600">
                        
                                    <div class="text-sm">
                                        {{ page.name }}
                                    </div>
                                </li>
                            </div>
                        </ul>
                    </div>

                    <div class="flex flex-col border-solid border-gray-300 p-3 rounded-xl">
                        <div class="border border-b-solid border-gray-300">
                            <label class="block text-sm font-medium">Wybierz pozycje</label>
                        </div>

                        <ul class="w-full px-2 flex justify-center items-center overflow-hidden">
                            <div class="w-full grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 gap-3">
                                <li v-for="position in allPositions" :key="position.id" class="flex justify-start items-center space-x-2">
                                    <input type="checkbox" v-model="position.selected" :value="position.selected" @change="addAdPosition(position.value)" class="w-6 h-6 rounded bg-slate-300 lg:w-4 lg:h-4 focus:ring-focus-600">
                        
                                    <div class="text-sm">
                                        {{ position.name }}
                                    </div>
                                </li>
                            
                            </div>
                        </ul>
                    </div>
                </div>

                <div class="w-full flex space-x-3">
                    <div class="flex w-full justify-end items-center ">
                        <span v-if="form.isActive" class="mr-3 text-sm font-medium text-green-500">active status</span>
                        <span v-else class="mr-3 text-sm font-medium text-red-500">status not active</span>

                        <label for="toggle-social-create" class="inline-flex relative items-center mr-5 cursor-pointer">
                            <input @click="form.isActive = !form.isActive"  v-model="form.isActive" type="checkbox" :value="form.isActive" id="toggle-social-create" class="sr-only peer" checked>
                            
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                    </div>
                </div>
            </div>
        </form>

       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="resetForm" type="submit" color="primary-outline" rounded >Reset</x-btn>
                <x-btn @click="create" @keydown.enter="create" type="submit" color="primary-outline" rounded :loading="loading" :disabled="!form.name">Create</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>