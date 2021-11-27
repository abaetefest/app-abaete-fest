<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-xs-12 text-center">
        <p class="text-h6">Metropolitana - Barcarena - PA</p>
        <audio id="radio-player" controls="" autoplay="" loop="">
          <track kind="captions">
          <source src="https://9320.brasilstream.com.br/stream.m3u" type="audio/mpeg">
          <source src="https://9320.brasilstream.com.br/stream" type="audio/mpeg">
          <source src="https://9320.brasilstream.com.br/stream" type="audio/mpeg">
          <source src="https://9320.brasilstream.com.br/stream" type="audio/mpeg">
          Seu navegador não suporta o elemento audio
        </audio>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageRadio',
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
