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
          AbaetéFest
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
        <q-btn-dropdown color="white" size="lg" label="" flat rounded>
          <q-list>
            <q-item clickable @click="confirmLogout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
               <q-item-section avatar>
                <q-icon color="primary" name="mdi-open-in-new" size="1rem" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-footer class="lt-md">
      <q-tabs
        align="justify"
        dense
        no-caps
        indicator-color="white"
        class="bg-white text-weight-thin text-grey-7 shadow-3"
        active-color="primary"
      >
        <q-route-tab
          v-for="(tab, index) in essentialLinks"
          :key="index"
          :icon="tab.icon"
          :label="tab.title"
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

      <q-list>
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
    title: 'Promoções',
    icon: 'mdi-food',
    route: 'combos',
    disable: true
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
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: menusRoute,
      adminLinks: adminRoute
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('abaete-fest-token')
      this.$router.push('/')
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
    }
  }
}
</script>
