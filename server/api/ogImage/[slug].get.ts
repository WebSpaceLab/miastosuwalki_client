export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')
    const url = useRuntimeConfig().proxyUrl
    const noRes = () => {
        return {
            ogImage: {
                title: "Portal Internetowy Miasto Suwałki",
                description: "Odkryj urok Miasta Suwałki online – Twoje źródło lokalnych informacji i inspiracji!",
                image: "https://miastosuwalki.pl/images/Logo.png",
                slug: "",
                author: "Miasto Suwałki",
                datePublished: "2024-02-29",
                dateModified: "2024-02-29",
            }
        }
    }

    if (slug === 'undefined') {
        return noRes()
    }

    const path = url + "/api/ogImage/" + slug
    return proxyRequest(event, path)
    // return noRes()
})
