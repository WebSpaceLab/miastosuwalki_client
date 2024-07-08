export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  // const config = useRuntimeConfig()
  // const path = import.meta.env.DEV ? 'https://localhost:8000' : 'https://api.miastosuwalki.pl'

  const data = await $fetch("https://api.miastosuwalki.pl/api/homepage/", {
    method: 'GET',
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      // referer: config.public.appUrl
    },
  })


  return data
})
