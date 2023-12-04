import { agua } from './services/agua.js'
import { arCondicionado } from './services/arCondicionado.js'
import { gas } from './services/gas.js'
import { maquiagem } from './services/maquiagem.js'
import { audioVisual } from './services/audioVisual.js'
import { chaveiro } from './services/chaveiro.js'
import { dj } from './services/dj.js'
import { fotografo } from './services/fotografo.js'
import { pedreiro } from './services/pedreiro.js'
import { manicure } from './services/manicure.js'

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
  ...manicure
]
