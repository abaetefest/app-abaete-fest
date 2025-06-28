<template>
  <q-page :class="$q.dark.isActive ? '': 'bg-grey-1'">
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
        style="max-width: 400px;"
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
        style="max-width: 400px; margin: 0 auto;"
        :label-color="$q.dark.isActive ? 'blue-3' : 'primary'"
      >
        <template v-slot:append>
          <q-icon name="mdi-magnify" :color="$q.dark.isActive ? 'blue-3' : 'primary'" />
        </template>
      </q-input>
    </div>

    <!-- Loading skeleton -->
    <div v-if="load" class="q-pa-md">
      <div class="row q-gutter-md justify-center">
        <div v-for="n in 6" :key="n" class="col-12 col-sm-6 col-md-4" style="max-width: 350px;">
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
      <div class="row q-gutter-md justify-center">
        <div
          v-for="event in filteredEvents"
          :key="event.id"
          class="col-12 col-sm-6 col-md-4"
          style="max-width: 350px;"
        >
          <q-card
            class="event-card cursor-pointer"
            :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
            @click="detailsEvent(event)"
          >
            <!-- Imagem do evento -->
            <div class="event-image-container">
              <q-img
                :src="event.image_url"
                :alt="`Imagem do evento ${event.name}`"
                class="event-image"
                :ratio="16/9"
                placeholder-src="loadPlaceholder.png"
              >
                <template #loading>
                  <q-skeleton class="full-width full-height" square />
                </template>
              </q-img>

              <!-- Badge de categoria -->
              <div class="event-category-badge">
                <q-chip
                  :color="getCategoryColor(event.category)"
                  text-color="white"
                  :icon="getCategoryIcon(event.category)"
                  dense
                  class="text-weight-bold text-caption q-pa-md"
                >
                  {{ getCategoryLabel(event.category) }}
                </q-chip>
              </div>
            </div>

            <!-- Conteúdo do card -->
            <q-card-section class="q-pa-md">
              <!-- Data e hora -->
              <div class="event-date-container q-mb-md">
                <div class="event-date-badge">
                  <div class="event-day">{{ getDayDate(event.start_date) }}</div>
                  <div class="event-month">{{ getMonthString(event.start_date) }}</div>
                </div>
                <div class="event-time">
                  <div class="text-body2 text-weight-medium">
                    <q-icon name="mdi-clock-outline" size="16px" class="q-mr-xs" />
                    {{ formatHourString(event.start_date) }}
                  </div>
                  <div class="text-caption text-grey-6" v-if="event.location">
                    <q-icon name="mdi-map-marker-outline" size="14px" class="q-mr-xs" />
                    {{ event.location }}
                  </div>
                </div>
              </div>

              <!-- Título do evento -->
              <div class="event-title q-mb-sm">
                {{ event.name }}
              </div>

              <!-- Descrição resumida -->
              <div class="event-description" v-if="event.description">
                {{ getShortDescription(event.description) }}
              </div>

              <!-- Footer com estatísticas -->
              <div class="event-footer q-mt-md" v-if="event.attendees_count || event.interested_count">
                <div class="event-stats">
                  <span v-if="event.attendees_count" class="text-caption text-grey-6">
                    <q-icon name="mdi-account-group" size="14px" class="q-mr-xs" />
                    {{ event.attendees_count }} participantes
                  </span>
                  <span v-if="event.interested_count" class="text-caption text-grey-6 q-ml-md">
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
        <q-icon name="mdi-calendar-remove" size="80px" class="text-grey-5 q-mb-md" />
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
  meta() {
    const categoryFilter = this.categoria && this.categoria !== 'all'
      ? this.getCategoryLabel(this.categoria)
      : 'Todos os tipos'

    const eventCount = this.events.length
    const currentYear = new Date().getFullYear()

    return {
      title: `Eventos ${categoryFilter} em Abaeteba ${currentYear} | AbaetéFest`,

      meta: {
        description: {
          name: 'description',
          content: `Descubra os melhores eventos de ${categoryFilter.toLowerCase()} em Abaeteba. ${eventCount} eventos disponíveis. Shows, festas, cultura e muito mais no AbaetéFest!`
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
          content: `Eventos ${categoryFilter} em Abaeteba | AbaetéFest`
        },
        ogDescription: {
          property: 'og:description',
          content: `Descubra os melhores eventos de ${categoryFilter.toLowerCase()} em Abaeteba. ${eventCount} eventos disponíveis no AbaetéFest!`
        },
        ogImage: {
          property: 'og:image',
          content: 'https://app.abaetefest.com.br/og-default-event-list.png'
        },
        ogUrl: {
          property: 'og:url',
          content: `https://app.abaetefest.com.br/events${this.categoria !== 'all' ? `?categoria=${this.categoria}` : ''}`
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
          content: `Eventos ${categoryFilter} em Abaeteba | AbaetéFest`
        },
        twitterDescription: {
          name: 'twitter:description',
          content: `Descubra os melhores eventos de ${categoryFilter.toLowerCase()} em Abaeteba. ${eventCount} eventos disponíveis!`
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
          content: 'Abaeteba, Pará, Brasil'
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
          href: `https://app.abaetefest.com.br/events${this.categoria !== 'all' ? `?categoria=${this.categoria}` : ''}`
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
      const img = this.options.filter(opt => opt.value === this.categoria)
      return img[0] ? img[0].icon : 'mdi-calendar'
    },

    filteredEvents: function () {
      if (!this.filter) return this.events

      return this.events.filter(event => {
        const name = event.name ? event.name.toLowerCase() : ''
        const description = event.description ? event.description.toLowerCase() : ''
        const location = event.location ? event.location.toLowerCase() : ''
        const searchTerm = this.filter.toLowerCase()

        return name.includes(searchTerm) ||
               description.includes(searchTerm) ||
               location.includes(searchTerm)
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
        this.$router.replace({ query: { categoria: newVal } }).catch(err => {
          console.error(err)
        })
      } else {
        this.$router.replace({ query: {} }).catch(err => {
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
      return cleanText.length > 100 ? cleanText.substring(0, 100) + '...' : cleanText
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
  font-family: 'Roboto', sans-serif;
}

.event-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.event-image-container {
  position: relative;
}

.event-image {
  border-radius: 0;
}

.event-category-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
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
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
}

.event-month {
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  line-height: 1;
  margin-top: 2px;
}

.event-time {
  flex: 1;
}

.event-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--q-dark);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-description {
  font-size: 14px;
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
    font-size: 18px;
  }

  .event-title {
    font-size: 16px;
  }
}
</style>
