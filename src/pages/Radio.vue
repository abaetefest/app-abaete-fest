<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div
        class="col-sm-12 col-xs-12 col-md-6"
        v-for="(radio, index) in opcoes"
        :key="index"
      >
        <q-card
          class="q-pa-xs cursor-pointer text-white shadow-4 rounded"
          :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-white text-black'"
          v-ripple:primary
          @click="goTo(radio)"
        >
          <q-badge v-if="radio.new" color="amber-8" floating >
            NOVO
          </q-badge>
          <q-card-section class="flex justify-between">
            <div class="flex column justify-center items-start">
              <span class="text-h6">
                {{radio.title}}
              </span>
              <span>
                {{ radio.subtitle }}
              </span>
            </div>
            <div class="flex column justify-center items-end ">
              <q-icon
                :name="`img:radios/${radio.icon}`"
                size="60px"
                style="border-radius: 2rem;"
              />
            </div>
          </q-card-section>
          <div class="text-center">
            <q-badge
              outline
              :color="$q.dark.isActive ? 'white' : 'primary'"
            >
              Clique para ouvir
            </q-badge>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { radios } from 'src/constants/places/radios'
export default {
  name: 'PageRadio',
  data () {
    return {
      opcoes: radios
    }
  },
  mounted () {
  },
  methods: {
    goTo (radio) {
      this.$router.push({ name: 'radio-player', params: { id: radio.id, img: radio.icon } })
      this.$mixpanel.track(radio.title)
    }
  }
}
</script>
