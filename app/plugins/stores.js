import { useGeneralStore } from "../stores/useGeneralStore";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavbarStore } from "../stores/useNavbarStore";
import { useAboutStore } from "../stores/useAboutStore";
import { useFlashStore } from "../stores/useFlashStore";
import { useContactStore } from "../stores/useContactStore";
import { useSocialStore } from "../stores/useSocialStore";
import { useAccountStore } from "../stores/useAccountStore";
import { useDashboardStore } from "../stores/useDashboardStore";
import { useMetaTagsStore } from "../stores/useMetaTagsStore";
import { useMediaStore } from "../stores/useMediaStore";
import { useInboxStore } from "../stores/useInboxStore";
import { usePriceStore } from "../stores/usePriceStore";
import { useFeatureStore } from "../stores/useFeatureStore";
import { useHeroStore } from "../stores/useHeroStore";
import { useTeamStore } from "../stores/useTeamStore";
import { useArticleStore } from "../stores/useArticleStore";
import { useCategoriesStore } from "../stores/useCategoriesStore";
import { useUsersStore } from "../stores/useUsersStore";
import { useAdvertisementStore } from "../stores/useAdvertisementStore";
import { useHomepageStore } from "../stores/useHomepageStore";
import { useGalleriesStore } from "../stores/useGalleriesStore";
import { usePartnerStore } from "../stores/usePartnerStore";

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