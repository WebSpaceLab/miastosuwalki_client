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
                            name: "Racis development",
                            description: "Racis Development - Naszym celem jest zapewnienie szerokiej oferty mieszkań, apartamentów oraz lokali usługowych, które spełnią zróżnicowane oczekiwania nawet najbardziej wymagających Klientów.",
                            targetUrl: "https://racis.pl",
                            previewUrl: "/images/ads/racis.gif"
                        },
                        {
                            id: 2,
                            name: "Dni Suwałk 2024",
                            description: "Zapraszamy na Dni Suwałk 2024, które od będą się odbywać od 9 do 11 lipca. W programie wiele atrakcji!",
                            targetUrl: "https://www.facebook.com/events/470375238973873/?acontext=%7B%22event_action_history%22%3A%5B%7B%22surface%22%3A%22home%22%7D%2C%7B%22mechanism%22%3A%22search_data.valueults%22%2C%22surface%22%3A%22search%22%7D%5D%2C%22ref_notif_type%22%3Anull%7D",
                            previewUrl: "/images/ads/DniSuwalk2024.jpg"
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
                const { data, error } = await useFetchApi('/api/homepage') as any

                if (error.value) {
                    this.errors = error.value
                    return
                }

                if (data.value) {
                    if (data.value.data?.hero) {
                        if (data.value.data?.hero.town) {
                            this.data.hero.town = { ...data.value.data?.hero.town, isLoading: false };
                        }

                        if (data.value.data?.hero.history) {
                            this.data.hero.history = { ...data.value.data?.hero.history, isLoading: false };
                        }

                        if (data.value.data?.hero.technology) {
                            this.data.hero.technology = { ...data.value.data?.hero.technology, isLoading: false };
                        }

                        if (data.value.data?.hero.culture) {
                            this.data.hero.culture = { ...data.value.data?.hero.culture, isLoading: false };
                        }

                        if (data.value.data?.hero.sport) {
                            this.data.hero.sport = { ...data.value.data?.hero.sport, isLoading: false };
                        }

                        if (data.value.data?.hero.nature) {
                            this.data.hero.nature = { ...data.value.data?.hero.nature, isLoading: false };
                        }
                    }

                    if (data.value.data?.latest) {
                        data.value.data?.latest.forEach((element: any, index: any) => {
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

                    if (data.value.data?.town) {
                        data.value.data?.town.forEach((element: any, index: any) => {
                            if (index < 5) {
                                this.data.town[index] = { ...element, isLoading: false };
                            }
                        });
                    }

                    if (data.value.data?.history) {

                        data.value.data?.history.forEach((element: any, index: any) => {
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

                    if (data.value.data?.nature) {

                        data.value.data?.nature.forEach((element: any, index: any) => {
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

                    if (data.value.data?.culture) {

                        data.value.data?.culture.forEach((element: any, index: any) => {
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

                    if (data.value.data?.sport) {

                        data.value.data?.sport.forEach((element: any, index: any) => {
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

                    if (data.value.data?.technology) {
                        data.value.data?.technology.forEach((element: any, index: any) => {
                            if (index < 5) {
                                this.data.technology[index] = { ...element, isLoading: false };
                            }
                        });
                    }

                    this.data.about = data.value.data?.about

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