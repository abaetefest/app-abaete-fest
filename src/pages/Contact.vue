<template>
  <q-page padding>
    <p class="text-h6">
      Contato
    </p>
    <div class="row q-pa-sm">
      <div class="col-12 text-subtitle1 text-justify">
        <p>Você gostaria de ver o seu evento no nosso app? Entre em contato conosco para mais informações:</p>
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-sm-12 col-xs-12 col-sm-4">
        <q-btn label="Email" color="primary" icon="mdi-email" class="full-width" />
      </div> -->
      <div class="col-sm-12 col-xs-12 col-md-12 text-center q-gutter-sm">
        <q-btn
          round
          color="green-7"
          icon="mdi-whatsapp"
          href="https://api.whatsapp.com/send?phone=5591982828945&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20como%20publicar%20meu%20evento%20no%20app%20Abaet%C3%A9Fest"
          target="_blank"
          type="a"
        />
        <q-btn
          round
          color="pink"
          icon="mdi-instagram"
          href="https://www.instagram.com/abaetefest/"
          target="_blank"
          type="a"
        />
      </div>
    </div>
      <!-- <div class="col-12 text-subtitle2">
        <q-icon name="mdi-mail" class="q-pr-md" size="sm" /> abaetefest@gmail.com
      </div>
      <div class="col-12 text-subtitle2">
        <q-icon name="mdi-whatsapp" class="q-pr-md" size="sm" />
        <a target="_blank" href="https://api.whatsapp.com/send?phone=5591982828945&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20como%20publicar%20meu%20evento%20no%20app%20Abaet%C3%A9Fest">
          (91) 982828945
        </a>
      </div> -->
    <!-- </div> -->
  </q-page>
</template>

<script>
export default {
  name: 'PageContact'
}
</script>
