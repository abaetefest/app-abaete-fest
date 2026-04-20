import Rest from 'src/services/rest'
import { getFormData } from 'src/utils/convert'

export default class EventsService extends Rest {
  constructor(http) {
    super('/events', http)
    this.http = http
    this.url = '/events'
  }

  async register($form) {
    const formData = getFormData($form)
    try {
      return await this.http.post(this.url, formData)
    } catch (error) {
      throw error.response
    }
  }

  async updateEvent($id, $form) {
    const formData = getFormData($form)
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

  async listByCategory($category = '') {
    try {
      if ($category && $category !== 'all') {
        return await this.http.get(`${this.url}?category=${$category}`)
      } else {
        return await this.http.get(`${this.url}`)
      }
    } catch (error) {
      throw error.response
    }
  }
}
