<template>
  <div class="row">
      <div class="col">
        <q-carousel
          animated
          v-model="slide"
          control-color="primary"
          arrows
          infinite
          navigation-icon="radio_button_unchecked"
          :autoplay="true"
          :height="$q.screen.lt.sm ? '150px' : '300px'"
        >
          <q-carousel-slide :name="1" img-src="advertising/1.png" @click="goTo('https://www.instagram.com/p/CUaK16trdoC/')" />
          <q-carousel-slide :name="2" img-src="advertising/2.png" @click="goTo('https://wpe4bank.com/')" />
          <q-carousel-slide :name="3" img-src="advertising/3.png" @click="goTo('https://abaetefest.com.br/')" />
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
