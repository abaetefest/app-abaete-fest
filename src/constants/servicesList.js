// import { acai } from './acai.js'
// import { bancos } from './bancos.js'
// import { hoteis } from './hoteis.js'
// import { churrascariasEspetarias } from './churrascariasEspetarias'
// import { pubRestaurante } from './pubRestaurante.js'
// import { hospitaisPostos } from './hospitaisPostos'
// import { sorveterias } from './sorveterias'
// import { farmacias } from './farmacias.js'
// import { pesca } from './artigosPesca.js'
// import { suplementosSaude } from './suplementosSaude.js'
import { agua } from './services/agua.js'
import { gas } from './services/gas.js'
import { maquiagem } from './services/maquiagem.js'

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
  ...agua,
  ...gas,
  ...maquiagem
]
