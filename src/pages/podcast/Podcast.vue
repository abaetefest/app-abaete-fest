<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'">
    <div class="text-h5 text-bold text-center q-pt-md q-pb-sm">
      Pod<span class="text-accent">Casts</span>
    </div>

    <div class="row q-col-gutter-md">
      <div
        v-for="(podcast, index) in podcastList"
        class="col-md-6 col-sm-12 col-xs-12"
        :key="index"
      >
        <q-card
          class="rounded"
          :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
        >
          <q-img
            :src="podcast.image"
            style="min-height: 100px;"
          >
            <div class="absolute-bottom text-body1 text-bold">
              {{ podcast.title }}
            </div>
          </q-img>

          <q-card-section>
            {{ podcast.description }}
          </q-card-section>

          <q-card-section
            class="q-pt-none q-mt-none"
            @click="openURLYoutube(podcast.youtube)"
          >
            <strong>Youtube:</strong>
            <span
              class="text-bold"
              :class="$q.dark.isActive ? 'text-secondary' : 'text-red-8'"
            >
              {{ podcast.youtube }}
            </span>
          </q-card-section>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script src="./podcast.js"></script>

<style>
.card-cursos:hover {
  background: #e3f2fd;
}
</style>
