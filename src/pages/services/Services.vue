<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-primary': 'bg-grey-1'">
    <div class="text-h5 text-bold text-center q-py-md">
      Telefones <span class="text-accent">Úteis</span>
    </div>
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

    <div
      v-if="getPlaces.length"
      class="row justify-between q-col-gutter-sm">
      <div
        class="col-sm-12 col-xs-12 col-md-6"
        v-for="(service, index) in getPlaces"
        :key="index"
      >
        <q-expansion-item
          class="shadow-1 overflow-hidden shadow-dark"
          group="services"
          :key="service.name"
          style="border-radius: 10px"
          :label="service.name"
          header-class="bg-primary text-white text-h6"
          expand-icon-class="text-white"
          @show="trackEventMixpanel(service)"
        >
          <q-card :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'">
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
    <div v-else>
      <div class="col-sm-10 col-xs-10 col-md-12 text-center text-h6">
        <q-img
          src="undraw/not-services.svg"
          style="max-width: 500px;"
        />
      </div>
      <div class="col-sm-12 col-xs-12 col-md-12 text-center text-h6 q-mt-md">
        Não há profissionais cadastrados nessa categoria.
      </div>
    </div>
  </q-page>
</template>

<script src="./services.js"></script>

<style>
 .link-custom a {
  color: rgb(180, 196, 242);
};
</style>
