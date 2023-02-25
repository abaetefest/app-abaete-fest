<template>
  <q-dialog persistent full-height :maximized="$q.screen.lt.sm" :value="modalTourism">
    <q-layout
      view="Lhh lpR fff"
      container
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
    >
      <q-header
        elevated
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-primary'"
      >
        <q-toolbar>
          <q-toolbar-title>
            {{ tourismData.name}}
          </q-toolbar-title>
          <q-btn
            icon="close"
            class="float-right"
            :class="$q.dark.isActive ? 'dark' : 'white'"
            round
            flat
            dense
            @click="$emit('close')"
          />
        </q-toolbar>
      </q-header>

      <q-footer
        elevated
        :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-white text-primary'"
      >
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
          <q-card class="full-width no-shadow" :key="tourismData.id">

            <q-card-section class="q-pa-none">
              <div
                v-if="tourismData.image_url"
                class="text-body2 q-mb-md text-center"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
              >
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
              <div
                v-if="tourismData.description"
                class="text-body1 q-mb-md"
                :class="$q.dark.isActive ? 'text-white link-custom' : 'text-grey-9'"
              >
                <p v-html="tourismData.description"></p>
              </div>

              <div
                v-if="tourismData.address"
                class="text-body1 q-mb-md"
                :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
              >
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

<style>
 .link-custom a {
  color: rgb(180, 196, 242);
};
</style>
