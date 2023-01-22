<template>
  <div style="min-height: 400px" class="relative">
    <l-map
      v-if="ready"
      style="height: 400px"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng">
        <l-popup v-if="description">
          Você está aqui!
        </l-popup>
      </l-marker>
      <l-marker
        :lat-lng="[latitude, longitude]"
      >
        <l-popup v-if="description">
          {{ description }}
        </l-popup>
      </l-marker>
    </l-map>
    <q-inner-loading :showing="!ready">
      <p>Carregando mapa</p>
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
export default {
  name: 'MapTourism',
  props: {
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    zoom: {
      type: Number,
      required: false,
      default: 12
    }
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [],
      markerLatLng: [10, 10],
      picoleLatLng: [],
      ready: false
    }
  },
  mounted () {
    this.getGeolocation()
  },
  methods: {
    getGeolocation () {
      if (navigator.geolocation) {
        // this.$q.loading.show()
        navigator.geolocation.getCurrentPosition(this.setPosition, this.errorPosition)
      } else {
        this.errorPosition()
      }
    },
    setPosition (position) {
      const coords = position.coords
      this.center = [this.latitude, this.longitude]
      this.markerLatLng = [coords.latitude, coords.longitude]
      // this.picoleLatLng = this.serviceData.location
      // this.$q.loading.hide()
      // this.successNotify()
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
      this.center = [this.latitude, this.longitude]
      this.markerLatLng = [this.latitude, this.longitude]
      this.$q.loading.hide()
      this.ready = true
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
    }
  }
}
</script>
