<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'LoginLayout',
  meta: {
    title: 'AbaetéFest - Login',
    meta: {
      description: { name: 'description', content: 'Os melhores eventos de abaetetuba em um só lugar.' },
      keywords: { name: 'keywords', content: 'AbaetéFest, festas, abaetetuba, eventos,' },
      ogTitle: {
        name: 'AbaetéFest'
      }
    }
  }
}
</script>
