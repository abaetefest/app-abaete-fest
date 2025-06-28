<template>
  <q-dialog persistent :maximized="$q.screen.lt.sm" :value="modalCourse">
    <q-layout view="Lhh lpR fff" container :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'">
      <q-header :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-primary'">
        <q-toolbar>
          <q-toolbar-title>
            {{ courseData.name}}
          </q-toolbar-title>
          <q-btn icon="close" class="float-right" color="white" round flat dense @click="$emit('close')" />
        </q-toolbar>
      </q-header>

      <q-footer
        :class="$q.dark.isActive ? 'bg-primary text-secondary' : 'bg-grey-2 text-primary'"
      >
        <q-toolbar inset>
          <q-toolbar-title>
            <q-btn
              label="Fechar"
              class="float-right"
              :color="$q.dark.isActive ? 'white' : 'primary'"
              dense
              @click="$emit('close')"
            />
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
      <q-page-container>
        <q-page>
          <q-card class="full-width no-shadow" :key="courseData.id">
            <q-card-section class="q-pa-none">
              <div
                v-if="courseData.image_url"
                class="text-body2 q-mb-md text-center"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
              >
                <q-img :src="courseData.image_url" :style="$q.screen.lt.sm ? '' : 'width: 300px'">
                  <template #loading>
                    <q-skeleton class="full-width full-height" square />
                  </template>
                </q-img>
              </div>
            </q-card-section>

            <q-card-section class="q-pa-sm">
              <q-btn
                v-if="canShare"
                dense
                label="Compartilhar"
                icon="mdi-share-variant-outline"
                @click="shareApp"
                class="full-width"
                color="blue"
              />
            </q-card-section>

            <q-card-section>
              <div
                v-if="courseData.description"
                class="text-body1"
                :class="$q.dark.isActive ? 'text-white link-custom' : 'text-grey-9'"
              >
                <p v-html="courseData.description">
                  {{ courseData.description }}
                </p>
              </div>

              <div
                class="text-body1"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
              >
                <strong>DATA:</strong> {{ formatDateString(courseData.start_date)}} - {{ formatHourString(courseData.start_date) }}
              </div>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
      </q-layout>
    </q-dialog>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'DialogCourseDetails',
  props: {
    modalCourse: {
      type: Boolean,
      required: true,
      default: () => false
    },
    courseData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      course: {},
      category: [],
      canShare: false
    }
  },
  async mounted() {
    if (!navigator.canShare) {
      this.canShare = false
    } else {
      this.canShare = true
    }
  },
  methods: {
    formatDateString(dateOriginal) {
      return date.formatDate(dateOriginal, 'DD/MM/YYYY')
    },
    formatHourString(dateOriginal) {
      return date.formatDate(dateOriginal, 'HH:mm')
    },
    async shareApp() {
      const shareData = {
        title: 'Veja esse Evento no AbaetéFest',
        text: this.courseData.name,
        url: window.location.origin + '/event-details/' + this.courseData.id
      }

      try {
        await navigator.share(shareData)
      } catch (err) {
        this.$notifyDanger('Não foi possível compartilharo app!')
      }
    }
  }
}
</script>

<style>
 .link-custom a {
  color: rgb(180, 196, 242);
};
</style>
