export default defineNuxtPlugin((nuxtApp) => {
    const cookieControl = useCookieControl()
    const { gtag, $script } = useScriptGoogleAnalytics()
    function initGoogleAnalytics() {

    }
    if (cookieControl.cookiesEnabledIds.value?.includes('ga')) {
        gtag('event', 'conversion')
        $script.load()
        console.log('Google Analytics enabled', $script.status)

    } else {

        $script.remove()
        console.log('Google Analytics disabled', $script.status)
    }
})