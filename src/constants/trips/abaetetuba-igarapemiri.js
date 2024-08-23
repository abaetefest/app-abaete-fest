export default {
  cidade1: 'Abaetetuba',
  cidade2: 'Igarapé-Miri',
  empresas: [
    // Jarumã
    {
      nome: 'Jarumã',
      icon: 'trips/jaruma.png',
      viagens: [
        {
          origem: 'Abaetetuba',
          destino: 'Igarapé-Miri',
          periodo: 'Segunda a Sábado',
          horarios: [
            {
              hora: '07:00'
            },
            {
              hora: '09:00'
            },
            {
              hora: '11:30'
            },
            {
              hora: '17:00'
            }
          ]
        },
        {
          origem: 'Igarapé-Miri',
          destino: 'Abaetetuba',
          periodo: 'Segunda a Sábado',
          horarios: [
            {
              hora: '06:00'
            },
            {
              hora: '08:00'
            },
            {
              hora: '10:00'
            },
            {
              hora: '15:00'
            }
          ]
        }
      ]
    },
    // Cootrampa
    {
      nome: 'Cootrampa',
      icon: 'trips/cootrampa.png',
      viagens: [
        {
          origem: 'Abaetetuba',
          destino: 'Igarapé-Miri',
          periodo: 'Segunda a Sábado',
          horarios: [
            {
              hora: '06:30'
            },
            {
              hora: '07:30'
            },
            {
              hora: '09:30'
            },
            {
              hora: '12:30',

              obs: 'Segunda a Sexta'
            },
            {
              hora: '18:00'
            }
          ]
        },
        {
          origem: 'Igarapé-Miri',
          destino: 'Abaetetuba',
          periodo: 'Segunda a Sábado',
          horarios: [
            {
              hora: '05:00'
            },
            {
              hora: '05:30'
            },
            {
              hora: '08:30'
            },
            {
              hora: '10:30'
            },
            {
              hora: '12:00'
            }
          ]
        }
      ]
    },
    // Cootransbat-tur
    {
      nome: 'Cootransbat-Tur',
      icon: 'trips/cootransbar-tur.png',
      viagens: [
        {
          origem: 'Abaetetuba',
          destino: 'Igarapé-Miri',
          periodo: 'Segunda a Sábado',
          horarios: [
            {
              hora: '06:00'
            },
            {
              hora: '08:00'
            },
            {
              hora: '10:00'
            },
            {
              hora: '11:00'
            },
            {
              hora: '12:00'
            },
            {
              hora: '13:00'
            },
            {
              hora: '14:00'
            },
            {
              hora: '15:00'
            },
            {
              hora: '16:00'
            }
          ]
        },
        {
          origem: 'Abaetetuba',
          destino: 'Igarapé-Miri',
          periodo: 'Domingos e Feriados',
          horarios: [
            {
              hora: '08:00'
            },
            {
              hora: '10:00'
            },
            {
              hora: '11:00'
            },

            {
              hora: '13:00'
            },
            {
              hora: '16:00'
            }
          ]
        }
      ]
    }
  ]
}
