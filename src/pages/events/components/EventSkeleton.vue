<template>
  <div class="event-list">
    <q-card
      v-for="n in skeletonCount"
      :key="n"
      class="row event-card-skeleton"
      :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
    >
      <!-- Badge da categoria (skeleton) -->
      <div class="event-category-badge-skeleton">
        <q-skeleton type="QChip" />
      </div>

      <!-- Imagem (col-3) -->
      <div class="col-3">
        <q-skeleton
          class="full-height event-image-skeleton"
          square
          :ratio="3/3"
        />
      </div>

      <!-- Conteúdo do card (col-9) -->
      <q-card-section class="q-pa-xs col-9">
        <!-- Data e hora -->
        <div class="event-date-container q-mb-xs">
          <div class="event-date-badge-skeleton">
            <q-skeleton type="rect" width="45px" height="24px" />
          </div>
          <div class="event-time">
            <q-skeleton type="text" width="55px" height="14px" />
          </div>
        </div>

        <!-- Título do evento -->
        <div class="q-mb-xs">
          <q-skeleton type="text" height="16px" width="85%" />
          <q-skeleton type="text" height="16px" width="60%" />
        </div>

        <!-- Descrição resumida -->
        <div class="q-mb-xs">
          <q-skeleton type="text" height="12px" width="90%" />
          <q-skeleton type="text" height="12px" width="70%" />
        </div>

        <!-- Localização -->
        <div class="q-mb-xs">
          <q-skeleton type="text" height="12px" width="75%" />
        </div>

        <!-- Footer com estatísticas (opcional) -->
        <div class="event-footer-skeleton">
          <q-skeleton type="text" height="11px" width="45%" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'EventSkeleton',

  props: {
    skeletonCount: {
      type: Number,
      default: 6
    }
  }
}
</script>

<style scoped>
.event-card-skeleton {
  border-radius: 16px;
  overflow: visible;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 18px;
  animation: skeleton-pulse 1.5s ease-in-out infinite alternate;
}

@keyframes skeleton-pulse {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.8;
  }
}

.q-dark .event-card-skeleton {
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
}

.event-image-skeleton {
  border-radius: 16px 0 0 16px;
}

.event-category-badge-skeleton {
  position: absolute;
  top: -12px;
  right: -8px;
  z-index: 10;
}

.event-date-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
}

.event-date-badge-skeleton {
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.05);
  padding: 4px;
}

.q-dark .event-date-badge-skeleton {
  background: rgba(255, 255, 255, 0.05);
}

.event-footer-skeleton {
  border-top: 1px solid #f0f0f0;
  padding-top: 6px;
  margin-top: 6px;
}

.q-dark .event-footer-skeleton {
  border-top-color: #444;
}

/* Responsividade para mobile */
@media (max-width: 600px) {
  .event-card-skeleton {
    margin-bottom: 14px;
  }

  .event-date-container {
    gap: 10px;
  }
}
</style>
