import Rest from 'src/services/rest'

export default class UsersService extends Rest {
  constructor(http) {
    super('/users', http)
    this.http = http
    this.url = '/users'
  }

  async login($dados) {
    try {
      return await this.http.post(this.url + '/signin', $dados)
    } catch (error) {
      throw error.response
    }
  }

  async register($dados) {
    try {
      return await this.http.post(this.url + '/signup', $dados)
    } catch (error) {
      throw error.response
    }
  }
}
