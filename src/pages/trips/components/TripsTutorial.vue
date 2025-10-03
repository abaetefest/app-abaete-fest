<template>
  <div>
    <!-- Botão de Tutorial Flutuante -->
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      style="z-index: 9999"
    >
      <q-btn
        fab
        icon="mdi-help-circle"
        color="accent"
        @click="startTutorial"
        class="tutorial-fab"
        style="z-index: 9999"
      >
        <q-tooltip anchor="center left" self="center right"
          >Iniciar Tutorial</q-tooltip
        >
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

export default {
  name: 'TripsTutorial',
  props: {
    autoStart: {
      type: Boolean,
      default: false
    },
    nextBtnBg: { type: String, default: '#161931' },
    nextBtnColor: { type: String, default: '#ffffff' },
    nextBtnBgHover: { type: String, default: '#5ec4a8' },
    nextBtnColorHover: { type: String, default: '#161931' },
    prevBtnBg: { type: String, default: '#f5f5f5' },
    prevBtnColor: { type: String, default: '#161931' },
    closeBtnColor: { type: String, default: '#666666' },
    titleColor: { type: String, default: '#161931' },
    descriptionColor: { type: String, default: '#666666' },
    popoverMaxWidth: { type: String, default: '400px' },
    borderRadius: { type: String, default: '12px' },
    nextText: { type: String, default: 'Próximo →' },
    prevText: { type: String, default: '← Anterior' },
    doneText: { type: String, default: 'Concluir' },
    closeText: { type: String, default: '✕' }
  },
  data: function () {
    return {
      driverObj: null,
      styleElId: 'trips-tutorial-theme'
    }
  },
  mounted: function () {
    if (this.autoStart) {
      this.checkFirstVisit()
    }
    this.injectTheme()
  },
  beforeDestroy: function () {
    if (this.driverObj) {
      this.driverObj.destroy()
    }
    this.removeTheme()
  },
  methods: {
    injectTheme: function () {
      if (typeof document === 'undefined') return
      this.removeTheme()
      const css = `
        .driver-popover { border-radius: ${this.borderRadius} !important; max-width: ${this.popoverMaxWidth} !important; }
        .driver-popover-title { color: ${this.titleColor} !important; }
        .driver-popover-description { color: ${this.descriptionColor} !important; }
        .driver-popover-next-btn { background-color: ${this.nextBtnBg} !important; color: ${this.nextBtnColor} !important; }
        .driver-popover-next-btn:hover { background-color: ${this.nextBtnBgHover} !important; color: ${this.nextBtnColorHover} !important; }
        .driver-popover-prev-btn { background-color: ${this.prevBtnBg} !important; color: ${this.prevBtnColor} !important; }
        .driver-popover-close-btn { color: ${this.closeBtnColor} !important; }
      `
      const style = document.createElement('style')
      style.id = this.styleElId
      style.type = 'text/css'
      style.appendChild(document.createTextNode(css))
      document.head.appendChild(style)
    },
    removeTheme: function () {
      if (typeof document === 'undefined') return
      const el = document.getElementById(this.styleElId)
      if (el) el.remove()
    },
    checkFirstVisit: function () {
      if (typeof localStorage === 'undefined') return

      const hasVisitedTrips = localStorage.getItem('trips-tutorial-completed')

      if (!hasVisitedTrips) {
        setTimeout(() => {
          this.startTutorial()
        }, 1000)
      }
    },
    startTutorial: function () {
      if (this.driverObj) {
        this.driverObj.destroy()
      }

      this.driverObj = driver({
        showProgress: true,
        showButtons: ['next', 'previous', 'close'],
        steps: [
          {
            element: '#trips-title',
            popover: {
              title: '👋 Bem-vindo aos Horários de Viagem!',
              description:
                'Aqui você encontra todos os horários atualizados de transporte saindo de Abaetetuba para diversas localidades. Vamos fazer um tour rápido para que você aproveite ao máximo o app!',
              side: 'bottom',
              align: 'center'
            }
          },
          {
            element: '#share-button-section',
            popover: {
              title: '📤 Compartilhar Horários',
              description:
                'Use este botão para compartilhar os horários com amigos e familiares. É muito útil para planejar viagens em grupo!',
              side: 'bottom',
              align: 'center'
            }
          },
          {
            element: '#boarding-points-section',
            popover: {
              title: '📍 Pontos de Embarque',
              description:
                'Aqui estão listados todos os pontos de embarque em Belém: Porto Arapari (barcos), Terminal Rodoviário (ônibus) e Terminal Rodofluvial. Confira os endereços completos!',
              side: 'bottom',
              align: 'start'
            }
          },
          {
            element: '#schedules-section',
            popover: {
              title: '🚌 Lista de Horários',
              description:
                'Esta é a seção principal com todos os horários organizados por empresa de transporte. Role a página para ver todas as opções disponíveis.',
              side: 'top',
              align: 'start'
            }
          },
          {
            element: '.company-list-item',
            popover: {
              title: '🏢 Empresas de Transporte',
              description:
                'Pressione/Clique em cada empresa para expandir e ver os horários detalhados de saída. Cada empresa pode ter múltiplas rotas e horários diferentes.',
              side: 'top',
              align: 'start'
            }
          },
          {
            element: '#important-info-section',
            popover: {
              title: 'ℹ️ Informações Importantes',
              description:
                'Atenção! Leia estas informações antes de viajar. Os horários podem sofrer alterações devido a condições climáticas ou outros fatores. Sempre confirme com a empresa antes de viajar.',
              side: 'top',
              align: 'center'
            }
          },
          {
            popover: {
              title: '✅ Tutorial Concluído!',
              description:
                'Agora você já sabe como usar a página de horários! Se precisar ver este tutorial novamente, pressione/clique no botão de ajuda no canto inferior direito. Boa viagem! 🚌⛴️',
              side: 'center',
              align: 'center'
            }
          }
        ],
        onDestroyStarted: () => {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('trips-tutorial-completed', 'true')
          }
          if (this.driverObj) {
            this.driverObj.destroy()
          }
          this.$emit('completed')
        },
        nextBtnText: this.nextText,
        prevBtnText: this.prevText,
        doneBtnText: this.doneText,
        closeBtnText: this.closeText,
        progressText: '{{current}} de {{total}}'
      })

      this.driverObj.drive()

      this.$emit('started')
    }
  }
}
</script>

<style scoped>
/* Escopo apenas para o botão; estilos globais permanecem em trips.css */
</style>
