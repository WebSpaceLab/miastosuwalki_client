import { defineStore, acceptHMRUpdate } from 'pinia'

import { useFlashStore } from './useFlashStore'

export const usePartnerStore = defineStore('partner', {
    state: () => {
        return {
            data: [
                {
                    id: 1,
                    src: '/images/partners/fundacja_teraz_wschód.JPG',
                    title: 'Fundacja Teraz Wschód',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 2,
                    src: '/images/partners/mas.JPG',
                    title: 'Prowadzenie kompleksowe',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 3,
                    src: '/images/partners/osir.JPG',
                    title: 'Prowadzenie kompleksowe',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 4,
                    src: '/images/partners/państwowa_uczelnia_zawodowa.JPG',
                    title: 'Prowadzenie kompleksowe',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 5,
                    src: '/images/partners/pgodne_suwałki.JPG',
                    title: 'Prowadzenie kompleksowe',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 6,
                    src: '/images/partners/pwik.JPG',
                    title: 'Prowadzenie kompleksowe',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 7,
                    src: '/images/partners/samobrona_wojownicy.JPG',
                    title: 'Prowadzenie kompleksowe',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 8,
                    src: '/images/partners/suwalski_ośrodek_kultury.JPG',
                    title: 'Prowadzenie kompleksowe',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 9,
                    src: '/images/partners/suwalski_park_krajobrazowy.JPG',
                    title: 'Prowadzenie kompleksowe',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 10,
                    src: '/images/partners/3film.JPG',
                    title: 'Prowadzenie kompleksowe',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 11,
                    src: '/images/partners/srodowiskowy_dom_samopomcy.JPG',
                    title: 'Prowadzenie kompleksowe',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 12,
                    src: '/images/partners/klimat_tworzą_ludzie.JPG',
                    title: 'Prowadzenie kompleksowe',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 13,
                    src: '/images/partners/muzeum_w_suwalkach.JPG',
                    title: 'Muzeum w Suwałkch',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 14,
                    src: '/images/partners/pogodny_biały_miś.JPG',
                    title: 'Pogodny Biały Miś',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 15,
                    src: '/images/partners/gmina_herb.png',
                    title: 'Gmina Suwałki',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                },
                {
                    id: 16,
                    src: '/images/partners/falko-fish.jpg',
                    title: 'Falko Fish',
                    content: 'Prowadzenie kompleksowo Facebooka, Instagrama czy TikToka. Tworzenie treści oraz okraszanie to odpowiednim dopasowanym do twoich odbiorców tekstem'
                }

            ],

            pagination: {
                total: null,
                current_page: null,
                per_page: null,
                first_page: 1,
            },

            months: [],
            queryParams: {},
            status: [],
            isLoading: false,
            errors: null as object | null,
        }
    },

    actions: {
        async get(query: any, perPage: number, page: number) {
            this.isLoading = true
            try {
                let { data } = await useFetchApi(`/api/admin/about`, {
                    method: 'GET',
                    params: {
                        term: query.term,
                        status: query.status,
                        month: query.month,
                        orderBy: query.orderBy,
                        orderDir: query.orderDir,
                        per_page: perPage,
                        page: page
                    }
                }) as any

                if (data.value) {
                    this.data = data.value.data.about

                    this.pagination.total = data.value.data.pagination.total
                    this.pagination.current_page = data.value.data.pagination.current_page
                    this.pagination.per_page = data.value.data.pagination.per_page

                    this.status = data.value.data.status
                    this.months = data.value.data.months
                    this.queryParams = data.value.data.queryParams
                }
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },

        async create(form: object) {
            this.isLoading = true
            this.errors = null

            let { data, error, pending } = await useFetchApi(`/api/admin/about`, {
                method: 'POST',
                body: form
            }) as any



            if (error.value) {
                if (error.value.data) {
                    if (error.value.data.errors) {
                        this.errors = error.value.data.errors
                    }

                    if (error.value.data.flash) {
                        useFlashStore().error(error.value.data.flash.message)
                    }
                }

                console.error(error.value)
            } else {
                if (data.value && data.value.flash) {
                    useFlashStore().success(data.value.flash.message)
                }
            }

            this.isLoading = pending.value
        },

        async update(aboutId: number, form: object) {
            this.isLoading = true
            this.errors = null


            let { data, pending, error, status } = await useFetchApi(`/api/admin/about/${aboutId}`, {
                method: 'PATCH',
                body: form
            }) as any

            if (error.value) {
                if (error.value.data) {
                    if (error.value.data.errors) {
                        this.errors = error.value.data.errors
                    }

                    if (error.value.data.flash) {
                        useFlashStore().error(error.value.data.flash.message)
                    }
                }

                console.error(error.value)
            } else {
                if (data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }

            this.isLoading = pending.value
        },

        async destroy(aboutId: number) {
            this.isLoading = true
            this.errors = null


            let { data, pending, status, error } = await useFetchApi(`/api/admin/about/${aboutId}`, {
                method: 'DELETE'
            }) as any

            if (error.value) {
                if (error.value.data) {
                    if (error?.value.data.response.status === 422) {
                        this.errors = error.value.data.response.file[0]
                    }

                    if (error.value.data.flash) {
                        useFlashStore().error(error.value.data.flash.message)
                    }
                }

                console.error(error)
            } else {
                if (data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }

            this.isLoading = pending.value
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAboutStore, import.meta.hot))
}