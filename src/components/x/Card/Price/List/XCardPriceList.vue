<script setup>
const { $price } = useNuxtApp()
const emits = defineEmits(['addedToLibrary']);
defineProps({
    price: {
        type: Object,
        required: true
    },
})

const editPreviewItem = ref(null)

const form = reactive({
    title: '',
    subtitle: '',
    isActive: true,
})

const isPriceListTitleEdit = ref(false)
const isPriceListSubtitleEdit = ref(false)

const isShowModalPricePackageEdit = ref(false)
const isShowModalPricePackageCreate = ref(false)
const priceListId = ref(null)

const isShowModalPricePackageInformationCreate = ref(false)
const isShowModalPricePackageInformationEdit = ref(false)
const pricePackageId = ref(null)

const isHover = ref(false)

function openUpdatedField(price, field) {
    form.title = price.title
    form.subtitle = price.subtitle
    form.isActive = price.isActive

    if(field === 'title') {
        isPriceListTitleEdit.value = true
        isPriceListSubtitleEdit.value = false
    } else if(field === 'subtitle') {
        isPriceListSubtitleEdit.value = true
        isPriceListTitleEdit.value = false
    } else {
        isPriceListTitleEdit.value = true
        isPriceListSubtitleEdit.value = true
    }
}

function closeUpdatedField() {
    isPriceListTitleEdit.value = false
    isPriceListSubtitleEdit.value = false

    clearForm()
}

async function updatePriceList(priceId) {
    await $price.updatePriceList(form, priceId)

    closeUpdatedField()
    addedToLibrary(true)
}

function clearForm() {
    form.title = ''
    form.subtitle = ''
    form.isActive = true
}

function showModalPricePackageEdit(item) {
    editPreviewItem.value = item
    isShowModalPricePackageEdit.value = true
}

function showModalPricePackageInformationCreate(pack) {
    pricePackageId.value = pack.id
    isShowModalPricePackageInformationCreate.value = true
}

function showModalPricePackageInformationEdit(info) {
    editPreviewItem.value = info
    isShowModalPricePackageInformationEdit.value = true
}

// async function deletedPackage(packageId) {
//     if (confirm(`Czy na pewno chcesz usunąć ten pakiet?`)) {     
//         // await $price.destroyPackage(id)
//         // await getPriceList()
//         // await $price.get()
//     }
// }

async function activePriceList(priceId) {
    await $price.activePriceList(priceId)
    addedToLibrary(true)
}

async function activePricePackage(packageId) {
    await $price.activePricePackage(packageId)
    addedToLibrary(true)
}

async function destroyPriceList(priceId) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {     
        await $price.deletedPriceList(priceId)
        addedToLibrary(true)
    }
}

async function deletedPricePackage(packageId) {
    if (confirm(`Czy na pewno chcesz usunąć ten pakiet?`)) {     
        await $price.deletedPricePackage(packageId)
        addedToLibrary(true)
    }
}

async function deletedPricePackageInformation(infoId) {
    if (confirm(`Czy na pewno chcesz usunąć tą informację?`)) {     
        await $price.deletedPricePackageInformation(infoId)
        addedToLibrary(true)
    }
}

// function editPricePackage(item) {
//     editPreviewItem.value = item

//     isShowModalPackageEdit.value = true
// }

function showModalPricePackageCreate(priceId) {
    priceListId.value = priceId
    isShowModalPricePackageCreate.value = true
}

const addedToLibrary = (event) => {
    emits('addedToLibrary', event)
}
</script>

