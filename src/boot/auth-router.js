import { Notify } from 'quasar'
function userExist () {
  return !!localStorage.getItem('abaete-fest-token')
}

export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const adminRoute = to.matched.some(record => record.meta.admin)
    const isAdmin = JSON.parse(localStorage.getItem('abaete-manage'))
    console.log('routeadmin', adminRoute)
    console.log('isadmin', isAdmin)
    // console.log(requiresAuth)
    // console.log(userExist())
    if (requiresAuth && !userExist()) {
      Notify.create({
        color: 'negative',
        position: 'bottom',
        message: 'Você precisa estar logado!',
        icon: 'mdi-alert'
      })
      next('/')
    } else {
      if (adminRoute && !isAdmin) {
        Notify.create({
          color: 'negative',
          position: 'bottom',
          message: 'Você não tem permissao de acesso!',
          icon: 'mdi-alert'
        })
        next('/')
      }
      if (userExist() && to.name === 'login') {
        next('home')
      }
      next()
    }
  })
}
