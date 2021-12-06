<template>
  <q-page padding>
    <div class="col-xs-12 text-center">
      <q-icon
        v-if="img"
        :name="`img:radios/${img}`"
        size="100px"
        class="rounded-borders q-pb-md"
      />
    </div>
    <div class="col-xs-12 text-center" v-if="id">
      <audio id="radio-player" controls="" autoplay="" loop="">
        <track kind="captions">
        <source src="https://9205.brasilstream.com.br/stream.m3u" type="audio/mpeg">
        <source src="https://9205.brasilstream.com.br/stream" type="audio/mpeg">
        Seu navegador não suporta o elemento audio
      </audio>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageRadioPlayer',
  data () {
    return {
      id: '',
      img: ''
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.img = this.$route.params.img
  },
  methods: {
  }
}
</script>
