<template>
  <q-page padding>
    <q-form @submit="onSubmit">
      <q-card>
        <q-card-section class="text-h6">
          Formulário de Categorias de Serviço
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <q-input
              v-model="form.title"
              label="Título do Serviço. Ex: Pedreiro, Manicure, Eletricista"
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
                :to="{ name: 'manageServicesCategories'}"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'FormServiceCategories',
  props: {
    event: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      form: {
        title: '',
        description: ''
      },
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
    if (this.event && this.event.uid) {
      // this.$refs.imgFileInput.value = this.form.image_url
      this.form = {
        title: this.event.attributes.title,
        description: this.event.attributes.description,
        uid: this.event.uid
      }
      console.log(this.form)
    }
  },
  methods: {
    onSubmit () {
      if (this.form.uid) {
        this.updateEvent()
      } else {
        this.registerEvent()
      }
    },
    async registerEvent () {
      try {
        await this.$services.serviceCategories().register({
          ...this.form
        })
        this.$notifySuccess('Categoria cadastrada com Sucesso!')
        this.$router.push({ name: 'manageServicesCategories' })
      } catch (error) {
        console.error('erro', error)
        this.$q.notify('Erro ao cadastrar Categoria')
      }
    },
    async updateEvent () {
      try {
        await this.$services.serviceCategories().updateEvent(this.form.uid, {
          title: this.form.title,
          description: this.form.description
        })
        this.$notifySuccess('Categoria atualizada com Sucesso!')
        this.$router.push({ name: 'manageServicesCategories' })
      } catch (error) {
        console.error(error)
        this.$q.notify('Erro ao cadastrar categoria')
      }
    }
  }
}
</script>
