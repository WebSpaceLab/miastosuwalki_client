import { useFlashStore } from './useFlashStore'
import { useHomepageStore } from './useHomepageStore'
import { useCookie } from '#imports'

export const useArticleStore = defineStore('article', {
    state: () => {
        return {
            data: [],

            allPublished: [],

            category: {},

            show: {
                data: {},
                latest: [],
            },

            advertisements: {
                top: [
                    {
                        id: 1,
                        name: "Racis development",
                        description: "Racis Development - Naszym celem jest zapewnienie szerokiej oferty mieszkań, apartamentów oraz lokali usługowych, które spełnią zróżnicowane oczekiwania nawet najbardziej wymagających Klientów.",
                        targetUrl: "https://racis.pl",
                        previewUrl: "/images/ads/racis.gif"
                    },
                    {
                        id: 2,
                        name: "Dni Suwałk 2024",
                        description: "Zapraszamy na Dni Suwałk 2024, które od będą się odbywać od 9 do 11 lipca. W programie wiele atrakcji!",
                        targetUrl: "https://www.facebook.com/events/470375238973873/?acontext=%7B%22event_action_history%22%3A%5B%7B%22surface%22%3A%22home%22%7D%2C%7B%22mechanism%22%3A%22search_data.valueults%22%2C%22surface%22%3A%22search%22%7D%5D%2C%22ref_notif_type%22%3Anull%7D",
                        previewUrl: "/images/ads/DniSuwalk2024.jpg"
                    },
                    {
                        id: 3,
                        name: "Rekrutacja",
                        description: "Od 3 czerwca ruszyła Internetowa Rejestracja Kandydatów. Przyszłych studentów zapraszamy do wyboru spośród 4 wydziałów i aż 21 kierunków!",
                        targetUrl: "https://www.puz.suwalki.pl",
                        previewUrl: "/images/ads/IMG_9224.jpeg"
                    },
                    {
                        id: 4,
                        name: "Hydro team",
                        description: "Hydro team - profesjonalne usługi hydrauliczne. Zapraszamy do zapoznania się z naszą ofertą na stronie internetowej. Zapraszamy do współpracy!",
                        targetUrl: "https://hydro-team.pl",
                        previewUrl: "/images/ads/HydroTeam.JPG"
                    },
                    {
                        id: 5,
                        name: "KlimaToZnawcy",
                        description: "KlimaToZnawcy - profesjonalne usługi klimatyzacyjne. Zapraszamy do zapoznania się z naszą ofertą na stronie internetowej. Zapraszamy do współpracy!",
                        targetUrl: "https://klimatoznawcy.pl",
                        previewUrl: "/images/ads/KlimaToZnawcy.JPG"
                    },
                    {
                        id: 6,
                        name: "ELEKTROMIL",
                        description: "Firma ELEKTROMIL Hurtownia Elektryczna powstała w maju 1991 roku. Zajmujemy się sprzedażą - również detaliczną - praktycznie wszystkich artykułów elektrycznych (w ofercie mamy ich ponad 10 tys.).",
                        targetUrl: "http://elektromil.com",
                        previewUrl: "/images/ads/elektromil.jpg"
                    },
                    {
                        id: 7,
                        name: "DPF Technik",
                        description: "DPF-Technik Regeneracja filtrów cząstek stałych - Dpf Fap Scr Kat to firma, która posiada najnowocześniejszą maszynę do regeneracji filtrów cząstek stałych.",
                        targetUrl: "",
                        previewUrl: "/images/ads/image_6483441.JPG"
                    },

                ],
                sidebar: null as [] | null,
            },

            edit: {
                id: null,
                title: '',
                slug: '',
                description: '',
                content: '',
                categoryId: null as number | null,

                slugGallery: '' as string | null,
                galleries: [],
                isPublished: false,
                cover: null as object | null,
                mediaId: null as number | null,
            },

            pagination: {
                total: null,
                current_page: null,
                per_page: null,
                first_page: 1,
            },

            form: useCookie(
                'article-form',
                {
                    default: () => ({
                        title: '',
                        slug: '',
                        description: '',
                        content: '',
                        categoryId: null,
                        advertisements: [],
                        galleries: [],
                        isPublished: false,
                        mediaId: null,
                    }),
                    watch: true,
                }
            ),

            months: [],
            queryParams: {},
            status: [
                { value: true, label: "Published" },
                { value: false, label: "No published" },
            ],
            isLoading: false,
            errors: null as object | null,
        }
    },

    actions: {
        async getPublishedArticles(query: any, perPage: number, page: number) {
            this.isLoading = true

            try {
                let { data } = await useFetchApi(`/api/articles`, {
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
                    this.allPublished = data.value.data.articles

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

        async getPublishedArticlesFromCategory(slug: string, query: any, perPage: number, page: number) {
            this.isLoading = true

            try {
                let { data } = await useFetchApi(`/api/articles/${slug}/categories`, {
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
                    this.allPublished = data.value.data.articles
                    this.category = data.value.data.category

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

        async getArticles(query: any, perPage: number, page: number) {
            this.isLoading = true
            try {
                let { data } = await useFetchApi(`/api/editor/articles`, {
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
                    this.data = data.value.data.articles

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

            let { data, pending, status, error } = await useFetchApi(`/api/editor/articles`, {
                method: 'POST',
                body: form
            }) as any


            if (error.value) {
                this.errors = error.value.data.errors
                /* TODO - Poprawić zachowanie erroru w inputach oraz w text edytorach */
                setTimeout(() => {
                    this.errors = null
                }, 10000)

            } else {
                if (data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                    this.formReset()
                    navigateTo('/dashboard/article')
                    useHomepageStore().get()
                }
            }

            this.isLoading = pending.value
        },

        async getEditArticle(slug: string) {
            this.isLoading = true
            let { data, pending, status, error } = await useFetchApi(`/api/editor/articles/${slug}`, {
                method: 'GET'
            }) as any

            if (error.value) {
                console.error(error.value)
            } else {
                if (data.value && status.value === 'success') {
                    this.edit.id = data.value.data.article.id
                    this.edit.title = data.value.data.article.title
                    this.edit.slug = data.value.data.article.slug
                    this.edit.description = data.value.data.article.description
                    this.edit.content = data.value.data.article.content
                    this.edit.categoryId = data.value.data.article.category?.id ?? null
                    this.edit.slugGallery = data.value.data.article.gallery?.slug
                    // this.edit.advertisements = data.value.data.article.advertisements
                    this.edit.galleries = data.value.data.article.gallery?.media ?? []
                    this.edit.cover = data.value.data.article.media
                    this.edit.mediaId = data.value.data.article.media?.id ?? null
                    this.edit.isPublished = data.value.data.article.isPublished

                }
            }

            this.isLoading = pending.value
        },

        async update(articleId: number, form: object) {
            this.isLoading = true
            this.errors = null

            let { data, pending, status, error } = await useFetchApi(`/api/editor/articles/${articleId}`, {
                method: 'PATCH',
                body: form
            }) as any

            if (error.value) {
                if (error.value.data.errors) {
                    this.errors = error.value.data.errors
                }

                if (error.value.data.flash) {
                    useFlashStore().error(error.value.data.flash.message)
                }

                return error.value
            } else {
                if (data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)

                    navigateTo('/dashboard/article')

                    useHomepageStore().get()

                    this.resetEdit()
                }
            }

            this.isLoading = pending.value
        },


        async getArticle(slug: string) {
            this.isLoading = true
            this.show.data = {}
            this.show.latest = []

            try {
                let { data, status, error } = await useFetchApi(`/api/articles/${slug}`, {
                    method: 'GET'
                }) as any

                if (error.value) {
                    navigateTo('/article/404')
                } else {
                    if (data.value && status.value === 'success') {
                        this.show.data = data.value.data.article
                        this.show.latest = data.value.data.latest

                        return

                        // if(data.value.data.advertisements) {
                        //     this.advertisements.sidebar = data.value.data.advertisements.sidebar
                        //     this.advertisements.top = data.value.data.advertisements.top
                        // }
                    }
                }
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },

        async destroy(articleId: number) {
            this.isLoading = true
            this.errors = null

            let { data, pending, status, error } = await useFetchApi(`/api/editor/article/${articleId}`, {
                method: 'DELETE'
            }) as any

            if (error.value) {
                console.error(error.value)
                if (error?.value.data.response.status === 422) {
                    this.errors = error.value.data.response.file[0]
                }

                useFlashStore().error(error.value.data.flash.message)
            } else {
                if (data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)

                    return data.value
                }
            }

            this.isLoading = pending.value
        },

        formReset() {
            this.form = {
                title: '',
                slug: '',
                content: '',
                description: '',
                categoryId: null,
                advertisements: [],
                galleries: [],
                isPublished: false,
                mediaId: null,
            }
        },
        resetEdit() {
            this.edit = {
                id: null,
                title: '',
                slug: '',
                description: '',
                content: '',
                categoryId: null,
                // advertisements: [],
                slugGallery: '',
                galleries: [],
                isPublished: false,
                cover: null,
                mediaId: null,
            }
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useArticleStore, import.meta.hot))
}