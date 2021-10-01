
const routes = [
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', name: 'login', component: () => import('src/pages/Login.vue') },
      { path: 'cadastro', name: 'cadastro', component: () => import('src/pages/Cadastro.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', name: 'home', component: () => import('src/pages/Index.vue') },
      { path: 'events/:type', name: 'events', component: () => import('src/pages/Events.vue') },
      { path: 'contact', name: 'contact', component: () => import('pages/Contact.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
