import { useFlashStore } from './useFlashStore'

export const useCategoriesStore = defineStore('categories', {
    state: () => {
        return {
            data: [],

            activeCategories: [],

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
        async getActiveCategories() {
            this.isLoading = true

            try {
                let { data } = await useFetchApi('/api/categories', {
                    method: 'GET'
                }) as any

                if (data.value) {
                    this.activeCategories = data.value.data.categories
                }
            } catch (error) {
                console.error(error)

            } finally {
                this.isLoading = false
            }
        },

        async get(query: any, perPage: number, page: number) {
            this.isLoading = true

            try {
                let { data } = await useFetchApi(`/api/admin/categories`, {
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
                    this.data = data.value.data.categories

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

            let { data, pending, status, error } = await useFetchApi(`/api/admin/categories`, {
                method: 'POST',
                body: form
            }) as any


            if (error.value) {
                if (error.value.data.errors) {
                    this.errors = error.value.data.errors
                }

                if (error.value.data.flash) {
                    useFlashStore().error(error.value.data.flash.message)
                }

                console.error(error.value)
            } else {
                if (data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }

            this.isLoading = pending.value
        },

        async update(id: number, form: object) {
            this.isLoading = true
            this.errors = null

            let { data, pending, status, error } = await useFetchApi(`/api/admin/categories/${id}`, {
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

                console.error(error.value)
            } else {
                if (data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }

            this.isLoading = pending.value
        },

        async destroy(id: number) {
            this.isLoading = true
            this.errors = null

            let { data, pending, status, error } = await useFetchApi(`/api/admin/categories/${id}`, {
                method: 'DELETE'
            }) as any


            if (error.value) {
                console.error(error.value)
                if (error?.value.data.response.status === 422) {
                    this.errors = error.value.data.response.file[0]
                }

                useFlashStore().error(error.value.data.flash.message)

                console.error(error.value)
            } else {
                if (data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)

                    return data.value
                }
            }

            this.isLoading = pending.value
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCategoriesStore, import.meta.hot))
}