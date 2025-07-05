<template>
  <q-card
    class="event-card-large cursor-pointer shadow-2"
    :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
    @click="$emit('click', event)"
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
    <q-card-section class="">
      <!-- Data e hora -->
      <div class="row items-center justify-between q-gutter-md q-mb-md">
        <div class="event-date-badge ">
          <div class="event-day">
            <q-icon name="mdi-calendar" size="16px" class="q-mr-xs" />
            {{ getDayDate(event.start_date) }}
            {{ getMonthString(event.start_date) }}
          </div>
        </div>
        <div class="col">
          <div class="text-body2 text-weight-medium">
            <q-icon name="mdi-clock-outline" size="16px" class="q-mr-xs" />
            {{ formatHourString(event.start_date) }}
          </div>
          <div v-if="event.location" class="text-caption text-grey-8">
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
      <div class="border-top q-pt-sm q-mt-md" style="border-top: 1px solid #f0f0f0;" v-if="event.attendees_count || event.interested_count">
        <div class="row items-center q-gutter-md">
          <span v-if="event.attendees_count" class="text-caption text-grey-6">
            <q-icon name="mdi-account-group" size="14px" class="q-mr-xs" />
            {{ event.attendees_count }} participantes
          </span>
          <span v-if="event.interested_count" class="text-caption text-grey-6">
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
  name: 'EventCardLarge',

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
      return cleanText.length > 100 ? cleanText.substring(0, 100) + '...' : cleanText
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
.event-card-large {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
}

.event-card-large:hover {
  transform: translateY(-4px);
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

.event-category-badge .q-chip {
  font-size: 12px;
  transition: all 0.3s ease;
  padding: 0.25rem 0.75rem; /* equivalente ao q-pa-sm */
}

.event-category-badge .q-chip:hover {
  transform: translateY(-2px);
}

.event-date-badge {
  background: var(--q-primary);
  border-radius: 12px;
  text-align: center;
  min-width: 60px;
}

.event-day {
  font-size: 18px;
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

/* Dark mode adjustments */
.q-dark .event-title {
  color: white;
}

.q-dark .event-description {
  color: #ccc;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .event-date-badge {
    min-width: 50px;
  }

  .event-day {
    font-size: 16px;
  }

  .event-title {
    font-size: 14px;
  }

  .event-description {
    font-size: 11px;
  }
}
</style>
