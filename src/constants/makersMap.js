import { bancos } from './bancos.js'
import { hoteis } from './hoteis.js'
import { churrascariasEspetarias } from './churrascariasEspetarias'
import { pubRestaurante } from './pubRestaurante.js'
import { hospitaisPostos } from './hospitaisPostos'
import { sorveterias } from './sorveterias'
import { farmacias } from './farmacias.js'
import { pesca } from './artigosPesca.js'

export const makers = [
  ...bancos,
  ...hoteis,
  ...churrascariasEspetarias,
  ...pubRestaurante,
  ...sorveterias,
  ...hospitaisPostos,
  ...farmacias,
  ...pesca
]
