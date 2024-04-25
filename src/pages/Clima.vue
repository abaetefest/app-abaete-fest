<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'">
    <div class="text-h5 text-bold text-center q-pt-md q-pb-sm">
      Clima e <span class="text-red-8">Tempo</span>
    </div>

    <div
      v-if="tempResult"
      class="row q-col-gutter-sm">
      <div v-if="condition_slug" class="col-12 text-center">
        <img :src="`https://assets.hgbrasil.com/weather/icons/conditions/${condition_slug}.svg`">
      </div>
      <div class="col-12 text-center text-h4 text-bold">
        {{ temp }}ºC <br>
        <span class="text-h6 text-red-8">{{ description }}</span>
      </div>
      <div class="col-12 text-center text-h5 text-bold">
        Abaetetuba
      </div>
      <div class="col-12">
        <q-separator />
      </div>
      <div class="col-12 text-center text-h4 text-bold">
        Lua
      </div>
      <div v-if="condition_slug" class="col-12 text-center">
        <img :src="`https://assets.hgbrasil.com/weather/icons/moon/${moon}.png`">
      </div>
    </div>
    <div v-else class="row justify-center">
      <div class="col-12 text-center q-gutter-y-md">
        <q-skeleton class="full-width" />
        <q-skeleton class="full-width" />
        <q-skeleton class="full-width" />
        <q-skeleton class="full-width" />
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PageWeather',
  data () {
    return {
      condition_slug: '',
      moon: '',
      temp: 0,
      tempResult: false,
      description: ''
    }
  },
  async mounted () {
    this.getWeather()
  },
  methods: {
    async getWeather () {
      try {
        this.tempResult = false
        const { data } = await axios.get('https://api.hgbrasil.com/weather?woeid=458294')
        this.condition_slug = data.results.condition_slug
        this.temp = data.results.temp
        this.moon = data.results.moon_phase
        this.tempResult = true
        this.description = data.results.description
      } catch (error) {
        console.log('Não foi possível recuperar tempo e clima', error)
      }
    }
  }
}
</script>

<style>
.card-cursos:hover {
  background: #e3f2fd;
}
</style>
