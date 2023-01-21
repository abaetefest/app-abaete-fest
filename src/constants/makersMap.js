import { bancos } from './bancos.js'
import { hoteis } from './hoteis.js'
import { pubRestaurante } from './pubRestaurante.js'
import { farmacias } from './farmacias.js'

export const makers = [
  ...bancos,
  ...hoteis,
  ...pubRestaurante,
  ...farmacias
]
