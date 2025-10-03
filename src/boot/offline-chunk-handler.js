// src/boot/offline-chunk-handler.js
// Boot para lidar com problemas de carregamento de chunks quando offline

export default ({ app, router, Vue }) => {
  // === DETECÇÃO DE CONECTIVIDADE ===
  let isOnline = navigator.onLine
  let retryCount = 0
  const maxRetries = 3

  // Monitora mudanças na conectividade
  window.addEventListener('online', function () {
    isOnline = true
    retryCount = 0
    console.log('Connection restored')
  })

  window.addEventListener('offline', function () {
    isOnline = false
    console.log('Connection lost')
  })

  // === HANDLER GLOBAL PARA ERROS DE CHUNK ===
  window.addEventListener('unhandledrejection', function (event) {
    const error = event.reason

    // Verifica se é um erro de carregamento de chunk
    if (error && error.message && (
      error.message.includes('Loading chunk') ||
      error.message.includes('ChunkLoadError') ||
      error.message.includes('Loading CSS chunk') ||
      error.message.includes('ERR_INTERNET_DISCONNECTED')
    )) {
      console.warn('Chunk load error detected:', error.message)

      // Previne o erro de ser logado no console
      event.preventDefault()

      // Tenta resolver o problema
      handleChunkLoadError(error)
    }
  })

  // === HANDLER PARA ERROS DE CHUNK ===
  function handleChunkLoadError(err) {
    // Trata o erro para satisfazer o ESLint
    if (err) {
      console.warn('Handling chunk load error:', err.message || err)
    }

    if (retryCount >= maxRetries) {
      console.error('Max retries reached for chunk loading')
      showOfflineMessage()
      return
    }

    retryCount++
    console.log('Attempting to resolve chunk load error (attempt ' + retryCount + '/' + maxRetries + ')')

    if (isOnline) {
      // Se online, tenta recarregar a página
      setTimeout(function () {
        window.location.reload()
      }, 1000 * retryCount) // Delay progressivo
    } else {
      // Se offline, tenta usar o cache do service worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(function (registration) {
          // Força atualização do service worker
          registration.update()

          // Tenta recarregar após um delay
          setTimeout(function () {
            window.location.reload()
          }, 2000)
        }).catch(function (err) {
          console.warn('Service worker error:', err)
          showOfflineMessage()
        })
      } else {
        showOfflineMessage()
      }
    }
  }

  // === MENSAGEM OFFLINE ===
  function showOfflineMessage() {
    // Remove mensagem existente se houver
    const existingMessage = document.getElementById('offline-chunk-message')
    if (existingMessage) {
      existingMessage.remove()
    }

    // Cria mensagem de erro
    const message = document.createElement('div')
    message.id = 'offline-chunk-message'
    message.style.cssText =
      'position: fixed;' +
      'top: 0;' +
      'left: 0;' +
      'right: 0;' +
      'background: #f44336;' +
      'color: white;' +
      'padding: 12px;' +
      'text-align: center;' +
      'z-index: 9999;' +
      'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;'

    message.innerHTML =
      '<strong>Erro de carregamento offline</strong><br>' +
      '<small>Alguns recursos podem não estar disponíveis. Verifique sua conexão e tente novamente.</small>' +
      '<button onclick="this.parentElement.remove()" style="' +
        'background: rgba(255,255,255,0.2);' +
        'border: none;' +
        'color: white;' +
        'padding: 4px 8px;' +
        'margin-left: 10px;' +
        'border-radius: 4px;' +
        'cursor: pointer;' +
      '">✕</button>'

    document.body.appendChild(message)

    // Remove automaticamente após 10 segundos
    setTimeout(function () {
      if (message.parentElement) {
        message.remove()
      }
    }, 10000)
  }

  // === PRELOAD DE CHUNKS CRÍTICOS ===
  function preloadCriticalChunks() {
    if (typeof window === 'undefined') return

    const criticalChunks = [
      '/js/tourism.js',
      '/js/map.js',
      '/js/utilities.js'
    ]

    criticalChunks.forEach(function (chunk) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'script'
      link.href = chunk
      link.onerror = function (err) {
        console.warn('Failed to preload chunk: ' + chunk, err)
      }
      document.head.appendChild(link)
    })
  }

  // === INICIALIZAÇÃO ===
  if (typeof window !== 'undefined') {
    // Preload de chunks críticos após carregamento da página
    window.addEventListener('load', function () {
      setTimeout(preloadCriticalChunks, 1000)
    })
  }
}
