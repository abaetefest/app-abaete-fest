<template>
  <q-page class="weather-page">
    <!-- Background image with gradient overlay -->
    <div class="fullscreen bg-image">
      <div class="gradient-overlay"></div>
    </div>

    <div class="content-container">

      <!-- Main weather glass card -->
      <div v-if="tempResult" class="glass-card q-pa-md">
        <div class="location-container q-pb-md">
          <div class="text-h5 text-weight-bold">{{ location }}</div>
          <div class="text-caption">{{ getCurrentDate() }}</div>
        </div>

        <!-- Main weather info -->
        <div class="row justify-center items-center q-py-md">
          <div class="col-12 col-sm-6 text-center">
              <img
                v-if="condition_slug"
                :src="`https://assets.hgbrasil.com/weather/icons/conditions/${condition_slug}.svg`"
                class="weather-icon q-mb-sm"
              >
            <div class="text-h2 text-weight-bold">{{ temp }}°C</div>
            <div class="text-subtitle1 q-mt-sm">{{ description }}</div>
          </div>
        </div>

        <!-- Weather details -->
        <div class="row q-col-gutter-md q-pt-md">
          <!-- Temperature Max -->
          <div class="col-6 col-sm-3">
            <div class="detail-card q-pa-sm">
              <div class="row items-center">
                <div class="col-auto">
                  <q-icon name="thermostat" color="red-5" size="sm" />
                </div>
                <div class="col">
                  <div class="text-caption text-grey-7">Temp. max</div>
                  <div class="text-subtitle1 text-weight-medium">{{ tempMax }}°C</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Temperature Min -->
          <div class="col-6 col-sm-3">
            <div class="detail-card q-pa-sm">
              <div class="row items-center">
                <div class="col-auto">
                  <q-icon name="ac_unit" color="blue-5" size="sm" />
                </div>
                <div class="col">
                  <div class="text-caption text-grey-7">Temp. min</div>
                  <div class="text-subtitle1 text-weight-medium">{{ tempMin }}°C</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Humidity -->
          <div class="col-6 col-sm-3">
            <div class="detail-card q-pa-sm">
              <div class="row items-center">
                <div class="col-auto">
                  <q-icon name="water_drop" color="blue-8" size="sm" />
                </div>
                <div class="col">
                  <div class="text-caption text-grey-7">Umidade</div>
                  <div class="text-subtitle1 text-weight-medium">{{ humidity }}%</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Wind -->
          <div class="col-6 col-sm-3">
            <div class="detail-card q-pa-sm">
              <div class="row items-center">
                <div class="col-auto">
                  <q-icon name="air" color="grey-7" size="sm" />
                </div>
                <div class="col">
                  <div class="text-caption text-grey-7">Vento</div>
                  <div class="text-subtitle1 text-weight-medium">{{ windSpeed }}km/h</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Moon phase -->
        <div class="row justify-center q-pt-lg">
          <div class="col-12 text-center">
            <div class="text-subtitle1 text-weight-medium q-mb-sm">Fase da Lua</div>
            <img
              v-if="moon"
              :src="`https://assets.hgbrasil.com/weather/icons/moon/${moon}.png`"
              class="moon-icon"
            >
            <div class="text-caption q-mt-sm">{{ moonPhaseText }}</div>
          </div>
        </div>
      </div>

      <!-- Skeleton loading state -->
      <div v-else class="glass-card q-pa-md">
        <q-skeleton type="text" class="text-h5 q-mb-md" />

        <div class="row justify-center items-center q-py-md">
          <div class="col-12 col-sm-6 text-center">
            <q-skeleton type="QAvatar" size="80px" class="q-mb-md" />
            <q-skeleton type="text" class="text-h2" />
            <q-skeleton type="text" class="q-mt-sm" />
          </div>
        </div>

        <div class="row q-col-gutter-md q-pt-md">
          <div class="col-6 col-sm-3" v-for="i in 4" :key="i">
            <q-skeleton height="60px" square />
          </div>
        </div>

        <div class="row justify-center q-pt-lg">
          <div class="col-12 text-center">
            <q-skeleton type="text" width="30%" class="q-mb-sm" />
            <q-skeleton type="QAvatar" size="60px" class="q-my-md" />
            <q-skeleton type="text" width="40%" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PageWeather',
  data() {
    return {
      location: 'Abaetetuba, BR',
      condition_slug: '',
      moon: '',
      temp: 0,
      tempResult: false,
      description: '',
      tempMax: 0,
      tempMin: 0,
      humidity: 0,
      windSpeed: 0,
      moonPhaseText: ''
    }
  },
  async mounted() {
    this.getWeather()
  },
  methods: {
    async getWeather() {
      try {
        this.tempResult = false
        const { data } = await axios.get('https://api.hgbrasil.com/weather?format=json-cors&key=3ae5537e&woeid=458294')
        this.condition_slug = data.results.condition_slug
        this.temp = data.results.temp
        this.moon = data.results.moon_phase
        this.description = data.results.description
        this.tempMax = data.results.forecast[0].max
        this.tempMin = data.results.forecast[0].min
        this.humidity = data.results.humidity
        this.windSpeed = data.results.wind_speedy.replace(' km/h', '')
        this.moonPhaseText = this.getMoonPhaseText(data.results.moon_phase)
        this.tempResult = true
      } catch (error) {
        console.log('Não foi possível recuperar tempo e clima', error)
      }
    },
    getCurrentDate() {
      const options = { weekday: 'long', day: 'numeric', month: 'long' }
      return new Date().toLocaleDateString('pt-BR', options)
    },
    getMoonPhaseText(phase) {
      // eslint-disable-next-line no-unused-vars
      const phases = {
        new: 'Lua Nova',
        waxing_crescent: 'Crescente',
        first_quarter: 'Quarto Crescente',
        waxing_gibbous: 'Crescente Gibosa',
        full: 'Lua Cheia',
        waning_gibbous: 'Minguante Gibosa',
        last_quarter: 'Quarto Minguante',
        waning_crescent: 'Minguante'
      }
      return phases[phase] || phase
    }
  }
}
</script>

<style>
.weather-page {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.bg-image {
  background-image: url('https://images.unsplash.com/photo-1590077428593-a33c3fb61d8d?q=80&w=2096');
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%);
  z-index: -1;
}

.content-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  z-index: 1;
}

.search-container {
  width: 100%;
  margin-top: 20px;
}

.glass-input {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
}

.glass-input .q-field__control {
  background: transparent !important;
}

.glass-input .q-field__native,
.glass-input .q-field__prefix,
.glass-input .q-field__suffix,
.glass-input .q-icon {
  color: white;
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.detail-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.detail-card:hover {
  background: rgba(255, 255, 255, 0.2);
}

.weather-icon {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
}

.moon-icon {
  width: 60px;
  height: 60px;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
}

.location-container {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Dark mode adjustments */
.body--dark .glass-card,
.body--dark .detail-card,
.body--dark .glass-input {
  background: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}

.body--dark .detail-card:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
