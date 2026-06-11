<template>
  <q-page padding :class="$q.dark.isActive ? '' : 'bg-grey-1'">

    <div class="discounts-container">
      <div class="text-h5 text-bold text-center q-py-md">
        Promos e <span class="text-accent">Descontos</span>
      </div>

      <div class="text-center q-mb-md">
        <p class="text-body2" :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-7'">
          Seleção de ofertas com os melhores preços da Amazon
        </p>
      </div>

      <div v-if="loading" class="row q-col-gutter-sm">
        <div v-for="n in 12" :key="n" class="col-6 col-md-4 col-lg-3">
          <q-skeleton height="260px" style="border-radius: 10px;" />
        </div>
      </div>

      <div v-else-if="!products.length" class="text-center q-py-xl text-grey-5">
        <q-icon name="mdi-tag-off-outline" size="48px" />
        <div class="q-mt-sm">Nenhuma oferta disponível no momento</div>
      </div>

      <AmazonProducts v-else :products="products" />
    </div>

  </q-page>
</template>

<script src="./discounts.js"></script>

<style scoped>
.discounts-container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
