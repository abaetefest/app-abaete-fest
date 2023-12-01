export default {
  cidade1: 'Barcarena',
  cidade2: 'Belém',
  empresas: [
    // Arapari Navegação
    {
      nome: 'Arapari Navegação',
      icon: 'trips/arapari.png',
      viagens: [
        {
          origem: 'Barcarena',
          destino: 'Belém',
          periodo: 'Segunda a Sábado',
          horarios: [
            {
              hora: '06:25'
            },
            {
              hora: '10:10'
            },
            {
              hora: '12:10'
            },
            {
              hora: '15:15'
            },
            {
              hora: '17:10'
            },
            {
              hora: '19:20'
            }
          ]
        },
        {
          origem: 'Barcarena',
          destino: 'Belém',
          periodo: 'Domingos e Feriados',
          horarios: [
            {
              hora: '7:10'
            },
            {
              hora: '12:10'
            },
            {
              hora: '19:20'
            }
          ]
        },
        {
          origem: 'Belém',
          destino: 'Barcarena',
          periodo: 'Segunda a Sábado',
          horarios: [
            {
              hora: '06:40'
            },
            {
              hora: '10:00'
            },
            {
              hora: '12:00'
            },
            {
              hora: '15:00'
            },
            {
              hora: '19:10'
            }
          ]
        },
        {
          origem: 'Belém',
          destino: 'Barcarena',
          periodo: 'Domingos e Feriados',
          horarios: [
            {
              hora: '07:00'
            },
            {
              hora: '12:00'
            },
            {
              hora: '19:10'
            }
          ]
        }
      ]
    }
  ]
}
