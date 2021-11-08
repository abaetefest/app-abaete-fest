<template>
  <div class="row justify-center">
      <div class="col-md-8 col-xs-12 col-sm-12">
        <q-carousel
          animated
          v-model="slide"
          control-color="primary"
          arrows
          infinite
          navigation-icon="radio_button_unchecked"
          :autoplay="true"
          :height="$q.screen.lt.sm ? '135px' : '300px'"
        >
          <q-carousel-slide :name="1" img-src="advertising/1.png" @click="goTo('https://www.instagram.com/p/CUaK16trdoC/')" />
          <q-carousel-slide :name="2" img-src="advertising/2.png" @click="goTo('https://wpe4bank.com/')" />
          <q-carousel-slide :name="3" img-src="advertising/ruanny_makeup.png" @click="goTo('https://www.instagram.com/ruanny_makeup/')" />
        </q-carousel>
      </div>
    </div>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'Publicity',
  data () {
    return {
      slide: 1
    }
  },
  methods: {
    goTo (url) {
      openURL(url)
    }
  }
}
</script>
