export default {
  cidade1: 'Abaetetuba',
  cidade2: 'Mãe do Rio',
  empresas: [
    // Transporte Barreto
    {
      nome: 'Transporte Barreto',
      icon: 'trips/transporte-barreto.png',
      viagens: [
        {
          origem: 'Abaetetuba',
          destino: 'Mãe do Rio',
          periodo: 'Segunda a Domingo',
          horarios: [
            {
              hora: '14:00'
            }
          ]
        },
        {
          origem: 'Mãe do Rio',
          destino: 'Abaetetuba',
          periodo: 'Segunda a Domingo',
          horarios: [
            {
              hora: '05:30'
            },
            {
              hora: '12:00'
            }
          ]
        }
      ]
    }
  ]
}
