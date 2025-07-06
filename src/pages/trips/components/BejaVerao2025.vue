<template>
  <div>
    <div class="text-h4 text-bold text-center q-py-md">
      <span class="text-accent">Horários</span> de viagens Beja Verão 2025
    </div>

    <!-- Subtítulo com keywords relevantes -->
    <div class="text-center q-mb-lg">
      <p class="text-subtitle1 text-grey-7">
        Consulte os horários atualizados de ônibus para Beja nesse verão de 2025 ⛱️
      </p>

      <!-- Botão de compartilhar no topo -->
      <div class="q-mt-md">
        <q-btn
          unelevated
          rounded
          color="primary"
          icon-right="mdi-share-variant"
          label="Compartilhar Horários"
          @click="shareSchedules"
          no-caps
          class="text-weight-bold"
          v-if="canShare"
        />

        <!-- Fallback para dispositivos sem Web Share API -->
        <q-btn
          unelevated
          rounded
          outline
          color="primary"
          icon-right="mdi-content-copy"
          label="Copiar Link dos Horários"
          @click="copyScheduleLink"
          no-caps
          class="text-weight-bold"
          v-else
        />
      </div>
    </div>

    <div class="row ">
      <div class="col-12 q-mb-lg">
        <div class="text-h6 text-bold text-center q-mb-md">
          📍 Pontos de Embarque em Abaetetuba
        </div>

        <q-card flat bordered class="q-pa-md">
          <q-list separator>
            <q-item>
              <q-item-section avatar>
                <q-icon name="mdi-bus" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold"
                  >Terminal Rodoviário de Abaetetuba</q-item-label
                >
                <q-item-label caption class="text-body2">
                  Terminal Rodoviário de Abaetetuba<br />
                  📍 Rod. Dr João Miranda - Santa Rosa, Abaetetuba - PA,
                  68440-000
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="mdi-tree" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold"
                  >Praça da Bandeira</q-item-label
                >
                <q-item-label caption class="text-body2">
                  Praça Francisco Azevedo Monteiro<br />
                  📍 R. Barão do Rio Branco, 1331-1507 - Centro, Abaetetuba -
                  PA, 68440-000
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- Seção principal de horários -->
    <div class="horarios-viagem">
      <q-card
        class="q-mb-xl"
        :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
        :style="$q.dark.isActive ? 'box-shadow: 0 1px 5px rgba(255, 255, 255, 0.442);' : ''"
      >
        <q-card-section class="text-center bg-primary text-white">
          <div class="text-h5 text-weight-bold">
            🚌 {{ tripData.cidade1 }} ↔ {{ tripData.cidade2 }}
          </div>
          <div class="text-subtitle1 q-mt-sm">
            Horários atualizados de transporte entre {{ tripData.cidade1 }} e {{ tripData.cidade2 }}
          </div>
        </q-card-section>

        <!-- Dropdown com todos os horários -->
        <q-expansion-item
          icon="mdi-bus"
          :label="`Ver todos os horários (${getAllScheduleCount()} horários)`"
          header-class="text-weight-bold bg-grey-1"
          :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
        >
          <!-- Conteúdo das viagens -->
          <q-card-section
            class="row q-col-gutter-x-lg"
            :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
          >
            <div
              v-for="(viagem, viagemIndex) in tripData.empresa.viagens"
              :key="viagemIndex"
              class="col-12 col-sm-6"
            >
              <q-separator class="q-mb-sm" v-if="viagemIndex > 0" />

              <!-- Cabeçalho da rota -->
              <div
                class="q-pa-md q-mb-md text-center"
                :class="$q.dark.isActive ? 'bg-secondary text-primary' : 'bg-primary text-white'"
                style="border-radius: 10px;"
              >
                <div class="text-h6 text-weight-bold">
                  {{ viagem.origem }} → {{ viagem.destino }}
                </div>
                <div class="text-subtitle2 q-mt-xs">
                  {{ viagem.periodo }}
                </div>
              </div>

              <!-- Lista de horários -->
              <q-list bordered separator class="rounded-borders">
                <q-item
                  v-for="(horaViagem, horaIndex) in viagem.horarios"
                  :key="horaIndex"
                  clickable
                  v-ripple
                  dense
                  class="q-pa-sm"
                >

                  <q-item-section>
                    <q-item-label class="text-weight-bold" :class="$q.screen.gt.sm ? 'text-h6' : 'text-subtitle1'">
                      🕐 {{ horaViagem.hora }}
                    </q-item-label>
                    <q-item-label
                      caption
                      lines="2"
                      :class="$q.dark.isActive ? 'text-red-6' : 'text-negative'"
                      v-if="horaViagem.obs"
                    >
                      ⚠️ {{ horaViagem.obs }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-chip
                      v-if="horaViagem.modalidade"
                      :color="getModalidadeColor(horaViagem.modalidade)"
                      text-color="white"
                      dense
                      class="text-weight-bold"
                    >
                      {{ horaViagem.modalidade }}
                    </q-chip>
                  </q-item-section>
                </q-item>
              </q-list>
              <div class="q-mb-sm text-center" v-if="viagem.obs">
                <span class="text-subtitle2 text-grey-9 text-weight-bold">
                  <q-icon name="mdi-alert" color="warning" size="sm" />
                  {{ viagem.obs }}
                </span>
              </div>
            </div>
          </q-card-section>
        </q-expansion-item>
      </q-card>
    </div>
  </div>
</template>

<script>
import { bejaVerao2025 } from '../../../constants/trips/abaetetuba-beja.js'

export default {
  name: 'BejaVerao2025',
  data() {
    return {
      tripData: bejaVerao2025
    }
  },
  computed: {
    canShare() {
      return navigator.share !== undefined
    }
  },
  methods: {
    shareSchedules() {
      if (navigator.share) {
        navigator.share({
          title: 'Horários de Viagem Beja Verão 2025',
          text: 'Consulte os horários atualizados de ônibus entre Abaetetuba e Beja para o verão 2025',
          url: window.location.href
        }).catch(console.error)
      }
    },
    copyScheduleLink() {
      const url = window.location.href
      navigator.clipboard.writeText(url).then(() => {
        this.$q.notify({
          message: 'Link copiado para a área de transferência!',
          color: 'positive',
          icon: 'mdi-check'
        })
      }).catch(() => {
        this.$q.notify({
          message: 'Erro ao copiar o link',
          color: 'negative',
          icon: 'mdi-alert'
        })
      })
    },

    getModalidadeColor(modalidade) {
      if (modalidade === 'Pç. da Bandeira') {
        return 'accent'
      }
      return 'primary'
    },

    getScheduleCount(horarios) {
      return horarios.length
    },

    getAllScheduleCount() {
      let total = 0
      this.tripData.empresa.viagens.forEach(viagem => {
        total += viagem.horarios.length
      })
      return total
    }

  }
}
</script>

<style scoped>
.animated-border {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
}

.animated-border::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 3px solid transparent;
  border-radius: 15px;
  animation: borderBlink 1.5s infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes borderBlink {
  0% {
    border-color: rgba(255, 234, 0, 0.7);
    box-shadow: 0 0 10px rgba(255, 234, 0, 0.7);
  }
  50% {
    border-color: rgba(46, 213, 115, 0);
    box-shadow: 0 0 0px rgba(46, 213, 115, 0);
  }
  100% {
    border-color: rgba(255, 234, 0, 0.7);
    box-shadow: 0 0 10px rgba(255, 234, 0, 0.7);
  }
}

/* Melhorias de performance */
.horarios-viagem {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .text-h4 {
    font-size: 1.5rem !important;
  }

  .text-h5 {
    font-size: 1.25rem !important;
  }
}
</style>
