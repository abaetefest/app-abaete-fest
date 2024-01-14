import { acai } from './acai.js'
import { pesca } from './artigosPesca.js'
import { bancos } from './bancos.js'
import { churrascariasEspetarias } from './churrascariasEspetarias.js'
import { farmacias } from './farmacias.js'
import { hoteis } from './hoteis.js'
import { hospitaisPostos } from './hospitaisPostos.js'
import { igrejasCatolicas } from './igrejasCatolicas.js'
import { igrejasEvangelicas } from './igrejasEvangelicas.js'
import { pubRestaurante } from './pubRestaurante.js'
import { sorveterias } from './sorveterias.js'
import { suplementosSaude } from './suplementosSaude.js'

export const makers = [
  ...acai,
  ...bancos,
  ...churrascariasEspetarias,
  ...farmacias,
  ...hoteis,
  ...hospitaisPostos,
  ...igrejasCatolicas,
  ...igrejasEvangelicas,
  ...pesca,
  ...pubRestaurante,
  ...sorveterias,
  ...suplementosSaude
]
