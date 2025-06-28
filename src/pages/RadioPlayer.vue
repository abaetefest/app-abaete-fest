<template>
  <q-page padding>
    <div class="col-xs-12 text-center">
      <q-icon
        v-if="img"
        :name="`img:radios/${img}`"
        size="130px"
        class="rounded-borders q-pb-md"
      />
    </div>

    <div class="col-xs-12 text-center q-mt-sm q-mb-lg">
        <q-spinner-bars
          v-if="playStarted === true"
          :color="$q.dark.isActive ? 'secondary' : 'primary'"
          size="4em"
        />
    </div>

    <div class="col-xs-12 text-center">
      <audio
        id="radio-player"
        controls=""
        autoplay=""
        loop=""
      >
        <track kind="captions">
        <source :src="link1" type="audio/mpeg">
        <source :src="link2" type="audio/mpeg">
        Seu navegador não suporta o elemento audio
      </audio>
      <p class="text-body1 q-mt-md">
        Aguarde alguns segundos enquanto o rádio carrega e inicia automaticamente. Caso não inicie aperte no play.
      </p>
    </div>
  </q-page>
</template>

<script>
import { radios } from 'src/constants/places/radios'
export default {
  name: 'PageRadioPlayer',
  data() {
    return {
      link1: '',
      link2: '',
      img: '',
      playStarted: false
    }
  },
  mounted() {
    const radio = radios.find((radio) => radio.id === this.$route.params.id)
    this.link1 = radio.link1
    this.link2 = radio.link2
    this.img = radio.icon
    const player = document.getElementById('radio-player')
    player.addEventListener('canplay', () => {
      this.playStarted = true
    })
    player.addEventListener('play', () => {
      this.playStarted = true
    })
    player.addEventListener('pause', () => {
      this.playStarted = false
    })
  },
  methods: {
  }
}
</script>
