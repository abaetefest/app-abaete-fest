import Rest from 'src/services/rest'

export default class AgendaService extends Rest {
  constructor (http) {
    super('/usuario', http)
    this.http = http
    // this.url = '/usuario'
  }

  async list ($dados) {
    try {
      return await this.http.post('agenda.php', $dados)
    } catch (error) {
      throw error.response
    }
  }

  // async comentarios ($uuidSolicitacao) {
  //   try {
  //     return await this.http.get(`usuarios/cliente/comentario/${$uuidSolicitacao}`)
  //   } catch (error) {
  //     throw error.response
  //   }
  // }
}
