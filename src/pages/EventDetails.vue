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

  // Função meta para Quasar v1 - VERSÃO CORRIGIDA
  meta() {
    if (!this.event || !this.event.id) {
      return {
        title: 'Carregando evento... | AbaetéFest'
      }
    }

    const eventDate = this.formatDateString(this.event.start_date)
    const cleanDescription = this.event.description
      ? this.event.description.replace(/<[^>]*>/g, '').substring(0, 160)
      : `Evento ${this.event.name} em Abaeteba no dia ${eventDate}`

    return {
      // Title dinâmico
      title: `${this.event.name} - ${eventDate} | AbaetéFest`,

      // Meta tags - ESTRUTURA CORRIGIDA para Quasar v1
      meta: {
        description: {
          name: 'description',
          content: cleanDescription
        },
        keywords: {
          name: 'keywords',
          content: `${this.event.name}, evento, ${this.event.category || 'festa'}, abaeteba, ${eventDate}, ${this.event.location || ''}`
        },

        // Open Graph - CHAVES CORRIGIDAS (sem hífens)
        ogTitle: {
          property: 'og:title',
          content: `${this.event.name} - ${eventDate}`
        },
        ogDescription: {
          property: 'og:description',
          content: cleanDescription
        },
        ogImage: {
          property: 'og:image',
          content: this.event.image_url || 'https://app.abaetefest.com.br/og-default-event.jpg'
        },
        ogUrl: {
          property: 'og:url',
          content: `https://app.abaetefest.com.br/event-details/${this.event.id}`
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

        // Twitter Cards - CHAVES CORRIGIDAS
        twitterCard: {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        twitterTitle: {
          name: 'twitter:title',
          content: `${this.event.name} - ${eventDate}`
        },
        twitterDescription: {
          name: 'twitter:description',
          content: cleanDescription
        },
        twitterImage: {
          name: 'twitter:image',
          content: this.event.image_url || 'https://app.abaetefest.com.br/og-default-event.jpg'
        },

        // Meta específicas para eventos
        eventStartTime: {
          property: 'event:start_time',
          content: this.event.start_date
        },
        eventLocation: {
          property: 'event:location',
          content: this.event.location || 'Abaeteba, BA'
        }
      },

      // Link canônico
      link: {
        canonical: {
          rel: 'canonical',
          href: `https://app.abaetefest.com.br/event-details/${this.event.id}`
        }
      }
    }
  },

  data() {
    return {
      event: {},
      load: true,
      canShare: false,
      imgZoom: false
    }
  },

  mounted() {
    // Configurações que só funcionam no cliente
    this.setupClientFeatures()

    // Se não temos dados do evento, busca da API
    if (!this.event.id) {
      if (this.$route.params.id) {
        this.getEvent(this.$route.params.id)
      } else {
        this.$router.push('/')
      }
    } else {
      // Se já temos dados, adiciona structured data
      this.addStructuredData()
    }
  },

  watch: {
    // Observa mudanças no evento para atualizar structured data
    'event.id': {
      handler(newId) {
        if (newId) {
          this.$nextTick(() => {
            this.addStructuredData()
          })
        }
      }
    }
  },

  methods: {
    setupClientFeatures() {
      if (typeof navigator !== 'undefined' && navigator.canShare) {
        this.canShare = true
      }
    },

    async getEvent(id) {
      this.load = true
      try {
        const { data } = await this.$services.events().get(id)
        this.event = data.data || {}
        this.load = false

        // Adiciona structured data após carregar o evento
        this.$nextTick(() => {
          this.addStructuredData()
        })
      } catch (error) {
        this.load = false
        console.error('Erro ao carregar evento:', error)
        this.$router.push('/404')
      }
    },

    // NOVO MÉTODO - Adiciona structured data de forma segura
    addStructuredData() {
      if (!this.event.id || !process.env.CLIENT) return

      const eventDate = this.formatDateString(this.event.start_date)
      const cleanDescription = this.event.description
        ? this.event.description.replace(/<[^>]*>/g, '').substring(0, 160)
        : `Evento ${this.event.name} em Abaeteba no dia ${eventDate}`

      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: this.event.name,
        description: cleanDescription,
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

      // Adiciona preço se existir
      if (this.event.price) {
        structuredData.offers = {
          '@type': 'Offer',
          price: this.event.price,
          priceCurrency: 'BRL',
          availability: 'https://schema.org/InStock'
        }
      }

      // Usa o helper do global-meta para adicionar de forma segura
      if (this.$addStructuredData) {
        this.$addStructuredData(structuredData, 'event-structured-data')
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
      if (typeof window === 'undefined' || typeof navigator === 'undefined') return

      // Constrói URL limpa sem hashtag ou query params
      const baseUrl = `${window.location.protocol}//${window.location.host}`

      const shareData = {
        title: 'Veja esse Evento no AbaetéFest',
        text: this.event.name,
        url: `${baseUrl}/event-details/${this.event.id}`
      }

      try {
        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData)
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareData.url)
          this.$q.notify({
            message: 'Link copiado para a área de transferência!',
            color: 'positive',
            position: 'top'
          })
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
