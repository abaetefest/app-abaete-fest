<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  // Meta tags globais que se aplicam a todas as páginas
  meta: {
    title: 'AbaetéFest - Eventos e Experiências em Abaeteba',
    meta: {
      description: {
        name: 'description',
        content: 'Descubra os melhores eventos, horários de viagem e experiências únicas em Abaeteba. Sua fonte completa de entretenimento e informação.'
      },
      keywords: {
        name: 'keywords',
        content: 'eventos, abaeteba, festas, shows, horários, viagem, entretenimento, bahia'
      },
      author: {
        name: 'author',
        content: 'AbaetéFest'
      },

      // Open Graph globais
      'og:site_name': { property: 'og:site_name', content: 'AbaetéFest' },
      'og:locale': { property: 'og:locale', content: 'pt_BR' },
      'og:type': { property: 'og:type', content: 'website' },
      'og:image': { property: 'og:image', content: 'https://app.abaetefest.com.br/og-default.jpg' },

      // Twitter Card globais
      'twitter:site': { name: 'twitter:site', content: '@abaetefest' },
      'twitter:creator': { name: 'twitter:creator', content: '@abaetefest' },
      'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },

      // Meta tags para dispositivos móveis
      viewport: { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      'format-detection': { name: 'format-detection', content: 'telephone=no' },

      // Meta tags para PWA
      'theme-color': { name: 'theme-color', content: '#151933' },
      'msapplication-navbutton-color': { name: 'msapplication-navbutton-color', content: '#151933' },
      'apple-mobile-web-app-status-bar-style': { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
    },

    link: {
      // Link canônico será sobrescrito pelas páginas específicas
      canonical: { rel: 'canonical', href: 'https://app.abaetefest.com.br' },

      // Preconnect para melhor performance
      'preconnect-api': { rel: 'preconnect', href: 'https://polished-snowflake-9723.fly.dev' },
      'preconnect-s3': { rel: 'preconnect', href: 'https://abaete-fest.s3.amazonaws.com' },

      // DNS prefetch
      'dns-prefetch-fonts': { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      'dns-prefetch-gstatic': { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }
    }
  },

  mounted() {
    // Inicializa sistema de migração automática
    this.initFullMigrationSystem()
  },

  methods: {
    async initFullMigrationSystem() {
      // Só executa no cliente
      if (typeof window === 'undefined') return

      try {
        // 1. PRIMEIRA PRIORIDADE: Sistema de migração automática
        if (this.$initMigrationSystem) {
          await this.$initMigrationSystem()
        }

        // 2. Monitora links com hash
        if (this.$monitorHashLinks) {
          this.$monitorHashLinks()
        }

        // 3. Sistema de atualização contínua (original)
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Detecta se é primeira visita após atualização do app
        if (this.$isFirstVisitAfterUpdate && this.$isFirstVisitAfterUpdate()) {
          console.log('Primeira visita após atualização detectada')

          // Mostra notificação de atualização
          if (this.$showChangelogIfNeeded) {
            this.$showChangelogIfNeeded()
          }
        }

        // Inicializa sistema de verificação de atualizações
        if (this.$initAppUpdate) {
          this.$initAppUpdate()
        }

        // Detecta se app foi instalado recentemente
        this.detectPWAInstallation()

        // Monitora mudanças de conectividade
        this.setupConnectivityMonitoring()
      } catch (error) {
        console.error('Erro na inicialização do sistema completo:', error)
      }
    },

    detectPWAInstallation() {
      // Detecta se app acabou de ser instalado
      if (window.matchMedia('(display-mode: standalone)').matches) {
        const isFirstLaunch = !localStorage.getItem('pwa-launched-before')

        if (isFirstLaunch) {
          localStorage.setItem('pwa-launched-before', 'true')

          // Mostra boas-vindas para app instalado
          setTimeout(() => {
            if (this.$q && this.$q.notify) {
              this.$q.notify({
                message: 'Bem-vindo ao AbaetéFest!',
                caption: 'App instalado com sucesso. Agora você pode acessar offline!',
                color: 'positive',
                icon: 'install_mobile',
                position: 'top',
                timeout: 5000
              })
            }
          }, 2000)
        }
      }
    },

    setupConnectivityMonitoring() {
      // Monitora mudanças de conectividade
      window.addEventListener('online', () => {
        if (this.$q && this.$q.notify) {
          this.$q.notify({
            message: 'Conexão restaurada',
            caption: 'Sincronizando dados...',
            color: 'positive',
            icon: 'wifi',
            position: 'top',
            timeout: 2000
          })
        }

        // Força verificação de atualização quando volta online
        if (this.$checkAppUpdate) {
          setTimeout(() => {
            this.$checkAppUpdate()
          }, 1000)
        }
      })

      window.addEventListener('offline', () => {
        if (this.$q && this.$q.notify) {
          this.$q.notify({
            message: 'Modo offline',
            caption: 'Usando dados em cache',
            color: 'warning',
            icon: 'wifi_off',
            position: 'top',
            timeout: 3000
          })
        }
      })
    }
  }
}
</script>
