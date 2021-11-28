<template>
  <q-dialog persistent full-height :maximized="$q.screen.lt.sm" :value="modalTourism">
    <q-layout view="Lhh lpR fff" container class="bg-white">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>
            {{ tourismData.name}}
          </q-toolbar-title>
          <q-btn icon="close" class="float-right" color="white" round flat dense @click="$emit('close')" />
        </q-toolbar>
      </q-header>

      <q-footer elevated class="bg-white text-primary">
        <q-toolbar inset>
          <q-toolbar-title>
            <q-btn label="Fechar" class="float-right" color="primary" flat dense @click="$emit('close')" />
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page>
          <q-card class="full-width no-shadow" :key="tourismData.id">

            <q-card-section class="q-pa-none">
              <div class="text-body2 text-grey-9 q-mb-md text-center" v-if="tourismData.image_url">
                <q-img :src="tourismData.image_url" >
                  <template #loading>
                    <q-skeleton class="full-width full-height" square />
                  </template>
                  <div class="absolute-bottom text-subtitle1 text-center">
                    {{tourismData.name}}
                  </div>
                </q-img>
              </div>
            </q-card-section>
            <q-card-section class="q-pb-none">
              <div class="text-body1 text-grey-9 q-mb-md" v-if="tourismData.description">
                <p v-html="tourismData.description"></p>
              </div>

              <div class="text-body1 text-grey-9 q-mb-md" v-if="tourismData.address">
                <p>
                  <strong>Endereço:</strong> {{ tourismData.address }}
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
        </q-page>
      </q-page-container>
    </q-layout>
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
