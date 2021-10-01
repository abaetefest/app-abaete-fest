<template>
  <q-page padding>
    <div class="row q-col-gutter-sm justify-center q-pb-md">
      <div class="col-xs-12 col-sm-12 col-md-6">

        <q-img class="rounded-borders cursor-pointer" src="banner_tecnologia.jpg" :ratio="19/4" @click="goTo('events')" />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6">
        <q-img class="rounded-borders" src="banner_marketing.jpg" :ratio="19/4" @click="goTo('events')" />
      </div>
    </div>
    <p class="text-h6 text-center text-primary text-bold text-uppercase">
      Escolha o tipo de evento
    </p>
    <div class="row q-col-gutter-md q-pt-xs">
      <div class="col-sm-6 col-xs-6 col-md-3" v-for="(op, index) in opcoes" :key="index">
        <q-card
          class="q-pa-xs cursor-pointer card-cursos-dashboard text-white"
          :class="`bg-${op.color}`"
          v-ripple:primary @click="goTo(op)">
          <q-card-section class="text-center q-pt-lg">
            <q-icon :name="op.icon" :color="op.textColor"  size="2.5rem"/>
            <p class="text-subtitle2 text-primary text-weight-medium" :class="`text-${op.textColor}`">
              {{ op.title }}
            </p>
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
          icon: 'mdi-glass-cocktail',
          route: 'events',
          type: 'party',
          textColor: 'white',
          color: 'primary'
        },
        {
          title: 'Cultural',
          icon: 'mdi-guitar-acoustic',
          route: 'events',
          type: 'culture',
          textColor: 'white',
          color: 'primary'
        },
        {
          title: 'Religiosos',
          icon: 'mdi-church',
          route: 'events',
          type: 'religion',
          textColor: 'white',
          color: 'primary'
        },
        {
          title: 'Esportivos',
          icon: 'mdi-soccer',
          route: 'events',
          type: 'sport',
          textColor: 'white',
          color: 'primary'
        },
        {
          title: 'Geek',
          icon: 'mdi-pokeball',
          route: 'events',
          type: 'geek',
          textColor: 'white',
          color: 'primary'
        },
        {
          title: 'Turísmo',
          icon: 'mdi-ferry',
          route: 'events',
          type: 'tourism',
          textColor: 'white',
          color: 'primary'
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
