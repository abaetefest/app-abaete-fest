import { Notify } from 'quasar'
import Vue from 'vue'
const setNotifyDanger = (message = '') => {
  Notify.create({
    color: 'negative',
    position: 'bottom',
    message: message || 'Ops, tivemos um erro!',
    icon: 'mdi-alert'
  })
}

const setNotifySuccess = (message = '') => {
  Notify.create({
    color: 'positive',
    position: 'bottom',
    message: message || 'Operação realizada com sucesso!',
    icon: 'mdi-check-circle-outline'
  })
}

Vue.prototype.$notifyDanger = setNotifyDanger
Vue.prototype.$notifySuccess = setNotifySuccess
