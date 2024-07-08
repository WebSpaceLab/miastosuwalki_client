import { asSitemapUrl, defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {


    const sitemap = await $fetch<ReturnType<typeof asSitemapUrl>>('https://api.miastosuwalki.pl/api/urls')

    return sitemap.map((url: asSitemapUrl) => {
        return asSitemapUrl({
            loc: url.loc,
            lastmod: url.lastmod,
            changefreq: url.changefreq,
            priority: url.priority,
            images: [
                {
                    loc: url.images.loc,
                    title: url.images.title,
                    caption: url.images.caption

                }
            ],
            news: [
                {
                    date: url.news.date,
                    title: url.news.title,
                    publicationLanguage: url.news.publicationLanguage
                }
            ],
        })
    })
})
