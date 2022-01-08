<template>
  <q-page class="bg-grey-1">
      <l-map
        v-if="ready"
        :zoom="zoom"
        :options="{zoomControl: false}"
        :center="center"
         class="map-size"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          v-for="(maker, index) in makers"
          :key="index"
          :lat-lng="[maker.lat, maker.long]"
          :icon="getIcon(maker.icon)"
          @click="showDialog"
        >
          <l-tooltip>
            <strong>{{ maker.title }} </strong><br>
            Categoria: <strong>{{ maker.category }} </strong><br>
            <span>{{ maker.description }}</span>
          </l-tooltip>
        </l-marker>
        <l-control-zoom position="bottomright"  ></l-control-zoom>
      </l-map>
      <q-inner-loading :showing="!ready">
        <p>Carregando mapa</p>
        <q-spinner size="50px" color="primary" />
      </q-inner-loading>
  </q-page>
</template>

<script>
import L from 'leaflet'
import { makers } from 'src/constants/makersMap'
export default {
  name: 'MapPage',
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 15,
      center: [],
      ready: false,
      makers: makers,
      icon: L.icon({
        iconUrl: 'map-icon/barbudos.png',
        iconSize: [50, 50],
        iconAnchor: [16, 37]
      })
    }
  },
  mounted () {
    this.setPosition()
  },
  methods: {
    async setPosition (position) {
      this.center = [-1.7292281, -48.8908916]
      this.ready = true
    },
    errorPosition () {
      this.$q.notify({
        position: 'bottom',
        timeout: 3000,
        color: 'negative',
        textColor: 'white',
        actions: [{ icon: 'close', color: 'white' }],
        message: 'Não foi possível recupera sua posição!'
      })
      this.$q.loading.hide()
    },
    successNotify () {
      this.$q.notify({
        position: 'bottom',
        timeout: 3000,
        color: 'positive',
        textColor: 'white',
        actions: [{ icon: 'check', color: 'white' }],
        message: 'Localização recuperada com sucesso!'
      })
    },
    showDialog () {
      console.log('show')
    },
    getIcon (icon) {
      return L.icon({
        iconUrl: icon,
        iconSize: [50, 50],
        iconAnchor: [16, 37]
      })
    }
  }
}
</script>

<style scoped>
.map-size {
  /* Firefox */
  height: -moz-calc(100vh - 105px);
  /* WebKit */
  height: -webkit-calc(100vh - 105px);
  /* Opera */
  height: -o-calc(100vh - 105px);
  /* Standard */
  height: calc(100vh - 105px);
  /* min-height: 90vh; */
}
</style>
