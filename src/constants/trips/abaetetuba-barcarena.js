export default {
  cidade1: 'Abaetetuba',
  cidade2: 'Barcarena',
  empresas: [

    // Arapari Navegação
    {
      nome: 'Arapari Navegação',
      icon: 'trips/arapari.png',
      viagens: [
        {
          origem: 'Abaetetuba',
          destino: 'Barcarena',
          periodo: 'Segunda a Sábado',
          horarios: [
            {
              hora: '06:14',
              modalidade: 'Arapari',
              obs: 'Segunda a Sexta'
            },
            {
              hora: '07:30',
              modalidade: 'Arapari'
            },
            {
              hora: '11:30',
              modalidade: 'Arapari'
            },
            {
              hora: '18:00',
              modalidade: 'Arapari'
            }
          ]
        },
        {
          origem: 'Abaetetuba',
          destino: 'Barcarena',
          periodo: 'Domingos e Feriados',
          horarios: [
            {
              hora: '11:00',
              modalidade: 'Arapari'
            }
          ]
        },
        {
          origem: 'Barcarena',
          destino: 'Abaetetuba',
          periodo: 'Segunda a Sábado',
          horarios: [
            {
              hora: '06:00',
              modalidade: 'Arapari'
            },
            {
              hora: '07:30',
              modalidade: 'Arapari',
              obs: 'Segunda a Sexta'
            },
            {
              hora: '09:30',
              modalidade: 'Arapari'
            },
            {
              hora: '16:00',
              modalidade: 'Arapari'
            }
          ]
        },
        {
          origem: 'Barcarena',
          destino: 'Abaetetuba',
          periodo: 'Domingos e Feriados',
          horarios: [
            {
              hora: '07:00',
              modalidade: 'Arapari'
            }
          ]
        }
      ]
    }

  ]
}
