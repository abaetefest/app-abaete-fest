<template>
  <div class="text-center q-pa-xl">
    <q-icon
      name="mdi-calendar-remove"
      size="80px"
      class="text-grey-5 q-mb-md"
    />
    <div class="text-h6 text-grey-6 q-mb-sm">Nenhum evento encontrado</div>
    <div class="text-body2 text-grey-5">
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
/* Estilos já definidos no template */
</style>
