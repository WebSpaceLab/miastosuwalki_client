import axios from "axios"

export default defineNuxtPlugin((NuxtApp) => {
    axios.defaults.withCredentials = true
    // axios.defaults.baseURL = 'https://localhost:8000'
    axios.defaults.baseURL = 'https://api.miastosuwalki.pl'

    return {
        provide: {
            axios: axios
        },
    }
})