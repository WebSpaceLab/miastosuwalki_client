import { defineStore, acceptHMRUpdate } from 'pinia'
import { useAuthStore } from './useAuthStore'
import { IUser } from '../types/IUser'


export const useAccountStore = defineStore('account', {
    state: () => {
        return {
            user: null as any | null,

            roles: [],
            progressImage: 0 as number 
        }
    },

    actions : {
        init(user: IUser) {
            this.user = user
            this.renameRoles()
        },

        renameRoles() {
            if(this.user) {
                this.roles = []
                this.user.roles.forEach((role: string) => {
                    this.roles.push(role.substring(5))
                }) 
            }
        },

        async updateUserImage(form: any) {
            if(this.user) {
                return await $axios.post(`${this.user['@id']}/avatar-update`, form, {
                    headers: {
                        "Authorization": 'Bearer ' + useAuthStore().token,
                    },
                    onUploadProgress: (event: any) => {
                        this.progressImage = Math.round(event.loaded * 100 / event.total)
                    },
                })
            }
        },   
      
        async updateUser(username: string, bio: string, firstName: string, lastName: string) {
            if(this.user) {
                return await useFetchApi(this.user['@id'], {
                    method: 'PATCH',
                    body: {
                        username,
                        bio,
                        firstName,
                        lastName
                    }
                })
            }
        },

        async updatePassword(form: any) {
            if(this.user) {
                return await useFetchApi(`${this.user['@id']}/update-password`, {
                    method: 'PATCH',
                    body: form
                })
            }
        },
    },
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}