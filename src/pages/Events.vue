<template>
  <q-page :class="$q.dark.isActive ? '' : 'bg-grey-1'">
    <!-- Header com título -->
    <div class="q-pa-md">
      <div class="text-h4 text-bold text-center custom-font q-mb-md">
        <span class="text-accent">Eventos</span> na cidade
      </div>

      <!-- Filtro de categoria -->
      <q-select
        outlined
        rounded
        v-model="categoria"
        :options="options"
        label="Selecione uma categoria"
        class="q-mb-md"
        :bg-color="$q.dark.isActive ? 'primary' : 'white'"
        :label-color="$q.dark.isActive ? 'white' : 'primary'"
        :color="$q.dark.isActive ? 'white' : 'primary'"
        map-options
        emit-value
        dense
        @input="listEvents(categoria)"
        style="max-width: 400px"
      >
        <template v-slot:prepend>
          <q-avatar
            rounded
            :icon="getIconCategory"
            size="40px"
            :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'"
          />
        </template>
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
            :class="$q.dark.isActive ? 'bg-primary' : 'white'"
            dense
          >
            <q-item-section avatar>
              <q-avatar rounded :icon="scope.opt.icon" size="40px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold" v-html="scope.opt.label" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <!-- Campo de busca -->
      <q-input
        outlined
        rounded
        dense
        debounce="300"
        v-model="filter"
        label="Pesquisar eventos..."
        class="q-mb-md"
        style="max-width: 400px; margin: 0 auto"
        :label-color="$q.dark.isActive ? 'blue-3' : 'primary'"
      >
        <template v-slot:append>
          <q-icon
            name="mdi-magnify"
            :color="$q.dark.isActive ? 'blue-3' : 'primary'"
          />
        </template>
      </q-input>
    </div>

    <!-- Loading skeleton -->
    <div v-if="load" class="q-pa-md">
      <div class="row q-gutter-md justify-center">
        <div
          v-for="n in 6"
          :key="n"
          class="col-12 col-sm-6 col-md-4"
          style="max-width: 350px"
        >
          <q-card class="event-card-skeleton">
            <q-skeleton height="200px" square />
            <q-card-section>
              <q-skeleton type="text" class="text-h6" />
              <q-skeleton type="text" width="60%" />
              <q-skeleton type="text" width="40%" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Lista de eventos -->
    <div v-else class="q-pa-md">
      <!-- Botão Novo Evento (se aplicável) -->
      <div class="text-center q-mb-lg" v-if="canCreateEvent">
        <q-btn
          rounded
          size="lg"
          color="accent"
          icon="mdi-calendar-plus"
          label="NOVO EVENTO"
          class="q-px-xl q-py-sm text-weight-bold"
          @click="createNewEvent"
        />
      </div>

      <!-- Grid de eventos -->
      <div class="row q-gutter-md justify-center ">
        <div
          v-for="event in filteredEvents"
          :key="event.id"
          class="col-12 col-sm-6 col-md-4"
        >
          <q-card
            class="row event-card cursor-pointer"
            :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
            @click="detailsEvent(event)"
          >

          <div class="event-category-badge">
              <q-chip
                :color="getCategoryColor(event.category)"
                text-color="white"
                :icon="getCategoryIcon(event.category)"
                dense
                class="text-weight-bold q-pa-sm"
              >
                {{ getCategoryLabel(event.category) }}
              </q-chip>
            </div>

            <div class="col-3">
              <q-img
                :src="event.image_url"
                :alt="`Imagem do evento ${event.name}`"
                class="full-height event-image"
                :ratio="3 / 3"
                placeholder-src="loadPlaceholder.png"
              >
                <template #loading>
                  <q-skeleton class="full-width full-height" square />
                </template>
              </q-img>
            </div>

            <!-- Conteúdo do card -->
            <q-card-section class="q-pa-sm col-9">
              <!-- Data e hora -->
              <div class="event-date-container">
                <div class="event-date-badge">
                  <div class="event-day">
                    {{ getDayDate(event.start_date) }}
                    {{ getMonthString(event.start_date) }}
                  </div>
                </div>
                <div class="event-time">
                  <div class="text-body3 text-weight-medium">
                    <q-icon
                      name="mdi-clock-outline"
                      size="16px"
                      class="q-mr-xs"
                    />
                    {{ formatHourString(event.start_date) }}
                  </div>
                </div>
              </div>

              <!-- Título do evento -->
              <div class="event-title q-mb-xs">
                {{ event.name }}
              </div>

              <!-- Descrição resumida -->
              <div class="event-description" v-if="event.description">
                {{ getShortDescription(event.description) }}
              </div>

              <div class="text-caption text-grey-6">
                <q-icon
                  name="mdi-map-marker-outline"
                  size="14px"
                  class="q-mr-xs"
                />
                Travessa Barão do tio peida
              </div>

              <!-- Footer com estatísticas -->
              <div
                class="event-footer q-mt-md"
                v-if="event.attendees_count || event.interested_count"
              >
                <div class="event-stats">
                  <span
                    v-if="event.attendees_count"
                    class="text-caption text-grey-6"
                  >
                    <q-icon
                      name="mdi-account-group"
                      size="14px"
                      class="q-mr-xs"
                    />
                    {{ event.attendees_count }} participantes
                  </span>
                  <span
                    v-if="event.interested_count"
                    class="text-caption text-grey-6 q-ml-md"
                  >
                    <q-icon name="mdi-heart" size="14px" class="q-mr-xs" />
                    {{ event.interested_count }} interessados
                  </span>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Mensagem quando não há eventos -->
      <div v-if="filteredEvents.length === 0" class="text-center q-pa-xl">
        <q-icon
          name="mdi-calendar-remove"
          size="80px"
          class="text-grey-5 q-mb-md"
        />
        <div class="text-h6 text-grey-6 q-mb-sm">Nenhum evento encontrado</div>
        <div class="text-body2 text-grey-5">
          Tente ajustar os filtros ou volte mais tarde para ver novos eventos.
        </div>
      </div>
    </div>

    <!-- Dialog de detalhes (se necessário) -->
    <dialog-course-details
      :modal-course="modalCourse"
      :course-data="courseDetails"
      @close="closeModal"
    />
  </q-page>
