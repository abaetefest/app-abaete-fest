<template>
  <q-card
    class="row event-card cursor-pointer shadow-2"
    :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
    @click="$emit('click', event)"
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
      <div class="row items-center justify-between q-gutter-md q-mb-sm">
        <div v-if="event.recurring && event.recurring_days && event.recurring_days.trim() !== ''" class="event-date-badge">
          <div class="event-day">
            <q-icon name="mdi-repeat" size="16px" class="q-mr-xs" />
            {{ event.recurring_days }}
          </div>
        </div>
        <div v-else class="event-date-badge">
          <div class="event-day">
            <q-icon name="mdi-calendar" size="16px" class="q-mr-xs" />
            {{ getDayDate(event.start_date) }}
            {{ getMonthString(event.start_date) }}
          </div>
        </div>
        <div class="col" v-if="!event.recurring || !event.recurring_days || event.recurring_days.trim() === ''">
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

      <div v-if="event.location" class="text-caption text-grey-8">
        <q-icon
          name="mdi-map-marker-outline"
          size="14px"
          class="q-mr-xs"
        />
        {{ event.location || 'Local a definir' }}
      </div>

      <!-- Footer com estatísticas -->
      <div
        class="border-top q-pt-sm q-mt-md"
        style="border-top: 1px solid #f0f0f0;"
        v-if="event.attendees_count || event.interested_count"
      >
        <div class="row items-center q-gutter-md">
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
            class="text-caption text-grey-6"
          >
            <q-icon name="mdi-heart" size="14px" class="q-mr-xs" />
            {{ event.interested_count }} interessados
          </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'EventCard',

  props: {
    event: {
      type: Object,
      required: true
    },
    categoryOptions: {
      type: Array,
      required: true
    }
  },

  emits: ['click'],

  methods: {
    // Formatação de dados
    formatHourString(dateOriginal) {
      if (!dateOriginal) return ''
      return date.formatDate(dateOriginal, 'HH:mm')
    },

    getDayDate(dateOriginal) {
      if (!dateOriginal) return ''
      return date.formatDate(dateOriginal, 'DD')
    },

    getMonthString(dateOriginal) {
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

    getShortDescription(description) {
      if (!description) return ''
      const cleanText = description.replace(/<[^>]*>/g, '')
      return cleanText.length > 100
        ? cleanText.substring(0, 100) + '...'
        : cleanText
    },

    // Funções para categorias
    getCategoryColor(category) {
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

    getCategoryIcon(category) {
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

    getCategoryLabel(category) {
      const categoryObj = this.categoryOptions.find(opt => opt.value === category)
      return categoryObj ? categoryObj.label : 'Evento'
    }
  }
}
</script>

<style scoped>
.event-card {
  border-radius: 16px;
  overflow: visible;
  transition: all 0.3s ease;
  position: relative;
}

.event-card:hover {
  transform: translateY(-4px);
}

.event-image {
  border-radius: 16px 0 0 16px;
}

.event-category-badge {
  position: absolute;
  top: -17px;
  right: -8px;
  z-index: 10;
}

.event-category-badge .q-chip {
  font-size: 12px;
  transition: all 0.3s ease;
}

.event-category-badge .q-chip:hover {
  transform: translateY(-2px);
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

/* Dark mode adjustments */
.q-dark .event-title {
  color: white;
}

.q-dark .event-description {
  color: #ccc;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .event-date-container {
    gap: 12px;
  }

  .event-date-badge {
    min-width: 50px;

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
