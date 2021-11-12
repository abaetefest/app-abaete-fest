<template>
  <q-page padding>
    <publicity />
    <p class="text-subtitle1 text-center text-primary text-bold text-uppercase">
      Qual o seu interesse para hoje ?
    </p>
    <div class="row q-col-gutter-md">
      <div
        class="col-sm-12 col-xs-12 col-md-6"
        v-for="(op, index) in opcoes"
        :key="index"
      >
        <q-card
          class="q-pa-xs cursor-pointer card-cursos-dashboard text-white"
          :class="`bg-${op.color}`"
          v-ripple:primary
          @click="goTo(op)"
        >
          <q-badge v-if="op.new" color="amber-8" floating >
            NOVO
          </q-badge>
          <q-card-section class="flex justify-between">
            <div class="flex column justify-center items-start text-black">
              <span class="text-h6">
                {{op.title}}
              </span>
              <span>
                {{ op.subtitle }}
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
  components: {
    publicity: () => import('components/Publicity')
  },
  data () {
    return {
      opcoes: [
        {
          title: 'Festas',
          icon: 'drink.png',
          route: 'events',
          type: 'parties',
          textColor: 'primary',
          color: 'white',
          subtitle: 'As melhores baladas, pubs e barzinhos'
        },
        {
          title: 'Carnaval',
          icon: 'carnival-mask.png',
          route: 'events',
          type: 'carnival',
          textColor: 'primary',
          color: 'white',
          subtitle: 'Programação dos blocos',
          new: true
        },
        {
          title: 'Cultural',
          icon: 'guitar.png',
          route: 'events',
          type: 'cultural',
          textColor: 'primary',
          color: 'white',
          subtitle: 'Conheça a cultura da cidade'
        },
        {
          title: 'Religiosos',
          icon: 'church.png',
          route: 'events',
          type: 'religious',
          textColor: 'primary',
          color: 'white',
          subtitle: 'Eventos voltados para religiosidadade'
        },
        {
          title: 'Esportivos',
          icon: 'sport.png',
          route: 'events',
          type: 'sports',
          textColor: 'primary',
          color: 'white',
          subtitle: 'Torneios e jogos para você participar'
        },
        {
          title: 'Geek',
          icon: 'geek.png',
          route: 'events',
          type: 'geek',
          textColor: 'primary',
          color: 'white',
          subtitle: 'Games, eventos e muito mais'
        },
        {
          title: 'Automotivo',
          icon: 'speaker.png',
          route: 'events',
          type: 'automotive',
          textColor: 'primary',
          color: 'white',
          subtitle: 'Carro, moto e som automotivo'
        },
        {
          title: 'Turísmo',
          icon: 'boat.png',
          route: 'events',
          type: 'tourism',
          textColor: 'primary',
          color: 'white',
          subtitle: 'Passeios, trilhas e eventos'
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