</template>

<script>
import { date } from 'quasar'
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
    DialogCourseDetails: () => import('components/DialogCourseDetails')
  },

  data() {
    return {
      filter: '',
      categoria: 'all',
      options: category,
      events: [],
      load: true,
      modalCourse: false,
      courseDetails: {},
      canCreateEvent: false // Definir baseado nas permissões do usuário
    }
  },

  computed: {
    getIconCategory: function () {
      const img = this.options.filter((opt) => opt.value === this.categoria)
      return img[0] ? img[0].icon : 'mdi-calendar'
    },

    filteredEvents: function () {
      if (!this.filter) return this.events

      return this.events.filter((event) => {
        const name = event.name ? event.name.toLowerCase() : ''
        const description = event.description
          ? event.description.toLowerCase()
          : ''
        const location = event.location ? event.location.toLowerCase() : ''
        const searchTerm = this.filter.toLowerCase()

        return (
          name.includes(searchTerm) ||
          description.includes(searchTerm) ||
          location.includes(searchTerm)
        )
      })
    }
  },

  async mounted() {
    // Verifica parâmetros da URL
    if (this.$route.params.type) {
      this.categoria = this.$route.params.type
    }

    // Verifica query params
    if (this.$route.query.categoria) {
      this.categoria = this.$route.query.categoria
    }

    await this.listEvents(this.categoria)
  },

  watch: {
    categoria: function (newVal) {
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
    }
  },

  methods: {
    async listEvents(category = '') {
      this.load = true
      try {
        const { data } = await this.$services.events().listByCategory(category)
        this.events = data.data || []
        this.load = false
      } catch (error) {
        this.load = false
        console.error('Erro ao carregar eventos:', error)
        this.$q.notify({
          message: 'Erro ao carregar eventos. Tente novamente.',
          color: 'negative',
          position: 'top'
        })
      }
    },

    detailsEvent: function (event) {
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

    createNewEvent: function () {
      this.$router.push({ name: 'createEvent' })
    },

    closeModal: function () {
      this.modalCourse = false
      this.courseDetails = {}
    },

    // Formatação de dados
    formatDateString: function (dateOriginal) {
      if (!dateOriginal) return ''
      return date.formatDate(dateOriginal, 'DD/MM/YYYY')
    },

    formatHourString: function (dateOriginal) {
      if (!dateOriginal) return ''
      return date.formatDate(dateOriginal, 'HH:mm')
    },

    getDayDate: function (dateOriginal) {
      if (!dateOriginal) return ''
      return date.formatDate(dateOriginal, 'DD')
    },

    getMonthString: function (dateOriginal) {
      if (!dateOriginal) return ''
      const month = date.formatDate(dateOriginal, 'MM')
      const monthString = {
        '01': 'Jan',
        '02': 'Fev',
        '03': 'Mar',
        '04': 'Abr',
        '05': 'Mai',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Ago',
        '09': 'Set',
        10: 'Out',
        11: 'Nov',
        12: 'Dez'
      }
      return monthString[month] || ''
    },

    formatPrice: function (price) {
      if (!price) return '0,00'
      return parseFloat(price).toFixed(2).replace('.', ',')
    },

    getShortDescription: function (description) {
      if (!description) return ''
      const cleanText = description.replace(/<[^>]*>/g, '')
      return cleanText.length > 100
        ? cleanText.substring(0, 100) + '...'
        : cleanText
    },

    // Funções para categorias
    getCategoryColor: function (category) {
      const colors = {
        music: 'purple',
        party: 'pink',
        culture: 'teal',
        sport: 'orange',
        food: 'red',
        business: 'blue',
        education: 'green',
        default: 'primary'
      }
      return colors[category] || colors.default
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
        default: 'mdi-calendar'
      }
      return icons[category] || icons.default
    },

    getCategoryLabel: function (category) {
      const categoryObj = this.options.find(function (opt) {
        return opt.value === category
      })
      return categoryObj ? categoryObj.label : 'Evento'
    },

    backToEvents: function () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.custom-font {
  font-family: "Roboto", sans-serif;
}

.event-card {
  border-radius: 16px;
  overflow: visible;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.event-image-container {
  position: relative;
}

.event-image {
  border-radius: 16px 0 0 16px;
}

.event-category-badge {
  position: absolute;
  top: -12px;
  right: -8px;
  z-index: 10;
}

.event-category-badge .q-chip {
  font-size: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.event-category-badge .q-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.event-price-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
}

.event-date-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.event-date-badge {
  background: var(--q-primary);
  border-radius: 12px;
  padding: 8px 12px;
  text-align: center;
  min-width: 60px;
}

.event-day {
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
}

.event-time {
  flex: 1;
}

.event-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--q-dark);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-transform: lowercase;
}

.event-description {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-footer {
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
}

.event-stats {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.event-card-skeleton {
  border-radius: 16px;
  overflow: hidden;
}

/* Dark mode adjustments */
.q-dark .event-card {
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
}

.q-dark .event-card:hover {
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
}

.q-dark .event-title {
  color: white;
}

.q-dark .event-description {
  color: #ccc;
}

.q-dark .event-footer {
  border-top-color: #444;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .event-date-container {
    gap: 12px;
  }

  .event-date-badge {
    min-width: 50px;
    padding: 6px 10px;
  }

  .event-day {
    font-size: 12px;
  }

  .event-title {
    font-size: 14px;
  }

  .event-description {
    font-size: 11px;
  }
}
</style>
