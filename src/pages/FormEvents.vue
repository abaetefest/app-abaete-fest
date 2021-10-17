<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-card>
        <q-card-section class="text-h6">
          Formulário de Eventos
        </q-card-section>
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <q-input
              v-model="form.name"
              label="Nome do Evento"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[ val => val && val.length > 0 || 'Título obrigatório']"
            />
            <q-input
              v-model="form.description"
              label="Descrição"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[ val => val && val.length > 0 || 'Descrição obrigatório']"
            />

            <!-- <q-input
              v-model="form.link"
              label="Link do curso ou plataforma"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[ val => val && val.length > 0 || 'Link obrigatório']"
            /> -->

            <!-- <q-select
              v-model="form.category"
              :options="category"
              outlined
              label="Categoria do Curso"
              class="col-md-8 col-xs-12 col-sm-12"
              emit-value
              map-options
              option-value="id"
              option-label="title"
              :rules="[ val => val && val.length > 0 || 'Site obrigatório']"
            /> -->
            <q-select
              v-model="form.category"
              :options="category"
              outlined
              emit-value
              map-options
              label="Categoria do Evento"
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[ val => val && val.length > 0 || 'Categoria obrigatório']"
            />

            <div class="col-md-8 col-xs-12 col-sm-12 q-gutter-md row items-start q-pb-sm">
              <q-date v-model="form.start_date" mask="YYYY-MM-DD HH:mm" color="primary" :options="optionsFn" />
              <q-time v-model="form.start_date" mask="YYYY-MM-DD HH:mm" color="primary" />
            </div>

            <q-file
              v-model="image"
              outlined
              label="Banner"
              class="col-md-8 col-xs-12 col-sm-12"
            />

            <div
              v-if="form.banner"
              class="col-md-8 col-xs-12 col-sm-12"
            >
              <p class="text-body1 text-bold">Banner Atual:</p>
              <q-img
                :src="form.banner"
                :ratio="16/9"
                width="300px"
              />
            </div>

          </div>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <div class="col-12 q-gutter-md">
              <q-btn
                :label="form.id ? 'Atualizar' : 'Cadastrar'"
                color="primary"
                class="float-right"
                type="submit"
              />
              <q-btn
                label="Cancelar"
                color="white"
                class="float-right text-black"
                :to="{ name: 'manageEvents'}"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'FormEvents',
  props: {
    course: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      form: {
        name: '',
        image_url: 'https://brasilagoraonline.com.br/wp-content/uploads/2017/11/unnamed-1.jpg',
        description: '',
        category: '',
        start_date: ''
      },
      model: '',
      category: [
        { label: 'Festas', value: 'parties' },
        { label: 'Cultural', value: 'cultural' },
        { label: 'Religiosos', value: 'religious' },
        { label: 'Esportivos', value: 'sports' },
        { label: 'Geek', value: 'geek' },
        { label: 'Turismo', value: 'tourism' }
      ],
      image: null,
      date: Date.now()
    }
  },
  mounted () {
    // this.listCategory()
    const timeStamp = Date.now()
    const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
    this.form.start_date = formattedString
    if (this.course && this.course.id) {
      this.form = {
        ...this.course
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.form.id) {
        this.updateEvent()
      } else {
        this.registerEvent()
      }
    },
    async registerEvent () {
      try {
        // if (this.image) {
        //   await this.registerImage()
        // }
        // const birthday = date.extractDate(this.form.start_date, 'DD/MM/YYYY')
        // const formattedString = date.formatDate(birthday, 'YYYY-MM-DD')
        await this.$services.events().store({
          event: {
            ...this.form
            // start_date: formattedString
          }
        })
        this.$notifySuccess('Evento cadastrado com Sucesso!')
        this.$router.push({ name: 'manageEvents' })
      } catch (error) {
        console.error('erro', error)
        this.$q.notify('Erro ao cadastrar Evento')
      }
    },
    async updateEvent () {
      try {
        // if (this.image) {
        //   await this.registerImage()
        // }
        await this.$services.events().update(this.form.id, {
          event: {
            ...this.form
          }
        })
        this.$notifySuccess('Categoria atualizada com Sucesso!')
        this.$router.push({ name: 'manageEvents' })
      } catch (error) {
        console.error(error)
        this.$q.notify('Erro ao cadastrar categoria')
      }
    },
    async registerImage () {
      const formData = new FormData()
      await formData.append('image', this.image)
      try {
        const responseImage = await this.$services.files().store(formData)
        this.form.banner = responseImage.data.secure_url
      } catch (error) {
        console.error(error)
        this.$q.notify('Erro ao cadastrar categoria')
      }
    },
    async listCategory () {
      try {
        const category = await this.$services.category().list()
        this.category = category.data
      } catch (error) {
        console.log(error)
      }
    },
    optionsFn (dateCalendar) {
      const formattedString = date.formatDate(this.date, 'YYYY/MM/DD')
      return dateCalendar >= formattedString
    }
  }
}
</script>
