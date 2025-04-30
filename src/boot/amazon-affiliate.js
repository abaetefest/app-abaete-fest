// src/boot/amazon-affiliate.js
import AmazonAffiliateDirective from '../directives/amazon-affiliate'
import Vue from 'vue'
export default () => {
  // Registra a diretiva em toda a aplicação
  Vue.use(AmazonAffiliateDirective)
}
