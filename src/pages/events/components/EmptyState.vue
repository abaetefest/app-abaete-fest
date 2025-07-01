<template>
  <div class="text-center q-pa-xl" style="max-width: 500px; margin: 0 auto;">
    <q-icon
      name="mdi-calendar-remove"
      size="80px"
      class="text-grey-5 q-mb-md"
    />
    <div class="text-h6 text-grey-6 q-mb-sm text-weight-medium">Nenhum evento encontrado</div>
    <div class="text-body2 text-grey-5" style="line-height: 1.5;">
      Tente ajustar os filtros ou volte mais tarde para ver novos eventos.
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState'
}
</script>

<style scoped>
/* Usando apenas classes Quasar - estilos inline quando necessário */
</style>
