<template>
  <q-page padding>
    <p class="text-h6">
      Eventos
    </p>
    <q-table
      :data="events"
      :columns="columns"
      row-key="id"
      :filter="filter"
    >
      <template v-slot:top-left>
        <q-input outlined rounded dense debounce="300" v-model="filter" placeholder="Pesquisar">
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </template>

      <template v-slot:top-right>
        <q-btn label="Novo" dense icon="mdi-plus" color="primary" class="q-ml-md" :to="{name: 'formEvents'}" />
      </template>

      <template v-slot:body-cell-image_url="props">
        <q-td :props="props">
          <q-img :src="props.row.image_url" :ratio="4/3" width="4rem" />
        </q-td>
      </template>
      <template v-slot:body-cell-category="props">
        <q-td :props="props">
          {{ formatCategoryString(props.row.category) }}
        </q-td>
      </template>

      <template v-slot:body-cell-average="props">
        <q-td :props="props">
          <q-rating
            v-model="props.row.average"
            size="1.5em"
            color="amber"
            icon="mdi-star-outline"
            icon-selected="mdi-star"
            readonly
          />
          <span class="text-caption text-grey-6">
            ({{props.row.average}})
          </span>
        </q-td>
      </template>

      <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
          <q-btn
            icon="mdi-magnify"
            color="positive"
            class="q-ml-md"
            dense
            size="sm"
            @click="openDialogEvents(props.row)"
          >
            <q-tooltip>
              Editar Evento
            </q-tooltip>
          </q-btn>
          <q-btn
            icon="mdi-pencil"
            color="primary"
            class="q-ml-md"
            dense
            size="sm"
            @click="editCourse(props.row)"
          >
            <q-tooltip>
              Editar Evento
            </q-tooltip>
          </q-btn>
          <q-btn
            icon="mdi-delete"
            color="negative"
            class="q-ml-md"
            dense size="sm"
            @click="confirmDelete(props.row)">
            <q-tooltip>
              Deletar Evento
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <dialog-course-details
      :modal-course="modalEvents"
      :course-data="eventDetails"
      @close="closeModal"
    />
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'ManageEvents',
  components: {
    DialogCourseDetails: () => import('components/DialogCourseDetails')
  },
  data () {
    return {
      filter: '',
      options: ['TODAS', 'Tecnologia', 'Mercado e Vendas', 'Moda', 'Administração'],
      columns: [
        { name: 'image_url', label: 'Imagem', field: 'image_url', sortable: false, align: 'left' },
        {
          name: 'name',
          required: true,
          label: 'Nome do Evento',
          field: 'name',
          format: val => `${val}`,
          sortable: true,
          align: 'left'
        },
        { name: 'category', label: 'Categoria', field: 'category', sortable: true, align: 'left' },
        { name: 'start_date', label: 'Data', field: 'start_date', align: 'left', format: (data) => this.formatDateString(data) },
        { name: 'acoes', label: 'Ações', field: 'Ações', align: 'right' }
      ],
      events: [],
      category: [
        { label: 'Festas', value: 'parties' },
        { label: 'Cultural', value: 'cultural' },
        { label: 'Religiosos', value: 'religious' },
        { label: 'Esportivos', value: 'sports' },
        { label: 'Geek', value: 'geek' },
        { label: 'Turismo', value: 'tourism' }
      ],
      data: [],
      modalEvents: false,
      eventDetails: {}
    }
  },
  mounted () {
    this.listEvents()
  },
  methods: {
    async listEvents () {
      try {
        const { data } = await this.$services.events().list()
        this.events = data.data
      } catch (error) {
        console.log(error)
      }
    },
    confirmDelete (course) {
      this.$q.dialog({
        title: 'Deleter Evento',
        message: `Tem certeza que deseja deletar o evento <b>${course.name}</b> ?`,
        cancel: true,
        html: true,
        persistent: true
      }).onOk(() => {
        this.deleteCourse(course)
      })
    },
    async deleteCourse (course) {
      try {
        await this.$services.events().delete(course.id)
        this.$notifySuccess('Evento excluído com Sucesso!')
        this.listEvents()
      } catch (error) {
        console.error(error)
        this.$q.notify('Erro ao excluir curso')
      }
    },
    editCourse (course) {
      this.$router.push({ name: 'formEvents', params: { course: course } })
    },
    formatDateString (dateOriginal) {
      return date.formatDate(dateOriginal, 'DD/MM/YYYY HH:mm')
    },
    formatCategoryString (categoryName) {
      const category = this.category.find(item => item.value === categoryName)
      return category.label
    },
    viewEvent (event) {
    },
    openDialogEvents (course) {
      this.modalEvents = true
      this.eventDetails = course
    },
    closeModal () {
      this.modalEvents = false
      this.eventDetails = {}
    }
  }
}
</script>
