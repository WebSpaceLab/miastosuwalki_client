import { defineStore, acceptHMRUpdate } from 'pinia'

export const useHomepageStore = defineStore('homepage', {
    state: () => {
        return {
            category: {},

            data: {
                hero: {
                    town: {
                        isLoading: true
                    },
                    history: {
                        isLoading: true
                    },
                    technology: {
                        isLoading: true
                    },
                    culture: {
                        isLoading: true
                    },
                    sport: {
                        isLoading: true
                    },
                    nature: {
                        isLoading: true
                    },
                },
                latest: {
                    first: {
                        isLoading: true
                    },
                    last: [
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                    ]
                },
                town: [
                    { isLoading: true },
                    { isLoading: true },
                    { isLoading: true },
                    { isLoading: true },
                    { isLoading: true },
                ],
                history: {
                    first: {
                        isLoading: true
                    },
                    last: [
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                    ]
                },
                nature: {
                    first: {
                        isLoading: true
                    },
                    last: [
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                    ]
                },
                culture: {
                    first: {
                        isLoading: true
                    },
                    last: [
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                    ]
                },
                sport: {
                    first: {
                        isLoading: true
                    },
                    last: [
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                    ]
                },

                technology: [
                    { isLoading: true },
                    { isLoading: true },
                    { isLoading: true },
                    { isLoading: true },
                    { isLoading: true },
                ],
                about: [],
                advertisements: {
                    top: [
                        {
                            id: 1,
                            name: "Koncert otwarcia SBF 2024 – ZALEWSKI",
                            description: "Zapraszamy na koncert otwarcia Suwałki Blues Festival 2024. Na początek 17. edycji festiwalu wystąpi gwiazda polskiej sceny muzycznej, zdobywca wielu muzycznych nagród i twórca przebojów – ZALEWSKI.",
                            targetUrl: "https://suwalkiblues.com/koncert-otwarcia-sbf-2024-zalewski-support-noa-the-hell-drinks-es_1/",
                            previewUrl: "/images/ads/IMG_2549.jpg"
                        },
                        {
                            id: 2,
                            name: "Suwałki Blues Festival 2024",
                            description: "Suwałki Blues Festival 2024",
                            targetUrl: "https://suwalkiblues.com/suwalki-blues-festival-2023/",
                            previewUrl: "/images/ads/IMG_2550.jpg"
                        },
                        {
                            id: 3,
                            name: "Rekrutacja",
                            description: "Od 3 czerwca ruszyła Internetowa Rejestracja Kandydatów. Przyszłych studentów zapraszamy do wyboru spośród 4 wydziałów i aż 21 kierunków!",
                            targetUrl: "https://www.puz.suwalki.pl",
                            previewUrl: "/images/ads/IMG_9224.jpeg"
                        },
                        {
                            id: 4,
                            name: "Hydro team",
                            description: "Hydro team - profesjonalne usługi hydrauliczne. Zapraszamy do zapoznania się z naszą ofertą na stronie internetowej. Zapraszamy do współpracy!",
                            targetUrl: "https://hydro-team.pl",
                            previewUrl: "/images/ads/HydroTeam.JPG"
                        },
                        {
                            id: 5,
                            name: "KlimaToZnawcy",
                            description: "KlimaToZnawcy - profesjonalne usługi klimatyzacyjne. Zapraszamy do zapoznania się z naszą ofertą na stronie internetowej. Zapraszamy do współpracy!",
                            targetUrl: "https://klimatoznawcy.pl",
                            previewUrl: "/images/ads/KlimaToZnawcy.JPG"
                        },
                        {
                            id: 6,
                            name: "ELEKTROMIL",
                            description: "Firma ELEKTROMIL Hurtownia Elektryczna powstała w maju 1991 roku. Zajmujemy się sprzedażą - również detaliczną - praktycznie wszystkich artykułów elektrycznych (w ofercie mamy ich ponad 10 tys.).",
                            targetUrl: "http://elektromil.com",
                            previewUrl: "/images/ads/elektromil.jpg"
                        },
                        {
                            id: 7,
                            name: "DPF Technik",
                            description: "DPF-Technik Regeneracja filtrów cząstek stałych - Dpf Fap Scr Kat to firma, która posiada najnowocześniejszą maszynę do regeneracji filtrów cząstek stałych.",
                            targetUrl: "",
                            previewUrl: "/images/ads/image_6483441.JPG"
                        },

                    ],
                    sidebar: null as [] | null,
                },
            },

            isLoading: false,
            errors: null as object | null,
        }
    },

    actions: {
        async get() {
            this.isLoading = true

            try {
                const res = await $fetch(`/api/homepage`, {
                    method: 'GET'
                }) as any

                if (res.data) {
                    if (res.data?.hero) {
                        if (res.data?.hero.town) {
                            this.data.hero.town = { ...res.data?.hero.town, isLoading: false };
                        }

                        if (res.data?.hero.history) {
                            this.data.hero.history = { ...res.data?.hero.history, isLoading: false };
                        }

                        if (res.data?.hero.technology) {
                            this.data.hero.technology = { ...res.data?.hero.technology, isLoading: false };
                        }

                        if (res.data?.hero.culture) {
                            this.data.hero.culture = { ...res.data?.hero.culture, isLoading: false };
                        }

                        if (res.data?.hero.sport) {
                            this.data.hero.sport = { ...res.data?.hero.sport, isLoading: false };
                        }

                        if (res.data?.hero.nature) {
                            this.data.hero.nature = { ...res.data?.hero.nature, isLoading: false };
                        }
                    }

                    if (res.data?.latest) {
                        res.data?.latest.forEach((element: any, index: any) => {
                            if (index === 0) {
                                this.data.latest.first = { ...element, isLoading: false };
                            } else {
                                this.data.latest.last.map((item, i) => {
                                    if (i === index - 1) {
                                        this.data.latest.last[i] = { ...element, isLoading: false };
                                    }
                                });
                            }
                        });
                    }

                    if (res.data?.town) {
                        res.data?.town.forEach((element: any, index: any) => {
                            if (index < 5) {
                                this.data.town[index] = { ...element, isLoading: false };
                            }
                        });
                    }

                    if (res.data?.history) {

                        res.data?.history.forEach((element: any, index: any) => {
                            if (index === 0) {
                                this.data.history.first = { ...element, isLoading: false };
                            } else {
                                this.data.history.last.map((item, i) => {
                                    if (i === index - 1) {
                                        this.data.history.last[i] = { ...element, isLoading: false };
                                    }
                                });
                            }
                        });
                    }

                    if (res.data?.nature) {

                        res.data?.nature.forEach((element: any, index: any) => {
                            if (index === 0) {
                                this.data.nature.first = { ...element, isLoading: false };
                            } else {
                                this.data.nature.last.map((item, i) => {
                                    if (i === index - 1) {
                                        this.data.nature.last[i] = { ...element, isLoading: false };
                                    }
                                });
                            }
                        });
                    }

                    if (res.data?.culture) {

                        res.data?.culture.forEach((element: any, index: any) => {
                            if (index === 0) {
                                this.data.culture.first = { ...element, isLoading: false };
                            } else {
                                this.data.culture.last.map((item, i) => {
                                    if (i === index - 1) {
                                        this.data.culture.last[i] = { ...element, isLoading: false };
                                    }
                                });
                            }
                        });
                    }

                    if (res.data?.sport) {

                        res.data?.sport.forEach((element: any, index: any) => {
                            if (index === 0) {
                                this.data.sport.first = { ...element, isLoading: false };
                            } else {
                                this.data.sport.last.map((item, i) => {
                                    if (i === index - 1) {
                                        this.data.sport.last[i] = { ...element, isLoading: false };
                                    }
                                });
                            }
                        });
                    }

                    if (res.data?.technology) {
                        res.data?.technology.forEach((element: any, index: any) => {
                            if (index < 5) {
                                this.data.technology[index] = { ...element, isLoading: false };
                            }
                        });
                    }

                    this.data.about = res.data?.about

                    // if(data.value.data?.advertisements) {
                    //     if(data.value.data?.advertisements.top) {
                    //         this.data.advertisements.top  = data.value.data?.advertisements.top
                    //     }

                    //     if(data.value.data?.advertisements.sidebar) {
                    //         this.data.advertisements.sidebar = data.value.data?.advertisements.sidebar
                    //     }
                    // }
                }
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useHomepageStore, import.meta.hot))
}