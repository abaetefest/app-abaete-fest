export default {
  name: 'PageContact',
  methods: {
    handleInstagram() {
      this.$mixpanel.track('contact-instagram')
    },
    handleWhatsapp() {
      this.$mixpanel.track('contact-whatsapp')
    }
  }
}
