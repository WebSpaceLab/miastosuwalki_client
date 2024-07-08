export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (slug === 'undefined') {
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

  const res: any = await $fetch("https://api.miastosuwalki.pl/api/ogImage/" + slug)

  return res
})
