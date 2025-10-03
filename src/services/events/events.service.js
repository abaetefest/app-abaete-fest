import Rest from 'src/services/rest'
import { getFormData } from 'src/utils/convert'
import offlineCache from 'src/services/offline-cache.service'
// const axios = require('axios')

export default class EventsService extends Rest {
  constructor(http) {
    super('/events', http)
    this.http = http
    this.url = '/events'
  }

  async register($form) {
    const formData = getFormData($form)
    console.log('formData', formData)
    try {
      return await this.http.post(this.url, formData)
    } catch (error) {
      throw error.response
    }
  }

  async updateEvent($id, $form) {
    const formData = getFormData($form)
    console.log('formData', $form)
    try {
      return await this.http.put(`${this.url}/${$id}`, formData)
    } catch (error) {
      throw error.response
    }
  }

  async login($dados) {
    try {
      return await this.http.post(this.url + '/auth', $dados)
    } catch (error) {
      throw error.response
    }
  }

  /**
   * Lista eventos por categoria com suporte offline-first
   * @param {string} $category - Categoria dos eventos (vazio para todos)
   * @param {boolean} forceRefresh - Força busca na API ignorando cache válido
   * @returns {Promise} Resposta com dados e informações de cache
   */
  async listByCategory($category = '', forceRefresh = false) {
    // Gera chave única para o cache baseada na categoria
    const cacheKey = $category && $category !== 'all'
      ? `events_category_${$category}`
      : 'events_all'

    try {
      // Usa estratégia offline-first
      const result = await offlineCache.fetchWithCache(
        cacheKey,
        async () => {
          // Função que faz a requisição HTTP
          if ($category && $category !== 'all') {
            return await this.http.get(`${this.url}?category=${$category}`)
          } else {
            return await this.http.get(`${this.url}`)
          }
        },
        forceRefresh
      )

      // Pré-carrega imagens em background (não bloqueia a resposta)
      if (result.data && result.data.data) {
        this._cacheEventImages(result.data.data).catch(err => {
          console.warn('⚠️ Erro ao cachear imagens em background:', err)
        })
      }

      // Retorna no formato esperado pelo componente
      return {
        data: result.data,
        fromCache: result.fromCache,
        cached: result.cached,
        cacheAge: result.cacheAge,
        isExpired: result.isExpired
      }
    } catch (error) {
      // Se não conseguiu nem da API nem do cache, lança erro
      console.error('❌ Erro ao buscar eventos:', error)
      throw error.response || error
    }
  }

  /**
   * Busca um evento específico por ID com suporte offline
   * Estratégia:
   * 1. Tenta buscar da lista em cache (mais rápido)
   * 2. Tenta buscar do cache individual
   * 3. Busca da API
   */
  async get($id, forceRefresh = false) {
    const cacheKey = `event_${$id}`

    // Se não forçar refresh, tenta buscar da lista em cache primeiro
    if (!forceRefresh) {
      const eventFromList = await this._findEventInCachedLists($id)
      if (eventFromList) {
        console.log(`✅ Evento ${$id} encontrado na lista em cache`)
        return {
          data: { data: eventFromList },
          fromCache: true,
          cached: true,
          cacheAge: eventFromList._cacheAge || 0,
          source: 'list_cache'
        }
      }
    }

    try {
      const result = await offlineCache.fetchWithCache(
        cacheKey,
        async () => {
          return await this.http.get(`${this.url}/${$id}`)
        },
        forceRefresh
      )

      // Pré-carrega imagem do evento
      if (result.data && result.data.data && result.data.data.image) {
        offlineCache.cacheImage(result.data.data.image).catch(err => {
          console.warn('⚠️ Erro ao cachear imagem do evento:', err)
        })
      }

      return {
        data: result.data,
        fromCache: result.fromCache,
        cached: result.cached,
        cacheAge: result.cacheAge,
        source: result.fromCache ? 'individual_cache' : 'api'
      }
    } catch (error) {
      console.error('❌ Erro ao buscar evento:', error)
      throw error.response || error
    }
  }

  /**
   * Busca um evento nas listas em cache (events_all ou por categoria)
   * @private
   */
  async _findEventInCachedLists($id) {
    try {
      // Tenta buscar de events_all primeiro
      const allEventsCache = await offlineCache.getCache('events_all')
      if (allEventsCache && allEventsCache.data) {
        const event = allEventsCache.data.find(e => e.id === parseInt($id) || e.id === $id)
        if (event) {
          // Adiciona informação de idade do cache
          const metadata = await offlineCache.metaStore.getItem('events_all')
          if (metadata) {
            event._cacheAge = Math.floor((Date.now() - metadata.timestamp) / 1000 / 60)
          }
          return event
        }
      }

      // Se não encontrou, tenta buscar em caches de categorias
      const cacheInfo = await offlineCache.getCacheInfo()
      for (const item of cacheInfo.items) {
        if (item.key.startsWith('events_category_')) {
          const categoryCache = await offlineCache.getCache(item.key)
          if (categoryCache && categoryCache.data) {
            const event = categoryCache.data.find(e => e.id === parseInt($id) || e.id === $id)
            if (event) {
              event._cacheAge = item.age
              return event
            }
          }
        }
      }

      return null
    } catch (error) {
      console.warn('⚠️ Erro ao buscar evento nas listas em cache:', error)
      return null
    }
  }

  /**
   * Cacheia imagens dos eventos em background
   * @private
   */
  async _cacheEventImages(events) {
    if (!Array.isArray(events)) return

    const imagePromises = events
      .filter(event => event.image || event.banner || event.cover)
      .map(event => {
        const images = [event.image, event.banner, event.cover].filter(Boolean)
        return Promise.all(
          images.map(img => offlineCache.cacheImage(img))
        )
      })

    await Promise.allSettled(imagePromises)
    console.log(`🖼️ ${imagePromises.length} imagens processadas para cache`)
  }

  /**
   * Limpa o cache de eventos
   */
  async clearEventsCache() {
    try {
      await offlineCache.clearCache()
      console.log('🗑️ Cache de eventos limpo com sucesso')
      return true
    } catch (error) {
      console.error('❌ Erro ao limpar cache:', error)
      return false
    }
  }

  /**
   * Obtém informações sobre o cache atual
   */
  async getCacheInfo() {
    return await offlineCache.getCacheInfo()
  }
}
