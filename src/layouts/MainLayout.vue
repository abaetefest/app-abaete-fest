<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          class="gt-sm"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <q-avatar size="sm">
            <img src="architecture-and-city.png" />
          </q-avatar>
          AbaetéFest
        </q-toolbar-title>

        <q-btn
          v-if="canShare"
          flat
          round
          dense
          icon="mdi-share-variant-outline"
          @click="shareApp"
        />

        <!-- <div>Quasar v{{ version_app }}</div> -->
        <!-- <q-btn-dropdown color="white" size="lg" label="" flat rounded>
          <q-list>
            <q-item clickable @click="goTo('userInformations')">
              <q-item-section>
                <q-item-label>Perfil</q-item-label>
              </q-item-section>
               <q-item-section avatar>
                <q-icon color="primary" name="mdi-account-circle-outline" size="1.2rem" />
              </q-item-section>
            </q-item>
            <q-item clickable @click="confirmLogout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
               <q-item-section avatar>
                <q-icon color="primary" name="mdi-open-in-new" size="1.2rem" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown> -->
      </q-toolbar>
    </q-header>

    <q-footer v-if="!!$route.meta.tab" class="lt-md bg-white" :class="$q.platform.is.ios ? 'q-pb-md' : ''" >
      <q-tabs
        align="justify"
        dense
        no-caps
        indicator-color="white"
        class="bg-white text-weight-thin text-grey-7"
        :class="$q.platform.is.ios ? 'q-pb-md' : ''"
        active-color="primary"
      >
        <q-route-tab
          v-for="(tab, index) in essentialLinks"
          :key="index"
          :icon="tab.icon"
          :label="tab.title"
          exact
          content-class="text-weight-thin"
          :to="{ name: tab.route }"
        >
        </q-route-tab>
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-list v-if="isAdmin">
        <q-item-label
          header
          class="text-grey-8"
        >
          Admin
        </q-item-label>
        <EssentialLink
          v-for="link in adminLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const menusRoute = [
  {
    title: 'Eventos',
    icon: 'mdi-calendar',
    route: 'home'
  },
  {
    title: 'Locais',
    icon: 'mdi-storefront-outline',
    route: 'places'
  },
  {
    title: 'Viagens',
    icon: 'mdi-bus-clock',
    route: 'trips'
  },
  // {
  //   title: 'Mapa',
  //   icon: 'mdi-map',
  //   route: 'map'
  // },
  // {
  //   title: 'Promoções',
  //   icon: 'mdi-food',
  //   route: 'combos',
  //   disable: true
  // },
  {
    title: 'P. Turísticos',
    icon: 'mdi-map-marker-radius',
    route: 'tourism'
  },
  // {
  //   title: 'Rádios',
  //   icon: 'mdi-radio',
  //   route: 'radio'
  // },
  {
    title: 'Contato',
    icon: 'mdi-card-account-mail-outline',
    route: 'contact'
  }
]

const adminRoute = [
  {
    title: 'Gerenciar Eventos',
    icon: 'mdi-monitor-dashboard',
    route: 'manageEvents'
  },
  {
    title: 'Gerenciar Pontos Turísticos',
    icon: 'mdi-map-marker-radius',
    route: 'manageTourism'
  },
  {
    title: 'Gerenciar Usuários',
    icon: 'mdi-monitor-dashboard',
    route: 'manageUsers'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: menusRoute,
      adminLinks: adminRoute,
      isAdmin: false,
      version: process.env.VERSION,
      canShare: false,
      version_app: process.env.VERSION_APP
    }
  },
  mounted () {
    if (JSON.parse(localStorage.getItem('abaete-manage'))) {
      this.isAdmin = true
    }
    if (!navigator.canShare) {
      this.canShare = false
    } else {
      this.canShare = true
    }
    // Solução para recarregar Safari quando não encontrar arquivos JS
    if (!window.chrome) {
      window.addEventListener('error', (e) => {
        const srcError = e.target.src
        if (srcError.includes('/js/')) {
          window.location.reload()
        }
      }, true)
    }
  },
  methods: {
    logout (rota = '/') {
      localStorage.removeItem('abaete-fest-token')
      localStorage.removeItem('abaete-manage')
      localStorage.removeItem('abaete-email')
      this.$router.push(rota)
    },
    goTo (routeName) {
      this.$router.push({ name: routeName })
    },
    confirmLogout () {
      this.$q.dialog({
        title: 'Sair da Sessão ?',
        message: 'Tem certeza que deseja fazer o logout ?',
        cancel: true,
        html: true,
        persistent: true
      }).onOk(() => {
        this.logout()
      })
    },
    async shareApp () {
      const shareData = {
        title: 'AbaetéFest',
        text: 'Conheça o app da cidade de Abaetetuba!',
        url: 'https://abaetefest.com.br'
      }

      try {
        await navigator.share(shareData)
      } catch (err) {
        this.$notifyDanger('Não foi possível compartilharo app!')
      }
    }
  }
}
</script>
