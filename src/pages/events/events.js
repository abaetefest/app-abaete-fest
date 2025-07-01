import { category } from 'src/constants/category'

export default {
  name: 'PageEvents',

  // Meta tags para SEO
  meta() {
    const categoryFilter =
      this.categoria && this.categoria !== 'all'
        ? this.getCategoryLabel(this.categoria)
        : 'Todos os tipos'

    const eventCount = this.filteredEvents.length
    const currentYear = new Date().getFullYear()

    return {
      title: `Eventos ${categoryFilter} em Abaetetuba ${currentYear} | AbaetéFest`,

      meta: {
        description: {
          name: 'description',
          content: `Descubra os melhores eventos de ${categoryFilter.toLowerCase()} em Abaetetuba. ${eventCount} eventos disponíveis. Shows, festas, cultura e muito mais no AbaetéFest!`
        },
        keywords: {
          name: 'keywords',
          content: `eventos abaetetuba, festas abaetetuba, shows abaetetuba, ${categoryFilter.toLowerCase()}, eventos pará, agenda cultural, entretenimento, ${currentYear}`
        },
        author: {
          name: 'author',
          content: 'AbaetéFest'
        },
        robots: {
          name: 'robots',
          content: 'index, follow'
        },

        // Open Graph
        ogTitle: {
          property: 'og:title',
          content: `Eventos ${categoryFilter} em Abaetetuba | AbaetéFest`
        },
        ogDescription: {
          property: 'og:description',
          content: `Descubra os melhores eventos de ${categoryFilter.toLowerCase()} em Abaetetuba. ${eventCount} eventos disponíveis no AbaetéFest!`
        },
        ogImage: {
          property: 'og:image',
          content: 'https://app.abaetefest.com.br/og-default-event-list.png'
        },
        ogUrl: {
          property: 'og:url',
          content: `https://app.abaetefest.com.br/events${
            this.categoria !== 'all' ? `?categoria=${this.categoria}` : ''
          }`
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

        // Twitter Card
        twitterCard: {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        twitterTitle: {
          name: 'twitter:title',
          content: `Eventos ${categoryFilter} em Abaetetuba | AbaetéFest`
        },
        twitterDescription: {
          name: 'twitter:description',
          content: `Descubra os melhores eventos de ${categoryFilter.toLowerCase()} em Abaetetuba. ${eventCount} eventos disponíveis!`
        },
        twitterImage: {
          name: 'twitter:image',
          content: 'https://app.abaetefest.com.br/og-default-event-list.png'
        },

        // Meta para geolocalização
        geoRegion: {
          name: 'geo.region',
          content: 'BR-PA'
        },
        geoPlacename: {
          name: 'geo.placename',
          content: 'Abaetetuba, Pará, Brasil'
        },
        geoPosition: {
          name: 'geo.position',
          content: ' -1.7292277;-48.9145819'
        },
        icbm: {
          name: 'ICBM',
          content: ' -1.7292277, -48.9145819'
        }
      },

      link: {
        canonical: {
          rel: 'canonical',
          href: `https://app.abaetefest.com.br/events${
            this.categoria !== 'all' ? `?categoria=${this.categoria}` : ''
          }`
        }
      }
    }
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
      canCreateEvent: false // Definir baseado nas permissões do usuário
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

    viewMode(newVal) {
      // Salva a preferência de visualização no localStorage
      localStorage.setItem('events-view-mode', newVal)
      console.log('👁️ Modo de visualização alterado para:', newVal)
    }
  },

  methods: {
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
