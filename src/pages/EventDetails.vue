<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-dark' : ''">
    <!-- Loading skeleton -->
    <div v-if="load" class="q-pa-md" style="padding-top: 10px;">
      <div class="bg-white rounded-borders shadow-2 overflow-hidden" :class="$q.dark.isActive ? 'bg-dark' : ''"
        style="max-width: 600px; margin: 0 auto;">
        <q-skeleton height="280px" />
        <div class="q-pa-lg">
          <q-skeleton type="text" class="text-h5" />
          <q-skeleton type="text" width="60%" class="q-mt-sm" />
          <q-skeleton type="text" width="40%" class="q-mt-sm" />
          <div class="q-mt-lg">
            <q-skeleton type="text" />
            <q-skeleton type="text" />
            <q-skeleton type="text" width="80%" />
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo do evento -->
    <div v-else style="padding-top: 10px;">
      <div class="bg-white rounded-borders shadow-2 overflow-hidden q-ma-md" :class="$q.dark.isActive ? 'bg-dark' : ''"
        style="max-width: 600px; margin: 0 auto !important;">

        <!-- Imagem principal -->
        <div class="relative-position">
          <q-img :src="event.image_url" :alt="`Imagem do evento ${event.name}`" fit="cover"
            placeholder-src="loadPlaceholder.png" style="border-radius: 10px;">
            <template #loading>
              <q-skeleton class="full-width full-height" />
            </template>
          </q-img>
        </div>

        <!-- Conteúdo principal -->
        <div class="q-pa-lg">
          <!-- Título -->
          <div class="text-h6 text-weight-bold q-mb-md text-grey-9" :class="$q.dark.isActive ? 'text-white' : ''">
            {{ event.name }}
          </div>

          <!-- Data e horário -->
          <div class="row q-gutter-sm q-mb-lg">
            <div class="col-12 col-sm">
              <q-card flat bordered class="q-pa-md bg-grey-1" :class="$q.dark.isActive ? 'bg-grey-9' : ''">
                <div class="row items-center q-gutter-sm">
                  <q-avatar color="primary" text-color="white" icon="mdi-calendar" size="sm" />
                  <div>
                    <div class="text-caption text-grey-6 text-uppercase text-weight-medium">Data</div>
                    <div class="text-body2 text-weight-bold">{{ formatDateString(event.start_date) }}</div>
                    <div class="text-caption text-grey-6">{{ formatHourString(event.start_date) }}</div>
                  </div>
                </div>
              </q-card>
            </div>

            <div class="col-12 col-sm" v-if="event.location">
              <q-card flat bordered class="q-pa-md bg-grey-1" :class="$q.dark.isActive ? 'bg-grey-9' : ''">
                <div class="row items-center q-gutter-sm">
                  <q-avatar color="primary" text-color="white" icon="mdi-map-marker" size="sm" />
                  <div>
                    <div class="text-caption text-grey-6 text-uppercase text-weight-medium">Local</div>
                    <div class="text-body2 text-weight-bold">{{ event.location }}</div>
                  </div>
                </div>
              </q-card>
            </div>
          </div>

          <!-- Estatísticas -->
          <div v-if="event.attendees_count || event.interested_count" class="row q-gutter-md items-center q-mb-lg">
            <div v-if="event.attendees_count" class="col-auto">
              <div class="row items-center q-gutter-xs">
                <q-icon name="mdi-account-group" color="primary" size="sm" />
                <span class="text-body2 text-grey-7">{{ event.attendees_count }} participantes</span>
              </div>
            </div>
            <div v-if="event.interested_count" class="col-auto">
              <div class="row items-center q-gutter-xs">
                <q-icon name="mdi-heart" color="red" size="sm" />
                <span class="text-body2 text-grey-7">{{ event.interested_count }} interessados</span>
              </div>
            </div>
          </div>

          <!-- Descrição -->
          <div v-if="event.description" class="q-mb-lg">
            <div class="text-h6 text-primary q-mb-md">Sobre o evento</div>
            <div class="text-body2 line-height-md text-grey-8" :class="$q.dark.isActive ? 'text-grey-3' : ''"
              v-html="event.description"></div>
          </div>

          <!-- Informações adicionais -->
          <div class="q-mb-lg" v-if="event.organizer || event.duration || event.contact">
            <q-separator class="q-mb-md" />

            <div v-if="event.organizer" class="row items-center q-gutter-sm q-mb-sm">
              <q-icon name="mdi-account-supervisor" color="grey-6" size="sm" />
              <span class="text-body2 text-grey-7">Organizador:</span>
              <span class="text-body2 text-weight-medium">{{ event.organizer }}</span>
            </div>

            <div v-if="event.duration" class="row items-center q-gutter-sm q-mb-sm">
              <q-icon name="mdi-timer-outline" color="grey-6" size="sm" />
              <span class="text-body2 text-grey-7">Duração:</span>
              <span class="text-body2 text-weight-medium">{{ event.duration }}</span>
            </div>

            <div v-if="event.contact" class="row items-center q-gutter-sm q-mb-sm">
              <q-icon name="mdi-phone" color="grey-6" size="sm" />
              <span class="text-body2 text-grey-7">Contato:</span>
              <span class="text-body2 text-weight-medium">{{ event.contact }}</span>
            </div>
          </div>

          <!-- Botões de ação -->
          <div class="q-gutter-y-sm">
            <div class="row q-gutter-sm">
              <div class="col-12 col-sm">
                <q-btn v-if="canShare" unelevated rounded color="primary" icon-right="mdi-share-variant"
                  label="Compartilhar" class="full-width" @click="shareApp" no-caps />
              </div>

              <div class="col-12 col-sm">
                <q-btn rounded color="grey-7" icon="mdi-calendar-plus" label="Adicionar ao calendário"
                  @click="addToCalendar" no-caps class="full-width" />
              </div>

              <div class="col-12 col-sm">
                <q-btn outline rounded color="primary" icon-right="mdi-arrow-left" label="Voltar" class="full-width"
                  no-caps @click="backToEvents" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'PageEventDetails',

  // preFetch para SSR - carrega dados no servidor
  async preFetch({ currentRoute, redirect }) {
    const id = currentRoute.params.id

    if (!id) {
      redirect('/')
      return
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
      return eventData
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

        // WhatsApp (usa Open Graph)
        // WhatsApp lê og:title, og:description, og:image

        // Telegram (usa Open Graph)
        // Telegram lê og:title, og:description, og:image

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
        education: 'green-6'
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
        education: 'mdi-school'
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
        education: 'Educação'
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
</script>

<style scoped>
.event-details-page {
  min-height: 100vh;
  max-width: 100%;
  overflow-x: hidden;
}

/* Header */
.page-header {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 100;
}

.back-btn {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.q-dark .back-btn {
  background: rgba(0, 0, 0, 0.7);
}

/* Loading skeleton */
.event-skeleton {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  margin-top: 60px;
}

.skeleton-image {
  border-radius: 16px 16px 0 0;
}

.skeleton-content {
  padding: 24px;
}

.q-dark .event-skeleton {
  background: #1e1e1e;
}

/* Layout principal */
.event-wrapper {
  max-width: 600px;
  margin: 0 auto;
  padding-top: 60px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 20px;
}

.q-dark .event-wrapper {
  background: #1e1e1e;
}

/* Seção da imagem */
.event-image-section {
  position: relative;
  width: 100%;
}

.event-main-image {
  width: 100%;
  height: 280px;
  border-radius: 0;
}

.image-overlays {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.category-chip,
.price-chip {
  font-weight: 600;
  font-size: 0.75rem;
}

/* Conteúdo */
.event-content-section {
  padding: 24px;
}

.event-header-info {
  margin-bottom: 32px;
}

.event-title {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 20px 0;
  color: inherit;
}

/* Cards de informação */
.info-cards-row {
  display: grid;
  gap: 12px;
  margin-bottom: 20px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid var(--q-primary);
}

.q-dark .info-card {
  background: #2a2a2a;
}

.info-card-icon {
  background: var(--q-primary);
  color: white;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-card-content {
  flex: 1;
}

.info-card-label {
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 2px;
}

.q-dark .info-card-label {
  color: #aaa;
}

.info-card-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: inherit;
}

.info-card-secondary {
  font-size: 0.8rem;
  color: #666;
  margin-top: 2px;
}

.q-dark .info-card-secondary {
  color: #aaa;
}

/* Estatísticas */
.stats-row {
  display: flex;
  gap: 20px;
  padding: 12px 0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-icon {
  color: var(--q-primary);
}

.stat-text {
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;
}

.q-dark .stat-text {
  color: #aaa;
}

/* Seções */
.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--q-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.event-description {
  margin-bottom: 32px;
}

.description-text {
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Informações adicionais */
.additional-info {
  margin-bottom: 32px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-row:last-child {
  border-bottom: none;
}

.q-dark .info-row {
  border-bottom-color: #333;
}

.info-row-icon {
  color: var(--q-primary);
}

.info-row-content {
  flex: 1;
  display: flex;
  gap: 8px;
}

.info-row-label {
  font-weight: 500;
  color: #666;
  font-size: 0.9rem;
}

.q-dark .info-row-label {
  color: #aaa;
}

.info-row-value {
  font-weight: 600;
  font-size: 0.9rem;
}

/* Ações */
.action-section {
  margin-bottom: 32px;
}

.primary-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.action-btn-main,
.action-btn-secondary {
  height: 44px;
  font-weight: 600;
  font-size: 0.9rem;
}

.secondary-actions {
  text-align: center;
}

.secondary-btn {
  font-size: 0.85rem;
}

/* Eventos relacionados */
.related-section {
  border-top: 1px solid #f0f0f0;
  padding-top: 24px;
}

.q-dark .related-section {
  border-top-color: #333;
}

.related-events-grid {
  display: grid;
  gap: 12px;
}

.related-event-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.related-event-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.q-dark .related-event-card {
  background: #2a2a2a;
}

.related-event-image {
  width: 60px;
  height: 45px;
  border-radius: 6px;
  flex-shrink: 0;
}

.related-event-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.related-event-name {
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 2px;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.related-event-date {
  font-size: 0.75rem;
  color: #666;
}

.q-dark .related-event-date {
  color: #aaa;
}

/* Responsive */
@media (max-width: 640px) {
  .event-wrapper {
    margin: 0 8px 16px 8px;
    padding-top: 60px;
  }

  .event-content-section {
    padding: 20px;
  }

  .event-title {
    font-size: 1.5rem;
  }

  .primary-actions {
    grid-template-columns: 1fr;
  }

}

.stats-row {
  gap: 16px;
  flex-wrap: wrap;
}

.page-header {
  top: 12px;
  left: 12px;
}

.event-main-image {
  height: 240px;
}
}

@media (min-width: 640px) {
  .event-wrapper {
    margin: 0 16px 20px 16px;
  }

  .info-cards-row {
    grid-template-columns: 1fr 1fr;
  }
}

/* Animações */
.event-wrapper {
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Melhorias de acessibilidade */
.back-btn:focus,
.action-btn-main:focus,
.action-btn-secondary:focus,
.secondary-btn:focus {
  outline: 2px solid var(--q-primary);
  outline-offset: 2px;
}

.related-event-card:focus {
  outline: 2px solid var(--q-primary);
  outline-offset: 2px;
}

/* Links personalizados */
.description-text a {
  color: var(--q-primary);
  text-decoration: none;
}

.description-text a:hover {
  text-decoration: underline;
}

.q-dark .description-text a {
  color: #64b5f6;
}

/* Estados dos botões */
.action-btn-main {
  box-shadow: 0 2px 8px rgba(var(--q-primary-rgb), 0.3);
}

.action-btn-main:hover {
  box-shadow: 0 4px 12px rgba(var(--q-primary-rgb), 0.4);
}

/* Otimizações para impressão */
@media print {

  .page-header,
  .action-section,
  .related-section {
    display: none;
  }

  .event-wrapper {
    box-shadow: none;
    border: 1px solid #ddd;
    margin: 0;
    padding-top: 0;
  }

  .event-main-image {
    height: 200px;
  }
}
