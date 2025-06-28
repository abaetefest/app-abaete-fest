export default {
  methods: {
    // Método para configurar meta tags dinâmicas
    setSEO({
      title = 'AbaetéFest - Eventos e Experiências em Abaeteba',
      description = 'Descubra os melhores eventos, horários de viagem e experiências únicas em Abaeteba. Sua fonte completa de entretenimento e informação.',
      keywords = 'eventos, abaeteba, festas, shows, horários, viagem, entretenimento',
      image = 'https://app.abaetefest.com.br/og-image.jpg',
      url = 'https://app.abaetefest.com.br',
      type = 'website'
    } = {}) {
      // Define o título da página
      this.$q.meta.set({
        title,
        titleTemplate: title => `${title} | AbaetéFest`,

        // Meta tags básicas
        meta: {
          description: { name: 'description', content: description },
          keywords: { name: 'keywords', content: keywords },
          author: { name: 'author', content: 'AbaetéFest' },

          // Open Graph (Facebook, WhatsApp, etc.)
          'og:title': { property: 'og:title', content: title },
          'og:description': { property: 'og:description', content: description },
          'og:image': { property: 'og:image', content: image },
          'og:url': { property: 'og:url', content: url },
          'og:type': { property: 'og:type', content: type },
          'og:site_name': { property: 'og:site_name', content: 'AbaetéFest' },
          'og:locale': { property: 'og:locale', content: 'pt_BR' },

          // Twitter Cards
          'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
          'twitter:title': { name: 'twitter:title', content: title },
          'twitter:description': { name: 'twitter:description', content: description },
          'twitter:image': { name: 'twitter:image', content: image },

          // Meta tags específicas para eventos
          'event:location': { property: 'event:location', content: 'Abaeteba, Bahia, Brasil' },

          // Schema.org structured data
          'application/ld+json': {
            type: 'application/ld+json',
            content: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': type === 'event' ? 'Event' : 'WebSite',
              name: title,
              description: description,
              url: url,
              image: image,
              ...(type === 'event' && {
                location: {
                  '@type': 'Place',
                  name: 'Abaeteba',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Abaeteba',
                    addressRegion: 'BA',
                    addressCountry: 'BR'
                  }
                }
              })
            })
          }
        },

        // Links canônicos
        link: {
          canonical: { rel: 'canonical', href: url }
        }
      })
    },

    // Método específico para eventos
    setEventSEO(event) {
      const eventDate = new Date(event.data_inicio).toLocaleDateString('pt-BR')

      this.setSEO({
        title: `${event.nome} - ${eventDate}`,
        description: `${event.descricao} Evento em ${event.local || 'Abaeteba'} no dia ${eventDate}. Não perca!`,
        keywords: `${event.nome}, evento, ${event.categoria || 'festa'}, abaeteba, ${eventDate}`,
        image: event.imagem || 'https://app.abaetefest.com.br/og-image.jpg',
        url: `https://app.abaetefest.com.br/evento/${event.id}`,
        type: 'event'
      })
    },

    // Método para páginas de categoria
    setCategorySEO(categoria) {
      this.setSEO({
        title: `Eventos de ${categoria} em Abaeteba`,
        description: `Descubra todos os eventos de ${categoria} acontecendo em Abaeteba. Encontre os melhores ${categoria.toLowerCase()} da região.`,
        keywords: `${categoria}, eventos, abaeteba, festas, shows`,
        url: `https://app.abaetefest.com.br/categoria/${categoria.toLowerCase()}`
      })
    }
  }
}
