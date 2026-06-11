'use strict'

const CLIENT_ID = process.env.AMAZON_CLIENT_ID
const CLIENT_SECRET = process.env.AMAZON_CLIENT_SECRET
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG || 'patrickmont04-20'

const TOKEN_URL = 'https://api.amazon.com/auth/o2/token'
const API_BASE = 'https://creatorsapi.amazon/catalog/v1'

const RESPONSE_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Cache-Control': 'public, max-age=3600'
}

let _token = null
let _tokenExpiry = 0

async function getAccessToken () {
  if (_token && Date.now() < _tokenExpiry) return _token

  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basicAuth}`
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      scope: 'creatorsapi/default'
    }).toString()
  })

  if (!res.ok) throw new Error(`Auth ${res.status}: ${await res.text()}`)

  const { access_token, expires_in } = await res.json()
  _token = access_token
  _tokenExpiry = Date.now() + (expires_in - 60) * 1000
  return _token
}

async function searchItems (token, keyword, itemCount) {
  const res = await fetch(`${API_BASE}/searchItems`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-marketplace': 'www.amazon.com.br'
    },
    body: JSON.stringify({
      keywords: keyword,
      searchIndex: 'All',
      partnerTag: PARTNER_TAG,
      partnerType: 'Associates',
      marketplace: 'www.amazon.com.br',
      itemCount: itemCount,
      resources: [
        'images.primary.large',
        'itemInfo.title',
        'offersV2'
      ]
    })
  })

  if (!res.ok) throw new Error(`SearchItems "${keyword}" ${res.status}: ${await res.text()}`)
  return res.json()
}

function mapItem (item) {
  // Creators API usa lowerCamelCase na resposta
  const asin = item.asin || item.ASIN || ''
  const title = (item.itemInfo && item.itemInfo.title && item.itemInfo.title.displayValue) || ''
  const imageUrl = (item.images && item.images.primary && item.images.primary.large && item.images.primary.large.url) || ''
  const detailUrl = item.detailPageUrl || item.detailPageURL || '#'

  // OffersV2 substitui Offers.Listings na Creators API
  const offersV2 = item.offersV2 || {}
  const listings = offersV2.listings || offersV2.items || []
  const firstListing = listings[0] || {}
  const price = (firstListing.price && firstListing.price.displayAmount) ||
                (offersV2.summary && offersV2.summary.lowestPrice && offersV2.summary.lowestPrice.displayAmount) || ''
  const originalPrice = (firstListing.savingBasis && firstListing.savingBasis.displayAmount) ||
                        (offersV2.summary && offersV2.summary.savingBasis && offersV2.summary.savingBasis.displayAmount) || null

  return {
    asin,
    href: detailUrl,
    image: imageUrl,
    alt: title,
    name: title,
    price,
    originalPrice,
    bannerEvent: `Amazon Banner Clicked - ${asin}`,
    buttonEvent: `Amazon Button Clicked - ${asin}`
  }
}

const KEYWORDS = require('./products-data')

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: RESPONSE_HEADERS, body: '' }
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return {
      statusCode: 200,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify({ products: [], source: 'static' })
    }
  }

  try {
    const token = await getAccessToken()

    // Busca todas as keywords em paralelo; falhas individuais não quebram o restante
    const results = await Promise.allSettled(
      KEYWORDS.map(({ keyword, itemCount }) => searchItems(token, keyword, itemCount))
    )

    const seenAsins = new Set()
    const products = results
      .filter(r => r.status === 'fulfilled')
      .flatMap(r => (r.value.searchResult && r.value.searchResult.items) || [])
      .map(mapItem)
      .filter(p => {
        if (!p.href || !p.image || !p.price) return false
        if (seenAsins.has(p.asin)) return false
        seenAsins.add(p.asin)
        return true
      })

    return {
      statusCode: 200,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify({ products, source: 'live' })
    }
  } catch (err) {
    console.error('[amazon-products]', err.message)
    return {
      statusCode: 200,
      headers: RESPONSE_HEADERS,
      body: JSON.stringify({ products: [], source: 'error', error: err.message })
    }
  }
}
