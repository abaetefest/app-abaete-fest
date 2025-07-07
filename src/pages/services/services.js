import { servicesList } from 'src/constants/services/index'

export default {
  name: 'ServicesPage',
  data() {
    return {
      services: servicesList,
      ratingModel: 3,
      categoria: 'arCondicionado',
      options: [
        {
          label: 'Água Mineral',
          value: 'agua',
          icon: 'flat/water-bottle.png'
        },
        {
          label: 'Ar condicionado e Refrigeração',
          value: 'arCondicionado',
          icon: 'flat/air-conditioner.png'
        },
        {
          label: 'Chaveiro',
          value: 'chaveiro',
          icon: 'flat/key-chain.png'
        },
        {
          label: 'DJ para eventos',
          value: 'dj',
          icon: 'flat/dj.png'
        },
        {
          label: 'Fotógrafo',
          value: 'fotografo',
          icon: 'flat/camera.png'
        },
        {
          label: 'Gás de cozinha',
          value: 'gas',
          icon: 'flat/gas.png'
        },
        {
          label: 'Guincho e Auto Socorro',
          value: 'guincho',
          icon: 'flat/tow-truck.png'
        },
        {
          label: 'Manicure',
          value: 'manicure',
          icon: 'flat/nail-polish.png'
        },
        {
          label: 'Maquiagem',
          value: 'maquiagem',
          icon: 'flat/cosmetics.png'
        },
        {
          label: 'Pedreiro',
          value: 'pedreiro',
          icon: 'flat/worker.png'
        },
        {
          label: 'Produção Audiovisual/Design',
          value: 'audioVisual',
          icon: 'flat/brochure.png'
        }
      ]
    }
  },
  computed: {
    getPlaces: function () {
      return servicesList.filter((place) => place.category === this.categoria)
    },
    getIconCategory: function () {
      const img = this.options.filter((opt) => opt.value === this.categoria)
      return img[0].icon
    }
  },
  methods: {
    trackEventMixpanel(serviceInfo) {
      this.$mixpanel.track(`service(${serviceInfo.name})`)
    }
  }
}
