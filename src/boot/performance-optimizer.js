// src/boot/performance-optimizer.js
// Boot específico para otimizações de performance em SSR + PWA

export default ({ app, router, Vue }) => {
  // === PRELOAD INTELIGENTE BASEADO EM ROTA ===
  const routePreloadMap = {
    home: ['events', 'event-details'],
    events: ['event-details', 'tourism'],
    tourism: ['places', 'trips'],
    map: ['places', 'tourism'],
    radio: ['radio-player', 'podcast']
  }

  // === PRELOAD DE CHUNKS CRÍTICOS ===
  function preloadCriticalChunks() {
    if (typeof window === 'undefined') return // SSR safety check

    const criticalChunks = [
      '/js/layouts.js',
      '/js/common.js'
    ]

    criticalChunks.forEach(chunk => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'script'
      link.href = chunk
      document.head.appendChild(link)
    })
  }

  // === INTERSECTION OBSERVER PARA LAZY LOADING ===
  function setupIntersectionObserver() {
    if (typeof window === 'undefined' || !window.IntersectionObserver) return

    Vue.directive('lazy-route', {
      inserted(el, binding) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && binding.value) {
              // Preload da rota especificada
              const routeName = binding.value
              const route = router.resolve({ name: routeName })
              if (route && route.route.matched.length > 0) {
                const component = route.route.matched[0].components.default
                if (typeof component === 'function') {
                  component().catch(() => {}) // Silently fail
                }
              }
              observer.unobserve(el)
            }
          })
        }, {
          rootMargin: '200px' // Preload 200px antes de entrar na viewport
        })

        observer.observe(el)
      }
    })
  }

  // === PRELOAD BASEADO EM HOVER ===
  function setupHoverPreload() {
    if (typeof window === 'undefined') return

    Vue.directive('hover-preload', {
      inserted(el, binding) {
        let timeoutId = null

        el.addEventListener('mouseenter', () => {
          timeoutId = setTimeout(() => {
            const routeName = binding.value
            if (routeName) {
              const route = router.resolve({ name: routeName })
              if (route && route.route.matched.length > 0) {
                const component = route.route.matched[0].components.default
                if (typeof component === 'function') {
                  component().catch(() => {})
                }
              }
            }
          }, 100) // 100ms delay para evitar preload desnecessário
        })

        el.addEventListener('mouseleave', () => {
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
          }
        })
      }
    })
  }

  // === PRELOAD INTELIGENTE NO ROUTER ===
  router.beforeEach((to, from, next) => {
    // Preload de rotas relacionadas
    const routesToPreload = routePreloadMap[to.name]

    if (routesToPreload && typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(() => {
        routesToPreload.forEach(routeName => {
          const route = router.resolve({ name: routeName })
          if (route && route.route.matched.length > 0) {
            const component = route.route.matched[0].components.default
            if (typeof component === 'function') {
              component().catch(() => {}) // Silently fail
            }
          }
        })
      }, { timeout: 2000 })
    }

    next()
  })

  // === OTIMIZAÇÃO DE IMAGENS ===
  Vue.directive('lazy-img', {
    inserted(el, binding) {
      if (typeof window === 'undefined' || !window.IntersectionObserver) {
        // Fallback para SSR ou browsers antigos
        el.src = binding.value
        return
      }

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = binding.value
            img.classList.remove('lazy')
            imageObserver.unobserve(img)
          }
        })
      })

      el.classList.add('lazy')
      imageObserver.observe(el)
    }
  })

  // === CACHE DE COMPONENTES PESADOS ===
  const componentCache = new Map()

  Vue.mixin({
    beforeCreate() {
      // Cache de componentes baseado no nome
      const componentName = this.$options.name
      if (componentName && componentCache.has(componentName)) {
        // Reutiliza dados cached se disponível
        const cachedData = componentCache.get(componentName)
        if (cachedData && typeof this.$options.data === 'function') {
          const originalData = this.$options.data.bind(this)
          this.$options.data = function () {
            return { ...originalData(), ...cachedData }
          }
        }
      }
    }
  })

  // === PREFETCH DE RECURSOS CRÍTICOS ===
  function prefetchCriticalResources() {
    if (typeof window === 'undefined') return

    const criticalResources = [
      'https://polished-snowflake-9723.fly.dev/api/events',
      'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
    ]

    criticalResources.forEach(url => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = url
      document.head.appendChild(link)
    })
  }

  // === SERVICE WORKER OPTIMIZATION ===
  function optimizeServiceWorker() {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    // Registra o SW com otimizações
    navigator.serviceWorker.register('/sw.js', {
      updateViaCache: 'none', // Sempre busca updates
      scope: '/'
    }).then(registration => {
      // Força update se há nova versão
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // Nova versão disponível
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                newWorker.postMessage({ action: 'skipWaiting' })
              })
            }
          }
        })
      })
    })
  }

  // === INICIALIZAÇÃO ===
  if (typeof window !== 'undefined') {
    // Client-side only

    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setupIntersectionObserver()
        setupHoverPreload()
        preloadCriticalChunks()
        prefetchCriticalResources()
        optimizeServiceWorker()
      })
    } else {
      // DOM já está pronto
      setupIntersectionObserver()
      setupHoverPreload()
      preloadCriticalChunks()
      prefetchCriticalResources()
      optimizeServiceWorker()
    }

    // === MONITORAMENTO DE PERFORMANCE ===
    if ('performance' in window && 'PerformanceObserver' in window) {
      // Observa mudanças de layout que impactam performance
      const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift') {
            // Log CLS issues (opcional)
            console.debug('Layout shift detected:', entry)
          }
        }
      })

      try {
        perfObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        // Browser não suporta
      }
    }
  }

  // === MIXIN GLOBAL PARA LAZY LOADING ===
  Vue.mixin({
    methods: {
      // Método helper para lazy loading de componentes
      $loadComponent(componentName) {
        if (typeof window === 'undefined') return Promise.resolve()

        return new Promise((resolve, reject) => {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              import(`components/${componentName}.vue`)
                .then(resolve)
                .catch(reject)
            })
          } else {
            setTimeout(() => {
              import(`components/${componentName}.vue`)
                .then(resolve)
                .catch(reject)
            }, 0)
          }
        })
      },

      // Método helper para preload de rotas
      $preloadRoute(routeName) {
        if (typeof window === 'undefined') return

        const route = this.$router.resolve({ name: routeName })
        if (route && route.route.matched.length > 0) {
          const component = route.route.matched[0].components.default
          if (typeof component === 'function') {
            component().catch(() => {})
          }
        }
      }
    }
  })
}
