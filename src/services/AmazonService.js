// Primeiro, instale a biblioteca amazon-paapi:
// npm install amazon-paapi --save

// Criando um serviço para lidar com a API da Amazon
// src/services/AmazonService.js

import { ProductAdvertisingAPI } from 'amazon-paapi'

export default {
  // Configuração da API
  config: {
    accessKey: 'AKPAGTLHY41745975230',
    secretKey: '5KcsqxT0CkRjZLE+9gq5nBWlqMxJPylH8LtUMc4D',
    partnerTag: 'patrickmont04-20',
    host: 'webservices.amazon.com.br', // ou o endpoint apropriado para seu país
    region: 'br'
  },

  // Método para buscar um produto pelo nome
  async searchProduct (keyword) {
    try {
      const api = new ProductAdvertisingAPI(
        this.config.accessKey,
        this.config.secretKey,
        this.config.partnerTag,
        this.config.host,
        this.config.region
      );

      const requestParams = {
        Keywords: keyword,
        SearchIndex: 'All',
        ItemCount: 1,
        Resources: [
          'ItemInfo.Title',
          'Images.Primary.Medium',
          'Offers.Listings.Price'
        ]
      };

      const response = await api.searchItems(requestParams)

      if (response.SearchResult && response.SearchResult.Items && response.SearchResult.Items.length > 0) {
        const item = response.SearchResult.Items[0]
        return {
          title: item.ItemInfo.Title.DisplayValue,
          url: item.DetailPageURL,
          image: item.Images?.Primary?.Medium?.URL || null,
          price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || null
        }
      }

      return null
    } catch (error) {
      console.error('Erro ao buscar produto na Amazon:', error)
      return null
    }
  }
};