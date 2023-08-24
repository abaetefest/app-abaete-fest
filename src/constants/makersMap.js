import { acai } from './acai.js'
import { bancos } from './bancos.js'
import { hoteis } from './hoteis.js'
import { churrascariasEspetarias } from './churrascariasEspetarias'
import { pubRestaurante } from './pubRestaurante.js'
import { hospitaisPostos } from './hospitaisPostos'
import { sorveterias } from './sorveterias'
import { farmacias } from './farmacias.js'
import { pesca } from './artigosPesca.js'
import { suplementosSaude } from './suplementosSaude.js'

export const makers = [
  ...acai,
  ...bancos,
  ...hoteis,
  ...churrascariasEspetarias,
  ...pubRestaurante,
  ...sorveterias,
  ...hospitaisPostos,
  ...farmacias,
  ...pesca,
  ...suplementosSaude
]