<template>
    <x-field-action @is-hover="event => isHover = event">
        <template #action>
            <x-btn
                :tooltip="{text: 'Add new package'}"
                color="secondary-outline"
                icon
                rounded
                @click="showModalPricePackageCreate(price.id)"
            >
                <Icon name="material-symbols:add-circle-rounded" class="text-2xl"/>
            </x-btn>

            <x-btn
                v-if="!isPriceListTitleEdit && !isPriceListSubtitleEdit"
                class="h-9 w-9"
                :tooltip="{text: 'Activate the package'}"
                color="success-outline"
                rounded
                icon
                @click="openUpdatedField(price, '')"
            >
                <Icon name="material-symbols:edit" class="text-xl" />
            </x-btn>

            <x-btn
                class="h-9 w-9"
                :tooltip="{text: price.isActive ? 'deactivate the package' :'activate the package'  }"
                :color="price.isActive ? 'danger-outline' : 'success-outline'"
                rounded
                icon
                @click="activePriceList(price.id)"
            >
                <Icon v-if="price.isActive" name="mdi:layers-remove" class="text-xl" />

                <Icon v-else name="codicon:layers-active" class="text-xl" />
            </x-btn>

            <x-btn
                v-if="isPriceListTitleEdit || isPriceListSubtitleEdit"
                class="h-9 w-9"
                :tooltip="{text: 'Save changes'}"
                color="success-outline"
                rounded
                icon
                @click="updatePriceList(price.id)"
            >
                <Icon name="material-symbols:save-as-rounded" class="text-xl" />
            </x-btn>

            <x-btn
                v-if="isPriceListTitleEdit || isPriceListSubtitleEdit"
                class="h-9 w-9"
                :tooltip="{text: 'Give up on change'}"
                color="warning-outline"
                rounded
                icon
                @click="closeUpdatedField()"
            >
                <Icon name="mdi:content-save-off" class="text-xl" />
            </x-btn>

            <x-btn
                :tooltip="{text: 'Deleted price list'}"
                class="h-9 w-9"
                color="danger-outline"
                icon
                rounded
                @click="destroyPriceList(price.id)"
            >
                <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
            </x-btn>
        </template>

        <div class="flex flex-col justify-center items-center p-6 mb-10">
            <div v-if="price.isActive === false" class="w-full absolute left-0 top-0 text-warning-600 p-3 box-border">
                No active
            </div>

            <div v-if="price.isActive === true && isHover" class="w-full absolute left-0 top-0 text-success-600 p-3 box-border">
                Active
            </div>

            <div class="w-150 flex flex-col space-y-6 mb-10">
                <div v-if="!isPriceListTitleEdit">
                    <h2
                        v-if="price.title"
                        class="text-3xl text-center text-bold light:text-muted-light dark:text-muted-dark mb-2"
                        @click="openUpdatedField(price, 'title')"
                    >
                        {{ price.title }}
                    </h2>
                </div>
    
                <div v-else @keyup.enter="updatePriceList(price.id)" @keydown.esc="closeUpdatedField()">
                    <x-input
                        v-model="form.title"
                        class="mb-4"
                        label="Title"
                        name="title"
                        :error="$price.errors && $price.errors.title ? $price.errors.title[0] : null"
                    />
                </div>
                
                <div v-if="!isPriceListSubtitleEdit">
                    <h3
                        v-if="price.subtitle"
                        class="text-xl text-center text-bold light:text-gray-600 dark:text-gray-400 m-0"
                        @click="openUpdatedField(price, 'subtitle')"
                    >
                        {{ price.subtitle }}
                    </h3>
                </div>
    
                <div v-else @keyup.enter="updatePriceList(price.id)" @keydown.esc="closeUpdatedField()">
                    <x-input
                        v-model="form.subtitle"
                        class="mb-4"
                        label="Subtitle"
                        name="title"
                        :error="$price.errors && $price.errors.title ? $price.errors.title[0] : null"
                    />
                </div>
            
            </div>
    
            <div class="relative w-auto grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-flow-col justify-center items-center gap-8 group box-border">
                <template v-for="(pack, index) in price.packages" :key="index">
                    <x-field-action class="h-full group-hover:blur-sm hover:!blur-none group-hover:scale-95 hover:!scale-100 duration-500 box-border">
                        <template #action>
                            <x-btn
                                :tooltip="{text: 'Add information to the package.'}"
                                color="secondary-outline"
                                icon
                                rounded
                                @click="showModalPricePackageInformationCreate(pack)"
                            >
                                <Icon name="material-symbols:add-circle-rounded" class="text-2xl"/>
                            </x-btn>

                            <x-btn
                                class="h-9 w-9"
                                :tooltip="{text: 'Edit'}"
                                color="secondary-outline"
                                rounded
                                icon
                                @click="showModalPricePackageEdit(pack)"
                            >
                                <Icon name="material-symbols:edit" class="text-xl" />
                            </x-btn>

                            <x-btn
                                class="h-9 w-9"
                                :tooltip="{text: pack.isActive ? 'deactivate the package' :'activate the package'  }"
                                :color="pack.isActive ? 'danger-outline' : 'success-outline'"
                                rounded
                                icon
                                @click="activePricePackage(pack.id)"
                            >
                                <Icon v-if="pack.isActive" name="mdi:layers-remove" class="text-xl" />

                                <Icon v-else name="codicon:layers-active" class="text-xl" />
                            </x-btn>
                            
                            <x-btn
                                :tooltip="{text: 'Deleted'}"
                                class="h-9 w-9"
                                color="danger-outline"
                                icon
                                rounded
                                @click="deletedPricePackage(pack.id)"
                            >
                                <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                            </x-btn>
                        </template>

                        <x-card-price 
                            :pack="pack" 
                            :index="index" 
                            :action="
                                pack.isActive ? 
                                        isHover ? isHover : false 
                                    : true
                            "
                        >
                            <template #action>
                                <div class="px-3">
                                    <div v-if="pack.isActive === false" class="w-full absolute left-0 top-0 text-warning-600 p-3 box-border">
                                        No active
                                    </div>

                                    <div v-if="pack.isActive === true && isHover" class="w-full absolute left-0 top-0 text-success-600 p-3 box-border">
                                        Active
                                    </div>
                                </div>
                            </template>

                            <template #information>
                                <x-field-action  v-for="(info, index) in pack.information" :key="index" >
                                    <template #action>
                                        <x-btn
                                            class="h-9 w-9"
                                            :tooltip="{text: 'Edit'}"
                                            color="secondary-outline"
                                            rounded
                                            icon
                                            @click="showModalPricePackageInformationEdit(info)"
                                        >
                                            <Icon name="material-symbols:edit" class="text-xl" />
                                        </x-btn>
                                        
                                        <x-btn
                                            :tooltip="{text: 'Deleted'}"
                                            class="h-9 w-9"
                                            color="danger-outline"
                                            icon
                                            rounded
                                            @click="deletedPricePackageInformation(info.id)"
                                        >
                                            <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                        </x-btn>
                                    </template>

                                    <p 
                                        class="w-full px-5 relative flex flex-wrap flex-row semibold text-sm" 
                                        :class="[info.isHighlighted ?
                                                pack.isHighlighted ? ' text-primary-600 ' : 'text-secondary-600' 
                                                : 'text-blueGray-700 dark:text-blueGray-500'
                                        ]"
                                    >
                                        <span class="absolute top-0 -left-3">
                                            <Icon 
                                                name="clarity:success-line" 
                                                class="text-xl " 
                                                :class="[info.isHighlighted ?
                                                pack.isHighlighted ? ' text-primary-600 ' : 'text-secondary-600' 
                                                : 'text-blueGray-700 dark:text-blueGray-500'
                                                ]" 
                                            />
                                        </span>

                                        {{ info.info }}
                                    </p>
                                </x-field-action>

                            </template>

                        </x-card-price>
                    </x-field-action>
                </template>
            </div>
    
            <x-modal-price-package-create
                class="w-full md:w-1/2"
                :show="isShowModalPricePackageCreate"
                :price-list-id="priceListId"
                @close="event => isShowModalPricePackageCreate = false"
                @added-to-library="addedToLibrary"
            />

            <x-modal-price-package-edit
                class="w-full md:w-1/2"
                :show="isShowModalPricePackageEdit"
                :price-package="editPreviewItem"
                @close="event => isShowModalPricePackageEdit = false"
                @added-to-library="addedToLibrary"
            />
    
            <x-modal-price-package-information-create
                class="w-full md:w-1/2"
                :show="isShowModalPricePackageInformationCreate"
                :price-package-id="pricePackageId"
                title="Add information to the package"
                @close="event => isShowModalPricePackageInformationCreate = false"
                @added-to-library="addedToLibrary"
            />

            <x-modal-price-package-information-edit
                :show="isShowModalPricePackageInformationEdit"
                :price-package-information="editPreviewItem"
                title="Edit information to the package"
                class="w-full md:w-1/2"
                @close="event => isShowModalPricePackageInformationEdit = false"
                @added-to-library="addedToLibrary"
            />
            
        </div>
    </x-field-action>
</template>