<template>
  <q-page padding class="bg-grey-1">
    <div v-for="(trip, index) in trips" :key="index">
      <q-list padding bordered class="rounded-borders bg-white">
        <q-expansion-item icon="perm_identity" :label="trip.empresa">
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar class="float-right">
                <img :src="trip.icon" rounded />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              {{ trip.empresa }}
            </q-item-section>
          </template>
          <div v-for="(cidade, index) in trip.cidades" :key="index">
            <q-list padding bordered class="rounded-borders bg-white">
              <q-expansion-item icon="perm_identity" :label="trip.empresa">
                <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar class="float-right"> </q-avatar>
                  </q-item-section>
                  <q-item-section class="text-h6">
                    {{ cidade.nome }}
                  </q-item-section>
                </template>
                <q-card>
                  <q-card-section>
                    <div v-for="(viagem, index) in cidade.viagens" :key="index">
                      <q-separator class="q-mt-md" />
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
                            <q-item-label
                              caption
                              lines="2"
                              class="text-negative"
                            >
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
          </div>
        </q-expansion-item>
      </q-list>
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
