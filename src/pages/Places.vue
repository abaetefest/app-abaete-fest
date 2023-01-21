<template>
  <q-page padding class="bg-grey-1">
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
      />
    </div>
    <div class="row q-gutter-y-md">
      <q-card
        v-for="(place, index) in getPlaces"
        :key="index"
        class="col-sm-12 col-xs-12 col-md-6"
        @click="openDialogCourse(place)"
      >
        <q-item>

          <q-item-section>
            <q-item-label class="text-weight-medium">{{ place.title }}</q-item-label>
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
              <img :src="place.icon">
            </q-avatar>
          </q-item-section>
        </q-item>

        <!-- <img src="https://cdn.quasar.dev/img/parallax2.jpg"> -->
      </q-card>
    </div>
    <dialog-places
      :modal-places="modalPlaces"
      :place-data="placeDetails"
      @close="closeModal" />
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
      options: ['Bancos', 'Hotéis', 'Farmácias', 'Pub', 'Restaurante'],
      modalPlaces: false,
      placeDetails: {}
    }
  },
  computed: {
    getPlaces: function () {
      return makers.filter(place => place.category === this.categoria)
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
