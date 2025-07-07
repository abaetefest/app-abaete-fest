// Estratégia 1: Componentes Síncronos vs Assíncronos
// Componentes críticos (primeira visualização) - carregamento síncrono
import MainLayout from 'layouts/MainLayout.vue'
import Events from 'src/pages/events/Events.vue'

const routes = [
  {
    path: '/',
    component: MainLayout, // Síncrono - sempre necessário
    children: [
      // === ROTAS CRÍTICAS (Bundle Principal) ===
      // Página inicial - sempre carregada primeiro
      {
        path: '',
        name: 'home',
        component: Events, // Síncrono - página inicial
        meta: {
          tab: true,
          priority: 'high',
          preload: true
        }
      },

      // === ROTAS SECUNDÁRIAS (Lazy Loading) ===
      // Páginas acessadas após navegação inicial
      {
        path: 'events/:type?',
        name: 'events',
        component: () => import(
          /* webpackChunkName: "events" */
          /* webpackPrefetch: true */
          'src/pages/events/Events.vue'
        ),
        meta: {
          tab: true,
          priority: 'high',
          preload: true
        }
      },

      // === CHUNK: TOURISM ===
      {
        path: 'tourism',
        name: 'tourism',
        component: () => import(
          /* webpackChunkName: "tourism" */
          /* webpackPrefetch: true */
          'src/pages/tourism/Tourism.vue'
        ),
        meta: {
          tab: true,
          priority: 'medium'
        }
      },
      {
        path: 'places',
        name: 'places',
        component: () => import(
          /* webpackChunkName: "tourism" */
          'src/pages/places/Places.vue'
        ),
        meta: {
          tab: true,
          priority: 'medium'
        }
      },
      {
        path: 'trips',
        name: 'trips',
        component: () => import(
          /* webpackChunkName: "tourism" */
          'src/pages/trips/Trips.vue'
        ),
        meta: {
          tab: true,
          priority: 'low'
        }
      },

      // === CHUNK: MAP ===
      {
        path: 'map',
        name: 'map',
        component: () => import(
          /* webpackChunkName: "map" */
          /* webpackPreload: true */
          'src/pages/map-city/MapCity.vue'
        ),
        meta: {
          tab: true,
          priority: 'medium'
        }
      },

      // === CHUNK: MEDIA ===
      {
        path: 'radio',
        name: 'radio',
        component: () => import(
          /* webpackChunkName: "media" */
          'src/pages/radio/Radio.vue'
        ),
        meta: {
          tab: true,
          priority: 'low'
        }
      },
      {
        path: 'radio-player/:id',
        name: 'radio-player',
        component: () => import(
          /* webpackChunkName: "media" */
          'src/pages/radio/RadioPlayer.vue'
        ),
        meta: {
          tab: true,
          priority: 'low'
        }
      },
      {
        path: 'podcast',
        name: 'podcast',
        component: () => import(
          /* webpackChunkName: "media" */
          'src/pages/podcast/Podcast.vue'
        ),
        props: true,
        meta: {
          tab: true,
          priority: 'low'
        }
      },

      // === CHUNK: UTILITIES ===
      {
        path: 'services',
        name: 'services',
        component: () => import(
          /* webpackChunkName: "utilities" */
          'src/pages/services/Services.vue'
        ),
        meta: {
          tab: true,
          priority: 'low'
        }
      },
      {
        path: 'clima',
        name: 'clima',
        component: () => import(
          /* webpackChunkName: "utilities" */
          'src/pages/climate/Climate.vue'
        ),
        props: true,
        meta: {
          tab: true,
          priority: 'low'
        }
      },

      // === CHUNK: INFO ===
      {
        path: 'contact',
        name: 'contact',
        component: () => import(
          /* webpackChunkName: "info" */
          'src/pages/contact/Contact.vue'
        ),
        meta: {
          tab: true,
          priority: 'low'
        }
      },
      {
        path: 'about-city',
        name: 'about-city',
        component: () => import(
          /* webpackChunkName: "info" */
          'src/pages/about-city/AboutCity.vue'
        ),
        props: true,
        meta: {
          tab: true,
          priority: 'low'
        }
      },

      // === CHUNK: USER ===
      {
        path: 'user-informations',
        name: 'userInformations',
        component: () => import(
          /* webpackChunkName: "user" */
          'src/pages/user/UserInformations.vue'
        ),
        props: true,
        meta: {
          tab: true,
          priority: 'medium'
        }
      },

      // === ROTAS DETALHADAS (Carregamento sob demanda) ===
      {
        path: 'event-details/:id',
        name: 'eventDetails',
        component: () => import(
          /* webpackChunkName: "event-details" */
          'src/pages/event-details/EventDetails.vue'
        ),
        meta: {
          tab: false,
          priority: 'high'
        }
      }
    ],
    meta: {
      requiresAuth: false
    }
  },

  // === CHUNK: ADMIN (Separado completamente) ===
  {
    path: '/admin',
    component: () => import(
      /* webpackChunkName: "admin-layout" */
      'layouts/MainLayout.vue'
    ),
    children: [
      {
        path: 'manage-events',
        name: 'manageEvents',
        component: () => import(
          /* webpackChunkName: "admin" */
          'src/pages/admin/ManageEvents.vue'
        ),
        meta: {
          admin: true,
          priority: 'low'
        }
      },
      {
        path: 'manage-tourism',
        name: 'manageTourism',
        component: () => import(
          /* webpackChunkName: "admin" */
          'src/pages/admin/ManageTourism.vue'
        ),
        meta: {
          admin: true,
          priority: 'low'
        }
      },
      {
        path: 'manage-users',
        name: 'manageUsers',
        component: () => import(
          /* webpackChunkName: "admin" */
          'src/pages/admin/ManageUsers.vue'
        ),
        meta: {
          admin: true,
          priority: 'low'
        }
      },
      {
        path: 'form-events/:id?',
        name: 'formEvents',
        component: () => import(
          /* webpackChunkName: "admin" */
          'src/pages/admin/FormEvents.vue'
        ),
        props: true,
        meta: {
          priority: 'low'
        }
      },
      {
        path: 'form-tourism/:id?',
        name: 'formTourism',
        component: () => import(
          /* webpackChunkName: "admin" */
          'src/pages/admin/FormTourism.vue'
        ),
        props: true,
        meta: {
          priority: 'low'
        }
      }
    ],
    meta: {
      requiresAuth: true
    }
  },

  // === CHUNK: AUTH (Separado) ===
  {
    path: '/auth',
    component: () => import(
      /* webpackChunkName: "auth-layout" */
      'layouts/Login.vue'
    ),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(
          /* webpackChunkName: "auth" */
          'src/pages/admin/Login.vue'
        )
      },
      {
        path: 'cadastro',
        name: 'cadastro',
        component: () => import(
          /* webpackChunkName: "auth" */
          'src/pages/admin/Cadastro.vue'
        )
      }
    ]
  },

  // === REDIRECT ROUTES ===
  { path: '/login', redirect: '/auth/login' },
  { path: '/cadastro', redirect: '/auth/cadastro' },
  { path: '/manage-events', redirect: '/admin/manage-events' },
  { path: '/manage-tourism', redirect: '/admin/manage-tourism' },
  { path: '/manage-users', redirect: '/admin/manage-users' },

  // === 404 ===
  {
    path: '*',
    component: () => import(
      /* webpackChunkName: "error" */
      'pages/Error404.vue'
    )
  }
]

export default routes
