<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  beforeMount () {
    this.$OneSignal.init({ appId: '4f62905e-971d-4a77-884a-636e73ca93d2' }).then((res) => {
      console.log('ONE SIGNAUL INSTALADO', res)
    })
  }
}
</script>
