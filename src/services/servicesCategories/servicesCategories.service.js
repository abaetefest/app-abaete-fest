import Rest from 'src/services/rest'

export default class serviceCategoriesService extends Rest {
  constructor (http) {
    super('https://abaetefest.api.deskree.com/api/v1/rest/collections/serviceCategories', http)
    this.http = http
    this.url = 'https://abaetefest.api.deskree.com/api/v1/rest/collections/serviceCategories'
  }

  async register ($form) {
    try {
      return await this.http.post(this.url, $form)
    } catch (error) {
      throw error.response
    }
  }

  async updateEvent ($id, $form) {
    try {
      return await this.http.patch(`${this.url}/${$id}`, $form)
    } catch (error) {
      throw error.response
    }
  }

  // async login ($dados) {
  //   try {
  //     return await this.http.post(this.url + '/auth', $dados)
  //   } catch (error) {
  //     throw error.response
  //   }
  // }

  // async listByCategory ($category = '') {
  //   try {
  //     if ($category && $category !== 'all') {
  //       return await this.http.get(`${this.url}?category=${$category}`)
  //     } else {
  //       return await this.http.get(`${this.url}`)
  //     }
  //   } catch (error) {
  //     throw error.response
  //   }
  // }
}
