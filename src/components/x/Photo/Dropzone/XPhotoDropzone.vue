<script setup >
import axios from '~/plugins/axios'
const { $flash, $auth } = useNuxtApp()

const $axios = axios().provide.axios

const emits = defineEmits(['addedToLibrary'])

defineProps({
    multiple: {
        type: Boolean,
        default: true
    }
})

const dragging = ref(false)
const media = ref([])
const files = ref()
const fileEdit = ref(null)
const isShowModalPhotoDetails = ref(false)
const isCheckboxAddWithCropper = ref(false)
const isShowModalPhotoCropper = ref(false)
const uploadedImage = ref(null)
const uploadedImageUrl = ref(null)


function uploadFiles(files) {
    files.forEach(file => {
        media.value.unshift({
            file: file,
            progress: 0,
            error: null,
            uploaded: false,
            previewUrl: '',
        });
    });

    media.value
        .filter(media => !media.uploaded)
        .forEach(async media => {
            const form = new FormData;

            form.append('file', media.file)
            
            $axios.post('/api/media', form, {
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
                emitAddedToLibrary(data.media);

                media.uploaded = true;
                media.id = data.media.id;
                media.previewUrl = data.media.previewUrl;
                media.mimeType = data.media.mimeType;
                media.file = data.media
                $flash.success(flash.message)
            })
            .catch(error => {
                media.error = 'Uploaded Fail. Please try again later;';
                if (error?.response.status === 422) {
                    media.error = error.response.data.errors.file[0];
                }
                
                $flash.error(media.error)
            })
        })
    ;
}
        
function onSelectedFiles($event) {
    if(isCheckboxAddWithCropper.value) {
        uploadedImage.value = $event.target.files[0]

        uploadedImageUrl.value = URL.createObjectURL(uploadedImage.value)

        isShowModalPhotoCropper.value = true
    } else {

        const files2 = [...$event.target.files]
        
        uploadFiles(files2)
        
        files.value = null
    }
}

function onDroppedFiles($event) {
    dragging.value = false;

    const files = [...$event.dataTransfer.items]
        .filter(item => item.kind === 'file')
        .map(item => item.getAsFile());

    uploadFiles(files);
}

function openEditFile(file) {
    fileEdit.value = file
    isShowModalPhotoDetails.value = true
}

function closeModalEdit(event) {
    isShowModalPhotoDetails.value = event
    fileEdit.value = null
}

function emitAddedToLibrary (event) {
    emits('addedToLibrary', event);
}

// const checkboxAddWithCropper = (event) => {
//     console.log(event)
// }

function uploadCropImage(data) {
    media.value.unshift({
        file: {},
        progress: 0,
        error: null,
        uploaded: false,
        previewUrl: '',
    })

    media.value
        .filter(media => !media.uploaded)
        .forEach(async media => {   
            data.append('image', uploadedImage.value || '')

            $axios.post(`/api/media/with-cropper`, data, {
                headers: {
                    "Authorization": 'Bearer ' + $auth.token,
                },
                onUploadProgress: (event) => {
                    media.progress = Math.round(event.loaded * 100 / event.total);
                },
            })
            .then(({data}) => {
                emitAddedToLibrary(data.media);

                media.uploaded = true;
                media.id = data.media.id;
                media.previewUrl = data.media.previewUrl;
                media.file = data.media
                $flash.success(data.flash.message)
            })
            .catch(error => {
                media.error = 'Uploaded Fail. Please try again later;';

                if (error?.response.status === 422) {
                    media.error = error.response.data.errors.file[0];
                }
                
                $flash.error(media.error)
            })
        })
    
}
</script>

<template>
    <div class="relative flex flex-col justify-start items-center">
        <div  class="w-full h-full">
            <div
                :class="[dragging ? 'border-indigo-500' :'border-basic-light dark:border-basic-dark', 'flex flex-col items-center py-6 px-6 rounded-xl border-2 border-dashed']"
                @drop.prevent="onDroppedFiles"
                @dragover.prevent="dragging = true"
                @dragleave.prevent="dragging = false"
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

                <p class="text-xl text-gray-700">Drop image to upload</p>

                <p class="mb-2 text-gray-700">or</p>

                <label class="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 cursor-pointer hover:shadow-xl shadow-black shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    Select files

                    <input
                        v-if="isCheckboxAddWithCropper"
                        ref="files"
                        class="sr-only"
                        name="files"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        @input="onSelectedFiles"
                    >

                    <input
                        v-else
                        ref="files"
                        :multiple="multiple"
                        class="sr-only"
                        name="files"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, video/mp4"
                        @input="onSelectedFiles"
                    >
                </label>

                <p class="text-xs text-gray-600 mt-4">Maximum upload image size: 512MB.</p>
            </div>
            <!--
                <div class="text-muted-light dark:text-muted-dark">
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" v-model="isCheckboxAddWithCropper"   class="w-4 h-4 text-muted-light dark:text-muted-dark bg-gray-300 border-gray-700 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-muted-light dark:text-muted-dark">Add image with cropper</label>
                    </div>
                </div>
            -->
        </div>
 
        <ul v-if="media?.length"  class="relative w-full  overflow-y-scroll">
            <li
                v-for="(item, index) in media" :key="index"
                class="p-3 bg-prime-light dark:bg-prime-dark text-muted-light dark:text-muted-dark flex items-center space-x-2 my-2 rounded-lg"
            >

                <div v-if="item.previewUrl" class="w-20 h-20 bg-gray-300 flex-shrink-0 rounded-lg">
                    <img v-if="item.mimeType === 'image/jpeg' || item.mimeType === 'image/png'" :src="item.previewUrl" :alt="item.file.name" class="h-full w-full rounded-lg" >
                    
                    <video v-if="item.mimeType === 'video/mp4'" class="w-full h-full object-cover aspect-video">
                        <source :src="item.previewUrl" :type="item.mimeType" :title="item.name">
                    </video>
                </div>

                <div class="text-xs text-gray-400 flex-1 truncate">{{ item.file.name }}</div>

                <div v-if="!item.uploaded && !item.error" class="w-40 bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">

                    <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${item.progress}%`"/>

                    <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{ item.progress }}%</div>

                </div>

                <div v-if="item.error" class="relative text-xs lg:text-md text-red-600">{{ item.error }}</div>

                <div v-if="item.uploaded" class="flex justify-center items-center space-x-3">

                    <x-btn color="primary" icon strip :tooltip="{text: 'Edit'}" rounded @click="openEditFile(item.file)">
                        <Icon name="material-symbols:edit-square"  class="text-2xl"/>
                    </x-btn>
                </div>
            </li>
        </ul>

        <x-modal-photo-details
            :show="isShowModalPhotoDetails"
            :file="fileEdit"
            title="Add new assets"
            @added-to-library="emitAddedToLibrary"
            @close="closeModalEdit"
        />

        <x-modal-photo-cropper
            :show="isShowModalPhotoCropper"
            :file="uploadedImageUrl"
            :media="media"
            title="Photo cropper"
            @close="event => isShowModalPhotoCropper = event"
            @upload-crop-image="uploadCropImage"
        />
    </div>
</template>