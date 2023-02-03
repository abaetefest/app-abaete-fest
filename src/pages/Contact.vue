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
        />
      </div>
      <div class="col-sm-12 col-xs-12 col-md-6 q-pt-md text-center">
         <q-img
            src="contact.svg"
            :width="$q.screen.gt.sm ? '300px' : '200px'"
          />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-sm-12 col-xs-12 col-md-5 q-py-md">
         <!-- <p><span class="text-bold">Mantido por:</span> Patrick Monteiro</p>
         <p><span class="text-bold">Email:</span> eng.patrickmonteiro@gmail.com</p> -->

         <q-list>
          <q-item>
            <q-item-section top avatar>
              <q-avatar>
                <img src="contact/patrick.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Patrick Monteiro</q-item-label>
              <q-item-label caption>Idealizador e Desenvolvedor Front-end.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section top avatar>
              <q-avatar>
                <img src="contact/waldener.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Waldener Júnior</q-item-label>
              <q-item-label caption>Mantenedor e Desenvolvedor Front-end.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section top avatar>
              <q-avatar>
                <img src="contact/iago.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Iago Cavalcante</q-item-label>
              <q-item-label caption>Arquiteto e Desenvolvedor Back-end.</q-item-label>
            </q-item-section>
          </q-item>
         </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageContact'
}
</script>
