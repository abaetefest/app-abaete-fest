<template>
  <div class="row">
    <div
      v-for="n in skeletonCount"
      :key="n"
      class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-sm"
    >
      <q-card
        class="row rounded-borders overflow-visible relative-position event-card-skeleton"
        :class="$q.dark.isActive ? 'bg-primary shadow-2' : 'bg-white shadow-2'"
      >
      <!-- Badge da categoria (skeleton) -->
      <div class="absolute-top-right q-mt-sm q-mr-sm" style="top: -12px; right: -8px; z-index: 10;">
        <q-skeleton type="QChip" />
      </div>

      <!-- Imagem (col-3) -->
      <div class="col-3">
        <q-skeleton
          class="full-height rounded-borders-left"
          square
          :ratio="3/3"
        />
      </div>

      <!-- Conteúdo do card (col-9) -->
      <q-card-section class="q-pa-xs col-9">
        <!-- Data e hora -->
        <div class="row items-center q-mb-xs q-gutter-md">
          <div class="rounded-borders q-pa-xs" style="background: rgba(0, 0, 0, 0.05);">
            <q-skeleton type="rect" width="45px" height="24px" />
          </div>
          <div>
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
        <div class="border-top q-pt-xs q-mt-xs" style="border-top: 1px solid #f0f0f0;">
          <q-skeleton type="text" height="11px" width="45%" />
        </div>
      </q-card-section>
      </q-card>
    </div>
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

.rounded-borders-left {
  border-radius: 16px 0 0 16px;
}

/* Dark mode adjustments */
.q-dark .border-top {
  border-top-color: #444 !important;
}

/* Responsividade para mobile */
@media (max-width: 600px) {
  .q-gutter-md {
    gap: 10px !important;
  }
}
</style>
