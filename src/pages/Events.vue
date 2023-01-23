<template>
  <q-page class="bg-grey-1">
    <!-- <div class="">
      <div class="col-12 text-center"> -->
        <!-- <q-banner inline-actions class="text-primary bg-secondary"> -->
          <!-- <q-icon
            name="mdi-arrow-left"
            size="2em"
            class="float-left"
            @click="backToEvents"
          /> -->
          <!-- <span class="text-h5"> {{ categoryName }}</span> -->
        <!-- </q-banner> -->
      <!-- </div>
    </div> -->
    <div class="row q-pa-sm">
      <q-select
        outlined
        v-model="categoria"
        :options="options"
        label="Selecione uma categoria"
        class="col-sm-12 col-xs-12 col-md-6"
        bg-color="white"
        label-color="primary"
        color="primary"
        map-options
        emit-value
        @input="listEvents(categoria)"
      >
        <template v-slot:prepend>
          <q-avatar rounded>
            <img :src="getIconCategory">
          </q-avatar>
        </template>
        <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section avatar>
                <q-avatar rounded>
                  <img :src="scope.opt.icon">
                </q-avatar>
                <!-- <q-icon :name="scope.opt.icon" /> -->
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
              </q-item-section>
            </q-item>
          </template>
      </q-select>
    </div>
    <q-table
      :grid="grid"
      title="Eventos"
      :data="events"
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
              <div class="text-h6">
                {{ props.row.name }}
              </div>
              <q-item-label class="row justify-between">
                <span class="text-caption text-grey">
                  {{ formatDateString(props.row.start_date) }} - {{ formatHourString(props.row.start_date)}}
                </span>
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

            <!-- <q-card-section class="q-pa-none q-pb-sm">
              <q-separator />
            </q-card-section> -->

            <!-- <q-card-actions align="around">
              <q-btn flat dense size="sm" color="primary" label="Vou nada" icon="mdi-emoticon-cry-outline" />
              <q-btn flat dense size="sm" color="primary" label="Eu vou" icon="mdi-emoticon-cool-outline" />
            </q-card-actions> -->

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
import { date } from 'quasar'
import { category } from 'src/constants/category'
export default {
  name: 'PageEvents',
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
        rowsPerPage: 15
      },
      filter: '',
      filtro: 'TODAS',
      // category: [],
      categoria: 'all',
      options: category,
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
      events: [],
      load: true,
      modalCourse: false,
      courseDetails: {}
    }
  },
  computed: {
    getIconCategory: function () {
      const img = this.options.filter(opt => opt.value === this.categoria)
      return img[0].icon
    }
  //   categoryName () {
  //     const categorySearch = category.find((cat) => cat.value === this.$route.params.type)
  //     return categorySearch.label
  //   }
  },
  async mounted () {
    if (this.$route.params.type) {
      await this.listEvents(this.$route.params.type)
    } else {
      await this.listEvents()
    }
  },
  methods: {
    async listEvents (category = '') {
      this.load = true
      try {
        const { data } = await this.$services.events().listByCategory(category)
        this.events = data.data
        this.load = false
      } catch (error) {
        this.load = false
        console.log(error)
      }
    },
    openDialogCourse (course) {
      this.modalCourse = true
      this.courseDetails = course
    },
    detailsEvent (course) {
      this.$router.push({ name: 'eventDetails', params: { id: course.id } })
      // this.$router.push({ name: menu.route, params: { type: menu.type } })
    },
    closeModal () {
      this.modalCourse = false
      this.courseDetails = {}
    },
    formatDateString (dateOriginal) {
      return date.formatDate(dateOriginal, 'DD/MM/YYYY')
    },
    formatHourString (dateOriginal) {
      return date.formatDate(dateOriginal, 'HH:mm')
    },
    backToEvents () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style>
.card-cursos:hover {
  background: #e3f2fd;
}
</style>
