/**
 * Programação fixa do Carnaval (5 eventos: sexta a terça).
 * Usada na listagem de eventos e na página de detalhes (/event-details/:id).
 */
export const CARNIVAL_SCHEDULE_EVENTS = [
  {
    id: 'carnival-5',
    dia_semana: 'Terça-Feira',
    name: 'Queima Do Maracatu',
    start_date: '2025-02-17T16:00:00',
    location: 'Avenida Principal, Abaetetuba',
    image_url: '/carnaval/programacao-carnaval-5.1.jpg',
    category: 'carnival',
    description:
      '<p><b>PARA NÃO SE PERDER NA FOLIA: CONFIRA O HORÁRIO DE CADA ATRAÇÃO!</b> 📅🎊</p><p>O Carnaval de Abaetetuba preparou uma terça-feira intensa, do Bloco das Virgens até o amanhecer com Ju Márques. Salve este cronograma oficial e compartilhe com a sua galera!</p><p><b>🕒 PROGRAMAÇÃO EM ORDEM:</b></p><ul><li><p>16h00: Bloco das Virgens com Rodriguinho e Lolla</p></li><li><p>18h30: Reinaldinho (Pipoca da PMA)</p></li><li><p>19h00: Bloco Leões na Folia</p></li><li><p>19h30: Bloco GD8 na Folia</p></li><li><p>20h00: DJ Gigio Boy (Pipoca da PMA)</p></li><li><p>20h30: Bloco Carna Spa na Folia</p></li><li><p>20h45: Bloco Cuspe no Garoto</p></li><li><p>21h00: Bloco Rock das Equipes</p></li><li><p>21h30: Beto Farias e Banda (Pipoca da PMA)</p></li><li><p>22h00: Gaby Amarantos (Pipoca da PMA)</p></li><li><p>23h00: DJ Cesar Considerado (DJ na Folia)</p></li><li><p>23h30: DJ Gulliver (DJ na Folia)</p></li><li><p>00h00: FB Mania (Pipoca da PMA)</p></li><li><p>01h00: DJ Adriel da Mídia (DJ na Folia)</p></li><li><p>02h00: Ju Márques (Pipoca da PMA)</p></li></ul><p>Nos vemos no corredor da folia! 🚀✨</p><p><b>#CarnavalDeAbaetetuba #CronogramaCarnaval #GabyAmarantos #Abaetetuba #Carnaval2026 #Folia #Pará</b></p>'
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
