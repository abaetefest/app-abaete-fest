import Rest from 'src/services/rest'
// const axios = require('axios')

export default class EventsService extends Rest {
  constructor (http) {
    super('/events', http)
    this.http = http
    this.url = '/events'
  }

  async listByCategory ($category) {
    try {
      return await this.http.get(`${this.url}?category=${$category}`)
    } catch (error) {
      throw error.response
    }
  }
}
