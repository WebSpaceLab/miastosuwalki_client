import { useGeneralStore } from "~~/src/stores/useGeneralStore";
import { useAuthStore } from "~~/src/stores/useAuthStore";
import { useNavbarStore } from "~~/src/stores/useNavbarStore";
import { useAboutStore } from "~~/src/stores/useAboutStore";
import { useFlashStore } from "~~/src/stores/useFlashStore";
import { useContactStore } from "~~/src/stores/useContactStore";
import { useSocialStore } from "~~/src/stores/useSocialStore";
import { useAccountStore } from "~~/src/stores/useAccountStore";
import { useDashboardStore } from "~~/src/stores/useDashboardStore";
import { useMetaTagsStore } from "~~/src/stores/useMetaTagsStore";
import { useMediaStore } from "~~/src/stores/useMediaStore";
import { useInboxStore } from "~~/src/stores/useInboxStore";
import { usePriceStore } from "~~/src/stores/usePriceStore";
import { useFeatureStore } from "~~/src/stores/useFeatureStore";
import { useHeroStore } from "~~/src/stores/useHeroStore";
import { useTeamStore } from "~~/src/stores/useTeamStore";
import { useArticleStore } from "~~/src/stores/useArticleStore";
import { useCategoriesStore } from "~~/src/stores/useCategoriesStore";
import { useUsersStore } from "~~/src/stores/useUsersStore";
import { useAdvertisementStore } from "~~/src/stores/useAdvertisementStore";
import { useHomepageStore } from "~~/src/stores/useHomepageStore";
import { useGalleriesStore } from "~~/src/stores/useGalleriesStore";
import { usePartnerStore } from "~~/src/stores/usePartnerStore";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            auth: useAuthStore(),
            general: useGeneralStore(),
            navbar: useNavbarStore(),
            about: useAboutStore(),
            flash: useFlashStore(),
            contact: useContactStore(),
            social: useSocialStore(),
            account: useAccountStore(),
            dashboard: useDashboardStore(),
            metaTags: useMetaTagsStore(),
            media: useMediaStore(),
            inbox: useInboxStore(),
            price: usePriceStore(),
            feature: useFeatureStore(),
            hero: useHeroStore(),
            team: useTeamStore(),
            article: useArticleStore(),
            categories: useCategoriesStore(),
            users: useUsersStore(),
            advertisement: useAdvertisementStore(),
            homepage: useHomepageStore(),
            galleries: useGalleriesStore(),
            partner: usePartnerStore(),
        }
    }
})