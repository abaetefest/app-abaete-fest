import { date } from 'quasar'
import { getCarnivalEventById } from 'src/constants/carnivalSchedule'

export default {
  name: 'PageEventDetails',

  // preFetch para SSR - carrega dados no servidor
  async preFetch({ currentRoute, redirect }) {
    const id = currentRoute.params.id

    if (!id) {
      redirect('/')
      return
    }

    // Eventos fixos (ex.: programação carnaval)
    const fixedEvent = getCarnivalEventById(id)
    if (fixedEvent) {
      return { event: fixedEvent, load: false }
    }

    try {
      // Busca o evento da API
      const response = await fetch(`https://polished-snowflake-9723.fly.dev/api/events/${id}`)

      if (!response.ok) {
        redirect('/404')
        return
      }

      const result = await response.json()
      const eventData = result.data

      if (!eventData) {
        redirect('/404')
        return
      }

      // Retorna os dados para uso no componente
      return { event: eventData, load: false }
    } catch (error) {
      console.error('Erro no preFetch:', error)
      redirect('/404')
    }
  },

  // Meta tags otimizadas para SEO e redes sociais
  meta: function () {
    if (!this.event || !this.event.id) {
      return {
        title: 'Carregando evento... | AbaetéFest'
      }
    }

    const eventDate = this.formatDateString(this.event.start_date)
    const eventTime = this.formatHourString(this.event.start_date)

    // Limpa e otimiza a descrição
    const cleanDescription = this.event.description
      ? this.event.description
        .replace(/<[^>]*>/g, '') // Remove HTML
        .replace(/\s+/g, ' ') // Remove espaços extras
        .trim()
        .substring(0, 155) + (this.event.description.length > 155 ? '...' : '')
      : `Participe do evento ${this.event.name} em ${this.event.location || 'Abaetetuba'} no dia ${eventDate} às ${eventTime}. Não perca!`

    // Título otimizado para SEO e compartilhamento
    const pageTitle = `${this.event.name} - ${eventDate} | AbaetéFest`
    const shareTitle = `${this.event.name} - ${eventDate}`

    // Imagem otimizada para compartilhamento
    const shareImage = this.event.image_url || 'https://app.abaetefest.com.br/images/og-default-event.jpg'
    const canonicalUrl = `https://app.abaetefest.com.br/event-details/${this.event.id}`

    // Keywords otimizadas
    const keywords = [
      this.event.name,
      'eventos abaetetuba',
      'abaetetuba eventos',
      'cop 30',
      'festas abaetetuba',
      'turismo abaetetuba',
      this.event.category ? this.getCategoryLabel(this.event.category).toLowerCase() : 'festa',
      this.event.location || 'abaetetuba',
      eventDate.replace(/\//g, ' '),
      'pará eventos',
      'amazônia eventos'
    ].filter(Boolean).join(', ')

    return {
      title: pageTitle,
      titleTemplate: title => title,

      meta: {
        // Meta tags básicas
        description: {
          name: 'description',
          content: cleanDescription
        },
        keywords: {
          name: 'keywords',
          content: keywords
        },
        author: {
          name: 'author',
          content: 'AbaetéFest'
        },
        robots: {
          name: 'robots',
          content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        },
        viewport: {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },

        // Meta tags para SEO local
        'geo.region': {
          name: 'geo.region',
          content: 'BR-PA'
        },
        'geo.placename': {
          name: 'geo.placename',
          content: 'Abaetetuba'
        },
        'geo.position': {
          name: 'geo.position',
          content: '-1.721247;-48.878883' // Coordenadas de Abaetetuba
        },
        ICBM: {
          name: 'ICBM',
          content: '-1.721247, -48.878883'
        },

        // Open Graph para Facebook
        ogTitle: {
          property: 'og:title',
          content: shareTitle
        },
        ogDescription: {
          property: 'og:description',
          content: cleanDescription
        },
        ogImage: {
          property: 'og:image',
          content: shareImage
        },
        ogImageAlt: {
          property: 'og:image:alt',
          content: `Imagem do evento ${this.event.name}`
        },
        ogImageWidth: {
          property: 'og:image:width',
          content: '1200'
        },
        ogImageHeight: {
          property: 'og:image:height',
          content: '630'
        },
        ogUrl: {
          property: 'og:url',
          content: canonicalUrl
        },
        ogType: {
          property: 'og:type',
          content: 'article'
        },
        ogSiteName: {
          property: 'og:site_name',
          content: 'AbaetéFest'
        },
        ogLocale: {
          property: 'og:locale',
          content: 'pt_BR'
        },

        // Open Graph para eventos
        ogEventStartTime: {
          property: 'event:start_time',
          content: this.event.start_date
        },
        ogEventEndTime: {
          property: 'event:end_time',
          content: this.event.end_date || this.event.start_date
        },
        ogEventLocation: {
          property: 'event:location',
          content: this.event.location || 'Abaetetuba, PA'
        },

        // Twitter Cards
        twitterCard: {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        twitterSite: {
          name: 'twitter:site',
          content: '@abaetefest' // Substitua pelo seu handle
        },
        twitterCreator: {
          name: 'twitter:creator',
          content: '@abaetefest'
        },
        twitterTitle: {
          name: 'twitter:title',
          content: shareTitle
        },
        twitterDescription: {
          name: 'twitter:description',
          content: cleanDescription
        },
        twitterImage: {
          name: 'twitter:image',
          content: shareImage
        },
        twitterImageAlt: {
          name: 'twitter:image:alt',
          content: `Imagem do evento ${this.event.name}`
        },

        // LinkedIn (Open Graph + extras)
        linkedinTitle: {
          property: 'linkedin:title',
          content: shareTitle
        },
        linkedinDescription: {
          property: 'linkedin:description',
          content: cleanDescription
        },
        linkedinImage: {
          property: 'linkedin:image',
          content: shareImage
        },

        // Article meta tags
        articleAuthor: {
          property: 'article:author',
          content: 'AbaetéFest'
        },
        articlePublishedTime: {
          property: 'article:published_time',
          content: new Date(this.event.created_at || Date.now()).toISOString()
        },
        articleModifiedTime: {
          property: 'article:modified_time',
          content: new Date(this.event.updated_at || Date.now()).toISOString()
        },
        articleSection: {
          property: 'article:section',
          content: this.getCategoryLabel(this.event.category || 'event')
        },
        articleTag: {
          property: 'article:tag',
          content: keywords.split(', ').slice(0, 5).join(',')
        },

        // Meta específicas para o Brasil
        'DC.language': {
          name: 'DC.language',
          content: 'pt-BR'
        },
        'DC.title': {
          name: 'DC.title',
          content: shareTitle
        },
        'DC.description': {
          name: 'DC.description',
          content: cleanDescription
        },
        'DC.creator': {
          name: 'DC.creator',
          content: 'AbaetéFest'
        },

        // Meta para rich snippets
        'event-name': {
          name: 'event-name',
          content: this.event.name
        },
        'event-date': {
          name: 'event-date',
          content: eventDate
        },
        'event-location': {
          name: 'event-location',
          content: this.event.location || 'Abaetetuba, PA'
        }
      },

      link: {
        canonical: {
          rel: 'canonical',
          href: canonicalUrl
        },
        alternate: {
          rel: 'alternate',
          type: 'application/rss+xml',
          href: 'https://app.abaetefest.com.br/feed.xml',
          title: 'AbaetéFest - Eventos RSS'
        },
        // Preconnect para performance
        preconnectGoogle: {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        preconnectCDN: {
          rel: 'preconnect',
          href: 'https://cdn.jsdelivr.net'
        }
      }
    }
  },

  // Método para structured data otimizado
  addStructuredData: function () {
    if (!this.event.id || (typeof process !== 'undefined' && !process.env.CLIENT)) return

    const eventDate = this.formatDateString(this.event.start_date)
    const cleanDescription = this.event.description
      ? this.event.description.replace(/<[^>]*>/g, '').substring(0, 200)
      : `Evento ${this.event.name} em ${this.event.location || 'Abaetetuba'} no dia ${eventDate}`

    // Structured Data principal para eventos
    const eventStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: this.event.name,
      description: cleanDescription,
      startDate: this.event.start_date,
      endDate: this.event.end_date || this.event.start_date,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      image: {
        '@type': 'ImageObject',
        url: this.event.image_url,
        width: 1200,
        height: 630
      },
      url: `https://app.abaetefest.com.br/event-details/${this.event.id}`,
      location: {
        '@type': 'Place',
        name: this.event.location || 'Abaetetuba',
        address: {
          '@type': 'PostalAddress',
          streetAddress: this.event.address || '',
          addressLocality: 'Abaetetuba',
          addressRegion: 'Pará',
          postalCode: '68440-000',
          addressCountry: 'BR'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -1.721247,
          longitude: -48.878883
        }
      },
      organizer: {
        '@type': 'Organization',
        name: this.event.organizer || 'AbaetéFest',
        url: 'https://app.abaetefest.com.br',
        logo: {
          '@type': 'ImageObject',
          url: 'https://app.abaetefest.com.br/logo.png'
        },
        sameAs: [
          'https://www.facebook.com/abaetefest',
          'https://www.instagram.com/abaetefest',
          'https://twitter.com/abaetefest'
        ]
      },
      performer: this.event.performer
        ? {
            '@type': 'Person',
            name: this.event.performer
          }
        : undefined
    }

    // Adiciona preço se disponível
    if (this.event.price !== undefined) {
      eventStructuredData.offers = {
        '@type': 'Offer',
        price: this.event.price,
        priceCurrency: 'BRL',
        availability: this.event.tickets_available ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
        url: `https://app.abaetefest.com.br/event-details/${this.event.id}`,
        validFrom: new Date().toISOString()
      }
    }

    // Breadcrumbs estruturados
    const breadcrumbStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Início',
          item: 'https://app.abaetefest.com.br'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Eventos',
          item: 'https://app.abaetefest.com.br/events'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: this.event.name,
          item: `https://app.abaetefest.com.br/event-details/${this.event.id}`
        }
      ]
    }

    // Organização estruturada
    const organizationStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AbaetéFest',
      url: 'https://app.abaetefest.com.br',
      logo: {
        '@type': 'ImageObject',
        url: 'https://app.abaetefest.com.br/logo.png'
      },
      description: 'Plataforma de eventos de Abaetetuba e região amazônica',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Abaetetuba',
        addressRegion: 'Pará',
        addressCountry: 'BR'
      },
      sameAs: [
        'https://www.facebook.com/abaetefest',
        'https://www.instagram.com/abaetefest',
        'https://twitter.com/abaetefest'
      ]
    }

    // Remove structured data anterior
    const existingScripts = document.querySelectorAll('[id^="structured-data-"]')
    existingScripts.forEach(script => script.remove())

    // Adiciona os structured data
    const structuredDataSets = [
      { id: 'structured-data-event', data: eventStructuredData },
      { id: 'structured-data-breadcrumb', data: breadcrumbStructuredData },
      { id: 'structured-data-organization', data: organizationStructuredData }
    ]

    structuredDataSets.forEach(({ id, data }) => {
      const script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
    })
  },

  data: function () {
    return {
      event: {},
      load: true,
      canShare: false
    }
  },

  mounted: function () {
    this.setupClientFeatures()

    if (!this.event.id) {
      if (this.$route.params.id) {
        this.getEvent(this.$route.params.id)
      } else {
        this.$router.push('/')
      }
    } else {
      this.addStructuredData()
    }
  },

  watch: {
    'event.id': {
      handler: function (newId) {
        if (newId) {
          this.$nextTick(function () {
            this.addStructuredData()
          }.bind(this))
        }
      }
    }
  },

  methods: {
    setupClientFeatures: function () {
      if (typeof navigator !== 'undefined' && navigator.canShare) {
        this.canShare = true
      }
    },

    getEvent: async function (id) {
      // Eventos fixos (ex.: programação carnaval) – não chamam a API
      const fixedEvent = getCarnivalEventById(id)
      if (fixedEvent) {
        this.event = fixedEvent
        this.load = false
        this.$nextTick(() => this.addStructuredData())
        return
      }

      this.load = true
      try {
        const { data } = await this.$services.events().get(id)
        this.event = data.data || {}
        this.load = false

        this.$nextTick(function () {
          this.addStructuredData()
        }.bind(this))
      } catch (error) {
        this.load = false
        console.error('Erro ao carregar evento:', error)
        this.$router.push('/404')
      }
    },

    // Formatação
    formatDateString: function (dateOriginal) {
      if (!dateOriginal) return ''
      return date.formatDate(dateOriginal, 'DD/MM/YYYY')
    },

    formatHourString: function (dateOriginal) {
      if (!dateOriginal) return ''
      return date.formatDate(dateOriginal, 'HH:mm')
    },

    formatPrice: function (price) {
      if (!price) return '0,00'
      return parseFloat(price).toFixed(2).replace('.', ',')
    },

    // Categorias
    getCategoryColor: function (category) {
      const colors = {
        music: 'purple-6',
        party: 'pink-6',
        culture: 'teal-6',
        sport: 'orange-6',
        food: 'red-6',
        business: 'blue-6',
        education: 'green-6',
        carnival: 'deep-orange-6'
      }
      return colors[category] || 'primary'
    },

    getCategoryIcon: function (category) {
      const icons = {
        music: 'mdi-music',
        party: 'mdi-party-popper',
        culture: 'mdi-palette',
        sport: 'mdi-soccer',
        food: 'mdi-food',
        business: 'mdi-briefcase',
        education: 'mdi-school',
        carnival: 'mdi-drama-masks'
      }
      return icons[category] || 'mdi-calendar'
    },

    getCategoryLabel: function (category) {
      const categoryLabels = {
        music: 'Música',
        party: 'Festa',
        culture: 'Cultura',
        sport: 'Esporte',
        food: 'Gastronomia',
        business: 'Negócios',
        education: 'Educação',
        carnival: 'Carnaval'
      }
      return categoryLabels[category] || 'Evento'
    },

    // Ações
    backToEvents: function () {
      this.$router.push({ name: 'events' })
    },

    goToEvent: function (eventId) {
      this.$router.push({ name: 'eventDetails', params: { id: eventId } })
    },

    shareApp: async function () {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') return

      const baseUrl = `${window.location.protocol}//${window.location.host}`
      const timestamp = new Date().getTime()

      const shareData = {
        title: 'Veja esse Evento no App AbaetéFest',
        text: this.event.name,
        url: `${baseUrl}/event-details/${this.event.id}?t=${timestamp} `
      }

      try {
        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData)
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareData.url)
          this.$q.notify({
            message: 'Link copiado!',
            color: 'positive',
            position: 'top',
            icon: 'mdi-check'
          })
        }
      } catch (err) {
        console.error('Erro ao compartilhar:', err)
        this.$q.notify({
          message: 'Erro ao compartilhar!',
          color: 'negative',
          position: 'top'
        })
      }
    },

    toggleInterest: function () {
      this.$q.notify({
        message: 'Interesse registrado!',
        color: 'positive',
        position: 'top',
        icon: 'mdi-heart'
      })
    },

    addToCalendar: function () {
      const eventDate = new Date(this.event.start_date)
      const formattedDate = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

      const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(this.event.name)}&dates=${formattedDate}/${formattedDate}&details=${encodeURIComponent(this.event.description || '')}&location=${encodeURIComponent(this.event.location || '')}`

      window.open(calendarUrl, '_blank')
    }
  }
}
