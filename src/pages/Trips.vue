<template>
  <q-page padding class="bg-grey-2">
    <div v-for="(trip, index) in trips" :key="index" >
      <q-card class="q-mb-md">
        <q-card-section class="text-center">
          <div class="text-h6">
            {{ trip.cidade1 }} <q-icon name="mdi-arrow-right-thick" /> {{ trip.cidade2 }}
          </div>
          <div class="text-h6">
            {{ trip.cidade2 }} <q-icon name="mdi-arrow-right-thick" /> {{ trip.cidade1 }}
          </div>
        </q-card-section>
        <q-list
          padding
          bordered
          class="rounded-borders bg-white"
          v-for="(empresa, index) in trip.empresas"
          :key="index"
        >
          <q-expansion-item icon="perm_identity" :label="empresa.nome">
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
                  <p class="text-h6 text-center q-mb-sm">
                    {{ viagem.origem }}
                    <q-icon name="mdi-arrow-right-thick" />
                    {{ viagem.destino }}
                  </p>

                  <p class="text-subtitle1 text-center">
                    {{ viagem.periodo }}
                  </p>

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
                        <q-item-label caption lines="2" class="text-negative">
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
import { trips } from 'src/constants/trips'
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
  computed: {},
  mounted () {},
  methods: {}
}
</script>
