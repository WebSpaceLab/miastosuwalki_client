// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './src',
  // future: { compatibilityVersion: 4 },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    },

    vscode: {},
  },

  ssr: true,

  experimental: {
    componentIslands: true
  },

  modules: [[
    '@pinia/nuxt',
    {
      autoImports: ['defineStore', 'acceptHMRUpdate'],
    }
  ], '@nuxt/image', '@pinia-plugin-persistedstate/nuxt', 'nuxt-icon', '@nuxtjs/color-mode', '@unocss/nuxt', "@nuxtjs/seo", "@nuxtjs/i18n", "nuxt-og-image", "@nuxt/eslint", "nuxt-schema-org", "nuxt-link-checker", "nuxt-seo-experiments"],

  app: {
    // layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  plugins: [{ src: "@/plugins/aos", ssr: false, mode: "client" }],

  css: [
    '@/assets/styles/app.scss',
  ],

  runtimeConfig: {
    indexable: true,
    public: {
      apiUrl: process.env.BACKEND_URL,
      appUrl: process.env.FRONTEND_URL,
      // gmt_id: process.env.GTM_ID,
      // gmt_enabled: process.env.GTM_ENABLED,
      // gmt_debug: process.env.GTM_DEBUG
    }
  },

  colorMode: {
    classSuffix: '',
    fallback: 'dark'
  },

  imports: {
    dirs: [
      'stores',
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**'
    ]
  },

  image: {
    inject: true,

    format: ['webp, jpg', 'png', 'jpeg'],
    // domains: [process.env.BACKEND_URL],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
  },

  nitro: {
    // baseURL: process.env.BACKEND_URL,
    // preset: 'node-server',
    prerender: {
      crawlLinks: true,
      failOnError: false,

      // routes: ['/api/urls']
    }
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    trailingSlash: true,
    name: 'Portal Internetowy Miasto Suwałki',
    description: 'Odkryj urok Miasta Suwałki online – Twoje źródło lokalnych informacji i inspiracji!',
    // locale: 'pl', // not needed if you have @nuxtjs/i18n installed
  },

  sitemap: {
    exclude: ['/dashboard/**', 'login-786sdfh889sdfjklsdfsdfsdggfet446456dgd4453/**'],
    sources: [
      '/api/__sitemap__/urls',
    ],
  },

  routeRules: {
    '/': { prerender: true },
    '/article': { ssr: true },
    '/article/**': { ssr: true },
  },

  i18n: {
    locales: ['pl'],
    defaultLocale: 'pl',
    // strategy: 'prefix',
  },

  robots: {
    disallow: ['/dashboard', '/dashboard/**', 'login-786sdfh889sdfjklsdfsdfsdggfet446456dgd4453/**'],
  },

  ogImage: {
    compatibility: {
      dev: { sharp: false },
    },
  },

  linkChecker: {
    report: {
      // generate both a html and markdown report
      html: true,
      // markdown: true,
    }
  },

  eslint: {
    config: {
      stylistic: true // <---
    }
  },

  compatibilityDate: '2024-07-08',
})