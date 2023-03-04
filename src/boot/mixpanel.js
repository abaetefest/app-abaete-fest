import Vue from 'vue'
import mixpanel from 'mixpanel-browser'

const mp = mixpanel

mp.init('1bad0540875f8ecd5e52425dd1ca6067')

Vue.prototype.$mixpanel = mp
