import Rest from 'src/services/rest'

export default class CategoryService extends Rest {
  constructor(http) {
    super('/category', http)
    this.http = http
    this.url = '/category'
  }
}
