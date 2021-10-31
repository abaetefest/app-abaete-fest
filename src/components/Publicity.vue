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
          :autoplay="3000"
          :height="$q.screen.lt.sm ? '150px' : '300px'"
        >
          <q-carousel-slide :name="1" img-src="advertising/1.jpg" @click="goTo" />
          <q-carousel-slide :name="2" img-src="advertising/2.jpg" @click="goTo" />
          <q-carousel-slide :name="3" img-src="advertising/3.jpg" @click="goTo" />
        </q-carousel>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Publicity',
  data () {
    return {
      slide: 1
    }
  },
  methods: {
    goTo () {
    }
  }
}
</script>
