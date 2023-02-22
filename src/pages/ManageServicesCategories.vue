<template>
  <q-page padding>
    <p class="text-h6">
     <q-icon name="mdi-shape-outline" /> - Categorias de Serviço
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
        <q-btn
          label="Novo"
          dense icon="mdi-plus"
          color="primary"
          class="q-ml-md"
          :to="{name: 'formServiceCategories'}"
        />
      </template>

      <template v-slot:body-cell-title="props">
        <q-td :props="props">
          {{ props.row.attributes.title }}
        </q-td>
      </template>

      <template v-slot:body-cell-createdAt="props">
        <q-td :props="props">
          {{ formatDateString(props.row.attributes.createdAt) }}
        </q-td>
      </template>

      <template v-slot:body-cell-acoes="props">
        <q-td :props="props">
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
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { category } from 'src/constants/category'
export default {
  name: 'ManageEvents',
  data () {
    return {
      filter: '',
      columns: [
        // { name: 'uid', label: 'Uid', field: 'uid', sortable: false, align: 'left' },
        {
          name: 'title',
          required: true,
          label: 'Título da Categoria',
          field: 'title',
          format: val => `${val}`,
          sortable: true,
          align: 'left'
        },
        { name: 'createdAt', label: 'Inserido em', field: 'createdAt', align: 'left' },
        // { name: 'start_date', label: 'Data', field: 'start_date', align: 'left', format: (data) => this.formatDateString(data) },
        { name: 'acoes', label: 'Ações', field: 'Ações', align: 'right' }
      ],
      events: [],
      category: category,
      data: [],
      modalEvents: false,
      eventDetails: {}
    }
  },
  mounted () {
    this.listServiceCategories()
  },
  methods: {
    async listServiceCategories () {
      try {
        const { data } = await this.$services.serviceCategories().list()
        this.events = data.data
      } catch (error) {
        console.log(error)
      }
    },
    confirmDelete (row) {
      this.$q.dialog({
        title: 'Deleter Categoria ?',
        message: `Tem certeza que deseja deletar o evento <b>${row.attributes.title}</b> ?`,
        cancel: true,
        html: true,
        persistent: true
      }).onOk(() => {
        this.deleteServiceCategory(row)
      })
    },
    async deleteServiceCategory (row) {
      try {
        await this.$services.serviceCategories().delete(row.uid)
        this.$notifySuccess('Evento excluído com Sucesso!')
        this.listServiceCategories()
      } catch (error) {
        console.error(error)
        this.$q.notify('Erro ao excluir Categoria')
      }
    },
    editCourse (row) {
      this.$router.push({ name: 'formServiceCategories', params: { event: row } })
    },
    formatDateString (dateOriginal) {
      return date.formatDate(dateOriginal, 'DD/MM/YYYY HH:mm')
    }
  }
}
</script>
