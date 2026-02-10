import { boot } from 'quasar/wrappers'

export default boot(({ Vue }) => {
  // Só executa no cliente
  if (process.env.CLIENT) {
    // Detecta se é necessário migrar (versioning)
    Vue.prototype.$checkNeedsMigration = function () {
      const CURRENT_VERSION = '2.0.0' // Versão atual SSR+PWA
      const MIGRATION_FLAG = 'ssr-migration-completed'
      const storedVersion = localStorage.getItem('app-version')
      const migrationCompleted = localStorage.getItem(MIGRATION_FLAG)

      // Precisa migrar se:
      // 1. Não tem versão armazenada (primeira vez)
      // 2. Versão é diferente da atual
      // 3. Migração não foi completada
      return !migrationCompleted || storedVersion !== CURRENT_VERSION
    }

    // Detecta se há hash na URL atual
    Vue.prototype.$hasHashInURL = function () {
      return window.location.hash.includes('#/')
    }

    // Sistema de migração automática
    Vue.prototype.$autoMigrate = async function () {
      try {
        if ('serviceWorker' in navigator) {
          const registrations =
            await navigator.serviceWorker.getRegistrations()
          const hasActiveWorker = registrations.some((reg) => reg.active)

          if (hasActiveWorker) {
            console.log('✅ Service Worker ativo encontrado, pulando migração')
            localStorage.setItem('app-version', '2.0.0')
            localStorage.setItem('ssr-migration-completed', 'true')
            return true
          }
        }
        console.log('🔄 Iniciando migração automática...')

        // Step 1: Verificar se está em hash mode
        if (this.$hasHashInURL()) {
          console.log(
            '📍 Hash detectado na URL, redirecionando para history mode...'
          )

          // Extrai a rota sem hash
          const hashRoute = window.location.hash.replace('#', '')
          const cleanRoute = hashRoute || '/'

          // Remove o hash e redireciona
          const newURL = window.location.origin + cleanRoute
          window.history.replaceState({}, '', newURL)
        }

        // Step 2: Limpar Service Workers antigos
        if ('serviceWorker' in navigator) {
          console.log('🧹 Limpando Service Workers antigos...')

          const registrations =
            await navigator.serviceWorker.getRegistrations()

          for (const registration of registrations) {
            console.log('🗑️ Removendo SW:', registration.scope)
            await registration.unregister()
          }

          if (registrations.length > 0) {
            console.log('✅ Service Workers removidos:', registrations.length)
          }
        }

        // Step 3: Limpar caches antigos
        if ('caches' in window) {
          console.log('🧹 Limpando caches antigos...')

          const cacheNames = await caches.keys()
          const oldCachePatterns = [
            // /workbox-precache/,
            /workbox-runtime/,
            /quasar-/,
            /-v1$/,
            /-old$/,
            /webpack-runtime/
          ]

          for (const cacheName of cacheNames) {
            const shouldDelete = oldCachePatterns.some((pattern) =>
              pattern.test(cacheName)
            )

            if (shouldDelete) {
              console.log('🗑️ Removendo cache:', cacheName)
              await caches.delete(cacheName)
            }
          }

          console.log('✅ Caches limpos')
        }

        // Step 4: Marcar migração como concluída
        localStorage.setItem('app-version', '2.0.0')
        localStorage.setItem('ssr-migration-completed', 'true')
        localStorage.setItem('migration-date', new Date().toISOString())

        console.log('✅ Migração concluída com sucesso!')

        // Step 5: Mostrar notificação de sucesso
        this.$showMigrationSuccess()

        return true
      } catch (error) {
        console.error('❌ Erro na migração automática:', error)

        // Em caso de erro, marca como tentativa para não ficar em loop
        localStorage.setItem('migration-attempted', 'true')

        return false
      }
    }

    // Mostra notificação de migração bem-sucedida
    Vue.prototype.$showMigrationSuccess = function () {
      // Aguarda um pouco para não interferir no carregamento
      // setTimeout(() => {
      //   if (this.$q && this.$q.notify) {
      //     this.$q.notify({
      //       message: 'App atualizado!',
      //       caption: 'Nova versão com melhorias de performance e SEO',
      //       color: 'positive',
      //       icon: 'system_update_alt',
      //       position: 'top',
      //       timeout: 4000,
      //       actions: [
      //         {
      //           label: 'OK',
      //           color: 'white'
      //         }
      //       ]
      //     })
      //   }
      // }, 2000)
    }

    // Migração silenciosa para usuários que já migraram
    Vue.prototype.$silentCleanup = async function () {
      try {
        // Verificar se ainda há vestígios do hash mode
        if (this.$hasHashInURL()) {
          const hashRoute = window.location.hash.replace('#', '')
          const cleanRoute = hashRoute || '/'
          window.history.replaceState(
            {},
            '',
            window.location.origin + cleanRoute
          )
        }

        // Limpar apenas caches muito antigos sem notificação
        if ('caches' in window) {
          const cacheNames = await caches.keys()
          const veryOldCaches = cacheNames.filter(
            (name) =>
              name.includes('-v1') ||
              name.includes('-old') ||
              name.includes('webpack-runtime')
          )

          for (const cacheName of veryOldCaches) {
            await caches.delete(cacheName)
          }
        }
      } catch (error) {
        console.warn('Erro na limpeza silenciosa:', error)
      }
    }

    // Detecta se usuário vem de URL com hash (link antigo)
    Vue.prototype.$handleLegacyURLs = function () {
      if (this.$hasHashInURL()) {
        console.log('🔗 URL legada detectada, migrando...')

        const hashRoute = window.location.hash.replace('#', '')
        const cleanRoute = hashRoute || '/'

        // Redireciona sem hash
        window.history.replaceState(
          {},
          '',
          window.location.origin + cleanRoute
        )

        // Força uma migração se necessário
        if (this.$checkNeedsMigration()) {
          setTimeout(() => {
            this.$autoMigrate()
          }, 500)
        }
      }
    }

    // Sistema principal de migração
    Vue.prototype.$initMigrationSystem = async function () {
      // Aguarda um pouco para não interferir no carregamento inicial
      await new Promise((resolve) => setTimeout(resolve, 1000))

      try {
        // 1. Primeiro, verifica URLs legadas
        this.$handleLegacyURLs()

        // 2. Verifica se precisa de migração completa
        if (this.$checkNeedsMigration()) {
          console.log('🚀 Usuário precisa de migração, iniciando processo...')

          const success = await this.$autoMigrate()

          if (success) {
            // Opcional: Recarregar para garantir que tudo funciona
            // setTimeout(() => window.location.reload(), 3000)
          }
        } else {
          // Usuário já migrado, fazer apenas limpeza silenciosa
          await this.$silentCleanup()
        }
      } catch (error) {
        console.error('Erro no sistema de migração:', error)
      }
    }

    // Monitor para links hash que podem aparecer
    Vue.prototype.$monitorHashLinks = function () {
      // Intercepta mudanças na URL
      window.addEventListener('hashchange', () => {
        if (this.$hasHashInURL()) {
          console.log('🔍 Hash detectado em navegação, corrigindo...')
          this.$handleLegacyURLs()
        }
      })

      // Intercepta cliques em links com hash
      document.addEventListener('click', (event) => {
        const link = event.target.closest('a')
        if (link && link.href && link.href.includes('/#/')) {
          event.preventDefault()

          // Extrai rota sem hash
          const url = new URL(link.href)
          const cleanRoute = url.hash.replace('#', '') || '/'

          // Navega usando router do Vue
          if (this.$router) {
            this.$router.push(cleanRoute)
          } else {
            window.location.href = cleanRoute
          }
        }
      })
    }
  }
})
