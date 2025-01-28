<template>
  <q-dialog persistent full-height :maximized="$q.screen.lt.sm" :value="modalTourism">
    <q-layout
      view="Lhh lpR fFf"
      container
      :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
    >
      <q-header
        elevated
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-primary'"
      >
      </q-header>

      <q-footer
        elevated
        :class="$q.dark.isActive ? 'bg-primary text-white' : 'bg-white text-primary'"
      >
        <q-toolbar inset>
          <q-toolbar-title>
            <q-btn
              label="Fechar"
              class="float-right"
              :color="$q.dark.isActive ? 'secondary' : 'primary'"
              :text-color="$q.dark.isActive ? 'primary' : 'white'"
              dense
              @click="$emit('close')"
            />
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page>
          <q-card
            class="full-width no-shadow"
            :key="tourismData.id"
          >

            <q-card-section class="q-pa-none">
              <div
                v-if="tourismData.image_url"
                class="text-body2 text-center"
                :class="$q.dark.isActive ? 'text-white bg-primary' : 'text-primary'"
              >
                <q-img
                  :src="tourismData.image_url"
                  class="rounded-img"
                >
                  <template #loading>
                    <q-skeleton class="full-width full-height" square />
                  </template>
                </q-img>
              </div>
              <div
                class="text-h5 text-center text-bold"
                :class="$q.dark.isActive ? 'text-white link-custom bg-primary' : 'text-primary'"
              >
                {{tourismData.name}}
              </div>
              <div
                v-if="tourismData.description"
                class="text-body1 q-pt-sm q-px-md"
                :class="$q.dark.isActive ? 'text-white link-custom bg-primary' : 'text-primary'"
              >
                <p v-html="tourismData.description"></p>
              </div>

              <div
                v-if="tourismData.address"
                class="text-body1 q-px-md"
                :class="$q.dark.isActive ? 'text-white bg-primary' : 'text-grey-9'"
              >
                <p>
                  <strong>Endereço:</strong> {{ tourismData.address }}
                </p>
              </div>
            </q-card-section>
            <!-- <q-card-section
            >
            </q-card-section> -->

            <q-card-section class="q-pt-none" :class="$q.dark.isActive ? 'text-white bg-primary' : 'text-grey-9'">
              <p class="text-h6">Veja no mapa:</p>
              <!-- <map-tourism
                :latitude="tourismData.latitude"
                :longitude="tourismData.longitude"
                :description="tourismData.name"
              /> -->
              <GmapMap
                :center="{lat: parseFloat(tourismData.latitude), lng: parseFloat(tourismData.longitude)}"
                :zoom="15"
                map-type-id="terrain"
                style="width: 100%; height: 300px"
                :options="{
                  zoomControl: true,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: true,
                  disableDefaultUi: false
                }"
              >
                <gmap-info-window
                  :options="{ pixelOffset: { width: 0, height: -35} }"
                  :position="{lat: parseFloat(tourismData.latitude), lng: parseFloat(tourismData.longitude)}"
                  :opened="true"
                  @closeclick="infoWinOpen=false"
                  style="color: black"
                >
                  <span class="text-dark">{{ tourismData.name }}</span>
                </gmap-info-window>
                <GmapMarker
                  :position="{lat: parseFloat(tourismData.latitude), lng: parseFloat(tourismData.longitude)}"
                  :clickable="true"
                  :draggable="false"
                  @click="center=m.position"
                />
              </GmapMap>
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
    // MapTourism: () => import('components/MapTourism')
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

<style>
 .link-custom a {
  color: rgb(180, 196, 242);
};
</style>
