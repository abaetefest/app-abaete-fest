<template>
  <q-page padding :class="$q.dark.isActive ? '' : 'bg-grey-1'">
    <div class="text-h5 text-bold text-center q-py-md">
      <span class="text-accent">Horários</span> de viagens
    </div>

    <div class="row q-pa-sm">
      <div class="col-12 q-mb-sm">
        <p class="text-subtitle1 text-bold text-center">
          Entenda as Legendas:
        </p>
        <span class="text-body2 py-sm block">
          <strong>Arapari</strong>: Portos <b>Jarumã</b> e <b>Arapari</b> próximo ao Açaí Biruta - R. Siqueira
          Mendes 10 - Cidade Velha, Belém - PA, 66020-600
        </span>
        <q-separator class="mt-md" />
        <span class="text-body2 block">
          <strong>Alça Viária</strong>: Terminal Rodoviário de Belém - São Brás,
          Belém - PA, 66090-000
        </span>
        <q-separator />
        <span class="text-body2 block">
          <strong>Balsa</strong>: Terminal Rodofluvial de Belém - Av. Bernardo
          Sayão, 3786 - Cidade Velha, Belém - PA,
        </span>
        <q-separator />
      </div>
    </div>

    <div class="">
      <span class="text-bold text-center text-body1 block rounded-borders"
        :class="$q.dark.isActive ? 'text-primary bg-amber-7' : 'text-primary bg-secondary'">
        Confira as promoções da Amazon Brasil com nossa parceria oficial
      </span>
      <div v-amazon-affiliate:seu-tag-afiliado="produtosAmazon" class="produto-conteudo">
        Aqui
        <!-- <p>Nosso mais recente iPhone tem recursos impressionantes e desempenho excepcional.</p>
        <p>Se você procura um notebook potente, o MacBook oferece velocidade e design elegante.</p>
        <p>Artistas e estudantes adoram o iPad pela praticidade e recursos criativos.</p>
        <p>Para sua casa inteligente, os dispositivos Echo com Alexa são indispensáveis.</p> -->
      </div>
    </div>
    <!-- <span
        class="text-center text-body2 block rounded-borders"
        :class="$q.dark.isActive ? 'text-grey-4' :  'text-grey-8'"
      >
        Acesse clicando na imagem abaixo
      </span>
          <q-carousel
            animated
            v-model="slide"
            arrows
            navigation
            infinite
            :autoplay="true"
          >
            <q-carousel-slide :name="1">
              <q-img
                src="propagandas/amazon.png"
                class="animated-border"
                style="border-radius: 10px"
                @click="openLink"
              />
            </q-carousel-slide>
            <q-carousel-slide :name="2">
              <q-img
                src="propagandas/amazon2.png"
                class="animated-border"
                style="border-radius: 10px"
                @click="openLink"
              />
            </q-carousel-slide>
            <q-carousel-slide :name="3">
              <q-img
                src="propagandas/amazon3.png"
                class="animated-border"
                style="border-radius: 10px"
                @click="openLink"
              />
            </q-carousel-slide>
            <q-carousel-slide :name="4">
              <q-img
                src="propagandas/amazon4.png"
                class="animated-border"
                style="border-radius: 10px"
                @click="openLink"
              />
            </q-carousel-slide>
          </q-carousel> -->

    <!-- <div v-if="$q.platform.is.mobile" class="q-mb-md">
      <q-card class="animated-border" @click="openLink" style="border-radius: 15px;">
        <q-card-section class="q-pa-sm q-ma-none">
          <q-img src="/slots/fortune.jpeg" style="border-radius: 15px" />
        </q-card-section>
        <q-card-section class="q-gutter-y-md row justify-center">
          <div class="text-center col-9">
            <q-btn
              :color="$q.dark.isActive ? 'purple' : 'purple'"
              label="Pegar meu bônus"
              @click="openLink"
              rounded
              icon="mdi-currency-usd"
              class="full-width text-bold text-white"
              push
              :text-color="$q.dark.isActive ? 'primary' : 'primary'"
            />
          </div>
        </q-card-section>
      </q-card>
    </div> -->

    <div v-for="(trip, index) in trips" :key="index">
      <q-card class="q-mb-xl" :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
        :style="$q.dark.isActive ? 'box-shadow: 0 1px 5px rgba(255, 255, 255, 0.442);' : ''">
        <q-card-section class="text-center">
          <div class="text-h6">
            {{ trip.cidade1 }} <q-icon name="mdi-arrow-right-thick" /> {{ trip.cidade2 }}
          </div>
          <div class="text-h6" v-if="!trip.somenteUmaCidade">
            {{ trip.cidade2 }} <q-icon name="mdi-arrow-right-thick" /> {{ trip.cidade1 }}
          </div>
        </q-card-section>

        <q-list padding bordered class="rounded-borders" :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
          v-for="(empresa, index) in trip.empresas" :key="index">
          <q-expansion-item icon="perm_identity" :label="empresa.nome" @click="handleMixPanelEvent(empresa.nome)"
            header-class="text-body1 text-bold" :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'">
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
              <q-card-section class="row q-col-gutter-x-lg" :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'">
                <div v-for="(viagem, index) in empresa.viagens" :key="index" class="col-12 col-sm-6">
                  <q-separator class="q-mb-sm" />
                  <div :class="$q.dark.isActive ? 'bg-secondary text-primary' : 'bg-primary text-secondary'"
                    style="border-radius: 10px;">
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
                    <q-item v-for="(horaViagem, index) in viagem.horarios" :key="index" clickable v-ripple dense>
                      <q-item-section>
                        <q-item-label>{{ horaViagem.hora }}</q-item-label>
                        <q-item-label caption lines="2" :class="$q.dark.isActive ? 'text-red-6' : 'text-negative'">
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
      placeDetails: {},
      slide: 1,
      produtosAmazon: {
        iPhone: 'B0CHX1K7DZ',
        MacBook: 'B0BSHF7WHW', // Exemplo de ASIN para MacBook
        iPad: 'B09G9CJM1Z', // Exemplo de ASIN para iPad
        Echo: 'B07PDHSJ1H', // Exemplo de ASIN para Echo
        Alexa: 'B07PDHSJ1H' // Exemplo de ASIN para Alexa (mesma do Echo)
      }
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
  methods: {
    openLink () {
      this.handleMixPanelEvent('Amazon Afializado')
      openURL('https://amzn.to/44JIvff', '_blank')
    },
    androidStore () {
      this.handleMixPanelEvent('Machago Android')
      openURL('https://play.google.com/store/apps/details?id=br.com.machago.passenger.drivermachine', '_blank')
    },
    appStore () {
      this.handleMixPanelEvent('Machago iOS')
      openURL('https://apps.apple.com/br/app/machago/id6444778780', '_blank')
    },
    handleMixPanelEvent (empresa) {
      this.$mixpanel.track(empresa)
    }
    // copyCupom () {
    //   copyToClipboard('MACHAGOEABAETEFEST').then(() => {
    //     this.handleMixPanelEvent('Machago Cupom Copiado - MACHAGOEABAETEFEST ')
    //     this.$q.notify({
    //       message: 'Cupom copiado com sucesso! Vá para o app e cole para ganhar o desconto.',
    //       color: 'positive',
    //       position: 'top',
    //       icon: 'mdi-check',
    //       timeout: 5000,
    //       progress: true
    //     })
    //   }).catch(() => {
    //     this.$q.notify({
    //       message: 'Erro ao copiar cupom',
    //       color: 'negative',
    //       position: 'top'
    //     })
    //   })
    // }
  }
}
</script>
<style>
.link-custom {
  color: rgb(180, 196, 242);
}

;

.animated-border {
  position: relative;
  overflow: hidden;
  border-radius: 15px
}

.animated-border::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid transparent;
  border-radius: 4px;
  animation: borderBlink 1.5s infinite;
  pointer-events: none;
  z-index: 1;
  border-radius: 15px
}

@keyframes borderBlink {
  0% {
    border-color: rgba(172, 18, 207, 0.7);
    box-shadow: 0 0 10px rgba(172, 18, 207, 0.7);
  }

  50% {
    border-color: rgba(46, 213, 115, 0);
    box-shadow: 0 0 0px rgba(46, 213, 115, 0);
  }

  100% {
    border-color: rgba(172, 18, 207, 0.7);
    box-shadow: 0 0 10px rgba(172, 18, 207, 0.7);
  }
}

.q-carousel {
  height: 100% !important;
}
</style>
