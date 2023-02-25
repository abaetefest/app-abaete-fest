<template>
  <q-page :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'">
    <div class="">
      <div class="col-12 text-center">
        <!-- <q-banner inline-actions class="text-primary bg-secondary">
          <span class="text-h5"> {{ categoryName }}</span>
        </q-banner> -->
      </div>
    </div>
    <q-table
      :grid="grid"
      title="Pontos Turísticos"
      :data="tourism"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      :loading="load"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <q-input
          v-model="filter"
          placeholder="Pesquisar"
          debounce="300"
          outlined
          rounded
          dense
        >
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-sm col-xs-12 col-sm-6 col-md-3">
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
        </div>
      </template>
    </q-table>
    <dialog-tourism-details
      :modal-tourism="modalTourism"
      :tourism-data="tourismDetails"
      @close="closeModal" />
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
    openDialogCourse (course) {
      this.modalTourism = true
      this.tourismDetails = course
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
