import AmazonProducts from 'src/components/AmazonProducts.vue'

export default {
  name: 'DiscountsPage',
  components: { AmazonProducts },
  data() {
    return {
      products: [],
      loading: true
    }
  },
  async created() {
    if (process.env.SERVER) return
    try {
      const res = await fetch('/.netlify/functions/amazon-products')
      if (!res.ok) return
      const { products } = await res.json()
      if (products && products.length) this.products = products
    } catch (e) {
      // sem conexão com a função — página permanece vazia
    } finally {
      this.loading = false
    }
  }
}
