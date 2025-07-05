<template>
  <q-card
    class="tourism-card-large cursor-pointer shadow-2"
    :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
    @click="$emit('click', tourism)"
  >
    <!-- Imagem do local -->
    <div class="tourism-image-container">
      <q-img
        :src="tourism.image_url"
        :alt="`Imagem do local ${tourism.name}`"
        class="tourism-image"
        :ratio="16/9"
        placeholder-src="loadPlaceholder.png"
      >
        <template #loading>
          <q-skeleton class="full-width full-height" square />
        </template>
      </q-img>
    </div>

    <!-- Conteúdo do card -->
    <q-card-section>
      <!-- Título do local -->
      <div class="tourism-title q-mb-sm">
        {{ tourism.name }}
      </div>

      <!-- Endereço -->
      <div v-if="tourism.address" class="text-caption text-grey-8 q-mb-sm">
        <q-icon name="mdi-map-marker-outline" size="14px" class="q-mr-xs" />
        {{ tourism.address }}
      </div>

      <!-- Descrição resumida -->
      <div class="tourism-description" v-if="tourism.description">
        {{ getShortDescription(tourism.description) }}
      </div>

      <!-- Footer com avaliação -->
      <div class="border-top q-pt-sm q-mt-md" style="border-top: 1px solid #f0f0f0;" v-if="tourism.rating">
        <div class="row items-center q-gutter-md">
          <span class="text-caption text-grey-6">
            <q-icon name="mdi-star" size="14px" class="q-mr-xs text-warning" />
            {{ tourism.rating }} avaliação
          </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'TourismCardLarge',

  props: {
    tourism: {
      type: Object,
      required: true
    }
  },

  emits: ['click'],

  methods: {
    getShortDescription(description) {
      if (!description) return ''
      const cleanText = description.replace(/<[^>]*>/g, '')
      return cleanText.length > 100 ? cleanText.substring(0, 100) + '...' : cleanText
    }
  }
}
</script>

<style scoped>
.tourism-card-large {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
}

.tourism-card-large:hover {
  transform: translateY(-4px);
}

.tourism-image-container {
  position: relative;
}

.tourism-image {
  border-radius: 0;
}

.tourism-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--q-dark);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tourism-description {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Dark mode adjustments */
.q-dark .tourism-title {
  color: white;
}

.q-dark .tourism-description {
  color: #ccc;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .tourism-title {
    font-size: 14px;
  }

  .tourism-description {
    font-size: 11px;
  }
}
</style>
