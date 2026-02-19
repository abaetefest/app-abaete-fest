<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="$q.dark.isActive ? 'bg-primary' : 'bg-primary'">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
          <q-space />

        <q-toolbar-title>
          <q-avatar size="xl" rounded>
            <img src="new-abaetefest.png" alt="logo abaetéfest" />
          </q-avatar>
        </q-toolbar-title>

        <q-toggle
          v-model="darkMode"
          checked-icon="mdi-moon-waning-crescent"
          :color="$q.dark.isActive ? 'grey-7' : 'white'"
          unchecked-icon="mdi-white-balance-sunny"
          size="lg"
          @input="setDarkMode"
        />

        <!-- <q-btn
          v-if="canShare"
          flat
          round
          dense
          icon="mdi-share-variant-outline"
          @click="shareApp"
        /> -->

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

    <q-footer
      v-if="!!$route.meta.tab" class="lt-md"
      :class="[
        $q.platform.is.ios ? 'q-pb-md' : '',
        $q.dark.isActive ? 'bg-primary' : 'bg-white'
      ]"
      >
      <q-tabs
        align="justify"
        dense
        no-caps
        indicator-color="white"
        mobile-arrows
        :class="[
          $q.dark.isActive ? 'bg-primary text-white' : 'bg-white text-weight-thin text-grey-7',
          $q.platform.is.ios ? 'q-pb-md' : ''
        ]"
        :active-color="$q.dark.isActive ? 'secondary' : 'primary'"
      >
        <q-route-tab
          v-for="(tab, index) in essentialLinks"
          v-show="tab.footer"
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
      :content-class="$q.dark.isActive ? 'bg-primary' : 'bg-grey-1'"
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
      <q-dialog v-model="notificationModal" persistent >
        <q-card class="full-width">
          <q-card-section class="row items-center">
            <q-avatar icon="mdi-bell-ring" color="primary" text-color="white" />
            <span class="q-ml-sm text-body2">Permita nossas notificações <br> e não perca nenhuma novidade!</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              outline
              label="Agora não"
              :color="$q.dark.isActive ? 'negative' : 'negative'"
              v-close-popup
              @click="recusaNotificacao()"
            />
            <q-btn
              icon="mdi-check-circle-outline"
              label="Aceitar notificações"
              :color="$q.dark.isActive ? 'secondary' : 'primary'"
              :text-color="$q.dark.isActive ? 'primary' : 'secondary'"
              v-close-popup
              @click="confirmarPermissao" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const menusRoute = [
  {
    title: 'Eventos',
    icon: 'mdi-calendar',
    route: 'home',
    footer: true
  },
  {
    title: 'Viagens',
    icon: 'mdi-bus-clock',
    route: 'trips',
    footer: true
  },
  {
    title: 'Locais',
    icon: 'mdi-storefront-outline',
    route: 'places',
    footer: true
  },
  {
    title: 'P. Turísticos',
    icon: 'mdi-map-marker-radius',
    route: 'tourism',
    footer: true
  },
  {
    title: 'Blog',
    icon: 'mdi-post-outline',
    route: 'blog',
    footer: true
  },
  {
    title: 'Telefones Úteis',
    icon: 'mdi-hammer-screwdriver',
    route: 'services'
  },
  {
    title: 'Podcasts',
    icon: 'mdi-microphone-variant',
    route: 'podcast'
  },
  {
    title: 'Rádios',
    icon: 'mdi-radio',
    route: 'radio'
  },
  {
    title: 'Clima e Tempo',
    icon: 'mdi-weather-cloudy',
    route: 'clima'
  },
  {
    title: 'Sobre a Cidade',
    icon: 'mdi-book-open-variant',
    route: 'about-city'
  },
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
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: menusRoute,
      adminLinks: adminRoute,
      isAdmin: false,
      version: process.env.VERSION,
      canShare: false,
      version_app: process.env.VERSION_APP,
      darkMode: false,
      notificationModal: false,
      colorConsole: 'background: #111; color: #BE1A25'
    }
  },
  async mounted() {
    if (JSON.parse(localStorage.getItem('abaete-manage'))) {
      this.isAdmin = true
    }
    if (!navigator.canShare) {
      this.canShare = false
    } else {
      this.canShare = true
    }
    // Solução para recarregar Safari quando não encontrar arquivos JS
    // window.addEventListener('error', (e) => {
    //   const srcError = e.target.src
    //   if (srcError.includes('/js/')) {
    //     window.location.reload()
    //   }
    // }, true)

    this.verifyDarkMode()
    // this.verificarPermissaoNotificacoes()
  },
  methods: {
    logout(rota = '/') {
      localStorage.removeItem('abaete-fest-token')
      localStorage.removeItem('abaete-manage')
      localStorage.removeItem('abaete-email')
      this.$router.push(rota)
    },
    goTo(routeName) {
      this.$router.push({ name: routeName })
    },
    confirmLogout() {
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
    async shareApp() {
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
    },
    setDarkMode(darkValue) {
      this.$mixpanel.track('darkMode', { darkModeValue: darkValue })
      this.$q.dark.set(darkValue)
      this.$q.localStorage.set('dark-mode-abaetefest', darkValue)
    },
    verifyDarkMode() {
      const darkModeLocalStorage = this.$q.localStorage.getItem('dark-mode-abaetefest')
      if (darkModeLocalStorage) {
        this.setDarkMode(true)
        this.darkMode = true
      } else {
        this.setDarkMode(false)
        this.darkMode = false
      }
    },
    async verificarPermissaoNotificacoes() {
    // Verifica se o navegador tem suporte a notificações
      if ('Notification' in window) {
        // Verifica o status da permissão de notificações
        if (Notification.permission === 'granted') {
          console.log('%c Notificações já permitidas.', this.colorConsole)
        } else if (Notification.permission === 'denied') {
          let dataUltimaRecusa = localStorage.getItem('dataUltimaRecusa')
          if (dataUltimaRecusa) {
            // Converte a string para objeto Date
            dataUltimaRecusa = new Date(dataUltimaRecusa)
            const diasDepois = (new Date() - dataUltimaRecusa) / (1000 * 3600 * 24)
            // Se passaram mais de 2 dias desde a recusa, solicita novamente
            if (diasDepois > 2) {
              this.solicitarPermissao()
            } else {
              console.log('%c Você recusou recentemente, aguardando 2 dias para solicitar novamente.', this.colorConsole)
            }
          } else {
            console.log('%c Você recusou recentemente, aguardando 2 dias para solicitar novamente.', this.colorConsole)
          }
        } else {
          this.solicitarPermissao()
        }
      } else {
        console.log('%c Este navegador não suporta notificações.', this.colorConsole)
      }
    },
    solicitarPermissao() {
      this.notificationModal = true
    },
    confirmarPermissao() {
      this.notificationModal = false
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('%c Notificações permitidas.', this.colorConsole)
        } else {
          console.log('%c Notificações recusadas.', this.colorConsole)
          // Salva a data da recusa no localStorage
          localStorage.setItem('dataUltimaRecusa', new Date().toISOString())
        }
      })
    },
    recusaNotificacao() {
      this.notificationModal = false
      // Salva a data da recusa no localStorage
      localStorage.setItem('dataUltimaRecusa', new Date().toISOString())
    }
  }
}
</script>
