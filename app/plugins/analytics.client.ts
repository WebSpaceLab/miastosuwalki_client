export default defineNuxtPlugin((nuxtApp) => {
    const cookieControl = useCookieControl()
    console.log('cookieControl', cookieControl.cookiesEnabledIds.value?.includes('ga'))
    if (cookieControl.cookiesEnabledIds.value?.includes('ga')) {
        console.log('Google Analytics enabled')
    }
})