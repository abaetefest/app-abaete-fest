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
      />
    </div>
    <div class="row q-gutter-y-md">
      <q-card
        v-for="(place, index) in getPlaces"
        :key="index"
        class="col-sm-12 col-xs-12 col-md-6"
      >
        <q-item>

          <q-item-section>
            <q-item-label>{{ place.title }}</q-item-label>
            <q-item-label caption>{{ place.description }}</q-item-label>
            <q-item-label caption>
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
            <q-avatar>
              <img src="flat/cheers.png">
            </q-avatar>
          </q-item-section>
        </q-item>

        <!-- <img src="https://cdn.quasar.dev/img/parallax2.jpg"> -->
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { makers } from 'src/constants/makersMap'
export default {
  name: 'PlacesPage',
  data () {
    return {
      places: makers,
      ratingModel: 3,
      categoria: 'Bancos',
      options: ['Bancos', 'Farmácias', 'Pub', 'Restaurante']
    }
  },
  computed: {
    getPlaces: function () {
      return makers.filter(place => place.category === this.categoria)
    }
  },
  mounted () {
    console.log(this.categoria)
  }
}
</script>
