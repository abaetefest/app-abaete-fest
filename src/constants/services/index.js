import { agua } from './agua.js'
import { arCondicionado } from './arCondicionado.js'
import { gas } from './gas.js'
import { maquiagem } from './maquiagem.js'
import { audioVisual } from './audioVisual.js'
import { chaveiro } from './chaveiro.js'
import { dj } from './dj.js'
import { fotografo } from './fotografo.js'
import { pedreiro } from './pedreiro.js'
import { manicure } from './manicure.js'
import { guincho } from './guincho.js'

// Água(Garrafão)
// Ar condicionado
// Caminhão de mudança(frete)
// Chaveiro
// Diarista
// Dj de festa
// Eletricista
// Encanandor
// Gás
// Pedreiro
// Manicure
// Maquiagem
// Manutenção de computadores
// Montador de Móveis
// Moto-taxi
// Taxista

export const servicesList = [
  ...arCondicionado,
  ...agua,
  ...audioVisual,
  ...chaveiro,
  ...dj,
  ...gas,
  ...maquiagem,
  ...fotografo,
  ...pedreiro,
  ...manicure,
  ...guincho
]
