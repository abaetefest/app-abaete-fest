import { boot } from 'quasar/wrappers'

export default boot(({ Vue, router, ssrContext }) => {
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

  // Helper para criar meta tags de eventos - VERSÃO CORRIGIDA
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

        // Open Graph - ESTRUTURA CORRIGIDA para Quasar v1
        ogTitle: { property: 'og:title', content: `${event.name} - ${eventDate}` },
        ogDescription: { property: 'og:description', content: cleanDescription },
        ogImage: {
          property: 'og:image',
          content: event.image_url || 'https://app.abaetefest.com.br/og-default-event.jpg'
        },
        ogUrl: {
          property: 'og:url',
          content: `https://app.abaetefest.com.br/event-details/${event.id}`
        },
        ogType: { property: 'og:type', content: 'article' },
        ogSiteName: { property: 'og:site_name', content: 'AbaetéFest' },
        ogLocale: { property: 'og:locale', content: 'pt_BR' },

        // Twitter Cards - ESTRUTURA CORRIGIDA
        twitterCard: { name: 'twitter:card', content: 'summary_large_image' },
        twitterTitle: { name: 'twitter:title', content: `${event.name} - ${eventDate}` },
        twitterDescription: { name: 'twitter:description', content: cleanDescription },
        twitterImage: {
          name: 'twitter:image',
          content: event.image_url || 'https://app.abaetefest.com.br/og-default-event.jpg'
        }
      },

      link: {
        canonical: {
          rel: 'canonical',
          href: `https://app.abaetefest.com.br/event-details/${event.id}`
        }
      }
    }
  }

  // Helper para adicionar structured data de forma segura
  Vue.prototype.$addStructuredData = function (data, id = 'structured-data') {
    if (process.env.CLIENT) {
      Vue.nextTick(() => {
        // Remove script existente se houver
        const existing = document.getElementById(id)
        if (existing) {
          existing.remove()
        }

        // Adiciona o novo script
        const script = document.createElement('script')
        script.type = 'application/ld+json'
        script.id = id
        script.innerHTML = JSON.stringify(data)
        document.head.appendChild(script)
      })
    }
  }

  // No modo servidor, adiciona structured data global ao contexto
  if (ssrContext) {
    ssrContext.globalStructuredData = globalStructuredData
  }

  // Router guard para adicionar structured data global - VERSÃO CORRIGIDA
  if (process.env.CLIENT) {
    router.afterEach((to) => {
      // Adicionar structured data global apenas na home
      if (to.path === '/') {
        setTimeout(() => {
          Vue.prototype.$addStructuredData(globalStructuredData, 'global-structured-data')
        }, 200)
      }
    })
  }
})
