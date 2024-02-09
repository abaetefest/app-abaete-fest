import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

console.log('process', process.env.GOOGLE_API_KEY)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_API_KEY,
    libraries: 'places' // This is required if you use the Autocomplete plugin
  }
})
