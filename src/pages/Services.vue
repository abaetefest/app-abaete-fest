<template>
  <q-page padding :class="$q.dark.isActive ? '': 'bg-grey-1'">
    <div class="row q-pb-md">
      <q-select
        outlined
        v-model="categoria"
        :options="options"
        label="Selecione uma categoria"
        class="col-sm-12 col-xs-12 col-md-6"
        :bg-color="$q.dark.isActive ? '' : 'white'"
        :label-color="$q.dark.isActive ? 'white' : 'primary'"
        :color="$q.dark.isActive ? 'white' : 'primary'"
        map-options
        emit-value
      >
        <template v-slot:prepend>
          <q-avatar rounded>
            <img :src="getIconCategory" />
          </q-avatar>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="scope.opt.icon" />
              </q-avatar>
              <!-- <q-icon :name="scope.opt.icon" /> -->
            </q-item-section>
            <q-item-section>
              <q-item-label v-html="scope.opt.label" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>

    <div class="row justify-between q-col-gutter-sm">
      <div
        class="col-sm-12 col-xs-12 col-md-6"
        v-for="(service, index) in getPlaces"
        :key="index"
      >
        <q-expansion-item
          class="shadow-1 overflow-hidden"
          group="services"
          :key="service.name"
          style="border-radius: 10px"
          :label="service.name"
          header-class="bg-primary text-white text-h6"
          expand-icon-class="text-white"
          @show="trackEventMixpanel(service)"
        >
          <q-card>
            <q-card-section class="q-pt-sm text-body1">

              <ul v-for="(item, index) in service.TypeServices" :key="index">
                <li>{{ item }}</li>
              </ul>

              <div
                v-if="service.phone"
                class="q-pl-xs"
              >
                <q-icon name="mdi-phone" class="q-pb-xs" color="grey" size="xs" />
                Telefone: {{ service.phone }}
              </div>

              <div
                v-if="service.wpp"
                class="q-pl-xs q-mt-sm"
              >
                <q-icon name="mdi-whatsapp" class="q-pb-xs" color="positive" size="xs" />
                WhatsApp: <a
                  :href="`https://api.whatsapp.com/send?phone=55${service.wpp}&text=Olá, encontrei você pelo app AbaetéFest.`"
                  target="_blank"
                  :class="$q.dark.isActive ? 'text-blue-2 link-custom' : 'text-primary'"
                >
                  {{ service.wpp }}
                </a>
              </div>

              <div
                v-if="service.instagram"
                class="q-pl-xs q-mt-sm"
              >
                <q-icon name="mdi-instagram" class="q-pb-xs" color="purple-5" size="xs" />
                Instagram: <a
                  :href="`https://www.instagram.com/${service.instagram}`"
                  target="_blank"
                  :class="$q.dark.isActive ? 'text-blue-2 link-custom' : 'text-primary'"
                >
                  @{{ service.instagram }}
                </a>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { servicesList } from 'src/constants/servicesList'
export default {
  name: 'ServicesPage',
  data () {
    return {
      services: servicesList,
      ratingModel: 3,
      categoria: 'arCondicionado',
      options: [
        // {
        //   label: 'Água Mineral',
        //   value: 'agua',
        //   icon: 'flat/water-bottle.png'
        // },
        {
          label: 'Ar condicionado e Refrigeração',
          value: 'arCondicionado',
          icon: 'flat/air-conditioner.png'
        },
        {
          label: 'Chaveiro',
          value: 'chaveiro',
          icon: 'flat/key-chain.png'
        },
        {
          label: 'DJ para eventos',
          value: 'dj',
          icon: 'flat/dj.png'
        },
        {
          label: 'Gás de cozinha',
          value: 'gas',
          icon: 'flat/gas.png'
        },
        {
          label: 'Manicure',
          value: 'manicure',
          icon: 'flat/nail-polish.png'
        },
        {
          label: 'Maquiagem',
          value: 'maquiagem',
          icon: 'flat/cosmetics.png'
        },
        {
          label: 'Produção Audiovisual/Design',
          value: 'audioVisual',
          icon: 'flat/brochure.png'
        }
      ]
    }
  },
  computed: {
    getPlaces: function () {
      return servicesList.filter((place) => place.category === this.categoria)
    },
    getIconCategory: function () {
      const img = this.options.filter((opt) => opt.value === this.categoria)
      return img[0].icon
    }
  },
  mounted () {
  },
  methods: {
    trackEventMixpanel (serviceInfo) {
      this.$mixpanel.track(`service(${serviceInfo.name})`)
    }
  }
}
</script>

<style>
 .link-custom a {
  color: rgb(180, 196, 242);
};
</style>
