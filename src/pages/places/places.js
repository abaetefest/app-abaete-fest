import { makers } from 'src/constants/places/index'
import { placesCategories } from 'src/constants/placesCategories'

export default {
  name: 'PlacesPage',
  components: {
    DialogPlaces: () => import('./components/DialogPlaces')
  },
  data() {
    return {
      places: makers,
      ratingModel: 3,
      categoria: 'Açaí',
      options: [...placesCategories],
      modalPlaces: false,
      placeDetails: {}
    }
  },
  computed: {
    getPlaces: function () {
      return makers.filter((place) => place.category === this.categoria)
    },
    getIconCategory: function () {
      const img = this.options.filter((opt) => opt.value === this.categoria)
      return img[0].icon
    }
  },
  mounted() {
    console.log(this.categoria)
  },
  methods: {
    openDialogCourse(place) {
      this.modalPlaces = true
      this.placeDetails = place
      this.$mixpanel.track(place.title)
    },
    closeModal() {
      this.modalPlaces = false
      this.placeDetails = {}
    }
  }
}
