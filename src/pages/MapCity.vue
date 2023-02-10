<template>
  <q-page class="bg-grey-1">
    <div class="row q-pb-sm q-pt-sm justify-center">
      <q-btn-group push>
        <q-btn
          push
          label="Lista"
          icon="mdi-format-list-bulleted-square"
          :to="{ name: 'places'}"
        />
        <q-btn
          push
          label="Mapa"
          icon="mdi-map-legend"
          :to="{ name: 'map'}"
          color="primary"
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
        bg-color="white"
        label-color="primary"
        color="primary"
        map-options
        emit-value
        @input="setFilterMap"
      >
        <template v-slot:prepend>
          <q-avatar rounded>
            <img :src="getIconCategory">
          </q-avatar>
        </template>
        <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section avatar>
                <q-avatar rounded>
                  <img :src="scope.opt.icon">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
              </q-item-section>
            </q-item>
          </template>
      </q-select>
    </div>
      <l-map
        v-if="ready"
        :zoom="zoom"
        :options="{zoomControl: false}"
        :center="center"
         class="map-size"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          v-for="(maker, index) in makersMap"
          :key="index"
          :lat-lng="[maker.latitude, maker.longitude]"
          :icon="getIcon(maker.icon)"
          @click="showDialog"
        >
          <l-tooltip>
            <strong>{{ maker.title }} </strong><br>
            Categoria: <strong>{{ maker.category }} </strong><br>
            <span>{{ maker.address }}</span><br>
            <span v-if="maker.phone">{{ maker.phone }}</span>
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
      const img = this.options.filter(opt => opt.value === this.categoria)
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
      return L.icon({
        iconUrl: icon,
        iconSize: [50, 50],
        iconAnchor: [16, 37]
      })
    },
    async setFilterMap () {
      this.ready = false
      if (this.categoria === 'Todas') {
        this.makersMap = makers
      } else {
        this.makersMap = makers.filter(mk => mk.category === this.categoria)
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
  height: -moz-calc(100vh - 250px);
  /* WebKit */
  height: -webkit-calc(100vh - 250px);
  /* Opera */
  height: -o-calc(100vh - 250px);
  /* Standard */
  height: calc(100vh - 250px);
  /* min-height: 90vh; */
}
</style>
