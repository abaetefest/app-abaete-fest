import { TourismCard, TourismCardLarge, TourismFilters } from './components'
import DialogTourismDetails from './components/DialogTourismDetails'

export default {
  name: 'PageTourism',

  components: {
    TourismCard,
    TourismCardLarge,
    TourismFilters,
    DialogTourismDetails
  },

  data() {
    return {
      modalWelcomeTourism: true,
      filter: '',
      tourism: [],
      load: true,
      modalTourism: false,
      tourismDetails: {},
      viewMode: 'compact'
    }
  },

  computed: {
    filteredTourism() {
      if (!this.filter) return this.tourism

      const searchTerm = this.filter.toLowerCase()
      return this.tourism.filter(place => {
        return (
          place.name.toLowerCase().includes(searchTerm) ||
          (place.description && place.description.toLowerCase().includes(searchTerm)) ||
          (place.address && place.address.toLowerCase().includes(searchTerm))
        )
      })
    }
  },

  async mounted() {
    await this.listTourism()
  },

  methods: {
    async listTourism() {
      this.load = true
      try {
        const { data } = await this.$services.tourism().list()
        this.tourism = data.data
        this.load = false
      } catch (error) {
        this.load = false
        console.log(error)
      }
    },

    openDialogCourse(place) {
      this.modalTourism = true
      this.tourismDetails = place
      this.$mixpanel.track(place.name)
    },

    closeModal() {
      this.modalTourism = false
      this.tourismDetails = {}
    },

    onFilterChange(newFilter) {
      this.filter = newFilter
    },

    clearFilters() {
      this.filter = ''
    }
  }
}
