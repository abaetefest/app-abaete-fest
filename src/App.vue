<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  beforeMount () {
    this.$OneSignal.init({ appId: process.env.ONE_SIGNAL_KEY })
      .then(() => {
        console.log('ONE SIGNAUL INSTALADO')
      })
      .catch((err) => {
        console.log('ONE SIGNAUL ERRO: ', err)
      })
  }
}
</script>
