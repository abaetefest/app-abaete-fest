/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v1.quasar.dev/quasar-cli/quasar-conf-js
/* eslint-env node */
const ESLintPlugin = require('eslint-webpack-plugin')
const dotenv = require('dotenv')

module.exports = function (ctx) {
  return {
    // https://v1.quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // app boot file (/src/boot)
    boot: [
      // Universal boots (executam no servidor e cliente)
      'services',
      'i18n',
      'axios',
      'notify',

      // Client-only boots (só executam no cliente)
      { path: 'auth-router', server: false },
      { path: 'mixpanel', server: false },

      // Boots condicionais para SSR
      ...(ctx.mode.ssr ? [] : ['leaflet']),
      ...(ctx.mode.ssr ? [] : [{ path: 'google-maps', server: false }])
    ],

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.css'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'roboto-font',
      'material-icons',
      'mdi-v5'
    ],

    // Full list of options: https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'history', // Para SEO

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

      // Webpack config simples
      chainWebpack(chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
      }
    },

    // devServer config
    devServer: {
      https: true,
      port: 8080,
      open: true
    },

    // framework config
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

    // SSR config - versão limpa
    ssr: {
      pwa: true,
      prodPort: 3000,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      middlewares: [
        ...(ctx.prod ? ['compression'] : []),
        'render'
      ],

      serverOptions: {
        hostname: '0.0.0.0',
        port: process.env.PORT || 3000
      }
    },

    // PWA config - versão simplificada
    pwa: {
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true,
        exclude: [/netlify\.toml$/, /\.htaccess$/, /\.map$/]
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
        ],

        related_applications: [
          {
            platform: 'play',
            url: 'https://play.google.com/store/apps/details?id=br.com.abaetefest.app.twa',
            id: 'br.com.abaetefest.app.twa'
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
      extendWebpack(/* cfg */) {}
    }
  }
}
