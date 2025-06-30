<template>
  <div class="row">
    <div v-for="n in skeletonCount" :key="n" class="col-12 col-sm-6 col-md-6 col-lg-4 q-pa-sm">
      <q-card class="event-card-skeleton">
        <q-skeleton square height="200px" />
        <q-card-section>
          <q-skeleton type="text" class="text-h6" />
          <q-skeleton type="text" width="60%" />
          <q-skeleton type="text" width="40%" />
          <q-skeleton type="text" width="80%" />
          <q-skeleton type="text" width="30%" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCardSkeleton',

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
  overflow: hidden;
}
</style>
