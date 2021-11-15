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
              label="Nome do Ponto Turístico"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[ val => val && val.length > 0 || 'Título obrigatório']"
            />
            <div class="col-md-8 col-xs-12 col-sm-12 q-pb-md">
              <q-editor
                label="Descrição"
                v-model="form.description"
                min-height="8rem"
                :rules="[ val => val && val.length > 0 || 'Descrição obrigatório']"
                :toolbar="toolbar"
                :fonts="fonts"
              />
            </div>

            <q-input
              v-model="form.address"
              label="Endereço"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[ val => val && val.length > 0 || 'Título obrigatório']"
            />

            <q-input
              v-model="form.latitude"
              label="Latitude"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[ val => val && val.length > 0 || 'Latitude obrigatório']"
            />

            <q-input
              v-model="form.longitude"
              label="Longitude"
              outlined
              class="col-md-8 col-xs-12 col-sm-12"
              :rules="[ val => val && val.length > 0 || 'Longitude obrigatório']"
            />

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
                :to="{ name: 'manageTourism'}"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>

  </q-page>
</template>

<script>
import { category } from 'src/constants/category'
export default {
  name: 'FormTourism',
  props: {
    tourism: {
      type: Object,
      required: false
    }
  },
  components: {
  },
  data () {
    return {
      form: {
        name: '',
        description: '',
        address: '',
        latitude: '',
        longitude: '',
        image_url: []
      },
      dialogWpp: false,
      preview: '',
      model: '',
      category: category,
      image: null,
      date: Date.now(),
      fonts: {
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      },
      toolbar: [
        [
          {
            label: this.$q.lang.editor.align,
            icon: this.$q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        [
          {
            label: this.$q.lang.editor.fontSize,
            icon: this.$q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: this.$q.lang.editor.defaultFont,
            icon: this.$q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]
    }
  },
  mounted () {
    if (this.tourism && this.tourism.id) {
      // this.$refs.imgFileInput.value = this.form.image_url
      if (this.tourism.image_url) {
        this.preview = this.tourism.image_url
      }
      this.form = {
        ...this.tourism
      }
      delete this.form.image_url
    }
  },
  methods: {
    onSubmit () {
      if (this.form.id) {
        this.updateTourism()
      } else {
        this.registerTourism()
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
    async registerTourism () {
      try {
        await this.$services.tourism().register({
          ...this.form
        })
        this.$notifySuccess('Ponto Turístico cadastrado com Sucesso!')
        this.$router.push({ name: 'manageTourism' })
      } catch (error) {
        console.error('erro', error)
        this.$q.notify('Erro ao cadastrar Ponto Turístico')
      }
    },
    async updateTourism () {
      try {
        await this.$services.tourism().updateTourism(this.form.id, {
          ...this.form
        })
        this.$notifySuccess('Ponto Turístico atualizado com Sucesso!')
        this.$router.push({ name: 'manageTourism' })
      } catch (error) {
        console.error(error)
        this.$q.notify('Erro ao cadastrar Ponto Turístico')
      }
    },
    showDialogWpp () {
      this.dialogWpp = true
    },
    closeDialogWpp () {
      this.dialogWpp = false
    }
  }
}
</script>
