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
            <div class="col-md-8 col-xs-12 col-sm-12 q-pb-md">
              <q-editor
                label="Descrição"
                v-model="form.description"
                min-height="5rem"
                :rules="[ val => val && val.length > 0 || 'Descrição obrigatório']"
              />
            </div>
            <!-- <q-input
              v-model="form.description"
              label="Descrição"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[ val => val && val.length > 0 || 'Descrição obrigatório']"
            /> -->

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
              v-if="!preview"
              v-model="form.image_url"
              outlined
              label="Banner"
              ref="imgFileInput"
              class="col-md-8 col-xs-12 col-sm-12"
              @input="setFile(form.image_url)"
            />

            <div
              v-if="preview"
              class="col-md-8 col-xs-12 col-sm-12 text-left"
            >
              <p class="text-body1 text-bold">Imagem Atual:</p>
              <q-img
                :src="preview"
                :ratio="16/9"
                width="300px"
              />
              <div class="row q-pt-sm">
                <div class="col-md-4">
                  <q-btn
                    label="Alterar Imagem"
                    icon="mdi-image-edit-outline"
                    color="primary"
                    class="full-width"
                    @click="updateImg"
                  />
                </div>
              </div>
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
    event: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      form: {
        name: '',
        image_url: [],
        description: '',
        category: '',
        start_date: ''
      },
      preview: '',
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
    const timeStamp = Date.now()
    const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
    this.form.start_date = formattedString
    if (this.event && this.event.id) {
      // this.$refs.imgFileInput.value = this.form.image_url
      if (this.event.image_url) {
        this.preview = this.event.image_url
      }
      this.form = {
        ...this.event
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
    toBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    async setFile (file) {
      this.preview = await this.toBase64(file)
    },
    updateImg () {
      this.preview = ''
      this.form.image_url = []
    },
    async registerEvent () {
      try {
        // if (this.image) {
        //   await this.registerImage()
        // }
        // const birthday = date.extractDate(this.form.start_date, 'DD/MM/YYYY')
        // const formattedString = date.formatDate(birthday, 'YYYY-MM-DD')
        await this.$services.events().register({
          ...this.form
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
        await this.$services.events().updateEvent(this.form.id, {
          ...this.form
        })
        this.$notifySuccess('Categoria atualizada com Sucesso!')
        this.$router.push({ name: 'manageEvents' })
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
