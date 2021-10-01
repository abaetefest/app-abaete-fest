import Rest from 'src/services/rest'
// const axios = require('axios')

export default class OcupationService extends Rest {
  constructor (http) {
    super('/occupation', http)
    this.http = http
    this.url = '/occupation'
  }

  // async login ($dados) {
  //   try {
  //     return await this.http.post(this.url + '/auth', $dados)
  //   } catch (error) {
  //     throw error.response
  //   }
  // }

  // async login ($dados) {
  //   const data = JSON.stringify($dados)
  //   const config = {
  //     method: 'post',
  //     url: 'https://medico.sige.dev.br/webservices/app/login.php',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: data
  //   }
  //   try {
  //     return await axios(config)
  //   } catch (error) {
  //     throw error.response
  //   }
  // }

  // async upload ($formData, $data, uuidDoc) {
  //   let uuid = ''
  //   let uuidDocumento = uuidDoc
  //   const options = {
  //     year: 'numeric',
  //     month: '2-digit',
  //     day: '2-digit'
  //   }
  //   if ($data.arquivo !== null) {
  //     uuid = $data.arquivo.suuid
  //     uuidDocumento = $data.arquivo.suuidDocumento
  //   }
  //   const dataAtual = new Date()
  //   const dataAtualFormata = new Intl.DateTimeFormat('da-DK', options).format(dataAtual)
  //   const headers = {
  //     'Content-Type': 'multipart/form-data',
  //     tipoArquivo: $data.tipoArquivo,
  //     uuid: uuid || uuidv4(),
  //     uuidDocumento: uuidDocumento || uuidv4(),
  //     tipoDocumento: $data.tipoDocumento,
  //     data: dataAtualFormata.split('.').join('-'),
  //     uuidPessoa: $data.uuid
  //   }
  //   try {
  //     const result = await this.http.post(`usuarios/cliente/upload`, $formData, { headers })
  //     result.data = {
  //       uuid: headers.uuidDocumento,
  //       tipo: headers.tipoDocumento,
  //       uuidPessoa: headers.uuidPessoa
  //     }
  //     return result
  //   } catch (error) {
  //     throw error.response
  //   }
  // }
  // async situacaoAtual ($uuid) {
  //   try {
  //     return await this.http.get(`usuarios/cliente/situacao-atual/${$uuid}`)
  //   } catch (error) {
  //     throw error.response
  //   }
  // }
  // async comentarios ($uuidSolicitacao) {
  //   try {
  //     return await this.http.get(`usuarios/cliente/comentario/${$uuidSolicitacao}`)
  //   } catch (error) {
  //     throw error.response
  //   }
  // }
  // async submitComentario ($formData) {
  //   try {
  //     return await this.http.post('usuarios/cliente/comentario', $formData)
  //   } catch (error) {
  //     throw error.response
  //   }
  // }
  // async donwloadArquivo ($uuid) {
  //   try {
  //     return await this.http.get(`usuarios/cliente/download/${$uuid}`, {
  //       responseType: 'arraybuffer'
  //     })
  //   } catch (error) {
  //     throw error.response
  //   }
  // }
}
