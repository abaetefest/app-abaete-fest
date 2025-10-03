import { category } from 'src/constants/category'

export default {
  name: 'PageEvents',

  // Meta tags para SEO
  // Meta tags otimizadas para página de listagem de eventos
  meta() {
    const categoryFilter =
      this.categoria && this.categoria !== 'all'
        ? this.getCategoryLabel(this.categoria)
        : 'Todos os tipos'

    const eventCount = this.events.length
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().toLocaleDateString('pt-BR', { month: 'long' })

    // URLs dinâmicas baseadas na categoria
    const baseUrl = 'https://app.abaetefest.com.br/events'
    const currentUrl = this.categoria && this.categoria !== 'all'
      ? `${baseUrl}?categoria=${this.categoria}`
      : baseUrl

    // Título otimizado com variações por categoria
    const pageTitle = this.categoria && this.categoria !== 'all'
      ? `${categoryFilter} em Abaetetuba ${currentYear} - ${eventCount} Eventos | AbaetéFest`
      : `Eventos em Abaetetuba ${currentYear} - Agenda Completa | AbaetéFest`

    // Descrição dinâmica e atrativa
    const baseDescription = this.categoria && this.categoria !== 'all'
      ? `Encontre os melhores eventos de ${categoryFilter.toLowerCase()} em Abaetetuba. ${eventCount} ${categoryFilter.toLowerCase()} disponíveis para ${currentMonth} de ${currentYear}. Shows, festas, cultura e entretenimento na Amazônia!`
      : `Descubra a agenda completa de eventos em Abaetetuba ${currentYear}. ${eventCount} eventos disponíveis: shows, festas, cultura, gastronomia e muito mais. Seu guia completo de entretenimento na Amazônia!`

    // Keywords dinâmicas e SEO local
    const dynamicKeywords = [
      'eventos abaetetuba',
    `eventos abaetetuba ${currentYear}`,
    'festas abaetetuba',
    'shows abaetetuba',
    'cultura abaetetuba',
    'entretenimento abaetetuba',
    this.categoria && this.categoria !== 'all' ? categoryFilter.toLowerCase() : 'agenda cultural',
    'eventos pará',
    'amazônia eventos',
    'cop 30 abaetetuba',
    `${currentMonth} ${currentYear}`,
    'turismo abaetetuba',
    'vida noturna abaetetuba',
    'eventos fins de semana',
    'o que fazer abaetetuba'
    ].filter(Boolean).join(', ')

    // Título para compartilhamento (mais curto e direto)
    const shareTitle = this.categoria && this.categoria !== 'all'
      ? `${categoryFilter} em Abaetetuba - ${eventCount} Eventos`
      : `${eventCount} Eventos em Abaetetuba - ${currentMonth} ${currentYear}`

    // Descrição para compartilhamento (mais concisa e call-to-action)
    const shareDescription = this.categoria && this.categoria !== 'all'
      ? `🎉 ${eventCount} eventos de ${categoryFilter.toLowerCase()} esperando por você em Abaetetuba! Confira nossa agenda atualizada e não perca nada.`
      : `🎉 ${eventCount} eventos incríveis em Abaetetuba! Shows, festas, cultura e muito mais. Confira a agenda completa de ${currentMonth}.`

    // Imagem otimizada para compartilhamento
    const shareImage = this.categoria && this.categoria !== 'all'
      ? `https://app.abaetefest.com.br/images/og-events-${this.categoria}.jpg`
      : 'https://app.abaetefest.com.br/images/og-events-all.jpg'

    return {
      title: pageTitle,
      titleTemplate: title => title,

      meta: {
      // Meta tags básicas otimizadas
        description: {
          name: 'description',
          content: baseDescription
        },
        keywords: {
          name: 'keywords',
          content: dynamicKeywords
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

        // Meta tags de classificação de conteúdo
        rating: {
          name: 'rating',
          content: 'general'
        },
        distribution: {
          name: 'distribution',
          content: 'global'
        },
        'content-language': {
          name: 'content-language',
          content: 'pt-BR'
        },

        // Meta tags para geolocalização (corrigidas)
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
          content: '-1.721247;-48.878883'
        },
        ICBM: {
          name: 'ICBM',
          content: '-1.721247, -48.878883'
        },

        // Open Graph otimizado para Facebook
        ogTitle: {
          property: 'og:title',
          content: shareTitle
        },
        ogDescription: {
          property: 'og:description',
          content: shareDescription
        },
        ogImage: {
          property: 'og:image',
          content: shareImage
        },
        ogImageAlt: {
          property: 'og:image:alt',
          content: `Eventos de ${categoryFilter.toLowerCase()} em Abaetetuba`
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
          content: currentUrl
        },
        ogType: {
          property: 'og:type',
          content: 'website'
        },
        ogSiteName: {
          property: 'og:site_name',
          content: 'AbaetéFest'
        },
        ogLocale: {
          property: 'og:locale',
          content: 'pt_BR'
        },
        ogLocaleAlternate: {
          property: 'og:locale:alternate',
          content: 'en_US'
        },

        // Open Graph específico para local/região
        ogCountryName: {
          property: 'og:country-name',
          content: 'Brasil'
        },
        ogRegion: {
          property: 'og:region',
          content: 'Pará'
        },
        ogLatitude: {
          property: 'og:latitude',
          content: '-1.721247'
        },
        ogLongitude: {
          property: 'og:longitude',
          content: '-48.878883'
        },

        // Twitter Cards otimizado
        twitterCard: {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        twitterSite: {
          name: 'twitter:site',
          content: '@abaetefest'
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
          content: shareDescription
        },
        twitterImage: {
          name: 'twitter:image',
          content: shareImage
        },
        twitterImageAlt: {
          name: 'twitter:image:alt',
          content: `Eventos de ${categoryFilter.toLowerCase()} em Abaetetuba`
        },

        // LinkedIn específico
        linkedinTitle: {
          property: 'linkedin:title',
          content: shareTitle
        },
        linkedinDescription: {
          property: 'linkedin:description',
          content: shareDescription.replace(/🎉/g, '') // Remove emoji para LinkedIn
        },
        linkedinImage: {
          property: 'linkedin:image',
          content: shareImage
        },

        // WhatsApp específico (usando Open Graph)
        // WhatsApp vai usar og:title, og:description, og:image automaticamente

        // Telegram específico (usando Open Graph)
        // Telegram vai usar og:title, og:description, og:image automaticamente

        // Meta tags para artigos e conteúdo
        articleSection: {
          property: 'article:section',
          content: 'Eventos'
        },
        articleTag: {
          property: 'article:tag',
          content: `eventos, abaetetuba, ${categoryFilter.toLowerCase()}, ${currentYear}`
        },
        articleAuthor: {
          property: 'article:author',
          content: 'AbaetéFest'
        },
        articlePublisher: {
          property: 'article:publisher',
          content: 'AbaetéFest'
        },

        // Meta tags Dublin Core
        'DC.title': {
          name: 'DC.title',
          content: shareTitle
        },
        'DC.description': {
          name: 'DC.description',
          content: baseDescription
        },
        'DC.creator': {
          name: 'DC.creator',
          content: 'AbaetéFest'
        },
        'DC.language': {
          name: 'DC.language',
          content: 'pt-BR'
        },
        'DC.format': {
          name: 'DC.format',
          content: 'text/html'
        },

        // Meta tags para aplicativos móveis
        'mobile-web-app-capable': {
          name: 'mobile-web-app-capable',
          content: 'yes'
        },
        'apple-mobile-web-app-capable': {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        'apple-mobile-web-app-status-bar-style': {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent'
        },
        'apple-mobile-web-app-title': {
          name: 'apple-mobile-web-app-title',
          content: 'AbaetéFest'
        },

        // Meta específicas para lista de eventos
        'event-category': {
          name: 'event-category',
          content: categoryFilter
        },
        'event-count': {
          name: 'event-count',
          content: eventCount.toString()
        },
        'event-location': {
          name: 'event-location',
          content: 'Abaetetuba, PA'
        },
        'event-period': {
          name: 'event-period',
          content: `${currentMonth} ${currentYear}`
        }
      },

      link: {
        canonical: {
          rel: 'canonical',
          href: currentUrl
        },

        // Links alternativos por categoria
        alternate: this.categoria && this.categoria !== 'all'
          ? {
              rel: 'alternate',
              href: baseUrl,
              title: 'Todos os eventos'
            }
          : undefined,

        // RSS Feed
        rss: {
          rel: 'alternate',
          type: 'application/rss+xml',
          href: 'https://app.abaetefest.com.br/feed.xml',
          title: 'AbaetéFest - Feed de Eventos'
        },

        // Preconnect para performance
        preconnectFonts: {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        preconnectCDN: {
          rel: 'preconnect',
          href: 'https://cdn.jsdelivr.net'
        },
        preconnectAPI: {
          rel: 'preconnect',
          href: 'https://polished-snowflake-9723.fly.dev'
        },

        // Prefetch para categorias relacionadas
        prefetchMusic: this.categoria !== 'music'
          ? {
              rel: 'prefetch',
              href: `${baseUrl}?categoria=music`
            }
          : undefined,
        prefetchParty: this.categoria !== 'party'
          ? {
              rel: 'prefetch',
              href: `${baseUrl}?categoria=party`
            }
          : undefined,
        prefetchCulture: this.categoria !== 'culture'
          ? {
              rel: 'prefetch',
              href: `${baseUrl}?categoria=culture`
            }
          : undefined,

        // Apple Touch Icons
        appleTouchIcon: {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        appleTouchIcon152: {
          rel: 'apple-touch-icon',
          sizes: '152x152',
          href: '/apple-touch-icon-152x152.png'
        }
      }
    }
  },

  // Método para structured data da página de eventos
  addEventsStructuredData: function () {
    if (typeof process !== 'undefined' && !process.env.CLIENT) return

    const categoryFilter = this.categoria && this.categoria !== 'all'
      ? this.getCategoryLabel(this.categoria)
      : 'Todos os tipos'

    const currentUrl = this.categoria && this.categoria !== 'all'
      ? `https://app.abaetefest.com.br/events?categoria=${this.categoria}`
      : 'https://app.abaetefest.com.br/events'

    // Structured Data para a página de eventos
    const eventListStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `Eventos ${categoryFilter} em Abaetetuba`,
      description: `Lista de eventos de ${categoryFilter.toLowerCase()} em Abaetetuba`,
      url: currentUrl,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: this.events.length,
        itemListElement: this.events.slice(0, 10).map((event, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Event',
            name: event.name,
            description: event.description ? event.description.replace(/<[^>]*>/g, '').substring(0, 100) : '',
            startDate: event.start_date,
            location: {
              '@type': 'Place',
              name: event.location || 'Abaetetuba',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Abaetetuba',
                addressRegion: 'Pará',
                addressCountry: 'BR'
              }
            },
            url: `https://app.abaetefest.com.br/event-details/${event.id}`,
            image: event.image_url
          }
        }))
      },
      provider: {
        '@type': 'Organization',
        name: 'AbaetéFest',
        url: 'https://app.abaetefest.com.br'
      }
    }

    // Breadcrumb structured data
    const breadcrumbItems = [
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
      }
    ]

    if (this.categoria && this.categoria !== 'all') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: categoryFilter,
        item: currentUrl
      })
    }

    const breadcrumbStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    }

    // Local Business structured data
    const localBusinessStructuredData = {
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
        postalCode: '68440-000',
        addressCountry: 'BR'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -1.721247,
        longitude: -48.878883
      },
      areaServed: {
        '@type': 'City',
        name: 'Abaetetuba'
      },
      sameAs: [
        'https://www.facebook.com/abaetefest',
        'https://www.instagram.com/abaetefest',
        'https://twitter.com/abaetefest'
      ]
    }

    // Remove structured data anterior
    const existingScripts = document.querySelectorAll('[id^="events-structured-data-"]')
    existingScripts.forEach(script => script.remove())

    // Adiciona os structured data
    const structuredDataSets = [
      { id: 'events-structured-data-list', data: eventListStructuredData },
      { id: 'events-structured-data-breadcrumb', data: breadcrumbStructuredData },
      { id: 'events-structured-data-business', data: localBusinessStructuredData }
    ]

    structuredDataSets.forEach(({ id, data }) => {
      const script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
    })
  },
  props: {
    grid: {
      type: Boolean,
      default: true
    }
  },

  components: {
    DialogCourseDetails: () => import('components/DialogCourseDetails'),
    EventFilters: () => import('./components/EventFilters'),
    EventCard: () => import('./components/EventCard'),
    EventCardLarge: () => import('./components/EventCardLarge'),
    EventSkeleton: () => import('./components/EventSkeleton'),
    EventCardSkeleton: () => import('./components/EventCardSkeleton'),
    EmptyState: () => import('./components/EmptyState')
  },

  data() {
    return {
      filter: '',
      categoria: 'all',
      viewMode: 'compact', // 'compact' ou 'large'
      options: category,
      events: [],
      allEvents: [], // Armazena todos os eventos
      load: true,
      modalCourse: false,
      courseDetails: {},
      canCreateEvent: false, // Definir baseado nas permissões do usuário
      // Informações de cache offline
      isOffline: false,
      cacheAge: null,
      isCacheExpired: false
    }
  },

  computed: {
    filteredEvents() {
      if (!this.events || this.events.length === 0) {
        console.log('⚠️ Nenhum evento carregado ainda')
        return []
      }

      // Categoria já vem filtrada do backend
      let filtered = [...this.events]

      // Filtro por texto de busca (frontend)
      if (this.filter && this.filter.trim()) {
        const searchTerm = this.filter.toLowerCase().trim()
        filtered = filtered.filter((event) => {
          const name = (event.name || event.title || event.nome || '').toLowerCase()
          const description = (event.description || event.descricao || event.desc || '').toLowerCase()
          const location = (event.location || event.local || event.endereco || '').toLowerCase()

          return name.includes(searchTerm) ||
                   description.includes(searchTerm) ||
                   location.includes(searchTerm)
        })
        console.log(`🔎 Busca aplicada: "${searchTerm}" → ${filtered.length} resultados`)
      }
      return filtered
    }

  },

  async mounted() {
    // Carrega preferência de visualização do localStorage
    const savedViewMode = localStorage.getItem('events-view-mode')
    if (savedViewMode && ['compact', 'large'].includes(savedViewMode)) {
      this.viewMode = savedViewMode
    }

    // Verifica parâmetros da URL
    if (this.$route.params.type) {
      this.categoria = this.$route.params.type
    }

    // Verifica query params
    if (this.$route.query.categoria) {
      this.categoria = this.$route.query.categoria
    }

    await this.listEvents(this.categoria !== 'all' ? this.categoria : '')
  },

  watch: {
    categoria(newVal) {
      // Atualiza URL sem recarregar a página
      if (newVal !== 'all') {
        this.$router.replace({ query: { categoria: newVal } }).catch((err) => {
          console.error(err)
        })
      } else {
        this.$router.replace({ query: {} }).catch((err) => {
          console.error(err)
        })
      }
    },

    // Salva preferência de visualização no localStorage
    viewMode(newMode) {
      try {
        localStorage.setItem('events-view-mode', newMode)
        console.log('👁️ Modo de visualização salvo no localStorage:', newMode)
      } catch (error) {
        console.error('❌ Erro ao salvar preferência de visualização:', error)
      }
    }
  },

  methods: {
    async listEvents(category = '', forceRefresh = false) {
      this.load = true
      try {
        console.log('📡 Carregando eventos por categoria:', category || 'todas')
        const response = await this.$services.events().listByCategory(category, forceRefresh)

        // Extrai dados e informações de cache
        const { data, fromCache, cacheAge, isExpired } = response
        this.events = data.data || []

        // Atualiza informações de cache
        this.isOffline = fromCache || false
        this.cacheAge = cacheAge || null
        this.isCacheExpired = isExpired || false

        // Log de modo offline (banner visual já informa o usuário)
        if (fromCache) {
          const ageText = cacheAge
            ? `${cacheAge} minuto${cacheAge !== 1 ? 's' : ''}`
            : 'recente'
          console.log(`📦 Modo Offline: Usando cache de ${ageText}`)
        } else if (cacheAge === 0) {
          // Dados acabaram de ser salvos no cache
          console.log('✅ Dados sincronizados e salvos no cache')
        }

        // Carrega todos os eventos para contador se for primeira vez
        if (!this.allEvents.length) {
          console.log('📊 Carregando total de eventos para contador...')
          const allResponse = await this.$services.events().listByCategory('', forceRefresh)
          this.allEvents = allResponse.data.data || []
        }

        console.log('📊 Eventos carregados:', this.events.length)
        console.log('📊 Total de eventos:', this.allEvents.length)
        this.load = false
      } catch (error) {
        this.load = false
        console.error('❌ Erro ao carregar eventos:', error)

        // Fallback: tenta filtrar localmente se já tiver dados carregados
        if (this.allEvents && this.allEvents.length > 0) {
          console.log('🔄 Usando filtro local com dados já carregados')
          this.filterEventsLocally(category)
          this.isOffline = true
        } else {
          this.$q.notify({
            message: 'Erro ao carregar eventos. Verifique sua conexão.',
            color: 'negative',
            position: 'top',
            icon: 'mdi-alert-circle',
            timeout: 4000
          })
        }
      }
    },

    // Filtra eventos localmente quando offline ou API falha
    filterEventsLocally(category) {
      if (!category || category === 'all') {
        // Mostra todos os eventos
        this.events = [...this.allEvents]
        console.log('🔍 Filtro local: Exibindo todos os eventos')
      } else {
        // Filtra por categoria
        this.events = this.allEvents.filter(event => {
          return event.category === category ||
                 event.categoria === category ||
                 event.type === category
        })
        console.log(`🔍 Filtro local: ${this.events.length} eventos na categoria "${category}"`)
      }
      this.load = false
    },

    detailsEvent(event) {
      this.$router.push({ name: 'eventDetails', params: { id: event.id } })

      // Analytics
      if (this.$mixpanel) {
        this.$mixpanel.track('Event Card Clicked', {
          event_id: event.id,
          event_name: event.name,
          category: event.category
        })
      }
    },

    createNewEvent() {
      this.$router.push({ name: 'createEvent' })
    },

    closeModal() {
      this.modalCourse = false
      this.courseDetails = {}
    },

    // Handlers para componentes filhos
    async onCategoryChange(newCategory) {
      console.log('📂 Alterando categoria para:', newCategory)
      this.categoria = newCategory

      // Se já tiver todos os eventos carregados e estiver offline, filtra localmente
      if (this.allEvents && this.allEvents.length > 0 && this.isOffline) {
        console.log('🔄 Modo offline detectado: usando filtro local')
        this.load = true
        this.filterEventsLocally(newCategory !== 'all' ? newCategory : '')
      } else {
        // Tenta buscar da API/cache
        await this.listEvents(newCategory !== 'all' ? newCategory : '')
      }
    },

    onFilterChange(newFilter) {
      this.filter = newFilter
    },

    clearFilters() {
      this.filter = ''
      this.categoria = 'all'
    },

    // Força atualização dos dados da API
    refreshEvents() {
      const currentCategory = this.categoria !== 'all' ? this.categoria : ''
      this.listEvents(currentCategory, true)
    },

    getCategoryLabel(category) {
      const categoryObj = this.options.find(opt => opt.value === category)
      return categoryObj ? categoryObj.label : 'Evento'
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
