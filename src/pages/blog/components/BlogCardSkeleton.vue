<template>
  <div class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-sm">
    <q-card
      class="skeleton-card"
      :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
    >
      <!-- Skeleton para imagem -->
      <q-skeleton
        type="rect"
        class="skeleton-image"
        height="200px"
      />

      <q-card-section class="q-pa-md">
        <!-- Skeleton para título -->
        <q-skeleton
          type="text"
          width="80%"
          height="24px"
          class="q-mb-sm"
        />
        <q-skeleton
          type="text"
          width="60%"
          height="24px"
          class="q-mb-md"
        />

        <!-- Skeleton para data -->
        <q-skeleton
          type="text"
          width="30%"
          height="16px"
          class="q-mb-md"
        />

        <!-- Skeleton para excerpt -->
        <q-skeleton
          type="text"
          width="100%"
          height="14px"
          class="q-mb-xs"
        />
        <q-skeleton
          type="text"
          width="100%"
          height="14px"
          class="q-mb-xs"
        />
        <q-skeleton
          type="text"
          width="70%"
          height="14px"
          class="q-mb-md"
        />

        <!-- Skeleton para botão -->
        <q-skeleton
          type="text"
          width="25%"
          height="20px"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'BlogCardSkeleton'
}
</script>

<style scoped>
.skeleton-card {
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
}

.skeleton-image {
  border-radius: 16px 16px 0 0;
}

/* Animação de shimmer para o skeleton */
:deep(.q-skeleton) {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.06) 25%,
    rgba(0, 0, 0, 0.15) 37%,
    rgba(0, 0, 0, 0.06) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

.q-dark :deep(.q-skeleton) {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.06) 25%,
    rgba(255, 255, 255, 0.15) 37%,
    rgba(255, 255, 255, 0.06) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

@keyframes shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
