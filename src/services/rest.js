export default class Rest {
  constructor(url, http) {
    this.url = url
    this.http = http
  }

  async list() {
    try {
      return await this.http.get(this.url)
    } catch (error) {
      throw error.response
    }
  }

  async show($id) {
    try {
      return await this.http.get(this.url, {
        params: $id
      })
    } catch (error) {
      throw new Error(error, 'falha ao usar recurso show')
    }
  }

  async get($id) {
    try {
      return await this.http.get(`${this.url}/${$id}`)
    } catch (error) {
      throw error.response
    }
  }

  async store($data, $captchaResponse = '') {
    if ($captchaResponse) {
      try {
        return await this.http.post(this.url, $data, {
          headers: {
            'g-recaptcha-response': $captchaResponse
          }
        })
      } catch (error) {
        throw error.response
      }
    }
    try {
      return await this.http.post(this.url, $data)
    } catch (error) {
      throw error.response
    }
  }

  async update($id, $data) {
    try {
      return await this.http.put(`${this.url}/${$id}`, $data)
    } catch (error) {
      throw error.response
    }
  }

  async patch($id, $data) {
    try {
      return await this.http.patch(`${this.url}/${$id}`, $data)
    } catch (error) {
      throw error.response
    }
  }

  async delete($id) {
    try {
      return await this.http.delete(`${this.url}/${$id}`)
    } catch (error) {
      throw error.response
    }
  }
}
