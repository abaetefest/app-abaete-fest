<template>
  <div>
    <div class="text-center q-mb-md">
      <img src="/advertising/amazon.png" alt="Amazon" style="height: 32px;" />
    </div>
  <div class="row q-col-gutter-sm">
    <div
      v-for="(product, index) in products"
      :key="index"
      class="col-6 col-md-4 col-lg-3"
    >
      <q-card
        class="fit product-card"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
      >
        <!-- Imagem 1:1 + badge de desconto -->
        <div class="image-wrapper">
          <div
            v-if="getDiscount(product)"
            class="discount-badge"
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
              class="product-image"
            />
          </a>
        </div>

        <!-- Conteúdo -->
        <q-card-section class="q-pa-xs q-pb-none">
          <div
            class="product-name ellipsis-2-lines q-mb-xs"
            :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
          >
            {{ product.name }}
          </div>

          <div
            v-if="product.originalPrice"
            class="original-price q-mb-xs"
          >
            De: {{ product.originalPrice }}
          </div>

          <div class="price-pulse q-mb-xs" style="display: inline-block; background: #fb8c00; border-radius: 6px; padding: 2px 6px;">
            <span class="text-weight-bold text-white product-price">{{ product.price }}</span>
          </div>
        </q-card-section>

        <!-- Botão full-width -->
        <q-card-actions class="q-pa-xs q-pt-none">
          <a
            :href="product.href"
            target="_blank"
            rel="noopener noreferrer sponsored"
            @click="track(product.buttonEvent)"
            style="text-decoration: none; width: 100%;"
          >
            <q-btn
              outline
              rounded
              dense
              color="primary"
              label="Resgatar oferta"
              icon-right="mdi-open-in-new"
              no-caps
              class="full-width"
              style="font-size: 11px;"
            />
          </a>
        </q-card-actions>
      </q-card>
    </div>
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
.product-card {
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.10);
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 10px 10px 0 0;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.discount-badge {
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 1;
  background: #e53935;
  color: white;
  font-weight: 700;
  font-size: 11px;
  border-radius: 4px;
  padding: 1px 5px;
}

.product-name {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  min-height: 32px;
}

.original-price {
  font-size: 10px;
  color: #9e9e9e;
  text-decoration: line-through;
}

.product-price {
  font-size: 13px;
  line-height: 1.3;
}

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
