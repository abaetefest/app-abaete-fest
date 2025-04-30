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

    // https://v1.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v1.quasar.dev/quasar-cli/boot-files
    boot: [
      'services',
      // 'onesignal',
      'leaflet',
      'i18n',
      'axios',
      'notify',
      'auth-router',
      'mixpanel',
      'google-maps',
      'amazon-affiliate'
    ],

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.css'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons',
      'mdi-v5' // optional, you are not bound to it
    ],

    // Full list of options: https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      env: ctx.dev
        ? {
            VERSION: require('./package.json').version,
            URI_API: 'https://polished-snowflake-9723.fly.dev/api',
            ONE_SIGNAL_KEY: '20a1804c-3398-4303-bbb9-9ee2d7465ce8',
            GOOGLE_API_KEY: dotenv.config('.env').parsed.GOOGLE_API_KEY
          }
        : {
            VERSION: require('./package.json').version,
            URI_API: 'https://polished-snowflake-9723.fly.dev/api',
            ONE_SIGNAL_KEY: '818f99e8-5855-4bc2-817b-69cfd8c9a1f9',
            GOOGLE_API_KEY: dotenv?.config('.env')?.parsed?.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY
          },
      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://v1.quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v1.quasar.dev/quasar-cli/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpack (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])
      }
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: true,
      port: 8080,
      open: true // opens browser window automatically
    },

    // https://v1.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'mdi-v5', // Quasar icon set
      lang: 'pt-br', // Quasar language pack
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

      // Possible values for "importStrategy":
      // * 'auto' - (DEFAULT) Auto-import needed Quasar components & directives
      // * 'all'  - Manually specify what to import
      importStrategy: 'auto',

      // For special cases outside of where "auto" importStrategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'Loading',
        'Meta',
        'LocalStorage'
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://v1.quasar.dev/options/animations
    animations: [],

    // https://v1.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://v1.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true,
        exclude: [/netlify.toml/]
      }, // only for GenerateSW
      manifest: {
        name: 'App AbaetéFest',
        short_name: 'App AbaetéFest',
        description: 'Aplicativo de eventos, horários de viagem e muito mais!',
        display: 'fullscreen',
        orientation: 'portrait',
        background_color: '#151933',
        theme_color: '#151933',
        categories: ['lifestyle', 'news', 'social'],
        id: '/',
        start_url: '/',
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
        iarc_rating_id: 'e7959d08-255e-4940-82ef-654b203603e2',
        related_applications: [
          {
            platform: 'play',
            url: 'https://play.google.com/store/apps/details?id=br.com.abaetefest.app.twa',
            id: 'br.com.abaetefest.app.twa'
          }
          // {
          //   platform: 'itunes',
          //   url: 'https://itunes.apple.com/app/example-app1/id123456789'
          // }
        ],
        launch_handler: {
          client_mode: ['navigate-existing, auto']
        },
        screenshots: [
          {
            src: 'desktop.png',
            sizes: '1280x720',
            type: 'image/jpg',
            platform: 'wide'
          }
        ],
        share_target: {
          action: '/share-action/',
          method: 'GET',
          enctype: 'application/x-www-form-urlencoded',
          params: {
            title: 'App AbaetéFest',
            text: 'Aplicativo de eventos, horários de viagem e muito mais!'
          }
        },
        display_override: ['standalone', 'browser'],
        scope_extensions: [
          { origin: '*.abaetefest.com.br' },
          { origin: '*.app-abaetefest.netlify.app' }
        ],
        edge_side_panel: {},
        scope: 'https://app.abaetefest.com.br'
      }
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v1.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'app-abaete-fest'
      },

      // More info: https://v1.quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  }
}
