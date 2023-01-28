<template>
  <q-page padding class="bg-grey-1">
    <div class="row q-pb-md justify-center">
      <q-btn-group push>
        <q-btn
          push
          label="Lista"
          icon="mdi-format-list-bulleted-square"
          :to="{ name: 'places' }"
          color="primary"
        />
        <q-btn push label="Mapa" icon="mdi-map-legend" :to="{ name: 'map' }" />
      </q-btn-group>
    </div>
    <div class="row q-pb-md">
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
              <!-- <q-icon :name="scope.opt.icon" /> -->
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="row justify-between">
      <div
        class="col-sm-12 col-xs-12 col-md-6"
        v-for="(place, index) in getPlaces"
        :key="index"
      >
        <q-card @click="openDialogCourse(place)" class="q-ma-xs">
          <q-item>
            <q-item-section>
              <q-item-label class="text-weight-medium">{{
                place.title
              }}</q-item-label>
              <q-item-label caption>{{ place.address }}</q-item-label>
              <q-item-label caption v-if="place.preco">
                Preço:
                <q-rating
                  v-model="place.preco"
                  size="1rem"
                  icon="mdi-currency-usd"
                  color="green-5"
                  readonly
                />
              </q-item-label>
            </q-item-section>

            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="place.icon" />
              </q-avatar>
            </q-item-section>
          </q-item>

          <!-- <img src="https://cdn.quasar.dev/img/parallax2.jpg"> -->
        </q-card>
      </div>
    </div>
    <dialog-places
      :modal-places="modalPlaces"
      :place-data="placeDetails"
      @close="closeModal"
    />
  </q-page>
</template>

<script>
import { makers } from 'src/constants/makersMap'
export default {
  name: 'PlacesPage',
  components: {
    DialogPlaces: () => import('components/DialogPlaces')
  },
  data () {
    return {
      places: makers,
      ratingModel: 3,
      categoria: 'Bancos',
      options: [
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
          label: 'Hospitais e postos de saúde',
          value: 'HospitaisPostos',
          icon: 'places/hospital.png'
        },
        {
          label: 'Farmácias',
          value: 'Farmácias',
          icon: 'places/farmacia.png'
        },
        {
          label: 'Pub & Restaurante',
          value: 'Pub&Restaurante',
          icon: 'flat/cheers.png'
        },
        {
          label: 'Artigos de Pesca Esportiva',
          value: 'Pesca',
          icon: 'flat/fishing.png'
        }
      ],
      modalPlaces: false,
      placeDetails: {}
    }
  },
  computed: {
    getPlaces: function () {
      return makers.filter((place) => place.category === this.categoria)
    },
    getIconCategory: function () {
      const img = this.options.filter((opt) => opt.value === this.categoria)
      return img[0].icon
    }
  },
  mounted () {
    console.log(this.categoria)
  },
  methods: {
    openDialogCourse (course) {
      this.modalPlaces = true
      this.placeDetails = course
    },
    closeModal () {
      this.modalPlaces = false
      this.placeDetails = {}
    }
  }
}
</script>
