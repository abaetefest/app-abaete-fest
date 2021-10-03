<template>
  <q-page padding>
    <p class="text-h6">
      Eventos
    </p>
    <q-table
      :data="courses"
      :columns="columns"
      row-key="name"
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
        <q-btn label="Novo" dense icon="mdi-plus" color="primary" class="q-ml-md" :to="{name: 'formCurso'}" />
      </template>

      <template v-slot:body-cell-img="props">
        <q-td :props="props">
          <q-img :src="props.row.banner" :ratio="4/3" width="4rem" />
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
            icon="mdi-pencil"
            color="primary"
            class="q-ml-md"
            dense
            size="sm"
            @click="editCourse(props.row)"
          >
            <q-tooltip>
              Editar categoria
            </q-tooltip>
          </q-btn>
          <q-btn
            icon="mdi-delete"
            color="negative"
            class="q-ml-md"
            dense size="sm"
            @click="confirmDelete(props.row)">
            <q-tooltip>
              Deletar vaga
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  name: 'ManageEvents',
  data () {
    return {
      filter: '',
      filtro: 'TODAS',
      options: ['TODAS', 'Tecnologia', 'Mercado e Vendas', 'Moda', 'Administração'],
      columns: [
        { name: 'img', label: 'Imagem', field: 'img', sortable: false, align: 'left' },
        {
          name: 'title',
          required: true,
          label: 'Título',
          field: 'title',
          format: val => `${val}`,
          sortable: true,
          align: 'left'
        },
        { name: 'categoria', label: 'Categoria', field: 'categoria', sortable: true, align: 'left' },
        { name: 'average', label: 'Avaliação', field: 'average', align: 'left' },
        { name: 'acoes', label: 'Ações', field: 'Ações', align: 'right' }
      ],
      courses: [],
      data: []
    }
  },
  mounted () {
    this.setFilter()
    this.listCourses()
  },
  methods: {
    setFilter () {
      if (this.filtro !== 'TODAS') {
        this.cursos = this.data.filter((curso) => curso.categoria === this.filtro)
      } else {
        this.cursos = this.data
      }
    },
    async listCourses () {
      try {
        const courses = await this.$services.courses().list()
        this.courses = courses.data
      } catch (error) {
        console.log(error)
      }
    },
    confirmDelete (course) {
      this.$q.dialog({
        title: 'Deleter Curso',
        message: `Tem certeza que deseja deletar o curso <b>${course.title}</b> ?`,
        cancel: true,
        html: true,
        persistent: true
      }).onOk(() => {
        this.deleteCourse(course)
      })
    },
    async deleteCourse (course) {
      try {
        await this.$services.courses().delete(course.id)
        this.$notifySuccess('Curso excluído com Sucesso!')
        this.listJobs()
      } catch (error) {
        console.error(error)
        this.$q.notify('Erro ao excluir curso')
      }
    },
    editCourse (course) {
      this.$router.push({ name: 'formCurso', params: { course: course } })
    }
  }
}
</script>
