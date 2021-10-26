
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
      { path: 'manage-events', name: 'manageEvents', component: () => import('src/pages/ManageEvents.vue'), meta: { admin: true } },
      { path: 'contact', name: 'contact', component: () => import('pages/Contact.vue') },
      { path: 'combos', name: 'combos', component: () => import('pages/Combos.vue') },
      { path: 'form-events/:id?', name: 'formEvents', component: () => import('pages/FormEvents.vue'), props: true }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
