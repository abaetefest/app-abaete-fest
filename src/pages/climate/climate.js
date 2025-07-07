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
