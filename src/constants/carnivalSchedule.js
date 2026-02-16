/**
 * Programação fixa do Carnaval (5 eventos: sexta a terça).
 * Usada na listagem de eventos e na página de detalhes (/event-details/:id).
 */
export const CARNIVAL_SCHEDULE_EVENTS = [
  {
    id: 'carnival-4',
    dia_semana: 'Segunda-Feira',
    name: 'Baile De Máscaras',
    start_date: '2025-02-16T16:00:00',
    location: 'Avenida Principal, Abaetetuba',
    image_url: '/carnaval/programacao-carnaval-4.1.jpg',
    category: 'carnival',
    description:
      '<p><b>A SEGUNDA-FEIRA MAIS AGITADA DO ANO CHEGOU!</b> 🥁🔥</p><p>No dia 16 de fevereiro, o Carnaval de Abaetetuba continua com força total e uma programação que vai fazer história. Tem blocos tradicionais, pagode, sofrência e o melhor do axé para ninguém ficar parado! Confira o cronograma:</p><ul><li><p>16h – Bloco Kanto Nu Xadrez com Styllus Show</p></li><li><p>19h – Bloco Pikasso</p></li><li><p>19h30 – Bloco Exclusive</p></li><li><p>20h – DJ Rodrigo Moraes</p></li><li><p>20h30 – NOSSO TOM</p></li><li><p>21h – Bloco Lobos na Folia</p></li><li><p>21h30 – DJ Bilo Batidão</p></li><li><p>22h – Bloco Pegou Pegou</p></li><li><p>22h30 – Allanzinho</p></li><li><p>23h – MARÍLIA TAVARES</p></li><li><p>23h30 – Bloco Tubarão Evolution</p></li><li><p>00h – DJ Adê</p></li><li><p>01h – FRUTO SENSUAL</p></li><li><p>02h – Zaynara</p></li></ul><p>Prepare sua energia, chame os amigos e venha para a avenida viver essa emoção! 🚀✨</p><p><b>#Carnaval2026 #Abaetetuba #ChicleteComBanana #MaríliaTavares #NossoTom #FrutoSensual #Folia #SegundaDeCarnaval</b></p>'
  },
  {
    id: 'carnival-5',
    dia_semana: 'Terça-Feira',
    name: 'Queima Do Maracatu',
    start_date: '2025-02-17T16:00:00',
    location: 'Avenida Principal, Abaetetuba',
    image_url: '/carnaval/programacao-carnaval-5.jpg',
    category: 'carnival',
    description:
      '<p><b>🎊 TERÇA-FEIRA DE FOLIA: CARNAVAL DE ABAETETUBA (17 FEV)</b></p><p>Confira a programação oficial para esta terça-feira de folia:</p><ul><li><p>16h – Bloco das Virgens com Rodriguinho e Lolla</p></li><li><p>19h00 – Bloco Leões na folia</p></li><li><p>19h30 – Bloco GD8 na Folia</p></li><li><p>20h – DJ Gigio Boy</p></li><li><p>20h30 – Bloco Carna Spa na Folia</p></li><li><p>20h45 – Bloco Cuspe no Garoto</p></li><li><p>21h – Bloco Rock das Equipes</p></li><li><p>21h30 – Beto Farias e Banda</p></li><li><p>22h – DJ Cesar Considerado</p></li><li><p>23h – Ju Márques</p></li><li><p>23h30 – DJ Gulliver</p></li><li><p>00h – FB Mania</p></li><li><p>01h – DJ Adriel da Mídia</p></li><li><p>02h – Gaby Amarantos</p></li></ul><p>Prepare a sua fantasia e venha viver cada segundo dessa folia histórica! 🚀🔥</p><p><b>#Carnaval2026 #Abaetetuba #GabyAmarantos #BlocoDasVirgens #Folia #TerçaDeCarnaval #ProgramaçãoCarnaval</b></p>'
  },
  {
    id: 'carnival-6',
    dia_semana: 'Quarta-Feira',
    name: 'Encerramento – Léo Foguete',
    start_date: '2025-02-18T21:00:00',
    location: 'Avenida Principal, Abaetetuba',
    image_url: '/carnaval/programacao-carnaval-6.jpg',
    category: 'carnival',
    description:
      '<p><b>QUEM DISSE QUE A FOLIA ACABOU? O CARNAVAL DE ABAETETUBA SÓ PARA NO TOPO!</b> 🚀✨</p><p>Prepare o coração e a energia, porque temos mais um dia de festa confirmado! Na Quarta-feira de Cinzas, 18 de fevereiro, o palco do Carnaval de Abaetetuba recebe uma nova atração para fechar as festividades com chave de ouro: LÉO FOGUETE!</p><p><b>🌟 O ENCONTRO MARCADO:</b></p><ul><li><p>🎤 Atração: Léo Foguete</p></li><li><p>🕙 Horário: A partir das 21h</p></li><li><p>📍 Onde: Carnaval de Abaetetuba - Onde todo mundo se encontra!</p></li></ul><p>Se for para se despedir, que seja em alto nível! Venha viver esse momento extra de alegria no maior e melhor carnaval da região. Realização: Prefeitura Municipal de Abaetetuba.</p><p><b>#CarnavalDeAbaetetuba #LéoFoguete #QuartaDeCinzas #Abaetetuba #Carnaval2026 #Folia #DespedidaEmAltoNível</b></p>'
  }
]

/**
 * Retorna o evento fixo do carnaval pelo id, ou undefined.
 * @param {string} id - Ex: 'carnival-1', 'carnival-2', ...
 */
export function getCarnivalEventById(id) {
  return CARNIVAL_SCHEDULE_EVENTS.find((e) => e.id === id)
}
