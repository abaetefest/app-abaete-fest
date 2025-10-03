import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // === HANDLER DE ERRO PARA CHUNKS OFFLINE ===
  // Resolve problemas de carregamento de chunks quando offline
  Router.onError((error) => {
    console.warn('Router error:', error)

    // Verifica se é um erro de carregamento de chunk
    const isChunkLoadError = error.message.includes('Loading chunk') ||
                           error.message.includes('ChunkLoadError') ||
                           error.message.includes('Loading CSS chunk')

    if (isChunkLoadError) {
      console.warn('Chunk load error detected, attempting to reload...')

      // Tenta recarregar a página para resolver o problema de chunk
      if (typeof window !== 'undefined') {
        // Pequeno delay para evitar loops infinitos
        setTimeout(() => {
          window.location.reload()
        }, 100)
      }
    }
  })

  return Router
}
