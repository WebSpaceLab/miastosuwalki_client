export default defineAppConfig({
    development: {
        API_URL: 'https://localhost:8000',
        CLIENT_URL: 'https://localhost:3000',
        ENV: 'dev',
        googleTagManager: {
            id: 'GTM-W5L5MTLM',
            enabled: true,
            debug: true,
        }
    },
    production: {
        API_URL: 'https://api.miastosuwalki.pl',
        CLIENT_URL: 'https://miastosuwalki.pl',
        ENV: 'prod',
        googleTagManager: {
            id: 'GTM-W5L5MTLM',
            enabled: true,
            debug: false,
        }
    },
    staging: {
        API_URL: 'https://apiTest.miastosuwalki.pl',
        CLIENT_URL: 'https://test.miastosuwalki.pl',
        ENV: 'staging',
        googleTagManager: {
            id: 'GTM-W5L5MTLM',
            enabled: true,
            debug: true,
        }
    }
  })