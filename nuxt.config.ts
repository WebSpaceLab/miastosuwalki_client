// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // srcDir: './src',
  future: { compatibilityVersion: 4 },
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
  ], '@nuxt/image', '@pinia-plugin-persistedstate/nuxt', 'nuxt-icon', '@nuxtjs/color-mode', '@unocss/nuxt', "@nuxtjs/seo", "@nuxtjs/i18n", "nuxt-og-image", "@nuxt/eslint", "nuxt-schema-org", "nuxt-link-checker", "nuxt-seo-experiments", "@nuxt/scripts", "@dargmuesli/nuxt-cookie-control", "@nuxt/content"],

  // app: {
  // layoutTransition: { name: 'layout', mode: 'out-in' },
  // pageTransition: { name: 'page', mode: 'out-in' },
  // },

  plugins: [{ src: "@/plugins/aos", ssr: false, mode: "client" }],

  css: [
    '@/assets/styles/app.scss',
  ],

  runtimeConfig: {
    indexable: true,
    proxyUrl: process.env.NUXT_PUBLIC_API_URL,
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
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

  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     failOnError: false,
  //   }
  // },

  site: {
    url: process.env.NUXT_PUBLIC_APP_URL,
    trailingSlash: true,
    name: 'Portal Internetowy Miasto Suwałki',
    description: 'Odkryj urok Miasta Suwałki online – Twoje źródło lokalnych informacji i inspiracji!',
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
      stylistic: true
    }
  },

  compatibilityDate: '2024-07-08',

  cookieControl: {
    locales: ['pl', 'en'],
    cookies: {
      necessary: [
        {
          id: 'ccc',
          name: 'Website & API',
          description: 'Niezbędne do prawidłowego działania witryny',
          links: {
            '/privacy': 'Privacy Policy',
            '/terms': 'Terms of Service',
          },
          targetCookieIds: [
            'cookie_control_consent', 'cookie_control_enabled_cookies'
          ],
        },
      ],
      optional: [
        {
          id: 'ga',
          name: 'Google Analytics',
          description: 'Gromadzi anonimowe statystyki dotyczące korzystania ze strony internetowej',
          targetCookieIds: [
            '_ga', '_gid', '_gat'
          ],
        },
        // {
        //   name: 'Google Ads',
        //   description: 'Used to track visitors across websites',
        //   cookies: [
        //     'ads/ga-audiences', 'ads/ga-audiences'
        //   ]
        // }
      ],
    },


    colors: {
      barBackground: '#020617',
      barText: '#fff',
      barButtonBackground: '#0284c7',
      barButtonColor: '#fff',

      modalButtonBackground: '#0284c7',
    },
  },

  scripts: {
    registry: {
      googleAnalytics: {
        id: 'G-1KCEZTT495'
      }
    }
  },

  // nitro: {
  //   routeRules: {
  //     "/px/**": {
  //       proxy: "https://api.miastosuwalki.pl/**",
  //       // changeOrigin: true,
  //     },
  //   }
  // },
})