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
              hora: '06:15',

              obs: 'Segunda a Sexta'
            },
            {
              hora: '07:30'
            },
            {
              hora: '11:30'
            },
            {
              hora: '18:00'
            }
          ]
        },
        {
          origem: 'Abaetetuba',
          destino: 'Barcarena',
          periodo: 'Domingos e Feriados',
          horarios: [
            {
              hora: '11:00'
            }
          ]
        },
        {
          origem: 'Barcarena',
          destino: 'Abaetetuba',
          periodo: 'Segunda a Sábado',
          horarios: [
            {
              hora: '06:00'
            },
            {
              hora: '07:30',
              obs: 'Segunda a Sexta'
            },
            {
              hora: '09:30'
            },
            {
              hora: '16:00'
            }
          ]
        },
        {
          origem: 'Barcarena',
          destino: 'Abaetetuba',
          periodo: 'Domingos e Feriados',
          horarios: [
            {
              hora: '07:00'
            }
          ]
        }
      ]
    }
  ]
}
