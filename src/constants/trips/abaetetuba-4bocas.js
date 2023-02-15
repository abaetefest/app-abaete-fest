export default {
  cidade1: 'Abaetetuba',
  cidade2: '4 Bocas',
  empresas: [
    // Transporte Barreto
    {
      nome: 'Transporte Barreto',
      icon: 'trips/transporte-barreto.png',
      viagens: [
        {
          origem: 'Abaetetuba',
          destino: '4 Bocas',
          periodo: 'Segunda a Domingo',
          horarios: [
            {
              hora: '07:45'
            }
          ]
        },
        {
          origem: '4 Bocas',
          destino: 'Abaetetuba',
          periodo: 'Segunda a Sábado',
          horarios: [
            {
              hora: '08:00'
            },
            {
              hora: '15:00'
            }
          ]
        }
      ]
    }
  ]
}
