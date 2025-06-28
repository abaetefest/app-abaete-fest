<template>
  <q-page>
    <q-card v-if="load" class="q-pa-xs">
      <q-item>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton height="400px" square />

      <q-item>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-card-actions>
        <q-skeleton type="QBtn" class="full-width" />
      </q-card-actions>
    </q-card>

    <q-card v-else class="full-width full-height no-shadow" :key="event.id"
      :class="$q.dark.isActive ? 'bg-primary text-white' : 'bg-grey-2 text-primary'">
      <q-separator />

      <q-card-section class="q-gutter-sm">
        <div class="text-body2 text-grey-9 q-mb-sm q-pa-xs text-center" style="min-height: 200px;">
          <q-img :src="event.image_url" style="max-width: 600px;border-radius: 10px"
            placeholder-src="loadPlaceholder.png" :alt="`Imagem do evento ${event.name}`" />
        </div>

        <div class="text-right q-mb-sm">
          <q-btn icon="mdi-fullscreen" label="Tela cheia" outline :color="$q.dark.isActive ? 'white' : 'grey-8'"
            @click="imgFullScreen" />
        </div>

        <div class="text-body1" :class="$q.dark.isActive ? 'text-white link-custom' : 'text-grey-9'">
          <strong>DATA:</strong> {{ formatDateString(event.start_date) }} - {{ formatHourString(event.start_date) }}
        </div>

        <div class="text-h6">
          {{ event.name }}
        </div>

        <div v-if="event.description" class="text-body1"
          :class="$q.dark.isActive ? 'text-white link-custom' : 'text-grey-9'">
          <div v-html="event.description"></div>
        </div>
      </q-card-section>

      <q-card-actions class="q-gutter-y-md">
        <q-btn v-if="canShare" label="Compartilhar" icon="mdi-share-variant-outline" @click="shareApp"
          class="full-width" color="blue" />

        <q-btn label="Voltar" class="full-width" icon="mdi-arrow-left" :color="$q.dark.isActive ? 'white' : 'primary'"
          outline @click="backToEvents(event.category)" />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="imgZoom" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
      <q-card class="bg-primary text-center">
        <image-zoom :src="event.image_url" :ratio="1" @close="imgZoom = false" />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import ImageZoom from 'components/ImageZoom.vue'

