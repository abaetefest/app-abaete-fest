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

        <q-toolbar-title class="text-center">
          <div class="row items-center justify-center">
            <!-- Clima na toolbar -->
            <div
              v-if="weatherTemp !== null"
              class="row items-center q-mr-sm cursor-pointer"
              @click="goTo('clima')"
            >
              <q-icon :name="weatherIcon" color="white" size="28px" />
              <span class="text-white text-weight-bold q-ml-xs" style="font-size: 15px;">{{ weatherTemp }}°C</span>
            </div>

            <q-toggle
              v-model="darkMode"
              checked-icon="mdi-moon-waning-crescent"
              :color="$q.dark.isActive ? 'grey-7' : 'white'"
              unchecked-icon="mdi-white-balance-sunny"
              size="lg"
              @input="setDarkMode"
            />
          </div>
        </q-toolbar-title>

        <q-avatar size="xl" rounded>
          <img src="new-abaetefest.png" alt="logo abaetéfest" />
        </q-avatar>

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
      v-if="!!$route.meta.tab"
      class="lt-md floating-footer"
    >
      <q-tabs
        class="floating-nav"
        align="justify"
        dense
        no-caps
        indicator-color="transparent"
        mobile-arrows
        :class="$q.dark.isActive ? 'bg-primary text-grey-4' : 'bg-white text-grey-8'"
        :active-color="$q.dark.isActive ? 'white' : 'primary'"
      >
        <q-route-tab
          v-for="(tab, index) in essentialLinks"
          v-show="tab.footer"
          :key="index"
          :icon="tab.icon"
          :label="tab.title"
          :alert="tab.alert || false"
          exact
          content-class="text-weight-medium"
          :to="{ name: tab.route }"
        />
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
            <q-btn rounded
              outline
              label="Agora não"
              :color="$q.dark.isActive ? 'negative' : 'negative'"
              v-close-popup
              @click="recusaNotificacao()"
            />
            <q-btn rounded
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
    title: 'Descontos',
    icon: 'mdi-sale',
    route: 'discounts',
    footer: true,
    badge: 'Novo',
    alert: 'orange'
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
      colorConsole: 'background: #111; color: #BE1A25',
      weatherTemp: null,
      weatherCondition: ''
    }
  },
  computed: {
    weatherIcon() {
      const map = {
        storm: 'mdi-weather-lightning-rainy',
        snow: 'mdi-weather-snowy',
        hail: 'mdi-weather-hail',
        rain: 'mdi-weather-pouring',
        fog: 'mdi-weather-fog',
        clear_day: 'mdi-weather-sunny',
        clear_night: 'mdi-weather-night',
        cloud: 'mdi-weather-cloudy',
        cloudly_day: 'mdi-weather-partly-cloudy',
        cloudly_night: 'mdi-weather-night-partly-cloudy',
        sleet: 'mdi-weather-snowy-rainy',
        wind: 'mdi-weather-windy'
      }
      return map[this.weatherCondition] || 'mdi-weather-cloudy'
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
    this.fetchToolbarWeather()
    // this.verificarPermissaoNotificacoes()
  },
  methods: {
    async fetchToolbarWeather() {
      const CACHE_KEY = 'abaetefest-weather-cache'
      const CACHE_TTL = 30 * 60 * 1000 // 30 minutos
      try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
        if (cached && Date.now() - cached.ts < CACHE_TTL) {
          this.weatherTemp = cached.temp
          this.weatherCondition = cached.condition
          return
        }
        const res = await fetch('https://api.hgbrasil.com/weather?format=json-cors&key=3ae5537e&woeid=458294')
        if (!res.ok) return
        const data = await res.json()
        this.weatherTemp = data.results.temp
        this.weatherCondition = data.results.condition_slug
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          temp: this.weatherTemp,
          condition: this.weatherCondition,
          ts: Date.now()
        }))
      } catch {}
    },
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

<style>
/* Footer flutuante */
.floating-footer {
  background: transparent !important;
  padding: 0 12px 10px;
  /* cobre iOS (home indicator) e Android com nav gesture ou botões virtuais */
  padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px));
}

.floating-nav {
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.14);
  border: 1px solid rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.body--dark .floating-nav {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Ícone ativo: scale + cor via active-color do Quasar */
.floating-nav .q-tab--active .q-tab__icon {
  transform: scale(1.25);
  transition: transform 0.25s ease;
}

.floating-nav .q-tab--active .q-tab__label {
  font-weight: 700;
}

/* Setas de navegação do mobile-arrows */
.floating-nav .q-tabs__arrow {
  color: var(--q-color-primary);
}

.body--dark .floating-nav .q-tabs__arrow {
  color: white;
}
</style>
