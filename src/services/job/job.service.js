import Rest from 'src/services/rest'
// const axios = require('axios')

export default class JobService extends Rest {
  constructor (http) {
    super('/job', http)
    this.http = http
    this.url = '/job'
  }
}
