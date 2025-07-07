import L from 'leaflet'
import { makers } from 'src/constants/places/index'
import { placesCategories } from 'src/constants/placesCategories'

export default {
  name: 'MapPage',
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 13,
      center: [],
      ready: false,
      makers: makers,
      makersMap: makers,
      categoria: 'Todas',
      icon: L.icon({
        iconUrl: 'map-icon/barbudos.png',
        iconSize: [50, 50],
        iconAnchor: [16, 37]
      }),
      options: [
        {
          label: 'Todas',
          value: 'Todas',
          icon: 'flat/all.png'
        },
        ...placesCategories
      ],
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },
  mounted() {
    this.setPosition()
  },
  computed: {
    getIconCategory() {
      const img = this.options.filter((opt) => opt.value === this.categoria)
      return img[0].icon
    }
  },
  methods: {
    async setPosition() {
      this.center = [-1.7282768, -48.8749289]
      this.ready = true
    },
    errorPosition() {
      this.$q.notify({
        position: 'bottom',
        timeout: 3000,
        color: 'negative',
        textColor: 'white',
        actions: [{ icon: 'close', color: 'white' }],
        message: 'Não foi possível recupera sua posição!'
      })
      this.$q.loading.hide()
    },
    successNotify() {
      this.$q.notify({
        position: 'bottom',
        timeout: 3000,
        color: 'positive',
        textColor: 'white',
        actions: [{ icon: 'check', color: 'white' }],
        message: 'Localização recuperada com sucesso!'
      })
    },
    showDialog(m, idx) {
      this.infoWindowPos = {
        lat: parseFloat(m.latitude),
        lng: parseFloat(m.longitude)
      }

      this.infoOptions.content = `
      <div>
        <strong class="text-h6" style="color: black">${m.title}</strong> <br>
        <span class="text-body1 text-weight-medium" style="color: black">${m.address}</span> <br>
        <span class="text-body1 text-weight-medium" style="color: black">${m.phone ? m.phone : ''}</span> <br>
      </div>
      `

      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    getIcon(icon) {
      return `${icon}`
    },
    async setFilterMap() {
      this.ready = false
      if (this.categoria === 'Todas') {
        this.makersMap = makers
      } else {
        this.makersMap = makers.filter((mk) => mk.category === this.categoria)
      }
      setTimeout(() => {
        this.ready = true
      }, 300)
    }
  }
}
