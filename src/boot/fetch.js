import Vue from 'vue'
import { boot } from 'quasar/wrappers'
import { http } from 'src/services/http'

Vue.prototype.$http = http

export default boot(({ app }) => {
  app.$http = http
})

export { http }
