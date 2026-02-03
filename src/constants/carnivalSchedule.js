/**
 * Programação fixa do Carnaval (5 eventos: sexta a terça).
 * Usada na listagem de eventos e na página de detalhes (/event-details/:id).
 */
export const CARNIVAL_SCHEDULE_EVENTS = [
  {
    id: 'carnival-1',
    dia_semana: 'Sexta-Feira',
    name: 'Abertura Oficial Do Carnaval',
    start_date: '2025-02-14T18:00:00',
    location: 'Avenida Principal, Abaetetuba',
    image_url: '/carnaval/programacao-carnaval-1.jpg',
    category: 'carnival',
    description: '<p><b>PREPARE O SEU ABADÁ, QUE A FOLIA VAI COMEÇAR!</b> 🥁🎊</p><p>A sexta-feira, dia 13 de fevereiro, marca o início oficial do nosso Carnaval com uma maratona de atrações para todos os gostos e idades. Confira o cronograma completo e não perca nenhum minuto dessa festa!</p><ul><li><p>14h às 18h – Banda Carlos Gomes no Terminal Rodoviário</p></li><li><p>18h – Abertura Oficial com Bloco da Inclusão, Banda Carlos Gomes e o tradicional Desfile do Rei Momo</p></li><li><p>19h – Bloco Carna Kids Algodoal</p></li><li><p>19h30 – Bloco Exclusive</p></li><li><p>20h – Bloco Fut Resenha</p></li><li><p>20h30 – DJ Adrian Pressão</p></li><li><p>21h – Circuito dos Bares na Folia</p></li><li><p>21h30 – Pipoca da PMA com Banda O Beijo Dela</p></li><li><p>21h45 – Bloco Rock das Equipes</p></li><li><p>22h – Bloquinho da Rainha</p></li><li><p>22h30 – DJ Douglas Pressão</p></li><li><p>23h – Bloco Tubarão Evolution</p></li><li><p>00h – Dany Antunes</p></li><li><p>01h – DJ Jorginho o Referência</p></li><li><p>02h – Carol Lyne</p></li></ul><p>Chame sua galera e venha viver a energia do melhor Carnaval da região! 🚀🔥</p><p><b>#Carnaval2026 #Abaetetuba #Folia #AberturaOficial #BlocosDeRua #PipocaDaPMA #ProgramaçãoCarnaval</b></p>'
  },
  {
    id: 'carnival-2',
    dia_semana: 'Sábado',
    name: 'Desfile Das Escolas De Samba',
    start_date: '2025-02-15T19:30:00',
    location: 'Avenida Principal, Abaetetuba',
    image_url: '/carnaval/programacao-carnaval-2.jpg',
    category: 'carnival',
    description: '<p><b>PREPARE O FÔLEGO, PORQUE O SÁBADO DE CARNAVAL VAI SER HISTÓRICO!</b> 🥁🔥</p><p>No dia 14 de fevereiro, a programação está repleta de blocos e atrações de peso para sacudir a cidade. Confira os horários e organize seu roteiro para não perder nada:</p><ul><li><p>19h30 – Bloco Farofa da Elite</p></li><li><p>20h – Bloco Pegou Pegou</p></li><li><p>20h15 – Bloco Taça de Prata</p></li><li><p>20h30 – Bloco Carna Spa na Folia</p></li><li><p>20h45 – Bloco Vagabundos do Trampo na Folia</p></li><li><p>21h – Banda Styllus Show</p></li><li><p>21h15 – Blocos Lobos na Folia</p></li><li><p>21h30 – Bloco Pé na Cova</p></li><li><p>21h45 – DJ Alanzinho</p></li><li><p>22h – Bloco Coração na Folia</p></li><li><p>22h30 – Bloco Cuspe no Garoto</p></li><li><p>23h – CARABAO (O Furioso!)</p></li><li><p>00h – DJ Breno Incomparável</p></li><li><p>01h – DJ Dinho Mix</p></li><li><p>02h – MANU BATIDÃO</p></li></ul><p>Junte sua turma, vista sua fantasia e venha para a avenida! A energia de Abaetetuba espera por você. 🚀✨</p><p><b>#Carnaval2026 #Abaetetuba #ManuBatidão #Carabao #SábadoDeCarnaval #BlocosDeRua #Folia #StyllusShow</b></p>'
  },
  {
    id: 'carnival-3',
    dia_semana: 'Domingo',
    name: 'Bloco Dos Sujos',
    start_date: '2025-02-16T16:00:00',
    location: 'Avenida Principal, Abaetetuba',
    image_url: '/carnaval/programacao-carnaval-3.jpg',
    category: 'carnival',
    description: '<p><b>PREPARE O CORAÇÃO, PORQUE O DOMINGO DE CARNAVAL VAI SER SURREAL!</b> 🌈🔥</p><p>No dia 15 de fevereiro, a folia em Abaetetuba atinge o nível máximo com uma programação que vai da tarde até o amanhecer. Confira o roteiro completo dos blocos e as atrações imperdíveis na Pipoca da PMA:</p><ul><li><p>16h – Gaymada Dela, na Lauro Sodré</p></li><li><p>16h30 – Bloquinho da Lolô</p></li><li><p>17h – Pipoca Kids PMA (Diversão para os pequenos!)</p></li><li><p>17h30 – Bloco Os Cachaceiros</p></li><li><p>17h45 – Bloco Fome de Bola</p></li><li><p>18h – Bloco Pânico para Recordar</p></li><li><p>18h15 – Bloco Me Leva</p></li><li><p>18h30 – Bloco Capitão na Folia</p></li><li><p>18h45 – Bloco Travanca Boa na Folia</p></li><li><p>19h às 21h30 – Diversos blocos incluindo The Confra, Chora Corno, Os Piratas, Já que Escorregou Deixa e Leões na Folia</p></li><li><p>21h – DJ Rafael Sampler</p></li><li><p>22h – LUÍSA SONZA (A braba chegou!)</p></li><li><p>23h30 – DJ Mikael Considerado</p></li><li><p>01h – DJ Vix Beat</p></li><li><p>02h – MATHEUS FERNANDES (Para fechar com chave de ouro!)</p></li></ul><p>Abaetetuba vai tremer com esse line-up de milhões! Marque aqui aquela pessoa que não pode perder o show da Luísa Sonza por nada. 👇🗣️</p><p><b>#Carnaval2026 #Abaetetuba #LuísaSonza #MatheusFernandes #DomingoDeCarnaval #PipocaDaPMA #Folia #AbaetetubaNaFolia</b></p>'
  },
  {
    id: 'carnival-4',
    dia_semana: 'Segunda-Feira',
    name: 'Baile De Máscaras',
    start_date: '2025-02-17T16:00:00',
    location: 'Avenida Principal, Abaetetuba',
    image_url: '/carnaval/programacao-carnaval-4.jpg',
    category: 'carnival',
    description: '<p><b>A SEGUNDA-FEIRA MAIS AGITADA DO ANO CHEGOU!</b> 🥁🔥</p><p>No dia 16 de fevereiro, o Carnaval de Abaetetuba continua com força total e uma programação que vai fazer história. Tem blocos tradicionais, pagode, sofrência e o melhor do axé para ninguém ficar parado! Confira o cronograma:</p><ul><li><p>16h – Bloco Kanto Nu Xadrez com Styllus Show</p></li><li><p>19h – Bloco Pikasso</p></li><li><p>19h30 – Bloco Exclusive</p></li><li><p>20h – DJ Rodrigo Moraes</p></li><li><p>20h30 – NOSSO TOM</p></li><li><p>21h – Bloco Lobos na Folia</p></li><li><p>21h30 – DJ Bilo Batidão</p></li><li><p>22h – Bloco Pegou Pegou</p></li><li><p>22h30 – Allanzinho</p></li><li><p>23h – MARÍLIA TAVARES</p></li><li><p>23h30 – Bloco Tubarão Evolution</p></li><li><p>00h – DJ Adê</p></li><li><p>01h – FRUTO SENSUAL</p></li><li><p>02h – CHICLETE COM BANANA</p></li></ul><p>Prepare sua energia, chame os amigos e venha para a avenida viver essa emoção! 🚀✨</p><p><b>#Carnaval2026 #Abaetetuba #ChicleteComBanana #MaríliaTavares #NossoTom #FrutoSensual #Folia #SegundaDeCarnaval</b></p>'
  },
  {
    id: 'carnival-5',
    dia_semana: 'Terça-Feira',
    name: 'Encerramento – Queima Do Maracatu',
    start_date: '2025-02-18T16:00:00',
    location: 'Avenida Principal, Abaetetuba',
    image_url: '/carnaval/programacao-carnaval-5.jpg',
    category: 'carnival',
    description: '<p><b>🎊 ÚLTIMO DIA: CARNAVAL DE ABAETETUBA (17 FEV)</b></p><p>O encerramento que a nossa cidade merece! Confira a programação oficial para esta terça-feira de folia:</p><ul><li><p>16h – Bloco das Virgens com Rodriguinho e Lolla</p></li><li><p>19h00 – Bloco Leões na folia</p></li><li><p>19h30 – Bloco GD8 na Folia</p></li><li><p>20h – DJ Gigio Boy</p></li><li><p>20h30 – Bloco Carna Spa na Folia</p></li><li><p>20h45 – Bloco Cuspe no Garoto</p></li><li><p>21h – Bloco Rock das Equipes</p></li><li><p>21h30 – Beto Farias e Banda</p></li><li><p>22h – DJ Cesar Considerado</p></li><li><p>23h – Ju Márques</p></li><li><p>23h30 – DJ Gulliver</p></li><li><p>00h – FB Mania</p></li><li><p>01h – DJ Adriel da Mídia</p></li><li><p>02h – Gaby Amarantos</p></li></ul><p>Prepare a sua fantasia e venha viver cada segundo desse encerramento histórico! 🚀🔥</p><p><b>#Carnaval2026 #Abaetetuba #GabyAmarantos #BlocoDasVirgens #Folia #TerçaDeCarnaval #ProgramaçãoCarnaval</b></p>'
  }
]

/**
 * Retorna o evento fixo do carnaval pelo id, ou undefined.
 * @param {string} id - Ex: 'carnival-1', 'carnival-2', ...
 */
export function getCarnivalEventById(id) {
  return CARNIVAL_SCHEDULE_EVENTS.find(e => e.id === id)
}
