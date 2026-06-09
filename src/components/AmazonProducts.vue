<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="col-12"
    >
      <q-card
        style="border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.10);"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
      >
        <!-- Imagem + badge de desconto -->
        <div style="position: relative;">
          <div
            v-if="getDiscount(product)"
            style="position: absolute; top: 8px; left: 8px; z-index: 1; background: #e53935; color: white; font-weight: 700; font-size: 12px; border-radius: 6px; padding: 2px 7px;"
          >
            {{ getDiscount(product) }}
          </div>
          <a
            :href="product.href"
            target="_blank"
            rel="noopener noreferrer sponsored"
            @click="track(product.bannerEvent)"
            style="text-decoration: none; display: block;"
          >
            <img
              :src="product.image"
              :alt="product.alt"
              style="width: 100%; height: auto; display: block; border-radius: 12px 12px 0 0;"
            />
          </a>
        </div>

        <!-- Conteúdo -->
        <q-card-section class="q-pa-sm q-pb-none">
          <img src="/advertising/amazon.png" alt="Amazon" style="height: 14px; display: block; margin-bottom: 4px;" />
          <div
            class="text-body2 text-weight-bold ellipsis-2-lines q-mb-xs"
            style="min-height: 40px; line-height: 1.4;"
            :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
          >
            {{ product.name }}
          </div>

          <div
            class="text-caption text-grey-6 q-mb-xs"
            style="text-decoration: line-through; min-height: 14px; font-size: 11px;"
          >
            {{ product.originalPrice ? 'De: ' + product.originalPrice : '' }}
          </div>

          <div class="price-pulse q-mb-sm" style="display: inline-block; background: #fb8c00; border-radius: 8px; padding: 3px 8px;">
            <span class="text-weight-bold text-white" style="font-size: 16px; line-height: 1.3;">{{ product.price }}</span>
          </div>
        </q-card-section>

        <!-- Botão full-width -->
        <q-card-actions class="q-pa-sm q-pt-none">
          <a
            :href="product.href"
            target="_blank"
            rel="noopener noreferrer sponsored"
            @click="track(product.buttonEvent)"
            style="text-decoration: none; width: 100%;"
          >
            <q-btn
              unelevated
              rounded
              dense
              color="orange-8"
              label="Ver na Amazon"
              icon-right="mdi-open-in-new"
              no-caps
              class="full-width text-weight-bold"
            />
          </a>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AmazonProducts',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  methods: {
    track(event) {
      if (this.$mixpanel && event) {
        this.$mixpanel.track(event)
      }
    },
    parsePrice(str) {
      if (!str) return null
      const clean = str.replace(/[^\d,]/g, '').replace(',', '.')
      const num = parseFloat(clean)
      return isNaN(num) ? null : num
    },
    getDiscount(product) {
      if (!product.originalPrice || !product.price) return null
      const orig = this.parsePrice(product.originalPrice)
      const curr = this.parsePrice(product.price)
      if (!orig || !curr || curr >= orig) return null
      const pct = Math.round((1 - curr / orig) * 100)
      if (pct < 5 || pct > 90) return null
      return `-${pct}%`
    }
  }
}
</script>

<style scoped>
.price-pulse {
  animation: pricePulse 1.8s ease-in-out infinite;
}

@keyframes pricePulse {
  0%, 100% {
    background: #fb8c00;
    box-shadow: 0 0 0px rgba(251, 140, 0, 0);
  }
  50% {
    background: #e65100;
    box-shadow: 0 0 10px rgba(230, 81, 0, 0.5);
  }
}
</style>
