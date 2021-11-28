
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
      { path: 'home', name: 'home', component: () => import('src/pages/Index.vue'), meta: { tab: true } },
      { path: 'events/:type', name: 'events', component: () => import('src/pages/Events.vue'), meta: { tab: true } },
      { path: 'tourism', name: 'tourism', component: () => import('src/pages/Tourism.vue'), meta: { tab: true } },
      { path: 'map', name: 'map', component: () => import('src/pages/MapCity.vue'), meta: { tab: true } },
      { path: 'event-details/:id', name: 'eventDetails', component: () => import('src/pages/EventDetails.vue'), meta: { tab: false } },
      { path: 'manage-events', name: 'manageEvents', component: () => import('src/pages/ManageEvents.vue'), meta: { admin: true } },
      { path: 'manage-tourism', name: 'manageTourism', component: () => import('src/pages/ManageTourism.vue'), meta: { admin: true } },
      { path: 'manage-users', name: 'manageUsers', component: () => import('src/pages/ManageUsers.vue'), meta: { admin: true } },
      { path: 'contact', name: 'contact', component: () => import('pages/Contact.vue'), meta: { tab: true } },
      { path: 'combos', name: 'combos', component: () => import('pages/Combos.vue'), meta: { tab: true } },
      { path: 'form-events/:id?', name: 'formEvents', component: () => import('pages/FormEvents.vue'), props: true },
      { path: 'form-tourism/:id?', name: 'formTourism', component: () => import('pages/FormTourism.vue'), props: true },
      { path: 'user-informations', name: 'userInformations', component: () => import('pages/UserInformations.vue'), props: true, meta: { tab: true } }
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
