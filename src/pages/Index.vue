<template>
  <q-page padding>
    <div class="row">
      <div class="col">
        <q-carousel
          animated
          v-model="slide"
          infinite
          autoplay="1500"
          height="150px"
        >
          <q-carousel-slide :name="1" img-src="advertising/1.jpg" />
          <q-carousel-slide :name="2" img-src="advertising/2.jpg" />
          <q-carousel-slide :name="3" img-src="advertising/3.jpg" />
        </q-carousel>
      </div>
    </div>
    <p class="text-subtitle1 text-center text-primary text-bold text-uppercase">
      O que temos para hoje ?
    </p>
    <div class="row q-col-gutter-md">
      <div
        class="col-sm-12 col-xs-12 col-md-4"
        v-for="(op, index) in opcoes"
        :key="index"
      >
        <q-card
          class="q-pa-xs cursor-pointer card-cursos-dashboard text-white"
          :class="`bg-${op.color}`"
          v-ripple:primary
          @click="goTo(op)"
        >
          <q-card-section class="flex justify-between">
            <div class="flex column justify-center items-start text-black">
              <span class="text-h6">
                {{op.title}}
              </span>
              <span>
                Conheça os melhores eventos da região
              </span>
            </div>
            <div class="flex column justify-center items-end">
              <q-icon :name="`img:flat/${op.icon}`" size="2.5rem" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      slide: 1,
      opcoes: [
        {
          title: 'Festas',
          icon: 'drink.png',
          route: 'events',
          type: 'parties',
          textColor: 'primary',
          color: 'white'
        },
        {
          title: 'Cultural',
          icon: 'guitar.png',
          route: 'events',
          type: 'cultural',
          textColor: 'primary',
          color: 'white'
        },
        {
          title: 'Religiosos',
          icon: 'church.png',
          route: 'events',
          type: 'religious',
          textColor: 'primary',
          color: 'white'
        },
        {
          title: 'Esportivos',
          icon: 'sport.png',
          route: 'events',
          type: 'sports',
          textColor: 'primary',
          color: 'white'
        },
        {
          title: 'Geek',
          icon: 'geek.png',
          route: 'events',
          type: 'geek',
          textColor: 'primary',
          color: 'white'
        },
        {
          title: 'Turísmo',
          icon: 'boat.png',
          route: 'events',
          type: 'tourism',
          textColor: 'primary',
          color: 'white'
        }
      ]
    }
  },
  methods: {
    // goToLink (link) {
    //   openURL(link)
    // },
    goTo (menu) {
      this.$router.push({ name: menu.route, params: { type: menu.type } })
    },
    hideDialog () {
      this.dialog = false
    }
  }
}
</script>
