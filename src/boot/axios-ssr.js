import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Configuração do Axios para funcionar tanto no servidor quanto no cliente
const api = axios.create({
  baseURL: process.env.URI_API || 'https://polished-snowflake-9723.fly.dev/api'
})

export default boot(({ app, ssrContext }) => {
  // Torna o axios disponível globalmente
  app.config.globalProperties.$axios = api
  app.config.globalProperties.$api = api

  // Para usar no preFetch (contexto do servidor)
  if (process.env.SERVER) {
    // No servidor, adiciona o axios ao contexto global
    global.$axios = api
    global.$api = api

    // Também adiciona aos protótipos para compatibilidade
    if (typeof global !== 'undefined') {
      global.$axios = api
      global.$services = {
        events: () => ({
          get: (id) => api.get(`/events/${id}`),
          list: (params) => api.get('/events', { params }),
          create: (data) => api.post('/events', data),
          update: (id, data) => api.put(`/events/${id}`, data),
          delete: (id) => api.delete(`/events/${id}`)
        })
      }
    }
  }

  // Interceptor para adicionar headers se necessário
  api.interceptors.request.use(config => {
    // Adiciona token de autenticação se disponível
    if (process.env.CLIENT && typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('authToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  })

  // Interceptor para tratar erros globalmente
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        // Redireciona para login se não autorizado (apenas no cliente)
        if (process.env.CLIENT) {
          // Remove token inválido
          if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('authToken')
            localStorage.removeItem('authUser')
          }

          // Redireciona para login se não estiver já lá
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
        }
      }

      return Promise.reject(error)
    }
  )
})

// Exporta a instância do axios para uso direto
export { api }
