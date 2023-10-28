export default {
  cidade1: 'Praça da Bandeira',
  cidade2: 'UFPA',
  empresas: [
    {
      nome: 'Ônibus Campus UFPA',
      icon: 'trips/transporte-barreto.png',
      viagens: [
        {
          origem: 'Praça da Bandeira',
          destino: 'UFPA',
          periodo: '',
          horarios: [
            {
              hora: '07:10'
            },
            {
              hora: '07:40'
            },
            {
              hora: '13:10'
            },
            {
              hora: '13:40'
            },
            {
              hora: '17:35'
            },
            {
              hora: '18:05'
            }
          ]
        },
        {
          origem: 'UFPA',
          destino: 'Praça da Bandeira',
          periodo: '',
          horarios: [
            {
              hora: '11:50'
            },
            {
              hora: '12:10'
            },
            {
              hora: '12:45'
            },
            {
              hora: '13:30'
            },
            {
              hora: '17:20'
            },
            {
              hora: '17:50'
            },
            {
              hora: '22:00'
            }
          ]
        }
      ]
    }
  ]
}
