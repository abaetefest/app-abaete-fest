
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', name: 'home', component: () => import('src/pages/Index.vue'), meta: { tab: true } },
      { path: '', name: 'home', component: () => import('src/pages/Events.vue'), meta: { tab: true } },
      { path: 'events/:type?', name: 'events', component: () => import('src/pages/Events.vue'), meta: { tab: true } },
      { path: 'tourism', name: 'tourism', component: () => import('src/pages/Tourism.vue'), meta: { tab: true } },
      { path: 'map', name: 'map', component: () => import('src/pages/MapCity.vue'), meta: { tab: true } },
      { path: 'places', name: 'places', component: () => import('src/pages/Places.vue'), meta: { tab: true } },
      { path: 'services', name: 'services', component: () => import('src/pages/Services.vue'), meta: { tab: true } },
      { path: 'trips', name: 'trips', component: () => import('src/pages/Trips.vue'), meta: { tab: true } },
      { path: 'radio', name: 'radio', component: () => import('src/pages/Radio.vue'), meta: { tab: true } },
      { path: 'radio-player/:id/:img', name: 'radio-player', component: () => import('src/pages/RadioPlayer.vue'), meta: { tab: true } },
      { path: 'event-details/:id', name: 'eventDetails', component: () => import('src/pages/EventDetails.vue'), meta: { tab: false } },
      { path: 'contact', name: 'contact', component: () => import('pages/Contact.vue'), meta: { tab: true } },
      { path: 'user-informations', name: 'userInformations', component: () => import('pages/UserInformations.vue'), props: true, meta: { tab: true } }
    ],
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'manage-events', name: 'manageEvents', component: () => import('src/pages/ManageEvents.vue'), meta: { admin: true } },
      { path: 'manage-tourism', name: 'manageTourism', component: () => import('src/pages/ManageTourism.vue'), meta: { admin: true } },
      { path: 'manage-users', name: 'manageUsers', component: () => import('src/pages/ManageUsers.vue'), meta: { admin: true } },
      { path: 'form-events/:id?', name: 'formEvents', component: () => import('pages/FormEvents.vue'), props: true },
      { path: 'form-tourism/:id?', name: 'formTourism', component: () => import('pages/FormTourism.vue'), props: true }
      // { path: 'user-informations', name: 'userInformations', component: () => import('pages/UserInformations.vue'), props: true, meta: { tab: true } }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('src/pages/Login.vue') },
      { path: 'cadastro', name: 'cadastro', component: () => import('src/pages/Cadastro.vue') }
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
