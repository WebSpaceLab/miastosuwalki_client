import { useAuthStore } from './useAuthStore'

export const useNavbarStore = defineStore('navbar', {
    state: () => {
        return {
            isNavbarDropdown: false,
            isZoom: false,
            isShowSm: false,
            isScroll: false,
            isShowLogin: false,
            isShowRegister: false,
            isShowForgotPassword: false,
            isShowResetPassword: true,
        }
    },

    actions: {
        activate() {
            this.isNavbarDropdown = true
        },

        close() {
            this.isNavbarDropdown = false
        },

        openMenuSm() {
            this.isShowSm = true
        },

        closeMenuSm() {
            this.isShowSm = false
        },

        switchOpenMenuSm() {
            this.isShowSm = !this.isShowSm
        },

        switchLogin(event = false) {
            this.isShowLogin = event

            // if(!event) {
            //     useAuthStore().reset()
            // }
        },

        switchRegister(event = false) {
            this.isShowRegister = event

            if (!event) {
                useAuthStore().reset()
            }
        },

        switchForgotPassword(event = false) {
            this.isShowForgotPassword = event

            if (!event) {
                useAuthStore().reset()
            }
        },

        showRegister() {
            this.switchLogin(false)
            this.switchForgotPassword(false)
            this.switchRegister(true)
        },

        showLogin() {
            this.switchLogin(true)
            this.switchForgotPassword(false)
            this.switchRegister(false)
        },

        showForgotPassword() {
            this.switchLogin(false)
            this.switchForgotPassword(true)
            this.switchRegister(false)
        },

        reset() {
            this.isShowResetPassword = true
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNavbarStore, import.meta.hot))
}