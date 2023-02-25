<template>
  <q-dialog persistent full-height :maximized="$q.screen.lt.sm" :value="modalPlaces">
    <q-layout view="Lhh lpR fff" container :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'">
      <q-header :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-primary'">
        <q-toolbar>
          <q-toolbar-title>
            {{ placeData.title}}
          </q-toolbar-title>
          <q-btn
            icon="close"
            class="float-right"
            color="white"
            round
            flat
            dense
            @click="$emit('close')"
          />
        </q-toolbar>
      </q-header>

      <q-footer elevated :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-white text-primary'">
        <q-toolbar inset>
          <q-toolbar-title>
            <q-btn
              label="Fechar"
              class="float-right"
              :color="$q.dark.isActive ? 'white' : 'primary'"
              flat
              dense
              @click="$emit('close')"
            />
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>

      <q-page-container>
        <q-page>
          <q-card class="full-width no-shadow" :key="placeData.id">

            <q-card-section class="q-pa-none">
              <div
                v-if="placeData.image_url"
                class="text-body1 q-mb-md text-center"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
              >
                <q-img :src="placeData.image_url" >
                  <template #loading>
                    <q-skeleton class="full-width full-height" square />
                  </template>
                  <div class="absolute-bottom text-subtitle1 text-center">
                    {{placeData.name}}
                  </div>
                </q-img>
              </div>
            </q-card-section>

            <q-card-section class="q-pb-none">
              <div
                v-if="placeData.description"
                class="text-body1 q-mb-md"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
              >
                <p v-html="placeData.description"></p>
              </div>
              <div
                v-if="placeData.phone"
                class="text-body1 q-mb-md"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
              >
                <p><span class="text-bold">Telefone:</span> {{ placeData.phone }}</p>
              </div>

              <div
                v-if="placeData.address"
                class="text-body1 q-mb-md"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
              >
                <p>
                  <strong>Endereço:</strong> {{ placeData.address }}
                </p>
              </div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <p class="text-h6">
              Veja no mapa:
              </p>
              <map-tourism
                :latitude="placeData.latitude"
                :longitude="placeData.longitude"
                :description="placeData.name"
                :zoom="16"
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
    modalPlaces: {
      type: Boolean,
      required: true,
      default: () => false
    },
    placeData: {
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
