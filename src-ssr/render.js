// src-ssr/middlewares/render.js
// Middleware simples para SSR sem dependências problemáticas

module.exports = ({ app, resolve, render, serve }) => {
  // === HEADERS DE PERFORMANCE E SEGURANÇA ===
  app.use((req, res, next) => {
    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('X-Frame-Options', 'DENY')
    res.setHeader('X-XSS-Protection', '1; mode=block')
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')

    // Cache headers baseados no tipo de conteúdo
    if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
      // Assets estáticos - cache longo
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    } else if (req.url.includes('/events') || req.url.includes('/tourism')) {
      // Páginas de conteúdo - cache médio
      res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600')
    } else {
      // Outras páginas - cache curto
      res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600')
    }

    next()
  })

  // === SERVE ASSETS ESTÁTICOS ===
  app.use('/statics', serve(resolve.public('statics'), {
    maxAge: '1y',
    etag: true,
    lastModified: true
  }))

  app.use('/icons', serve(resolve.public('icons'), {
    maxAge: '1y',
    etag: true,
    lastModified: true
  }))

  // === PRELOAD HEADERS BÁSICOS ===
  app.use((req, res, next) => {
    const url = req.url

    // Preload apenas para páginas críticas
    if (url === '/' || url.includes('/events')) {
      res.setHeader('Link', '</js/vendor.js>; rel=preload; as=script, </css/app.css>; rel=preload; as=style')
    }

    next()
  })

  // === RENDERIZAÇÃO SSR BÁSICA ===
  app.get('*', (req, res) => {
    const startTime = Date.now()

    render(req, res, {
      beforeRender: ({ store }) => {
        // Configurações mínimas antes da renderização
        if (store && store.commit) {
          try {
            store.commit('app/SET_SSR_MODE', true)
          } catch (e) {
            // Store pode não ter esse mutation, ignorar
          }
        }
      },

      afterRender: (html) => {
        // Headers de performance
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.setHeader('X-Powered-By', 'Quasar SSR')
        res.setHeader('X-Render-Time', (Date.now() - startTime) + 'ms')

        return html
      }
    }).catch(err => {
      // Tratamento de erros simplificado
      const code = err.code || 500
      res.status(code)

      if (code === 404) {
        res.end(`
          <!DOCTYPE html>
          <html lang="pt-BR">
          <head>
            <meta charset="utf-8">
            <title>Página não encontrada - AbaetéFest</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px; 
                background: #151933; 
                color: white; 
              }
              h1 { color: #75fbcf; margin-bottom: 20px; }
              p { margin-bottom: 30px; opacity: 0.8; }
              a { 
                color: #75fbcf; 
                text-decoration: none; 
                padding: 10px 20px;
                border: 2px solid #75fbcf;
                border-radius: 5px;
                transition: all 0.3s;
              }
              a:hover { 
                background: #75fbcf; 
                color: #151933; 
              }
            </style>
          </head>
          <body>
            <h1>404 - Página não encontrada</h1>
            <p>A página que você procura não existe.</p>
            <a href="/">← Voltar ao início</a>
          </body>
          </html>
        `)
      } else {
        console.error('SSR Error:', err)
        res.end(`
          <!DOCTYPE html>
          <html lang="pt-BR">
          <head>
            <meta charset="utf-8">
            <title>Erro - AbaetéFest</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px; 
                background: #151933; 
                color: white; 
              }
              h1 { color: #C10015; margin-bottom: 20px; }
              p { margin-bottom: 30px; opacity: 0.8; }
              a { 
                color: #75fbcf; 
                text-decoration: none; 
                padding: 10px 20px;
                border: 2px solid #75fbcf;
                border-radius: 5px;
                transition: all 0.3s;
              }
              a:hover { 
                background: #75fbcf; 
                color: #151933; 
              }
            </style>
          </head>
          <body>
            <h1>500 - Erro interno</h1>
            <p>Ocorreu um erro inesperado. Tente novamente em alguns instantes.</p>
            <a href="/">← Voltar ao início</a>
          </body>
          </html>
        `)
      }
    })
  })

  // === HEALTH CHECK BÁSICO ===
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    })
  })
}
