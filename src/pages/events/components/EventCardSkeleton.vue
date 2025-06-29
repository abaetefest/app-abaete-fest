<template>
  <div class="row q-gutter-md justify-center">
    <div
      v-for="n in skeletonCount"
      :key="n"
      class="col-12 col-sm-6 col-md-4"
      style="max-width: 350px"
    >
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
  overflow: hidden;
}
</style>
