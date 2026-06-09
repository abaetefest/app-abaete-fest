<template>
  <q-page padding :class="$q.dark.isActive ? '' : 'bg-grey-1'">
    <TripsTutorial :auto-start="true" @started="handleMixPanelEvent('Tutorial de Horários Iniciado')" />

    <!-- Título principal otimizado para SEO -->
    <div id="trips-title" class="text-h4 text-bold text-center q-py-md">
      <span class="text-accent">Horários</span> de viagens para Abaetetuba
    </div>

    <!-- Subtítulo com keywords relevantes -->
    <div class="text-center q-mb-lg">
      <p
        class="text-subtitle1"
        :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
      >
        Consulte os horários atualizados de ônibus e embarcações de Belém para
        Abaetetuba e vice-versa
      </p>

    </div>

    <!-- Banners Amazon Afiliados -->
    <AmazonProductsCompact :products="amazonProducts" class="q-mb-lg" />

    <!-- Seção principal de horários -->
    <div id="schedules-section" class="horarios-viagem">
      <div v-for="(trip, tripIndex) in trips" :key="tripIndex">
        <q-card
          class="q-mb-xl"
          :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
          :style="
            $q.dark.isActive
              ? 'box-shadow: 0 1px 5px rgba(255, 255, 255, 0.442);'
              : ''
          "
        >
          <q-card-section class="text-center bg-primary text-white">
            <div class="text-h5 text-weight-bold">
              🚌 {{ trip.cidade1 }} ↔ {{ trip.cidade2 }}
            </div>
            <div class="text-subtitle1 q-mt-sm">
              Horários atualizados de transporte entre {{ trip.cidade1 }} e
              {{ trip.cidade2 }}
            </div>
          </q-card-section>

          <q-list
            padding
            bordered
            class="rounded-borders company-list-item"
            :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
            v-for="(empresa, empresaIndex) in trip.empresas"
            :key="empresaIndex"
          >
            <q-expansion-item
              :icon="getEmpresaIcon(empresa.nome)"
              :label="empresa.nome"
              @click="handleMixPanelEvent(empresa.nome)"
              header-class="text-body1 text-bold"
              :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
            >
              <template v-slot:header>
                <q-item-section avatar>
                  <q-avatar class="float-right">
                    <img
                      :src="empresa.icon"
                      :alt="`Logo da empresa ${empresa.nome}`"
                      rounded
                    />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label class="text-weight-bold">{{
                    empresa.nome
                  }}</q-item-label>
                  <q-item-label caption>
                    Empresa de transporte -
                    {{ getRouteCount(empresa.viagens) }} rotas disponíveis
                  </q-item-label>
                </q-item-section>
              </template>

              <q-card>
                <q-card-section
                  class="row q-col-gutter-x-lg"
                  :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
                >
                  <div
                    v-for="(viagem, viagemIndex) in empresa.viagens"
                    :key="viagemIndex"
                    class="col-12 col-sm-6"
                  >
                    <q-separator class="q-mb-sm" />

                    <!-- Cabeçalho da rota -->
                    <div
                      class="q-pa-md q-mb-md text-center"
                      :class="
                        $q.dark.isActive
                          ? 'bg-secondary text-primary'
                          : 'bg-primary text-white'
                      "
                      style="border-radius: 10px"
                    >
                      <div class="text-h6 text-weight-bold">
                        {{ viagem.origem }} → {{ viagem.destino }}
                      </div>
                      <div class="text-subtitle2 q-mt-xs">
                        {{ viagem.periodo }}
                      </div>
                      <div class="text-caption q-mt-xs">
                        📅 {{ getFormattedPeriod(viagem.periodo) }}
                      </div>
                    </div>

                    <!-- Lista de horários -->
                    <q-list bordered separator class="rounded-borders">
                      <q-item
                        v-for="(horaViagem, horaIndex) in viagem.horarios"
                        :key="horaIndex"
                        clickable
                        v-ripple
                        dense
                        class="q-pa-sm"
                      >
                        <!--
                        <q-item-section avatar>
                          <q-icon
                            :name="getTransportIcon(horaViagem.modalidade)"
                            :color="getTransportColor(horaViagem.modalidade)"
                            size="sm"
                          />
                        </q-item-section>
                          -->
                        <q-item-section>
                          <q-item-label
                            class="text-weight-bold"
                            :class="
                              $q.screen.gt.sm ? 'text-h6' : 'text-subtitle1'
                            "
                          >
                            🕐 {{ horaViagem.hora }}
                          </q-item-label>
                          <q-item-label
                            caption
                            lines="2"
                            :class="
                              $q.dark.isActive ? 'text-red-6' : 'text-negative'
                            "
                            v-if="horaViagem.obs"
                          >
                            ⚠️ {{ horaViagem.obs }}
                          </q-item-label>
                        </q-item-section>

                        <q-item-section side v-if="horaViagem.modalidade">
                          <q-chip
                            :color="horaViagem.modalidade === 'Arapari' ? 'info': 'primary'"
                            text-color="white"
                            dense
                            class="text-weight-bold"
                          >
                            {{ horaViagem.modalidade }}
                          </q-chip>
                        </q-item-section>
                      </q-item>
                    </q-list>

                    <!-- Informações adicionais da rota -->
                    <div class="q-mb-sm text-center">
                      <q-badge color="primary" class="q-pa-xs text-weight-bold">
                        💺 {{ getScheduleCount(viagem.horarios) }} horários
                        disponíveis
                      </q-badge>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- Seção de legendas otimizada -->
    <div class="row" id="boarding-points-section">
      <div class="col-12 q-mb-lg">
        <div class="text-h6 text-bold text-center q-mb-md">
          📍 Pontos de Embarque em Belém
        </div>

        <q-card flat bordered class="q-pa-md">
          <q-list separator>
            <q-item>
              <q-item-section avatar>
                <q-icon
                  name="mdi-ferry"
                  color="primary"
                  size="md"
                  :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold"
                  >Porto Arapari</q-item-label
                >
                <q-item-label caption class="text-body2">
                  Portos Jarumã e Arapari próximo ao Açaí Biruta<br />
                  📍 R. Siqueira Mendes, 10 - Cidade Velha, Belém - PA,
                  66020-600
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon
                  name="mdi-bus"
                  color="primary"
                  size="md"
                  :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold"
                  >Terminal Rodoviário - Alça Viária</q-item-label
                >
                <q-item-label caption class="text-body2">
                  Terminal Rodoviário de Belém<br />
                  📍 São Brás, Belém - PA, 66090-000
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon
                  name="mdi-ship-wheel"
                  color="primary"
                  size="md"
                  :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold"
                  >Terminal Rodofluvial</q-item-label
                >
                <q-item-label caption class="text-body2">
                  Terminal Rodofluvial de Belém<br />
                  📍 Av. Bernardo Sayão, 3786 - Cidade Velha, Belém - PA
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- Seção de informações importantes -->

    <div id="important-info-section">
      <q-card
        flat
        bordered
        class="q-pa-lg"
        :class="
          $q.dark.isActive ? 'bg-dark text-white' : 'bg-primary text-white'
        "
      >
        <div class="text-h6 text-center q-mb-md text-weight-bold">
          ℹ️ Informações Importantes para sua Viagem
        </div>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6">
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="mdi-clock" color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold"
                    >Horários podem sofrer alterações</q-item-label
                  >
                  <q-item-label caption class="text-white">
                    Consulte sempre a empresa antes de viajar
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="mdi-weather-rainy" color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold"
                    >Condições climáticas</q-item-label
                  >
                  <q-item-label caption class="text-white">
                    Horários podem ser afetados por chuvas e marés
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-sm-6">
            <q-list>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="mdi-ticket" color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold"
                    >Compre sua passagem com antecedência</q-item-label
                  >
                  <q-item-label caption class="text-white">
                    Especialmente em feriados e fins de semana
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="mdi-phone" color="white" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold"
                    >Contate as empresas</q-item-label
                  >
                  <q-item-label caption class="text-white">
                    Para confirmar horários e disponibilidade
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card>
    </div>
    <!-- Botão flutuante de compartilhar -->
    <q-page-sticky
      id="share-button-section"
      position="bottom-right"
      :offset="[18, 90]"
      style="z-index: 9999"
    >
      <q-btn
        fab-mini
        icon="mdi-share-variant"
        color="primary"
        @click="shareSchedules"
        v-if="canShare"
      >
        <q-tooltip anchor="center left" self="center right">Compartilhar Horários</q-tooltip>
      </q-btn>
      <q-btn
        fab-mini
        icon="mdi-content-copy"
        color="primary"
        @click="copyScheduleLink"
        v-else
      >
        <q-tooltip anchor="center left" self="center right">Copiar Link dos Horários</q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'
