import { acai } from './acai.js'
import { pesca } from './artigosPesca.js'
import { bancos } from './bancos.js'
import { comidasRegionais } from './comidasRegionais.js'
import { churrascariasEspetarias } from './churrascariasEspetarias.js'
import { farmacias } from './farmacias.js'
import { hoteis } from './hoteis.js'
import { hospitaisPostos } from './hospitaisPostos.js'
import { igrejasCatolicas } from './igrejasCatolicas.js'
import { igrejasEvangelicas } from './igrejasEvangelicas.js'
import { lanchonetes } from './lanchonetes.js'
import { pubRestaurante } from './pubRestaurante.js'
import { sorveterias } from './sorveterias.js'
import { suplementosSaude } from './suplementosSaude.js'

export const makers = [
  ...acai,
  ...bancos,
  ...comidasRegionais,
  ...churrascariasEspetarias,
  ...farmacias,
  ...hoteis,
  ...hospitaisPostos,
  ...igrejasCatolicas,
  ...igrejasEvangelicas,
  ...lanchonetes,
  ...pesca,
  ...pubRestaurante,
  ...sorveterias,
  ...suplementosSaude
]
