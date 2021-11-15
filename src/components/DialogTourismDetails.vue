<template>
  <q-dialog persistent full-height maximized :value="modalTourism">
      <q-card class="full-width" :key="tourismData.id">
        <q-card-section class="row">
          <div class="text-h6 q-py-none col-11">
           {{ tourismData.name}}
          </div>
          <q-space />
          <div class="col-1">
            <q-btn icon="close" class="float-right" color="primary" round dense @click="$emit('close')" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section >
          <div class="text-body2 text-grey-9 q-mb-md text-center" v-if="tourismData.image_url">
            <q-img :src="tourismData.image_url" style="max-width: 350px" />
          </div>

          <div class="text-body2 text-grey-9 q-mb-md" v-if="tourismData.description">
            <p v-html="tourismData.description">
              {{ tourismData.description }}
            </p>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p class="text-h6">Veja no mapa:</p>
          <map-tourism
            :latitude="tourismData.latitude"
            :longitude="tourismData.longitude"
            :description="tourismData.name"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  name: 'DialogTourismDetails',
  props: {
    modalTourism: {
      type: Boolean,
      required: true,
      default: () => false
    },
    tourismData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  components: {
    MapTourism: () => import('components/MapTourism')
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
  }
}
</script>
