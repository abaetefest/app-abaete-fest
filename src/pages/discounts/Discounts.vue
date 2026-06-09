<template>
  <q-page padding :class="$q.dark.isActive ? '' : 'bg-grey-1'">

    <div class="text-h5 text-bold text-center q-py-md">
      Promos e <span class="text-accent">Descontos</span>
    </div>

    <div class="text-center q-mb-md">
      <p class="text-body2" :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-7'">
        Seleção de ofertas com os melhores preços da Amazon
      </p>
    </div>

    <AmazonProducts :products="products" />

  </q-page>
</template>

<script src="./discounts.js"></script>
