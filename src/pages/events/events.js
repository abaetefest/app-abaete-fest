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
    EmptyState: () => import('./components/EmptyState'),
    TutorialRecurringEvents: () => import('./components/TutorialRecurringEvents')
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
      eventTypeFilter: 'all', // 'all', 'recurring', 'normal'
      eventTypeOptions: [
        { label: 'Todos os Eventos', value: 'all' },
        { label: 'Eventos Recorrentes', value: 'recurring' },
        { label: 'Eventos com Data Específica', value: 'normal' }
      ],
      showRecurringTutorial: false // Controla a exibição do tutorial
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

      // Aplica filtro de tipo de evento primeiro
      if (this.eventTypeFilter === 'recurring') {
        filtered = filtered.filter(event => this.isRecurringEvent(event))
      } else if (this.eventTypeFilter === 'normal') {
        filtered = filtered.filter(event => this.isNormalEvent(event))
      }

      // Filtro por texto de busca (frontend) - aplicado após o filtro de tipo
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
    },

    recurringEvents() {
      return this.filteredEvents.filter(event => this.isRecurringEvent(event))
    },

    normalEvents() {
      return this.filteredEvents.filter(event => this.isNormalEvent(event))
    }

  },

  async mounted() {
    // Carrega preferência de visualização do localStorage
    const savedViewMode = localStorage.getItem('events-view-mode')
    if (savedViewMode && ['compact', 'large'].includes(savedViewMode)) {
      this.viewMode = savedViewMode
    }

    // Carrega preferência do filtro de tipo de evento do localStorage
    const savedEventTypeFilter = localStorage.getItem('events-type-filter')
    if (savedEventTypeFilter && ['all', 'recurring', 'normal'].includes(savedEventTypeFilter)) {
      this.eventTypeFilter = savedEventTypeFilter
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

    // Verifica se deve mostrar o tutorial de eventos recorrentes
    this.checkRecurringTutorial()
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

    viewMode(newVal) {
      // Salva a preferência de visualização no localStorage
      localStorage.setItem('events-view-mode', newVal)
      console.log('👁️ Modo de visualização alterado para:', newVal)
    },

    eventTypeFilter(newVal) {
      // Salva a preferência do filtro de tipo de evento no localStorage
      localStorage.setItem('events-type-filter', newVal)
      console.log('🔄 Filtro de tipo de evento alterado para:', newVal)
    },

    // Watcher para verificar quando eventos recorrentes são carregados
    recurringEvents: {
      handler(newVal) {
        // Se eventos recorrentes foram carregados e o tutorial não foi mostrado ainda
        if (newVal && newVal.length > 0 && !this.showRecurringTutorial) {
          this.checkRecurringTutorial()
        }
      },
      immediate: false
    }
  },

  methods: {
    /**
     * Verifica se um evento é recorrente
     * @param {Object} event - O evento a ser verificado
     * @returns {boolean} - true se o evento for recorrente
     */
    isRecurringEvent(event) {
      return event.recurring === true &&
        event.recurring_days &&
        event.recurring_days.trim() !== ''
    },

    /**
     * Verifica se um evento é normal (não recorrente)
     * @param {Object} event - O evento a ser verificado
     * @returns {boolean} - true se o evento for normal
     */
    isNormalEvent(event) {
      return !event.recurring ||
        !event.recurring_days ||
        event.recurring_days.trim() === ''
    },

    async listEvents(category = '') {
      this.load = true
      try {
        console.log('📡 Carregando eventos por categoria:', category || 'todas')
        const { data } = await this.$services.events().listByCategory(category)
        this.events = data.data || []

        // Carrega todos os eventos para contador se for primeira vez
        if (!this.allEvents.length) {
          console.log('📊 Carregando total de eventos para contador...')
          const { data: allData } = await this.$services.events().listByCategory('')
          this.allEvents = allData.data || []
        }

        console.log('📊 Eventos carregados:', this.events.length)
        console.log('📊 Total de eventos:', this.allEvents.length)
        this.load = false
      } catch (error) {
        this.load = false
        console.error('❌ Erro ao carregar eventos:', error)
        this.$q.notify({
          message: 'Erro ao carregar eventos. Tente novamente.',
          color: 'negative',
          position: 'top'
        })
      }
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
      // Faz nova requisição para filtrar no backend
      await this.listEvents(newCategory !== 'all' ? newCategory : '')
    },

    onFilterChange(newFilter) {
      this.filter = newFilter
    },

    clearFilters() {
      this.filter = ''
      this.categoria = 'all'
      this.eventTypeFilter = 'all'
    },

    onEventTypeChange(newEventType) {
      console.log('🔄 Alterando tipo de evento para:', newEventType)
      this.eventTypeFilter = newEventType
      // Salva a preferência no localStorage
      localStorage.setItem('events-type-filter', newEventType)
    },

    getCategoryLabel(category) {
      const categoryObj = this.options.find(opt => opt.value === category)
      return categoryObj ? categoryObj.label : 'Evento'
    },

    getFilteredTotal() {
      // Retorna o total de eventos após aplicar todos os filtros (categoria, tipo, busca)
      return this.filteredEvents.length
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },

    /**
     * Verifica se deve mostrar o tutorial de eventos recorrentes
     */
    checkRecurringTutorial() {
      // Verifica se o usuário já dispensou o tutorial
      const tutorialDismissed = localStorage.getItem('tutorial-recurring-events-dismissed')
      if (tutorialDismissed === 'true') {
        return
      }

      // Verifica se existem eventos recorrentes
      const hasRecurringEvents = this.recurringEvents.length > 0

      if (hasRecurringEvents) {
        // Mostra o tutorial após um pequeno delay para melhor UX
        setTimeout(() => {
          this.showRecurringTutorial = true
        }, 1000)
      }
    },

    /**
     * Fecha o tutorial de eventos recorrentes
     */
    closeRecurringTutorial() {
      this.showRecurringTutorial = false
    }
  }
}
