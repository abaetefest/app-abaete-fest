<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  beforeMount () {
    this.$OneSignal.init({ appId: '818f99e8-5855-4bc2-817b-69cfd8c9a1f9' })
  }
}
</script>
