<template>
  <q-page padding>
    <q-table
      :grid="grid"
      title="Eventos"
      :data="courses"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      :loading="load"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <q-input outlined rounded dense debounce="300" v-model="filter" placeholder="Pesquisar">
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-md col-xs-12 col-sm-6 col-md-3">
          <q-card
            class="fit cursor-pointer"
          >
            <q-img :src="props.row.banner" :ratio="4/3" @click="openDialogCourse(props.row)" />

            <q-card-section>
              <div class="text-h6">
                {{ props.row.title }}
              </div>
              <q-item-label class="row justify-between">
                <!-- <q-rating
                  v-model="props.row.average"
                  size="1.5em"
                  color="amber"
                  icon="mdi-star-outline"
                  icon-selected="mdi-star"
                />
                <span class="text-caption text-grey q-ml-sm">({{props.row.average}})</span>
                <q-badge
                  outline
                  color="primary"
                  :label="getCategoryName(props.row.categoryId)"
                  class="float-right"
                /> -->
              </q-item-label>
            </q-card-section>

            <q-card-section class="q-pa-none q-pb-sm">
              <q-separator />
            </q-card-section>

            <q-card-actions align="around">
              <q-btn flat dense size="sm" color="primary" label="Vou nada" icon="mdi-emoticon-cry-outline" />
              <q-btn flat dense size="sm" color="primary" label="Eu vou" icon="mdi-emoticon-cool-outline" />
            </q-card-actions>

            <!-- <q-card-section class="q-pt-none">
              {{ props.row.resumo }}
            </q-card-section> -->
          </q-card>
        </div>
      </template>
    </q-table>
    <dialog-course-details
      :modal-course="modalCourse"
      :course-data="courseDetails"
      @close="closeModal" />
  </q-page>
</template>

<script>
export default {
  name: 'PageCursos',
  props: {
    grid: {
      type: Boolean,
      default: true
    }
  },
  components: {
    DialogCourseDetails: () => import('components/DialogCourseDetails')
  },
  data () {
    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 8
        // rowsNumber: xx if getting data from a server
      },
      filter: '',
      filtro: 'TODAS',
      category: [],
      columns: [
        {
          name: 'titulo',
          required: true,
          label: 'Título',
          field: 'titulo',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'categoria', label: 'Categoria', field: 'categoria', sortable: true },
        { name: 'resumo', label: 'Resumo', field: 'resumo', sortable: true },
        { name: 'avaliacao', label: 'Avaliação', field: 'avaliacao' }
      ],
      courses: [],
      data: [],
      load: true,
      modalCourse: false,
      courseDetails: {}
    }
  },
  async mounted () {
    await this.listCategory()
    await this.listCourses()
    this.setFilter()
  },
  methods: {
    setFilter () {
      if (this.filtro !== 'TODAS') {
        this.courses = this.data.filter((curso) => curso.categoryId === this.filtro)
      } else {
        this.courses = this.data
      }
    },
    async listCategory () {
      try {
        const category = await this.$services.category().list()
        this.category = [
          {
            id: 'TODAS',
            title: 'TODAS'
          },
          ...category.data
        ]
      } catch (error) {
        console.log(error)
      }
    },
    async listCourses () {
      this.load = true
      try {
        const courses = await this.$services.courses().list()
        this.data = courses.data
        this.load = false
      } catch (error) {
        this.load = false
        console.log(error)
      }
    },
    getCategoryName (categoryId) {
      const categoryFilter = this.category.find((categoryItem) => categoryItem.id === categoryId)
      if (categoryFilter) {
        return categoryFilter.title
      } else {
        return ''
      }
    },
    openDialogCourse (course) {
      this.modalCourse = true
      this.courseDetails = course
    },
    closeModal () {
      this.modalCourse = false
      this.courseDetails = {}
    }
  }
}
</script>

<style>
.card-cursos:hover {
  background: #e3f2fd;
}
</style>
