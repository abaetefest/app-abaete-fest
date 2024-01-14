<template>
  <q-page :class="$q.dark.isActive ? '' : 'bg-grey-1'">
    <div class="row q-pb-sm q-pt-sm justify-center">
      <q-btn-group push>
        <q-btn
          push
          label="Lista"
          icon="mdi-format-list-bulleted-square"
          :to="{ name: 'places' }"
        />
        <q-btn
          push
          label="Mapa"
          icon="mdi-map-legend"
          :to="{ name: 'map' }"
          :class="$q.dark.isActive ? 'text-black' : 'text-white'"
          :color="$q.dark.isActive ? 'white' : 'primary'"
        />
      </q-btn-group>
    </div>
    <div class="row q-pb-md q-px-sm q-pt-sm">
      <q-select
        outlined
        v-model="categoria"
        :options="options"
        label="Selecione uma categoria"
        class="col-sm-12 col-xs-12 col-md-6"
        :bg-color="$q.dark.isActive ? '' : 'white'"
        :label-color="$q.dark.isActive ? 'white' : 'primary'"
        :color="$q.dark.isActive ? 'white' : 'primary'"
        map-options
        emit-value
        @input="setFilterMap"
      >
        <template v-slot:prepend>
          <q-avatar rounded>
            <img :src="getIconCategory" />
          </q-avatar>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="scope.opt.icon" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <GmapMap
      class="map-size"
      :center="{ lat: -1.7245469, lng: -48.8729189 }"
      :zoom="zoom"
      map-type-id="terrain"
      :options="{
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
      }"
    >
      <GmapMarker
        v-for="(maker, index) in makersMap"
        :key="index"
        :position="{
          lat: parseFloat(maker.latitude),
          lng: parseFloat(maker.longitude),
        }"
        :icon="{
          url: getIcon(maker.icon),
          size: { width: 50, height: 50 },
          scaledSize: { width: 50, height: 50 },
        }"
        :clickable="true"
        :draggable="false"
        :optimized="false"
        @click="showDialog"
      />
    </GmapMap>

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
      zoom: 13,
      center: [],
      ready: false,
      makers: makers,
      makersMap: makers,
      categoria: 'Todas',
      icon: L.icon({
        iconUrl: 'map-icon/barbudos.png',
        iconSize: [50, 50],
        iconAnchor: [16, 37]
      }),
      options: [
        {
          label: 'Todas',
          value: 'Todas',
          icon: 'flat/all.png'
        },
        {
          label: 'Açaí',
          value: 'Açaí',
          icon: 'flat/acai.png'
        },
        {
          label: 'Bancos',
          value: 'Bancos',
          icon: 'flat/bank.png'
        },
        {
          label: 'Hotéis',
          value: 'Hotéis',
          icon: 'places/hotel.png'
        },
        {
          label: 'Hospitais e Postos de Saúde',
          value: 'Hospital&Posto',
          icon: 'places/hospital.png'
        },
        {
          label: 'Farmácias',
          value: 'Farmácias',
          icon: 'places/farmacia.png'
        },
        {
          label: 'Churrascarias/Espetarias',
          value: 'Churrascaria&Espetaria',
          icon: 'categories/churrascaria.png'
        },
        {
          label: 'Pub & Restaurante',
          value: 'Pub&Restaurante',
          icon: 'flat/cheers.png'
        },
        {
          label: 'Sorveterias',
          value: 'Sorveterias',
          icon: 'categories/sorveteria.png'
        },
        {
          label: 'Artigos de Pesca Esportiva',
          value: 'Pesca',
          icon: 'flat/fishing.png'
        },
        {
          label: 'Suplementos e Saúde',
          value: 'Suplemento&Saude',
          icon: 'categories/whey.png'
        }
      ]
    }
  },
  mounted () {
    this.setPosition()
  },
  computed: {
    getIconCategory: function () {
      const img = this.options.filter((opt) => opt.value === this.categoria)
      return img[0].icon
    }
  },
  methods: {
    async setPosition (position) {
      this.center = [-1.7282768, -48.8749289]
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
      return `${icon}`
    },
    async setFilterMap () {
      this.ready = false
      if (this.categoria === 'Todas') {
        this.makersMap = makers
      } else {
        this.makersMap = makers.filter((mk) => mk.category === this.categoria)
      }
      setTimeout(() => {
        this.ready = true
      }, 300)
    }
  }
}
</script>

<style scoped>
.map-size {
  /* Firefox */
  height: -moz-calc(100vh - 250px) !important;
  /* WebKit */
  height: -webkit-calc(100vh - 250px) !important;
  /* Opera */
  height: -o-calc(100vh - 250px) !important;
  /* Standard */
  height: calc(100vh - 250px) !important;
  /* min-height: 90vh; */
}
</style>
