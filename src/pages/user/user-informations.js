export default {
  name: 'PageUserInformations',
  data() {
    return {
      notify: false,
      email: ''
    }
  },
  mounted() {
    this.getEmail()
  },
  methods: {
    getEmail() {
      const email = localStorage.getItem('abaete-email')
      if (email) {
        this.email = email
      }
      console.log(email)
    }
  }
}
