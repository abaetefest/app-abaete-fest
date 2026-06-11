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

  // v3.x (LwA) credentials: JSON body, client_id/secret no body, scope com "::"
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: 'creatorsapi::default'
    })
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
      marketplace: 'www.amazon.com.br',
      itemCount: itemCount,
      languagesOfPreference: ['pt_BR'],
      resources: [
        'images.primary.large',
        'itemInfo.title',
        'offersV2.listings.price'
      ]
    })
  })

  if (!res.ok) throw new Error(`SearchItems "${keyword}" ${res.status}: ${await res.text()}`)
  return res.json()
}

function mapItem (item) {
  const asin = item.asin || ''
  const title = (item.itemInfo && item.itemInfo.title && item.itemInfo.title.displayValue) || ''
  const imageUrl = (item.images && item.images.primary && item.images.primary.large && item.images.primary.large.url) || ''
  const detailUrl = item.detailPageURL || item.detailPageUrl || '#'

  const listings = (item.offersV2 && item.offersV2.listings) || []
  const listing = listings[0] || {}
  const priceObj = listing.price || {}

  const price = (priceObj.money && priceObj.money.displayAmount) || ''
  const originalPrice = (priceObj.savingBasis && priceObj.savingBasis.money && priceObj.savingBasis.money.displayAmount) || null

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
