<template>
  <q-page padding class="bg-grey-1">
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
          class="q-pa-xs cursor-pointer card-cursos-dashboard text-white shadow-4"
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
import { menus } from 'src/constants/menus'
export default {
  name: 'PageIndex',
  components: {
    publicity: () => import('components/Publicity')
  },
  data () {
    return {
      opcoes: menus
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
