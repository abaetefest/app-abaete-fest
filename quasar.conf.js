/*
 * Configuração mínima e funcional para SSR + PWA no Quasar v1
 * Sem plugins problemáticos - foco na otimização essencial
 */

const ESLintPlugin = require('eslint-webpack-plugin')
const dotenv = require('dotenv')

module.exports = function (ctx) {
  return {
    supportTS: false,

    boot: [
      'global-meta',
      'services',
      'i18n',
      'axios',
      'notify',
      { path: 'auth-router', server: false },
      { path: 'mixpanel', server: false },
      { path: 'auto-migration', server: false },
      { path: 'sw-migration', server: false },
      ...(ctx.mode.ssr ? [] : ['leaflet']),
      ...(ctx.mode.ssr ? [] : [{ path: 'google-maps', server: false }])
    ],

    css: ['app.css'],

    extras: [
      'roboto-font',
      'material-icons',
      'mdi-v5'
    ],

    build: {
      vueRouterMode: 'history',

      // Configurações básicas que sempre funcionam
      minify: ctx.prod,
      sourceMap: ctx.dev,
      extractCSS: ctx.prod,

      env: ctx.dev
        ? {
            VERSION: require('./package.json').version,
            URI_API: 'https://polished-snowflake-9723.fly.dev/api',
            ONE_SIGNAL_KEY: '20a1804c-3398-4303-bbb9-9ee2d7465ce8',
            GOOGLE_API_KEY: dotenv.config('.env').parsed?.GOOGLE_API_KEY
          }
        : {
            VERSION: require('./package.json').version,
            URI_API: 'https://polished-snowflake-9723.fly.dev/api',
            ONE_SIGNAL_KEY: '818f99e8-5855-4bc2-817b-69cfd8c9a1f9',
            GOOGLE_API_KEY: dotenv?.config('.env')?.parsed?.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY
          },

      // Webpack config mínimo e estável
      chainWebpack(chain) {
        // ESLint apenas
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])

        // Split chunks essencial para otimização
        if (ctx.prod) {
          chain.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendor',
                chunks: 'all',
                priority: 10,
                reuseExistingChunk: true
              },
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                priority: 5,
                reuseExistingChunk: true
              }
            }
          })

          // Tree shaking básico
          chain.optimization.usedExports = true
          chain.optimization.sideEffects = false
        }
      }
    },

    devServer: {
      https: true,
      port: 8080,
      open: true
    },

    framework: {
      iconSet: 'mdi-v5',
      lang: 'pt-br',
      config: {
        brand: {
          primary: '#161931',
          secondary: '#75fbcf',
          accent: '#5ec4a8',
          dark: '#1d1d1d',
          positive: '#21BA45',
          negative: '#C10015',
          info: '#31CCEC',
          warning: '#F2C037'
        }
      },
      importStrategy: 'auto',
      plugins: [
        'Notify',
        'Dialog',
        'Loading',
        'Meta',
        'LocalStorage'
      ]
    },

    animations: [],

    ssr: {
      pwa: true,
      prodPort: 3000,
      middlewares: ['render'],
      serverOptions: {
        hostname: '0.0.0.0',
        port: process.env.PORT || 3000
      }
    },

    // CORREÇÃO MÍNIMA - Substitua apenas a seção pwa no seu quasar.conf.js

    pwa: {
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,

        exclude: [
          /\.map$/,
          /manifest$/,
          /\.htaccess$/,
          /service-worker\.js$/,
          /sw\.js$/,
          /netlify\.toml$/,
          /_redirects$/,
          /\.DS_Store$/,
          /Thumbs\.db$/
        ],

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/polished-snowflake-9723\.fly\.dev\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
              cacheableResponse: {
                statuses: [0, 200]
              },
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30
              }
            }
          },
          {
            urlPattern: /\.(?:woff|woff2|ttf|eot)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ],

        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,

        // === CORREÇÃO PRINCIPAL ===
        // navigateFallback: '/offline.html', // ❌ REMOVE ESTA LINHA
        navigateFallback: '/index.html', // ✅ OU use index.html em vez de offline.html

        // === DENYLIST EXPANDIDA PARA PROTEGER LINKS EXTERNOS ===
        navigateFallbackDenylist: [
          /^\/_/,
          /\/[^/?]+\.[^/]+$/,
          /\/api\//,
          /\/admin\//,
          // === NOVOS: Proteção contra links externos ===
          /\?t=\d+/, // ✅ Links com timestamp (WhatsApp, Telegram, etc.)
          /\?utm_/, // ✅ Links com UTM parameters
          /\?ref=/, // ✅ Links com referrer
          /\?source=/, // ✅ Links com source tracking
          /event-details\/\d+\?/, // ✅ Event details com query params
          /offline\.html$/ // ✅ Não interceptar página offline
        ]
      },

      manifest: {
        name: 'App AbaetéFest',
        short_name: 'AbaetéFest',
        description: 'Descubra os melhores eventos, horários de viagem e experiências únicas em Abaeteba!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#151933',
        theme_color: '#151933',
        categories: ['lifestyle', 'news', 'social', 'events'],
        id: '/',
        start_url: '/',
        scope: '/',
        dir: 'ltr',
        lang: 'pt-br',

        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'maskable_new.png',
            sizes: '196x196',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    },

    cordova: {},
    capacitor: {
      hideSplashscreen: true
    },
    electron: {
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'app-abaete-fest'
      },
      nodeIntegration: true,
      extendWebpack() { }
    }
  }
}
