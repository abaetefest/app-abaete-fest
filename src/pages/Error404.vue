<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <div>
        <q-img
            src="not-found.svg"
            :width="$q.screen.gt.sm ? '400' : '300'"
          />
      </div>

      <div class="text-h2 text-primary">
        Página não encontrada
      </div>

      <q-btn
        class="q-mt-xl"
        color="primary"
        text-color="white"
        unelevated
        to="/"
        label="Voltar para o Início"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
