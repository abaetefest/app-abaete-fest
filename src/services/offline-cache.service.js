import localforage from 'localforage'

/**
 * Serviço de cache offline para armazenamento de dados com imagens
 * Utiliza IndexedDB via localForage para suportar dados binários
 */
class OfflineCacheService {
  constructor() {
    // Configura instância do localForage para dados de eventos
    this.eventsStore = localforage.createInstance({
      name: 'AbaetefestDB',
      storeName: 'events_cache',
      description: 'Cache de eventos e imagens offline'
    })

    // Configura instância separada para metadados (timestamps, etc)
    // Exposto publicamente para permitir acesso direto quando necessário
    this.metaStore = localforage.createInstance({
      name: 'AbaetefestDB',
      storeName: 'cache_metadata',
      description: 'Metadados do cache (timestamps, versões)'
    })

    // Tempo de validade do cache em milissegundos (30 minutos)
    this.CACHE_VALIDITY_TIME = 30 * 60 * 1000
  }

  /**
   * Gera uma chave única para o cache baseada na URL e parâmetros
   */
  _generateCacheKey(url, params = {}) {
    const paramStr = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&')
    return paramStr ? `${url}?${paramStr}` : url
  }

  /**
   * Verifica se o cache ainda é válido
   */
  async isCacheValid(cacheKey) {
    try {
      const metadata = await this.metaStore.getItem(cacheKey)
      if (!metadata || !metadata.timestamp) {
        return false
      }

      const now = Date.now()
      const cacheAge = now - metadata.timestamp
      return cacheAge < this.CACHE_VALIDITY_TIME
    } catch (error) {
      console.error('❌ Erro ao verificar validade do cache:', error)
      return false
    }
  }

  /**
   * Salva dados no cache com timestamp
   */
  async setCache(cacheKey, data) {
    try {
      // Salva os dados
      await this.eventsStore.setItem(cacheKey, data)

      // Salva metadados
      await this.metaStore.setItem(cacheKey, {
        timestamp: Date.now(),
        size: JSON.stringify(data).length
      })

      console.log('💾 Dados salvos no cache offline:', cacheKey)
      return true
    } catch (error) {
      console.error('❌ Erro ao salvar no cache:', error)
      return false
    }
  }

  /**
   * Busca dados do cache
   */
  async getCache(cacheKey) {
    try {
      const data = await this.eventsStore.getItem(cacheKey)
      if (data) {
        const metadata = await this.metaStore.getItem(cacheKey)
        console.log('📦 Dados recuperados do cache offline:', cacheKey)
        if (metadata) {
          const cacheAge = Math.floor((Date.now() - metadata.timestamp) / 1000 / 60)
          console.log(`⏱️ Idade do cache: ${cacheAge} minutos`)
        }
      }
      return data
    } catch (error) {
      console.error('❌ Erro ao buscar do cache:', error)
      return null
    }
  }

  /**
   * Remove dados específicos do cache
   */
  async removeCache(cacheKey) {
    try {
      await this.eventsStore.removeItem(cacheKey)
      await this.metaStore.removeItem(cacheKey)
      console.log('🗑️ Cache removido:', cacheKey)
      return true
    } catch (error) {
      console.error('❌ Erro ao remover cache:', error)
      return false
    }
  }

  /**
   * Limpa todo o cache
   */
  async clearCache() {
    try {
      await this.eventsStore.clear()
      await this.metaStore.clear()
      console.log('🗑️ Todo o cache foi limpo')
      return true
    } catch (error) {
      console.error('❌ Erro ao limpar cache:', error)
      return false
    }
  }

  /**
   * Retorna informações sobre o cache armazenado
   */
  async getCacheInfo() {
    try {
      const keys = await this.eventsStore.keys()
      const info = {
        totalItems: keys.length,
        items: []
      }

      for (const key of keys) {
        const metadata = await this.metaStore.getItem(key)
        if (metadata) {
          info.items.push({
            key,
            timestamp: metadata.timestamp,
            age: Math.floor((Date.now() - metadata.timestamp) / 1000 / 60),
            isValid: await this.isCacheValid(key)
          })
        }
      }

      return info
    } catch (error) {
      console.error('❌ Erro ao obter informações do cache:', error)
      return { totalItems: 0, items: [] }
    }
  }

  /**
   * Estratégia offline-first: tenta API primeiro, fallback para cache
   */
  async fetchWithCache(cacheKey, fetchFunction, forceRefresh = false) {
    const isValid = await this.isCacheValid(cacheKey)

    // Se o cache é válido e não forçamos refresh, verifica a estratégia
    if (isValid && !forceRefresh) {
      console.log('✅ Cache válido encontrado, tentando API primeiro...')
    } else if (!isValid && !forceRefresh) {
      console.log('⚠️ Cache expirado ou inexistente, forçando busca na API...')
    }

    try {
      // Tenta buscar da API
      console.log('📡 Buscando dados da API...')
      const response = await fetchFunction()

      // Se sucesso, salva no cache e retorna
      await this.setCache(cacheKey, response.data)
      return {
        data: response.data,
        fromCache: false,
        cached: true,
        cacheAge: 0
      }
    } catch (error) {
      console.warn('⚠️ Falha na API, tentando buscar do cache local...', error.message)

      // Se falhou, tenta buscar do cache
      const cachedData = await this.getCache(cacheKey)

      if (cachedData) {
        const metadata = await this.metaStore.getItem(cacheKey)
        const cacheAge = metadata ? Math.floor((Date.now() - metadata.timestamp) / 1000 / 60) : null

        console.log('✅ Dados recuperados do cache offline')
        return {
          data: cachedData,
          fromCache: true,
          cached: true,
          cacheAge,
          isExpired: !isValid
        }
      }

      // Se não tem cache, propaga o erro
      console.error('❌ Sem dados no cache e API indisponível')
      throw error
    }
  }

  /**
   * Pré-carrega e armazena imagens em cache
   */
  async cacheImage(imageUrl) {
    try {
      if (!imageUrl) return null

      // Verifica se já está em cache
      const cached = await this.eventsStore.getItem(`img_${imageUrl}`)
      if (cached) {
        return cached
      }

      // Faz download da imagem
      const response = await fetch(imageUrl)
      const blob = await response.blob()

      // Salva no cache
      await this.eventsStore.setItem(`img_${imageUrl}`, blob)
      console.log('🖼️ Imagem armazenada no cache:', imageUrl)

      return blob
    } catch (error) {
      console.warn('⚠️ Erro ao cachear imagem:', imageUrl, error)
      return null
    }
  }

  /**
   * Recupera imagem do cache como URL
   */
  async getCachedImageUrl(imageUrl) {
    try {
      const blob = await this.eventsStore.getItem(`img_${imageUrl}`)
      if (blob) {
        return URL.createObjectURL(blob)
      }
      return null
    } catch (error) {
      console.error('❌ Erro ao recuperar imagem do cache:', error)
      return null
    }
  }
}

// Exporta instância única (singleton)
export default new OfflineCacheService()

