<template>
  <q-page :class="$q.dark.isActive ? '': 'bg-grey-1'">
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
    <div class="text-h5 text-bold text-center q-pt-md custom-font">
      <span class="text-accent">Eventos</span> na cidade
    </div>
    <div class="row q-pa-sm">
      <q-select
        outlined
        v-model="categoria"
        :options="options"
        label="Selecione uma categoria"
        class="col-sm-12 col-xs-12 col-md-6"
        :bg-color="$q.dark.isActive ? 'primary' : 'white'"
        :label-color="$q.dark.isActive ? 'white' : 'primary'"
        :color="$q.dark.isActive ? 'white' : 'primary'"
        map-options
        emit-value
        dense
        @input="listEvents(categoria)"
      >
        <template v-slot:prepend>
          <q-avatar
            rounded
            :icon="getIconCategory"
            size="60px"
            dense
            :class="$q.dark.isActive ? 'text-secondary' : 'text-primary'"
          >
            <!-- <img :src="getIconCategory"> -->
          </q-avatar>
        </template>
        <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
              :class="$q.dark.isActive ? 'bg-primary' : 'white'"
              dense
            >
              <q-item-section avatar>
                <q-avatar rounded :icon="scope.opt.icon" size="60px">
                  <!-- <img :src="scope.opt.icon"> -->
                </q-avatar>
                <!-- <q-icon :name="scope.opt.icon" /> -->
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold" v-html="scope.opt.label" />
              </q-item-section>
            </q-item>
          </template>
      </q-select>
    </div>
    <q-table
      :grid="grid"
      :data="events"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      :loading="load"
      :pagination="initialPagination"
    >
      <template v-slot:top>
        <q-input
          outlined
          rounded
          dense
          debounce="300"
          v-model="filter"
          label="Pesquise"
          :class="$q.platform.is.mobile ?  'full-width' : ''"
          class="q-mb-md"
          :label-color="$q.dark.isActive ? 'blue-3' : 'primary'"
        >
          <template v-slot:append>
            <q-icon name="mdi-magnify" :color="$q.dark.isActive ? 'blue-3' : 'primary'" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="col-xs-6 col-sm-6 col-md-3 col-lg-3 q-pa-xs">
          <q-card
            class="fit cursor-pointer shadow-5"
            :class="$q.dark.isActive ? 'bg-primary border-white' : 'bg-white'"
            @click="detailsEvent(props.row)"
          >
            <!-- <q-img
              :src="props.row.image_url"
              class="full-width"
              style="position: absolute;filter: blur(1rem); opacity: 0.9"
              :ratio="3/3.9"
              placeholder-src="loadPlaceholder.png"
            >
            </q-img> -->
            <div class="q-p-sm">
              <q-img
                :src="props.row.image_url"
                :ratio="3/4"
                style="border-radius: 8px"
              >
                <template #loading>
                  <q-skeleton class="full-width full-height" square />
                </template>
              </q-img>
            </div>

            <q-card-section class="q-pa-xs">
              <div class="text-weight-bold row">
                <div class="col-12">
                  <div
                    class="text-center rounded q-pa-sm"
                    :class="$q.dark.isActive ? 'bg-secondary text-primary' : 'bg-primary text-secondary'"
                  >
                    <div>
                      {{ getDayDate(props.row.start_date) }} - {{ getMonthString(props.row.start_date) }} - {{ formatHourString(props.row.start_date)}}
                    </div>
                    <!-- <div>
                      {{ getMonthString(props.row.start_date) }}
                    </div>
                    <div class="text-caption">
                      {{ formatHourString(props.row.start_date)}}
                    </div> -->
                  </div>
                </div>

                <div class="col q-pa-xs q-mt-sm text-body1 text-center text-weight-bold self-center">
                  {{ props.row.name }}
                </div>
              </div>
            </q-card-section>
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
        rowsPerPage: 50
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
        { name: 'avaliacao', label: 'Avaliação', field: 'avaliacao' },
        { name: 'start_date', label: 'Data', field: 'start_date', align: 'left', format: (data) => this.formatDateString(data) }
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
    openDialogCourse (event) {
      this.modalCourse = true
      this.courseDetails = event
      this.$mixpanel.track(event.name)
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
    getDayDate (dateOriginal) {
      return date.formatDate(dateOriginal, 'DD')
    },
    getMonthString (dateOriginal) {
      const month = date.formatDate(dateOriginal, 'MM')
      const monthString = {
        '01': 'Jan',
        '02': 'Fev',
        '03': 'Mar',
        '04': 'Abr',
        '05': 'Mai',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Ago',
        '09': 'Set',
        10: 'Out',
        11: 'Nov',
        12: 'Dez'
      }
      return monthString[month]
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
