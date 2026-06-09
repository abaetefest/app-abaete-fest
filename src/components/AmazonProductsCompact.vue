<template>
  <div>
    <div class="q-gutter-y-sm q-mb-sm">
      <q-card
        v-for="(product, index) in products"
        :key="index"
        style="border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.09);"
        :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
      >
        <q-card-section horizontal>
          <a
            :href="product.href"
            target="_blank"
            rel="noopener noreferrer sponsored"
            @click="track(product.bannerEvent)"
            style="text-decoration: none; flex-shrink: 0;"
          >
            <img
              :src="product.image"
              :alt="product.alt"
              style="width: 90px; height: 90px; object-fit: cover; border-radius: 10px 0 0 10px; display: block;"
            />
          </a>

          <div class="col q-pa-sm" style="min-width: 0; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <img src="/advertising/amazon.png" alt="Amazon" style="height: 13px; display: block; margin-bottom: 4px;" />
              <div
                class="text-body2 text-weight-bold ellipsis-2-lines q-mb-xs"
                style="line-height: 1.3;"
                :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
              >
                {{ product.name }}
              </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <div class="price-pulse-compact" style="display: inline-block; background: #fb8c00; border-radius: 6px; padding: 3px 10px;">
                <span class="text-weight-bold text-white" style="font-size: 14px; line-height: 1.3;">{{ product.price }}</span>
              </div>

              <a
                :href="product.href"
                target="_blank"
                rel="noopener noreferrer sponsored"
                @click="track(product.buttonEvent)"
                style="text-decoration: none; flex-shrink: 0;"
              >
                <q-btn
                  unelevated
                  rounded
                  color="orange-8"
                  no-caps
                  dense
                  class="text-weight-bold"
                  style="font-size: 11px;"
                >
                  Amazon <q-icon name="mdi-open-in-new" size="12px" class="q-ml-xs" />
                </q-btn>
              </a>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="text-center q-mb-md">
      <q-btn
        flat
        rounded
        no-caps
        color="primary"
        icon-right="mdi-arrow-right"
        label="Ver todos os descontos"
        size="sm"
        @click="goToDiscounts"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AmazonProductsCompact',
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
    goToDiscounts() {
      if (this.$mixpanel) {
        this.$mixpanel.track('Ver Todos Descontos Clicked - Trips')
      }
      this.$router.push({ name: 'discounts' })
    }
  }
}
</script>

<style scoped>
.price-pulse-compact {
  animation: pricePulse 1.8s ease-in-out infinite;
}

@keyframes pricePulse {
  0%, 100% {
    background: #fb8c00;
    box-shadow: 0 0 0px rgba(251, 140, 0, 0);
  }
  50% {
    background: #e65100;
    box-shadow: 0 0 8px rgba(230, 81, 0, 0.4);
  }
}
</style>
