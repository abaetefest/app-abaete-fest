<template>
  <q-page :class="$q.dark.isActive ? 'bg-primary' : 'bg-grey-1'">
    <div class="text-h5 text-bold text-center q-pt-md">
      Pontos <span class="text-accent">Turísticos</span>
    </div>
    <q-table
      :grid="grid"
      :data="tourism"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      :loading="load"
      :pagination="initialPagination"
    >
      <template v-slot:top>
        <q-input
          v-model="filter"
          placeholder="Pesquisar"
          debounce="300"
          outlined
          rounded
          dense
          :class="$q.platform.is.mobile ?  'full-width' : ''"
        >
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
      <div class="col-xs-12 col-sm-6 col-md-6">
        <q-list bordered class="q-ma-xs shadow-2 rounded"
        @click="openDialogCourse(props.row)"
        >
          <q-item>
            <q-item-section top thumbnail class="q-ml-none">
              <img
                :src="props.row.image_url"
                class="rounded q-ml-sm"
              >
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1 text-bold">
                {{ props.row.name }}
              </q-item-label>
              <q-item-label caption>
                {{ props.row.address }}
              </q-item-label>
            </q-item-section>

            <!-- <q-item-section side top>
              <q-item-label caption>meta</q-item-label>
            </q-item-section> -->
          </q-item>
        </q-list>
      </div>
        <!-- <div class="q-pa-sm col-xs-12 col-sm-6 col-md-3">
          <q-card
            class="fit cursor-pointer shadow-5"
          >
            <q-img
              :src="props.row.image_url"
              :ratio="4/3"
              @click="openDialogCourse(props.row)"
            >
              <template #loading>
                <q-skeleton class="full-width full-height" square />
              </template>
            </q-img>

            <q-card-section>
              <div class="text-h6 text-center">
                {{ props.row.name }}
              </div>
            </q-card-section>
          </q-card>
        </div> -->
      </template>
    </q-table>
    <dialog-tourism-details
      :modal-tourism="modalTourism"
      :tourism-data="tourismDetails"
      @close="closeModal"
    />
      <q-dialog
        persistent
        full-height
        :maximized="$q.screen.lt.sm"
        :value="modalWelcomeTourism"
      >
        <q-layout
          view="Lhh lpR fff"
          container
          :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
        >
          <q-page-container>
            <q-page>
              <q-card
                class="full-width no-shadow"
              >

                <q-card-section class="q-pa-none" :class="$q.dark.isActive ? 'bg-primary' : ''">
                  <div
                    class="text-body2 text-center"
                    :class="$q.dark.isActive ? 'text-white' : 'text-grey-9'"
                  >
                    <q-img
                      src="/abaetetuba_de_cima.jpg"
                      class="rounded-img"
                    >
                      <template #loading>
                        <q-skeleton class="full-width full-height" square />
                      </template>
                    </q-img>
                  </div>
                </q-card-section>

                <q-card-section :class="$q.dark.isActive ? 'bg-primary' : ''">
                  <div class="text-h5 text-bold q-mt-lg">
                    Explore locais incríveis pela região de <span class="text-accent">Abaetetuba</span>
                  </div>
                </q-card-section>

                <q-card-section :class="$q.dark.isActive ? 'bg-primary' : ''">
                  <div class="text-body1">
                    A região do Baixo Tocantins é repleta de balneários, prais e ilhas.
                    Além de muita história na cidade de Abaetetuba.
                  </div>
                </q-card-section>
              </q-card>

              <div class="row justify-center absolute-bottom q-mb-xl">
                <div class="col-xs-10 col-sm-8">
                  <q-btn
                    label="Vamos nessa!"
                    :color="$q.dark.isActive ? 'secondary' : 'primary'"
                    :text-color="$q.dark.isActive ? 'primary' : 'white'"
                    @click="modalWelcomeTourism = false"
                    class="full-width"
                    rounded
                  />
                </div>
              </div>
            </q-page>
          </q-page-container>
        </q-layout>
      </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageTourism',
  props: {
    grid: {
      type: Boolean,
      default: true
    }
  },
  components: {
    DialogTourismDetails: () => import('components/DialogTourismDetails')
  },
  data () {
    return {
      modalWelcomeTourism: true,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 50
      },
      filter: '',
      filtro: 'TODAS',
      category: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Título',
          field: 'name',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'categoria', label: 'Categoria', field: 'categoria', sortable: true },
        { name: 'resumo', label: 'Resumo', field: 'resumo', sortable: true },
        { name: 'avaliacao', label: 'Avaliação', field: 'avaliacao' }
      ],
      tourism: [],
      load: true,
      modalTourism: false,
      tourismDetails: {}
    }
  },
  async mounted () {
    await this.listEvents()
  },
  methods: {
    async listEvents () {
      this.load = true
      try {
        const { data } = await this.$services.tourism().list()
        this.tourism = data.data
        this.load = false
      } catch (error) {
        this.load = false
        console.log(error)
      }
    },
    openDialogCourse (place) {
      this.modalTourism = true
      this.tourismDetails = place
      this.$mixpanel.track(place.name)
    },
    detailsEvent (course) {
      this.$router.push({ name: 'eventDetails', params: { id: course.id } })
    },
    closeModal () {
      this.modalTourism = false
      this.tourismDetails = {}
    }
  }
}
</script>

<style>
.card-cursos:hover {
  background: #e3f2fd;
}
</style>
