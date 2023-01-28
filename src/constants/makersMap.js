import { bancos } from './bancos.js'
import { hoteis } from './hoteis.js'
import { pubRestaurante } from './pubRestaurante.js'
import { hospitaisPostos } from './hospitaisPostos'
import { farmacias } from './farmacias.js'
import { pesca } from './artigosPesca.js'

export const makers = [
  ...bancos,
  ...hoteis,
  ...pubRestaurante,
  ...hospitaisPostos,
  ...farmacias,
  ...pesca
]
