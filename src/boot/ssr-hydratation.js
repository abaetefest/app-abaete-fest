import { boot } from 'quasar/wrappers'

export default boot(({ app, ssrContext }) => {
  // No servidor, prepara os dados para serem enviados ao cliente
  if (process.env.SERVER && ssrContext) {
    ssrContext.state = ssrContext.state || {}

    // Adiciona função para armazenar dados para hidratação
    ssrContext.setHydrationData = (key, data) => {
      ssrContext.state[key] = data
    }
  }

  // No cliente, disponibiliza os dados hidratados
  if (process.env.CLIENT) {
    // Pega os dados do estado inicial
    const initialState = window.__INITIAL_STATE__ || {}

    // Adiciona helper para acessar dados hidratados
    app.config.globalProperties.$getHydratedData = (key, defaultValue = null) => {
      return initialState[key] || defaultValue
    }

    // Limpa o estado inicial após uso para liberar memória
    setTimeout(() => {
      if (window.__INITIAL_STATE__) {
        delete window.__INITIAL_STATE__
      }
    }, 1000)
  }
})
