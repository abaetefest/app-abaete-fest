import Axios from 'axios'

export const urlBase = process.env.URI_API
const axios = Axios.create({
  baseURL: urlBase
})

axios.defaults.headers = {
  // 'Content-Type': 'application/json'
  // 'Cache-Control': 'no-cache',
  // Pragma: 'no-cache',
  // Expires: '0'
}

axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('abaete-fest-token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
    return config
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// axios.interceptors.response.use(response => {
//   return Promise.resolve(response)
// }, error => {
//   if (error.response.status !== 401) {
//     return Promise.reject(error)
//   }

//   if (window.localStorage.getItem('cliente')) {
//     window.localStorage.clear()
//     window.location.reload()
//   }
//   return Promise.reject(error)
// })

export const http = axios
