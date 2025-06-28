import { boot } from 'quasar/wrappers'

export default boot(({ Vue }) => {
  // Só executa no cliente
  if (process.env.CLIENT) {
    // Helper para gerenciar migração do Service Worker
    Vue.prototype.$migrateServiceWorker = async function () {
      try {
        // Verifica se há Service Worker registrado
        if ('serviceWorker' in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations()

          for (const registration of registrations) {
            console.log('Service Worker encontrado:', registration.scope)

            // Força atualização do Service Worker
            if (registration.waiting) {
              console.log('Ativando novo Service Worker...')
              registration.waiting.postMessage({ type: 'SKIP_WAITING' })
            }

            // Atualiza o registration
            await registration.update()
            console.log('Service Worker atualizado')
          }

          // Limpa cache antigo se necessário
          await this.$clearOldCaches()

          // Recarrega a página para aplicar mudanças
          if (registrations.length > 0) {
            console.log('Recarregando para aplicar nova versão...')
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          }
        }
      } catch (error) {
        console.error('Erro na migração do Service Worker:', error)
      }
    }

    // Helper para limpar caches antigos
    Vue.prototype.$clearOldCaches = async function () {
      try {
        if ('caches' in window) {
          const cacheNames = await caches.keys()
          console.log('Caches encontrados:', cacheNames)

          // Lista de caches antigos para remover
          const oldCachePatterns = [
            /workbox-precache/,
            /workbox-runtime/,
            /quasar-/,
            /-v1$/,
            /-old$/
          ]

          for (const cacheName of cacheNames) {
            const shouldDelete = oldCachePatterns.some(pattern =>
              pattern.test(cacheName)
            )

            if (shouldDelete) {
              console.log('Removendo cache antigo:', cacheName)
              await caches.delete(cacheName)
            }
          }

          console.log('Limpeza de cache concluída')
        }
      } catch (error) {
        console.error('Erro ao limpar caches:', error)
      }
    }

    // Helper para verificar se app precisa de atualização
    Vue.prototype.$checkAppUpdate = async function () {
      try {
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.getRegistration()

          if (registration) {
            // Força verificação de atualização
            await registration.update()

            // Verifica se há uma nova versão esperando
            if (registration.waiting) {
              this.$showUpdateNotification(registration)
            }

            // Escuta por novas atualizações
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing

              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    this.$showUpdateNotification(registration)
                  }
                })
              }
            })
          }
        }
      } catch (error) {
        console.error('Erro ao verificar atualização:', error)
      }
    }

    // Mostra notificação de atualização
    Vue.prototype.$showUpdateNotification = function (registration) {
      if (this.$q && this.$q.notify) {
        const dismiss = this.$q.notify({
          message: 'Nova versão disponível!',
          caption: 'Clique para atualizar o app',
          color: 'primary',
          icon: 'system_update',
          position: 'top',
          timeout: 0,
          actions: [
            {
              label: 'Atualizar',
              color: 'white',
              handler: () => {
                this.$activateUpdate(registration)
                dismiss()
              }
            },
            {
              label: 'Depois',
              color: 'white',
              handler: () => {
                dismiss()
              }
            }
          ]
        })
      } else {
        // Fallback se Quasar notify não estiver disponível
        const userWantsUpdate = confirm('Nova versão disponível! Deseja atualizar agora?')
        if (userWantsUpdate) {
          this.$activateUpdate(registration)
        }
      }
    }

    // Ativa a atualização
    Vue.prototype.$activateUpdate = function (registration) {
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' })

        // Recarrega após ativação
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload()
        })
      }
    }

    // Auto-executa verificação na inicialização
    Vue.prototype.$initAppUpdate = function () {
      // Aguarda um pouco para não interferir no carregamento inicial
      setTimeout(() => {
        this.$checkAppUpdate()
      }, 2000)

      // Verifica periodicamente por atualizações
      setInterval(() => {
        this.$checkAppUpdate()
      }, 60000) // A cada 1 minuto
    }

    // Helper para detectar se é primeira visita após atualização
    Vue.prototype.$isFirstVisitAfterUpdate = function () {
      const currentVersion = process.env.VERSION || '1.0.0'
      const storedVersion = localStorage.getItem('app-version')

      if (storedVersion !== currentVersion) {
        localStorage.setItem('app-version', currentVersion)
        return storedVersion !== null // Só true se havia versão anterior
      }

      return false
    }

    // Helper para mostrar changelog se necessário
    Vue.prototype.$showChangelogIfNeeded = function () {
      if (this.$isFirstVisitAfterUpdate()) {
        // Aguarda um pouco para não interferir no carregamento
        setTimeout(() => {
          if (this.$q && this.$q.notify) {
            this.$q.notify({
              message: 'App atualizado com sucesso!',
              caption: 'Novas funcionalidades e melhorias foram adicionadas',
              color: 'positive',
              icon: 'celebration',
              position: 'top',
              timeout: 4000
            })
          }
        }, 3000)
      }
    }
  }
})
