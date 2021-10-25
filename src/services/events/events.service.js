import Rest from 'src/services/rest'
import { getFormData } from 'src/utils/convert'
// const axios = require('axios')

export default class EventsService extends Rest {
  constructor (http) {
    super('/events', http)
    this.http = http
    this.url = '/events'
  }

  async register ($form) {
    const formData = getFormData($form)
    console.log('formData', formData)
    try {
      return await this.http.post(this.url, formData)
    } catch (error) {
      throw error.response
    }
  }

  async updateEvent ($id, $form) {
    const formData = getFormData($form)
    console.log('formData', $form)
    try {
      return await this.http.put(`${this.url}/${$id}`, formData)
    } catch (error) {
      throw error.response
    }
  }

  async login ($dados) {
    try {
      return await this.http.post(this.url + '/auth', $dados)
    } catch (error) {
      throw error.response
    }
  }

  async listByCategory ($category) {
    try {
      return await this.http.get(`${this.url}?category=${$category}`)
    } catch (error) {
      throw error.response
    }
  }
}
