import Rest from 'src/services/rest'
// const axios = require('axios')

export default class FilesService extends Rest {
  constructor (http) {
    super('/file/image', http)
    this.http = http
    this.url = '/file/image'
  }
}
