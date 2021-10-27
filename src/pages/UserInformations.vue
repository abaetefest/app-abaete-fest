<template>
  <q-page>
    <div class="row">
      <div class="col-xs-12">
        <q-list bordered padding>
          <!-- <q-item-label header>Notifications</q-item-label> -->
          <!-- <q-separator spaced class="full-width"/> -->
          <q-item tag="label" v-ripple>
            <q-item-section>
              <q-item-label>Habilitar Notificações</q-item-label>
            </q-item-section>
            <q-item-section side >
              <q-toggle color="positive" v-model="notify" val="battery" @input="enableNotifications" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageUserInformations',
  data () {
    return {
      notify: false
    }
  },
  mounted () {
    this.enableNotifications()
  },
  methods: {
    enableNotifications () {
      const OneSignal = window.OneSignal || []
      OneSignal.getNotificationPermission((permission) => {
        if (permission === 'default' || permission === 'denied') {
          OneSignal.showNativePrompt()
          this.notify = false
        } else {
          this.notify = true
        }
      })
      // OneSignal.push(["getNotificationPermission", function(permission) {
      //     console.log("Site Notification Permission:", permission);
      //     // (Output) Site Notification Permission: default
      // }]);

      // OneSignal.push(() => {
      //   OneSignal.showNativePrompt()
      // })
      // Notification.requestPermission()
      //   .then((result) => {
      //     if (result === 'denied' || result === 'default') {
      //       this.notify = false
      //       this.$notifyDanger('Desculpe, não conseguimos ativar as notificações')
      //     }
      //     this.notify = true
      //   })
      //   .catch((e) => {
      //     console.log(e)
      //   })
      // Notification.requestPermission().then((result) => {
      //   console.log(result)
      // })
    }
  }
}
</script>
