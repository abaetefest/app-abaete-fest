import Rest from 'src/services/rest'
// const axios = require('axios')

export default class CoursesService extends Rest {
  constructor (http) {
    super('/course', http)
    this.http = http
    this.url = '/course'
  }
}
