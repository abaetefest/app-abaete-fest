import { boot } from 'quasar/wrappers'

export default boot(({ Vue, router, ssrContext }) => {
  // Configurações básicas de meta tags que serão aplicadas globalmente

  // Structured data global para o site
  const globalStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AbaetéFest',
    description: 'Descubra os melhores eventos, horários de viagem e experiências únicas em Abaeteba.',
    url: 'https://app.abaetefest.com.br',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://app.abaetefest.com.br/events?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AbaetéFest',
      url: 'https://app.abaetefest.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://app.abaetefest.com.br/icons/icon-512x512.png',
        width: 512,
        height: 512
      },
      sameAs: [
        'https://www.instagram.com/abaetefest',
        'https://www.facebook.com/abaetefest'
      ]
    }
  }

  // Helper para otimizar meta tags de página
  Vue.prototype.$optimizeMeta = function (pageMeta) {
    const optimized = { ...pageMeta }

    // Adiciona meta tags de performance se não existirem
    if (!optimized.meta) optimized.meta = {}

    // Adiciona referrer policy otimizada
    if (!optimized.meta.referrer) {
      optimized.meta.referrer = {
        name: 'referrer',
        content: 'strict-origin-when-cross-origin'
      }
    }

    return optimized
  }

  // Helper para criar meta tags de eventos
  Vue.prototype.$createEventMeta = function (event) {
    if (!event || !event.id) return {}

    const eventDate = new Date(event.start_date).toLocaleDateString('pt-BR')
    const cleanDescription = event.description
      ? event.description.replace(/<[^>]*>/g, '').substring(0, 160)
      : `Evento ${event.name} em Abaeteba no dia ${eventDate}`

    return {
      title: `${event.name} - ${eventDate}`,
      titleTemplate: title => `${title} | AbaetéFest`,

      meta: {
        description: { name: 'description', content: cleanDescription },
        keywords: {
          name: 'keywords',
          content: `${event.name}, evento, ${event.category || 'festa'}, abaeteba, ${eventDate}`
        },

        // Open Graph
        'og:title': { property: 'og:title', content: `${event.name} - ${eventDate}` },
        'og:description': { property: 'og:description', content: cleanDescription },
        'og:image': {
          property: 'og:image',
          content: event.image_url || 'https://app.abaetefest.com.br/og-default-event.jpg'
        },
        'og:url': {
          property: 'og:url',
          content: `https://app.abaetefest.com.br/event-details/${event.id}`
        },
        'og:type': { property: 'og:type', content: 'article' },
        'og:site_name': { property: 'og:site_name', content: 'AbaetéFest' },
        'og:locale': { property: 'og:locale', content: 'pt_BR' },

        // Twitter Cards
        'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
        'twitter:title': { name: 'twitter:title', content: `${event.name} - ${eventDate}` },
        'twitter:description': { name: 'twitter:description', content: cleanDescription },
        'twitter:image': {
          name: 'twitter:image',
          content: event.image_url || 'https://app.abaetefest.com.br/og-default-event.jpg'
        }
      },

      link: {
        canonical: {
          rel: 'canonical',
          href: `https://app.abaetefest.com.br/event-details/${event.id}`
        }
      },

      script: {
        'structured-data': JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: event.name,
          description: cleanDescription,
          startDate: event.start_date,
          endDate: event.end_date || event.start_date,
          image: event.image_url,
          url: `https://app.abaetefest.com.br/event-details/${event.id}`,
          location: {
            '@type': 'Place',
            name: event.location || 'Abaeteba',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Abaeteba',
              addressRegion: 'BA',
              addressCountry: 'BR'
            }
          },
          organizer: {
            '@type': 'Organization',
            name: 'AbaetéFest',
            url: 'https://app.abaetefest.com.br'
          }
        })
      }
    }
  }

  // No modo servidor, adiciona structured data global ao contexto
  if (ssrContext) {
    ssrContext.globalStructuredData = globalStructuredData
  }

  // Router guard para adicionar structured data global apenas na home
  router.beforeEach((to, from, next) => {
    // Esta lógica será executada no cliente
    if (process.env.CLIENT && to.path === '/') {
      // Usar setTimeout para não bloquear a navegação
      setTimeout(() => {
        // Adicionar structured data global à página inicial
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = 'global-structured-data'
        script.innerHTML = JSON.stringify(globalStructuredData)

        // Remove script existente se houver
        const existing = document.getElementById('global-structured-data')
        if (existing) {
          existing.remove()
        }

        // Adiciona o novo script
        document.head.appendChild(script)
      }, 100)
    }
    next()
  })
})