import { trips } from 'src/constants/trips/index'
import TripsTutorial from 'src/pages/trips/components/TripsTutorial.vue'
import AmazonProductsCompact from 'src/components/AmazonProductsCompact.vue'

export default {
  name: 'TripsPage',
  components: { TripsTutorial, AmazonProductsCompact },
  // Meta tags otimizadas para SEO
  meta: function () {
    const currentYear = new Date().getFullYear()
    const lastUpdated = new Date().toISOString().split('T')[0]

    return {
      title:
        'Horários de Viagem Belém ↔ Abaetetuba ' +
        currentYear +
        ' | Ônibus e Barcos Atualizados',

      meta: {
        description: {
          name: 'description',
          content:
            'Consulte os horários atualizados de ônibus e embarcações entre Belém e Abaetetuba. Saídas dos terminais Rodoviário, Porto Arapari e Rodofluvial. Horários ' +
            currentYear +
            ' das principais empresas de transporte.'
        },
        keywords: {
          name: 'keywords',
          content:
            'horários ônibus abaetetuba, horários barco abaetetuba, belém abaetetuba transporte, viagem abaetetuba, horários viação abaetetuba, porto arapari, terminal rodoviário belém, embarcação abaetetuba, ' +
            currentYear
        },
        author: {
          name: 'author',
          content: 'AbaetéFest'
        },
        robots: {
          name: 'robots',
          content: 'index, follow'
        },
        revisitAfter: {
          name: 'revisit-after',
          content: '7 days'
        },
        lastModified: {
          name: 'last-modified',
          content: lastUpdated
        },

        // Geolocalização
        geoRegion: {
          name: 'geo.region',
          content: 'BR-PA'
        },
        geoPlacename: {
          name: 'geo.placename',
          content: 'Abaetetuba, Pará, Brasil'
        },
        geoPosition: {
          name: 'geo.position',
          content: '-1.6189;-48.8830'
        },
        icbm: {
          name: 'ICBM',
          content: '-1.6189, -48.8830'
        },

        // Open Graph
        ogTitle: {
          property: 'og:title',
          content:
            'Horários de Viagem Belém ↔ Abaetetuba ' +
            currentYear +
            ' | Transporte Atualizado'
        },
        ogDescription: {
          property: 'og:description',
          content:
            'Horários atualizados de ônibus e embarcações entre Belém e Abaetetuba. Consulte saídas dos terminais e empresas de transporte. Informações ' +
            currentYear +
            '.'
        },
        ogImage: {
          property: 'og:image',
          content: 'https://app.abaetefest.com.br/og-horarios-viagem.png'
        },
        ogUrl: {
          property: 'og:url',
          content: 'https://app.abaetefest.com.br/trips'
        },
        ogType: {
          property: 'og:type',
          content: 'website'
        },
        ogSiteName: {
          property: 'og:site_name',
          content: 'AbaetéFest'
        },
        ogLocale: {
          property: 'og:locale',
          content: 'pt_BR'
        },

        // Twitter Cards
        twitterCard: {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        twitterTitle: {
          name: 'twitter:title',
          content: 'Horários de Viagem Belém ↔ Abaetetuba ' + currentYear
        },
        twitterDescription: {
          name: 'twitter:description',
          content:
            'Consulte horários atualizados de ônibus e embarcações entre Belém e Abaetetuba. Informações de todas as empresas de transporte.'
        },
        twitterImage: {
          name: 'twitter:image',
          content: 'https://app.abaetefest.com.br/og-horarios-viagem.png'
        },

        // Meta específicas para transporte
        category: {
          name: 'category',
          content: 'Transporte'
        },
        coverage: {
          name: 'coverage',
          content: 'Belém, Abaetetuba, Pará'
        },
        distribution: {
          name: 'distribution',
          content: 'Global'
        }
      },

      link: {
        canonical: {
          rel: 'canonical',
          href: 'https://app.abaetefest.com.br/trips'
        }
      }
    }
  },

  data: function () {
    return {
      trips: trips,
      ratingModel: 3,
      modalPlaces: false,
      placeDetails: {},
      slide: 1,
      canShare: false,
      carnavalImages: [
        '/carnaval/1.png',
        '/carnaval/2.png',
        '/carnaval/3.png',
        '/carnaval/4.png'
      ],
      amazonProducts: [
        {
          href: 'https://amzn.to/3SrUn1j',
          image: '/advertising/iphone.png',
          alt: 'Apple iPhone 16e 128GB',
          name: 'Apple iPhone 16e de 128 GB',
          price: '12x de R$ 312,49',
          bannerEvent: 'Amazon iPhone Banner Clicked - Trips',
          buttonEvent: 'Amazon iPhone Button Clicked - Trips'
        },
        {
          href: 'https://amzn.to/43pZzVT',
          image: '/advertising/Giorgio.jpg',
          alt: 'My Way Giorgio Armani',
          name: 'My Way Giorgio Armani',
          price: 'Por R$310,17',
          originalPrice: 'R$559,00',
          bannerEvent: 'Amazon Giorgio Banner Clicked - Trips',
          buttonEvent: 'Amazon Giorgio Button Clicked - Trips'
        }
      ]
    }
  },

  mounted: function () {
    this.setupClientFeatures()
    this.addStructuredData()
  },

  beforeDestroy: function () {},

  methods: {
    openCarnavalWhatsapp: function () {
      const phoneNumber = '5591982828945'
      const message = encodeURIComponent('Olá, gostaria de divulgar meu bloco no AbaetéFest!')
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`

      window.open(whatsappUrl, '_blank')
      this.handleMixPanelEvent('Carnaval WhatsApp Clicked')
    },

    setupClientFeatures: function () {
      if (typeof navigator !== 'undefined' && navigator.canShare) {
        this.canShare = true
      }
    },

    shareSchedules: async function () {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return
      }

      const baseUrl = `${window.location.protocol}//${window.location.host}`
      const timestamp = new Date().getTime()

      const shareData = {
        title: 'Horários de Viagem Belém ↔ Abaetetuba | AbaetéFest',
        text: 'Consulte os horários atualizados de ônibus e embarcações entre Belém e Abaetetuba. Todos os terminais e empresas de transporte.',
        url: `${baseUrl}/trips?t=${timestamp} `
      }

      try {
        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData)
          this.handleMixPanelEvent('Horários Compartilhados via Web Share')
        }
      } catch (err) {
        console.error('Erro ao compartilhar:', err)
        this.$q.notify({
          message: 'Erro ao compartilhar horários!',
          color: 'negative',
          position: 'top',
          icon: 'mdi-alert'
        })
      }
    },

    copyScheduleLink: async function () {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return
      }

      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href)
          this.$q.notify({
            message: 'Link dos horários copiado!',
            color: 'positive',
            position: 'top',
            icon: 'mdi-check',
            caption: 'Compartilhe com seus amigos'
          })
          this.handleMixPanelEvent('Link dos Horários Copiado')
        }
      } catch (err) {
        console.error('Erro ao copiar link:', err)
        this.$q.notify({
          message: 'Erro ao copiar link!',
          color: 'negative',
          position: 'top'
        })
      }
    },
    addStructuredData: function () {
      if (typeof process !== 'undefined' && !process.env.CLIENT) return

      // Structured data para serviços de transporte
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Horários de Viagem Belém - Abaetetuba',
        description:
          'Horários atualizados de ônibus e embarcações entre Belém e Abaetetuba',
        url: 'https://app.abaetefest.com.br/trips',
        mainEntity: {
          '@type': 'ItemList',
          name: 'Empresas de Transporte Belém - Abaetetuba',
          numberOfItems: this.getTotalCompanies(),
          itemListElement: this.getCompaniesStructuredData()
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Início',
              item: 'https://app.abaetefest.com.br'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Horários de Viagem',
              item: 'https://app.abaetefest.com.br/trips'
            }
          ]
        },
        about: {
          '@type': 'Place',
          name: 'Abaetetuba',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Abaetetuba',
            addressRegion: 'PA',
            addressCountry: 'BR'
          }
        }
      }

      // Remove structured data anterior
      const existingScript = document.getElementById('trips-structured-data')
      if (existingScript) {
        existingScript.remove()
      }

      // Adiciona novo structured data
      const script = document.createElement('script')
      script.id = 'trips-structured-data'
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(structuredData)
      document.head.appendChild(script)
    },

    getTotalCompanies: function () {
      let total = 0
      for (let i = 0; i < this.trips.length; i++) {
        total += this.trips[i].empresas.length
      }
      return total
    },

    getCompaniesStructuredData: function () {
      const companies = []
      let position = 1

      for (let i = 0; i < this.trips.length; i++) {
        const trip = this.trips[i]
        for (let j = 0; j < trip.empresas.length; j++) {
          const empresa = trip.empresas[j]
          companies.push({
            '@type': 'ListItem',
            position: position++,
            item: {
              '@type': 'Organization',
              name: empresa.nome,
              description:
                'Empresa de transporte operando a rota ' +
                trip.cidade1 +
                ' - ' +
                trip.cidade2,
              serviceArea: {
                '@type': 'Place',
                name: trip.cidade1 + ' - ' + trip.cidade2
              }
            }
          })
        }
      }

      return companies
    },

    getRouteCount: function (viagens) {
      return viagens ? viagens.length : 0
    },

    getScheduleCount: function (horarios) {
      return horarios ? horarios.length : 0
    },

    openLink: function () {
      this.handleMixPanelEvent('Canal Genio whatsapp')
      openURL(
        'https://whatsapp.com/channel/0029Vb6Yxo4DjiOj0JZdJ71h',
        '_blank'
      )
    },

    handleMixPanelEvent: function (empresa) {
      if (this.$mixpanel) {
        this.$mixpanel.track(empresa)
      }
    },

    getEmpresaIcon: function (nomeEmpresa) {
      const icons = {
        Viação: 'mdi-bus',
        Embarcação: 'mdi-ferry',
        Rodoviária: 'mdi-bus-side',
        default: 'mdi-map-marker'
      }

      for (const key in icons) {
        if (nomeEmpresa.toLowerCase().includes(key.toLowerCase())) {
          return icons[key]
        }
      }
      return icons.default
    },

    getTransportIcon: function (modalidade) {
      const icons = {
        Ônibus: 'mdi-bus',
        Barco: 'mdi-ferry',
        Embarcação: 'mdi-ship',
        Balsa: 'mdi-ferry',
        default: 'mdi-map-marker'
      }
      return icons[modalidade] || icons.default
    },

    getTransportColor: function (modalidade) {
      const colors = {
        Ônibus: 'blue',
        Barco: 'teal',
        Embarcação: 'cyan',
        Balsa: 'indigo',
        default: 'grey'
      }
      return colors[modalidade] || colors.default
    },

    getFormattedPeriod: function (periodo) {
      const periods = {
        'Segunda à Sexta': 'Dias úteis',
        'Segunda a Sexta': 'Dias úteis',
        Sábado: 'Finais de semana',
        Domingo: 'Domingos e feriados',
        'Todos os dias': 'Diariamente',
        default: periodo
      }
      return periods[periodo] || periods.default
    }
  }
}
</script>

<style src="./trips.css"></style>