export default {
  name: 'PageEventDetails',
  components: {
    ImageZoom
  },

  // preFetch simplificado para evitar erros de import
  async preFetch({ currentRoute, redirect }) {
    try {
      const id = currentRoute.params.id

      if (!id) {
        redirect('/')
        return null
      }

      // Usa fetch nativo para evitar problemas de import no SSR
      const response = await fetch(`https://polished-snowflake-9723.fly.dev/api/events/${id}`)

      if (!response.ok) {
        redirect('/404')
        return null
      }

      const result = await response.json()
      const eventData = result.data

      if (!eventData) {
        redirect('/404')
        return null
      }

      return eventData
    } catch (error) {
      console.error('Erro no preFetch:', error)
      redirect('/404')
      return null
    }
  },

  data() {
    return {
      idEvent: '',
      event: {},
      load: true,
      canShare: false,
      imgZoom: false
    }
  },

  created() {
    // Inicializa event como objeto vazio para evitar erros
    if (!this.event || typeof this.event !== 'object') {
      this.event = {
        id: '',
        name: '',
        description: '',
        image_url: '',
        start_date: '',
        category: '',
        location: ''
      }
    }
  },

  mounted() {
    // Se não temos dados do evento, busca da API
    if (!this.event.id) {
      if (this.$route.params.id) {
        this.getEvent(this.$route.params.id)
      } else {
        this.$router.push('/')
      }
    }

    // Configurações que só funcionam no cliente
    this.setupClientFeatures()
  },

  methods: {
    // Configurações que só funcionam no cliente
    setupClientFeatures() {
      // Verifica se pode compartilhar (API do navegador)
      if (typeof navigator !== 'undefined' && navigator.canShare) {
        this.canShare = true
      } else {
        this.canShare = false
      }
    },

    // Busca evento da API
    async getEvent(id) {
      this.load = true
      try {
        const { data } = await this.$services.events().get(id)
        this.event = data.data || {}
        this.load = false

        // Configura SEO após carregar evento
        this.updateSEO()
      } catch (error) {
        this.load = false
        console.error('Erro ao carregar evento:', error)
        this.$router.push('/404')
      }
    },

    // Atualiza SEO com dados do evento
    updateSEO() {
      if (!this.event || !this.event.id) return

      try {
        const eventDate = this.formatDateString(this.event.start_date)
        const eventTime = this.formatHourString(this.event.start_date)

        // Remove HTML tags da descrição
        const cleanDescription = this.event.description
          ? this.event.description.replace(/<[^>]*>/g, '').substring(0, 160)
          : `Evento ${this.event.name} em Abaeteba no dia ${eventDate} às ${eventTime}`

        // Configura meta tags básicas
        this.$q.meta.set({
          title: `${this.event.name} - ${eventDate} | AbaetéFest`,
          meta: {
            description: { name: 'description', content: cleanDescription },
            keywords: {
              name: 'keywords',
              content: `${this.event.name}, evento, ${this.event.category || 'festa'}, abaeteba, ${eventDate}`
            },

            // Open Graph
            'og:title': { property: 'og:title', content: `${this.event.name} - ${eventDate}` },
            'og:description': { property: 'og:description', content: cleanDescription },
            'og:image': {
              property: 'og:image',
              content: this.event.image_url || 'https://app.abaetefest.com.br/og-default-event.jpg'
            },
            'og:url': {
              property: 'og:url',
              content: `https://app.abaetefest.com.br/event-details/${this.event.id}`
            },
            'og:type': { property: 'og:type', content: 'article' },

            // Twitter Cards
            'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
            'twitter:title': { name: 'twitter:title', content: `${this.event.name} - ${eventDate}` },
            'twitter:description': { name: 'twitter:description', content: cleanDescription },
            'twitter:image': {
              name: 'twitter:image',
              content: this.event.image_url || 'https://app.abaetefest.com.br/og-default-event.jpg'
            }
          }
        })

        // Adiciona structured data
        this.setEventStructuredData()
      } catch (error) {
        console.error('Erro ao configurar SEO:', error)
      }
    },

    // Adiciona dados estruturados
    setEventStructuredData() {
      if (!this.event || !this.event.id) return

      try {
        const structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: this.event.name,
          description: this.event.description
            ? this.event.description.replace(/<[^>]*>/g, '')
            : this.event.name,
          startDate: this.event.start_date,
          endDate: this.event.end_date || this.event.start_date,
          image: this.event.image_url,
          url: `https://app.abaetefest.com.br/event-details/${this.event.id}`,
          location: {
            '@type': 'Place',
            name: this.event.location || 'Abaeteba',
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
        }

        // Adiciona preço se disponível
        if (this.event.price) {
          structuredData.offers = {
            '@type': 'Offer',
            price: this.event.price,
            priceCurrency: 'BRL',
            availability: 'https://schema.org/InStock'
          }
        }

        // Adiciona script de structured data
        this.$q.meta.set({
          script: {
            'structured-data': {
              type: 'application/ld+json',
              innerHTML: JSON.stringify(structuredData)
            }
          }
        })
      } catch (error) {
        console.error('Erro ao configurar structured data:', error)
      }
    },

    formatDateString(dateOriginal) {
      if (!dateOriginal) return ''
      return date.formatDate(dateOriginal, 'DD/MM/YYYY')
    },

    formatHourString(dateOriginal) {
      if (!dateOriginal) return ''
      return date.formatDate(dateOriginal, 'HH:mm')
    },

    backToEvents(category) {
      this.$router.push({ name: 'events' })
    },

    async shareApp() {
      // Só executa no cliente
      if (typeof window === 'undefined' || typeof navigator === 'undefined') return

      const shareData = {
        title: 'Veja esse Evento no AbaetéFest',
        text: this.event.name,
        url: `${window.location.origin}/event-details/${this.event.id}`
      }

      try {
        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData)
        } else {
          // Fallback para navegadores que não suportam Web Share API
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(shareData.url)
            this.$q.notify({
              message: 'Link copiado para a área de transferência!',
              color: 'positive',
              position: 'top'
            })
          }
        }
      } catch (err) {
        console.error('Erro ao compartilhar:', err)
        this.$q.notify({
          message: 'Não foi possível compartilhar o evento!',
          color: 'negative',
          position: 'top'
        })
      }
    },

    imgFullScreen() {
      this.imgZoom = true
    }
  }
}
</script>

<style>
.link-custom a {
  color: rgb(180, 196, 242);
}
</style>
