<template>
  <q-dialog persistent full-height :value="modalCourse">
      <q-card class="full-width" :key="courseData.id">
        <q-card-section class="row q-pb-none">
          <div class="text-h6 q-py-none col-11">
           {{ courseData.name}}
          </div>
          <q-space />
          <div class="col-1">
            <q-btn icon="close" flat round dense @click="$emit('close')" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 80vh;" class="scroll">
          <div class="text-body2 text-grey-9 q-mb-md text-center" v-if="courseData.image_url">
            <q-img :src="courseData.image_url" style="max-width: 350px" />
          </div>

          <div class="text-body2 text-grey-9 q-mb-md" v-if="courseData.description">
            <strong> SOBRE O EVENTO:</strong>
            <p v-html="courseData.description">
              {{ courseData.description }}
            </p>
          </div>

          <div class="text-body2 text-grey-9">
            <strong>DATA:</strong> {{ formatDateString(courseData.start_date)}} - {{ formatHourString(courseData.start_date) }}
          </div>
        </q-card-section>

        <!-- <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" @click="$emit('close')" />
        </q-card-actions> -->
      </q-card>
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
  data () {
    return {
      course: {},
      category: []
    }
  },
  async mounted () {
  },
  methods: {
    formatDateString (dateOriginal) {
      return date.formatDate(dateOriginal, 'DD/MM/YYYY')
    },
    formatHourString (dateOriginal) {
      return date.formatDate(dateOriginal, 'HH:mm')
    }
  }
}
</script>
