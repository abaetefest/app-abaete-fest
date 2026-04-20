import Rest from 'src/services/rest'

export default class FilesService extends Rest {
  constructor(http) {
    super('/file/image', http)
    this.http = http
    this.url = '/file/image'
  }
}
