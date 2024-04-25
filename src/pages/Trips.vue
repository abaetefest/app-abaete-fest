<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-dark' :  'bg-grey-1'">
    <div class="text-h5 text-bold text-center q-py-md">
      <span class="text-red-8">Horários</span> de viagens
    </div>

    <div class="q-mb-md">
      <q-card flat bordered class="">
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline text-red-3">Divulgação</div>
            <div class="text-subtitle1 text-bold q-mt-sm q-mb-xs">After Juan Pimentel</div>
            <div class="text-caption text-grey-7">
              1ª edição<br>
              Data: 18 Maio<br>
              Local: Nobre Hall<br>
              <q-icon name="mdi-instagram" class="q-pr-sm" color="red-6" size="xs" />
              <a
                :class="$q.dark.isActive ? 'text-white link-custom' : ''"
                target="_blank"
                href="https://www.instagram.com/afterdojuanpimentel/"
                @click="handleMixPanelEvent('After Juan Pimentel')"
                >
                @afterdojuanpimentel
              </a>
            </div>
          </q-card-section>

          <q-card-section class="col-xs-5 col-md-3 col-sm-5 flex flex-center">
            <a
              href="https://www.instagram.com/afterdojuanpimentel/"
              target="_blank"
              @click="handleMixPanelEvent('After Juan Pimentel')"
            >
              <img
                class="rounded-borders"
                style="width: 100%;"
                src="/propagandas/after_juan.webp"
              />
            </a>
          </q-card-section>
        </q-card-section>

        <q-separator />
      </q-card>
    </div>

    <div v-for="(trip, index) in trips" :key="index" >
      <q-card
        class="q-mb-xl"
        :style="$q.dark.isActive? 'box-shadow: 0 1px 5px rgba(255, 255, 255, 0.442);': ''"
      >
        <q-card-section class="text-center">
          <div class="text-h6">
            {{ trip.cidade1 }} <q-icon name="mdi-arrow-right-thick" /> {{ trip.cidade2 }}
          </div>
          <div class="text-h6" v-if="!trip.somenteUmaCidade">
            {{ trip.cidade2 }} <q-icon name="mdi-arrow-right-thick" /> {{ trip.cidade1 }}
          </div>
        </q-card-section>

        <q-list
          padding
          bordered
          class="rounded-borders"
          :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
          v-for="(empresa, index) in trip.empresas"
          :key="index"
        >
          <q-expansion-item
            icon="perm_identity"
            :label="empresa.nome"
            @click="handleMixPanelEvent(empresa.nome)"
            header-class="text-body1 text-bold"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar class="float-right">
                  <img :src="empresa.icon" rounded />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                {{ empresa.nome }}
              </q-item-section>
            </template>
            <q-card>
              <q-card-section class="row q-col-gutter-x-lg">
                <div
                  v-for="(viagem, index) in empresa.viagens"
                  :key="index"
                  class="col-12 col-sm-6"
                >
                  <q-separator class="q-mb-sm" />
                  <div
                    class="bg-primary"
                    style="border-radius: 10px;"
                    :class="$q.dark.isActive ? 'text-white' : 'text-white'"
                  >
                    <p class="text-h6 text-center q-mb-sm">
                      {{ viagem.origem }}
                      <q-icon name="mdi-arrow-right-thick" />
                      {{ viagem.destino }}
                    </p>

                    <p class="text-subtitle1 text-center">
                      {{ viagem.periodo }}
                    </p>
                  </div>

                  <q-list bordered separator>
                    <q-item
                      v-for="(horaViagem, index) in viagem.horarios"
                      :key="index"
                      clickable
                      v-ripple
                      dense
                    >
                      <q-item-section>
                        <q-item-label>{{ horaViagem.hora }}</q-item-label>
                        <q-item-label caption lines="2" :class="$q.dark.isActive ? 'text-red-6' : 'text-negative'" >
                          {{ horaViagem.obs }}
                        </q-item-label>
                      </q-item-section>
                      <q-item-section side>{{
                        horaViagem.modalidade
                      }}</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card>
    </div>
    <div class="row q-pa-sm">
      <div class="col-12">
        <p class="text-caption">
          <strong>Arapari</strong>: Portos próximo ao Açaí Biruta - R. Siqueira
          Mendes 10 - Cidade Velha, Belém - PA, 66020-600
        </p>
        <p class="text-caption">
          <strong>Alça Viária</strong>: Terminal Rodoviário de Belém - São Brás,
          Belém - PA, 66090-000
        </p>
        <p class="text-caption">
          <strong>Balsa</strong>: Terminal Rodofluvial de Belém - Av. Bernardo
          Sayão, 3786 - Cidade Velha, Belém - PA,
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
import { trips } from 'src/constants/trips/index'
import { openURL } from 'quasar'
export default {
  name: 'TripsPage',
  data () {
    return {
      trips: trips,
      ratingModel: 3,
      modalPlaces: false,
      placeDetails: {}
    }
  },
  computed: {
    // getPlaces: function () {
    //   return makers.filter(place => place.category === this.categoria)
    // },
    // getIconCategory: function () {
    //   const img = this.options.filter(opt => opt.value === this.categoria)
    //   return img[0].icon
    // }
  },
  mounted () {
  },
  methods: {
    openLink () {
      if (this.$q.platform.is.ios) {
        openURL('https://apps.apple.com/app/machago/id6444778780', '_blank')
      } else if (this.$q.platform.is.android) {
        openURL('https://play.google.com/store/apps/details?id=br.com.machago.passenger.drivermachine', '_blank')
      } else {
        openURL('https://linkr.bio/machago', '_blank')
      }
    },
    androidStore () {
      openURL('https://play.google.com/store/apps/details?id=br.com.abaetefest.app.twa', '_blank')
    },
    appStore () {
      openURL('https://apps.apple.com/us/app/abaetefest/id1597584518', '_blank')
    },
    handleMixPanelEvent (empresa) {
      this.$mixpanel.track(empresa)
    }
  }
}
</script>

<style>
 .link-custom {
  color: rgb(180, 196, 242);
};
</style>
