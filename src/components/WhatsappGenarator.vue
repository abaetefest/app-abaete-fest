<template>
  <q-dialog :value="modalWpp" @before-hide="$emit('close')">
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Gerador de Link</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model="phone"
            label="Telefone"
            outlined
            mask="(##) #####-####"
            unmasked-value
          />
          <q-input
            v-model="msg"
            label="Mensagem"
            outlined
            type="textarea"
          />
        </q-card-section>
        <q-card-section>
          <q-btn label="Copiar Link" color="positive" class="full-width" @click="copyLinkWpp" />
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>
import { copyToClipboard } from 'quasar'
export default {
  name: 'DialogWhatsappGenarator',
  props: {
    modalWpp: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  data () {
    return {
      phone: '',
      msg: 'Olá, encontrei vocês através do aplicativo AbaetéFest - https://abaetefest.com.br/. Gostaria de mais informações. '
    }
  },
  methods: {
    copyLinkWpp () {
      const link = encodeURI(`https://api.whatsapp.com/send?phone=55${this.phone}&text=${this.msg}`)
      copyToClipboard(link)
        .then(() => {
          this.$notifySuccess('Link copiado com sucesso!')
        })
        .catch(() => {
          this.$notifyDanger('Link não copiado')
        })
    }
  }
}
</script>
