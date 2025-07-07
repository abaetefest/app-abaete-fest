<template>
  <q-page padding>
    <p class="text-h6">
      Contato
    </p>
    <div class="row q-pa-sm">
      <div class="col-12 text-subtitle1 text-justify">
        <p>Você gostaria de ver o seu evento no nosso app? Envie as informações para nosso whatsapp ou instagram:</p>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-sm-12 col-xs-12 col-md-12 text-center q-gutter-sm">
        <q-btn
          rounded
          push
          color="green-7"
          class="shadow-6"
          label="Whatsapp"
          icon="mdi-whatsapp"
          href="https://api.whatsapp.com/send?phone=5591982828945&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20como%20publicar%20meu%20evento%20no%20app%20Abaet%C3%A9Fest"
          target="_blank"
          type="a"
          @click="handleWhatsapp"
        />
        <q-btn
          rounded
          push
          color="pink"
          class="shadow-6"
          label="instagram"
          icon="mdi-instagram"
          href="https://www.instagram.com/abaetefest/"
          target="_blank"
          type="a"
          @click="handleInstagram"
        />
      </div>
      <div class="col-sm-12 col-xs-12 col-md-6 q-pt-lg text-center">
        <p class="text-h6">Desenvolvido pela startup </p>
        <a href="https://abaetetech.com.br/" target="_blank">
          <q-avatar size="100px">
            <img
                rounded
                src="abaetetech.png"
              />
          </q-avatar>
        </a>
        <div>
          <q-btn
            href="https://abaetetech.com.br/"
            target="_blank"
            label="abaetetech.com.br"
            flat
            :color="$q.dark.isActive ? 'white' : 'primary'"
            no-caps
            size="lg"
          />
        </div>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-sm-12 col-xs-12 col-md-5 q-py-md">
      </div>
    </div>
  </q-page>
</template>

<script src="./contact.js"></script>

<style>
 .link-custom a {
  color: rgb(180, 196, 242);
};
</style>
