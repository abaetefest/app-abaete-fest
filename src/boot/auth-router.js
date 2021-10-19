import { Notify } from 'quasar'
function userExist () {
  return !!localStorage.getItem('abaete-fest-token')
}

export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    console.log(requiresAuth)
    console.log(userExist())
    if (requiresAuth && !userExist()) {
      Notify.create({
        color: 'negative',
        position: 'bottom',
        message: 'Você precisa estar logado!',
        icon: 'mdi-alert'
      })
      next('/')
    } else {
      if (userExist() && to.name === 'login') {
        next('home')
      }
      next()
    }
  })
}
