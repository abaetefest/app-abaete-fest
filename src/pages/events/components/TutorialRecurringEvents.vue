<template>
  <q-dialog
    v-model="showTutorial"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    class="tutorial-dialog"
  >
    <q-card class="tutorial-card">
      <!-- Header do tutorial -->
      <q-card-section class="tutorial-header text-center">
        <div class="text-h5 text-weight-bold text-white ">
          🎉 Nova Funcionalidade!
        </div>
        <div class="text-h6 text-grey-3 q-mt-sm">

          <q-icon name="mdi-repeat" size="2rem" color="accent" />
          Eventos Recorrentes
        </div>
      </q-card-section>

      <!-- Conteúdo do tutorial -->
      <q-card-section class="tutorial-content">
        <div class="tutorial-step">
          <div class="step-icon bg-accent">
            <q-icon name="mdi-repeat" size="2rem" color="primary" />
          </div>
          <div class="step-content">
            <div class="text-h6 text-weight-bold text-grey-8 q-mb-sm">
              O que são Eventos Recorrentes?
            </div>
            <div class="text-body1 text-grey-7 text-justify">
              Eventos que acontecem regularmente, como shows semanais,
              feiras mensais ou atividades que se repetem em dias específicos da semana.
            </div>
          </div>
        </div>

        <div class="tutorial-step q-mt-lg">
          <div class="step-icon bg-accent">
            <q-icon name="mdi-filter" size="2rem" color="primary" />
          </div>
          <div class="step-content">
            <div class="text-h6 text-weight-bold text-grey-8 q-mb-sm">
              Como usar o Filtro?
            </div>
            <div class="text-body1 text-grey-7 text-justify">
              Use o filtro "Tipo de evento" para visualizar apenas eventos recorrentes
              ou eventos com data específica. Isso facilita encontrar o que você procura!
            </div>
          </div>
        </div>

        <div class="tutorial-step q-mt-lg">
          <div class="step-icon bg-accent">
            <q-icon name="mdi-calendar-multiple" size="2rem" color="primary" />
          </div>
          <div class="step-content">
            <div class="text-h6 text-weight-bold text-grey-8 q-mb-sm">
              Visualização Organizada
            </div>
            <div class="text-body1 text-grey-7 text-justify">
              Os eventos são organizados em duas seções: "Eventos Recorrentes"
              e "Eventos com Data Específica" para melhor organização.
            </div>
          </div>
        </div>

      </q-card-section>

      <!-- Footer com botões -->
      <q-card-actions class="tutorial-footer">
        <div class="row full-width q-gutter-sm">
          <q-btn
            flat
            label="Não mostrar novamente"
            color="grey-6"
            @click="dontShowAgain"
            class="col"
          />
          <q-btn
            label="Entendi!"
            color="primary"
            @click="closeTutorial"
            class="col"
            unelevated
            rounded
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'TutorialRecurringEvents',

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      showTutorial: false
    }
  },

  watch: {
    show(newVal) {
      this.showTutorial = newVal
    }
  },

  methods: {
    closeTutorial() {
      this.showTutorial = false
      this.$emit('close')
    },

    dontShowAgain() {
      // Salva no localStorage que o usuário não quer ver o tutorial novamente
      localStorage.setItem('tutorial-recurring-events-dismissed', 'true')
      this.closeTutorial()
    }
  }
}
</script>

<style scoped>
.tutorial-dialog {
  z-index: 9999;
}

.tutorial-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  max-width: 550px;
  width: 90vw;
  min-height: 60vh;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.tutorial-header {
  background: #151930;
  color: white;
  border-radius: 20px 20px 0 0;
  padding: 2rem 1.5rem;
}

.tutorial-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.tutorial-content {
  padding: 2rem 1.5rem;
  flex: 1;
}

.tutorial-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-icon {
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(252, 182, 159, 0.3);
}

.step-content {
  flex: 1;
}

.tutorial-example {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.example-card {
  border-radius: 12px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border: 2px solid #e9ecef;
}

.tutorial-footer {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 0 0 20px 20px;
  margin-top: auto;
}

/* Responsividade */
@media (max-width: 600px) {
  .tutorial-card {
    margin: 1rem;
    border-radius: 16px;
  }

  .tutorial-header {
    padding: 1.5rem 1rem;
    border-radius: 16px 16px 0 0;
  }

  .tutorial-content {
    padding: 1.5rem 1rem;
  }

  .tutorial-footer {
    /* padding: 1rem; */
    border-radius: 0 0 16px 16px;
  }

  .tutorial-step {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .step-icon {
    align-self: center;
  }
}
</style>
