<template>
  <q-dialog persistent :value="modalCourse" @show="setJobs">
      <q-card class="full-width q-pa-sm" :key="courseData.id">
        <q-card-section>
          <div class="text-subtitle1 text-bold q-mb-sm">
            Evento: {{ courseData.name}}
          </div>
        </q-card-section>

        <q-separator />

        <div class="text-body2 text-grey-9 q-mb-md" v-if="courseData.image_url">
          <q-img :src="courseData.image_url" />
        </div>

        <div class="text-body2 text-grey-9 q-mb-md" v-if="courseData.description">
          <strong> SOBRE O EVENTO:</strong> {{ courseData.description }}
        </div>

        <div class="text-body2 text-grey-9 q-mb-md" v-if="courseData.link">
          <strong> LINK: </strong> <a :href="courseData.link" target="_blank">{{ courseData.title }}</a>
        </div>

        <div class="text-body2 text-grey-9" v-if="courseData.categoryId">
          <strong>CATEGORIA:</strong> {{getCategoryName(courseData.categoryId)}}
        </div>

        <div class="text-body2 text-grey-9">
          <strong>DATA:</strong> {{ courseData.start_date}}
        </div>

        <!-- <div class="text-body2 text-grey-9">
          <q-icon name="mdi-city-variant-outline" /><strong> CIDADE:</strong> {{ jobs.city }}
        </div>

        <div class="text-body2 text-grey-9">
          <q-icon name="mdi-card-text-outline" /><strong> DESCRIÇÃO:</strong> {{ jobs.description }}
        </div>

        <div class="text-body2 text-grey-9">
          <q-icon name="mdi-account-group-outline" /> <strong> TAMANHO:</strong> {{getCompanySize(jobs.companySize)}}
        </div>

        <div class="text-body2 text-grey-9" v-if="jobs.categoryId">
          <q-icon name="mdi-shape-outline" /> <strong>CATEGORIA:</strong> {{getCategoryName(jobs.categoryId)}}
        </div>

        <div class="text-body2 text-grey-9">
          <q-icon name="mdi-email" /> <strong> EMAIL:</strong> {{ jobs.email }}
        </div>

        <div class="text-body2 text-grey-9">
          <q-icon name="mdi-phone" /> <strong> TELEFONE:</strong> {{ jobs.phone }}
        </div>

        <div class="text-body2 text-grey-9">
          <q-icon name="mdi-web" /> <strong> SITE:</strong> {{ jobs.site }}
        </div> -->

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="primary" @click="$emit('close')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  name: 'DialogCourseDetails',
  props: {
    modalCourse: {
      type: Boolean,
      required: true,
      default: () => false
    },
    courseData: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      modal: this.modalJobs,
      course: {},
      category: []
    }
  },
  async mounted () {
    // this.listCategory()
  },
  methods: {
    setJobs () {
      this.course = this.courseData
    },
    async listCategory () {
      try {
        const category = await this.$services.category().list()
        this.categorys = category.data
      } catch (error) {
        console.log(error)
      }
    },
    getCategoryName (categoryId) {
      const categoryFilter = this.categorys.find((categoryItem) => categoryItem.id === categoryId)
      if (categoryFilter) {
        return categoryFilter.title
      } else {
        return ''
      }
    },
    getCompanyName (company) {
      if (company) {
        return company
      } else {
        return 'Não Informado'
      }
    },
    getCompanySize (value) {
      switch (value) {
        case 'P':
          return 'Pequena'
        case 'M':
          return 'Média'
        case 'G':
          return 'Grande'
        default:
          return 'Não Identificado'
      }
    }
  }
}
</script>
