export const urlBase = process.env.URI_API

function buildQuery(params) {
  if (!params) return ''
  if (typeof params !== 'object' || Array.isArray(params)) return ''
  const qs = new URLSearchParams()
  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value !== null && value !== undefined) {
      qs.append(key, value)
    }
  })
  const str = qs.toString()
  return str ? `?${str}` : ''
}

function joinUrl(base, path) {
  if (/^https?:\/\//i.test(path)) return path
  if (!base) return path
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

async function parseBody(response) {
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      return await response.json()
    } catch (err) {
      return null
    }
  }
  const text = await response.text()
  return text || null
}

function authHeader() {
  if (typeof window === 'undefined') return {}
  const token = window.localStorage.getItem('abaete-fest-token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function serializeBody(data, headers) {
  if (data === undefined || data === null) return undefined
  if (data instanceof FormData) return data
  if (typeof data === 'string' || data instanceof Blob || data instanceof ArrayBuffer) return data
  if (!headers['Content-Type'] && !headers['content-type']) {
    headers['Content-Type'] = 'application/json'
  }
  return JSON.stringify(data)
}

async function request(method, path, { data, params, headers = {} } = {}) {
  const finalHeaders = { ...authHeader(), ...headers }
  const body = serializeBody(data, finalHeaders)
  const url = joinUrl(urlBase, path) + buildQuery(params)

  let response
  try {
    response = await fetch(url, { method, headers: finalHeaders, body })
  } catch (networkError) {
    const err = new Error(networkError.message || 'Network error')
    err.request = { url, method }
    err.response = {
      data: null,
      status: 0,
      statusText: 'Network Error',
      headers: null,
      ok: false
    }
    throw err
  }

  const parsed = await parseBody(response)
  const result = {
    data: parsed,
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    ok: response.ok
  }

  if (!response.ok) {
    const err = new Error(`Request failed with status ${response.status}`)
    err.response = result
    throw err
  }

  return result
}

export const http = {
  get: (url, config) => request('GET', url, config),
  delete: (url, config) => request('DELETE', url, config),
  post: (url, data, config = {}) => request('POST', url, { ...config, data }),
  put: (url, data, config = {}) => request('PUT', url, { ...config, data }),
  patch: (url, data, config = {}) => request('PATCH', url, { ...config, data })
}
