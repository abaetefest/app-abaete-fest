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
    // preFetch: true, // Habilita preFetch globalmente se necessário

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
      vueRouterMode: 'history', // Importante para SEO - URLs amigáveis

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

      // Otimizações de produção
      ...(ctx.prod && {
        extractCSS: true,
        minify: true
        // gzip: true, // Deixe o Netlify fazer compressão
        // analyze: true, // Descomente para analisar bundle
      }),

      // Webpack config
      chainWebpack(chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])

        // Otimizações para produção
        if (ctx.prod) {
          // Melhor splitting de chunks para cache
          chain.optimization.splitChunks({
            chunks: 'all',
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
              },
              common: {
                name: 'chunk-common',
                minChunks: 2,
                chunks: 'all',
                enforce: true
              }
            }
          })
        }
      }
    },

    // devServer config
    devServer: {
      https: true,
      port: 8080,
      open: true,
      // Headers para desenvolvimento
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
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
        },
        // Configurações globais para notificações
        notify: {
          position: 'top',
          timeout: 3000,
          textColor: 'white',
          actions: [{ icon: 'close', color: 'white' }]
        }
      },
      importStrategy: 'auto',
      plugins: [
        'Notify',
        'Dialog',
        'Loading',
        'Meta', // ESSENCIAL para SEO
        'LocalStorage'
      ]
    },

    animations: [],

    // SSR config - otimizada para Netlify
    ssr: {
      pwa: true, // SSR + PWA = melhor SEO + performance

      prodPort: 3000,
      maxAge: 1000 * 60 * 60 * 24 * 30, // Cache 30 dias

      middlewares: [
        ...(ctx.prod ? ['compression'] : []),
        'render' // sempre por último
      ],

      serverOptions: {
        hostname: '0.0.0.0',
        port: process.env.PORT || 3000
      },

      // Configurações específicas para Netlify Functions
      extendSSRWebserverConf(cfg) {
        // Headers de segurança e performance
        cfg.middlewares = cfg.middlewares || []
        cfg.middlewares.push((req, res, next) => {
          // Headers de segurança
          res.setHeader('X-Content-Type-Options', 'nosniff')
          res.setHeader('X-Frame-Options', 'DENY')
          res.setHeader('X-XSS-Protection', '1; mode=block')

          // Headers para melhor SEO
          res.setHeader('Vary', 'Accept-Encoding, User-Agent')

          // Cache headers baseados no tipo de arquivo
          if (req.url.match(/\.(js|css)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
          } else if (req.url.match(/\.(png|jpg|jpeg|gif|ico|svg)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=2592000') // 30 dias
          } else if (req.url.match(/\.(woff|woff2|ttf|eot)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000') // 1 ano
          }

          next()
        })
      }
    },

    // PWA config - otimizada para SEO e performance
    pwa: {
      workboxPluginMode: 'GenerateSW',
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true,
        exclude: [/netlify\.toml$/, /\.htaccess$/, /\.map$/, /\.LICENSE\.txt$/],

        // Estratégias de cache para melhor performance
        runtimeCaching: [
          // Cache da API
          {
            urlPattern: /^https:\/\/polished-snowflake-9723\.fly\.dev\/api\//,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 horas
              }
            }
          },
          // Cache de imagens
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 dias
              }
            }
          },
          // Cache de fontes do Google
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets'
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
              }
            }
          }
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

        // Meta adicional para SEO
        keywords: 'eventos, abaeteba, festas, shows, horários, viagem, bahia, entretenimento',

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
        ],

        // Configurações adicionais para melhor indexação
        display_override: ['standalone', 'minimal-ui', 'browser'],

        // Screenshots para App Store (se aplicável)
        screenshots: [
          {
            src: 'screenshots/mobile-home.png',
            sizes: '390x844',
            type: 'image/png',
            platform: 'narrow',
            label: 'Página inicial do AbaetéFest'
          },
          {
            src: 'screenshots/desktop-events.png',
            sizes: '1280x720',
            type: 'image/png',
            platform: 'wide',
            label: 'Lista de eventos no AbaetéFest'
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
      extendWebpack(/* cfg */) { }
    }
  }
}
