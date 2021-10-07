<template>
  <q-page padding>
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
              <!-- <q-icon :name="op.icon" :color="op.textColor" size="2.5rem" /> -->
              <!-- <span
                class="text-subtitle2 text-primary text-weight-medium"
                :class="`text-${op.textColor}`"
              >
                {{ op.title }}
              </span> -->
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
      opcoes: [
        {
          title: 'Festas',
          icon: 'drink.png',
          route: 'events',
          type: 'party',
          textColor: 'primary',
          color: 'white'
        },
        {
          title: 'Cultural',
          icon: 'guitar.png',
          route: 'events',
          type: 'culture',
          textColor: 'primary',
          color: 'white'
        },
        {
          title: 'Religiosos',
          icon: 'church.png',
          route: 'events',
          type: 'religion',
          textColor: 'primary',
          color: 'white'
        },
        {
          title: 'Esportivos',
          icon: 'sport.png',
          route: 'events',
          type: 'sport',
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
