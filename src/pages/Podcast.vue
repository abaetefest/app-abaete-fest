<template>
  <q-page padding :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'">
    <div class="text-h5 text-bold text-center q-pt-md q-pb-sm">
      Pod<span class="text-accent">Casts</span>
    </div>

    <div class="row q-col-gutter-md">
      <div
        v-for="(podcast, index) in podcastList"
        class="col-md-6 col-sm-12 col-xs-12"
        :key="index"
      >
        <q-card
          class="rounded"
          :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
        >
          <q-img
            :src="podcast.image"
            style="min-height: 100px;"
          >
            <div class="absolute-bottom text-body1 text-bold">
              {{ podcast.title }}
            </div>
          </q-img>

          <q-card-section>
            {{ podcast.description }}
          </q-card-section>

          <q-card-section
            class="q-pt-none q-mt-none"
            @click="openURLYoutube(podcast.youtube)"
          >
            <strong>Youtube:</strong>
            <span
              class="text-bold"
              :class="$q.dark.isActive ? 'text-secondary' : 'text-red-8'"
            >
              {{ podcast.youtube }}
            </span>
          </q-card-section>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'PagePodcast',
  data () {
    return {
      podcastList: [
        {
          title: 'Dirrocha Podcast',
          description: 'Abaetetuba na onda dos podcasts, canal criado para gerar conteúdo sobre acontecimentos da cidade de Abaetetuba PA',
          image: '/podcast/dirrocha.png',
          youtube: '@DirrochaPodcast'
        },
        {
          title: 'Papo Zero com Sylvio Romero',
          description: 'Podcast Papo Zero, apresentado pelo comediante Sylvio Romero, vai ao ar nas segundas e quintas as 20:00',
          image: '/podcast/papozero.png',
          youtube: '@Papozerocomsylvioromero'
        },
        {
          title: 'Pedro Henrique Pode Contar',
          description: 'Com objetivo de facilitar a vida das pessoas e da sociedade, o Pode Contar com Pedro Henrique está em constante processo de renovação, com conteúdos diretos, rápidos e importantes do dia a dia, com temas relacionados ao direito do consumidor, previdenciário, trabalhista, tributário, contabilidade, entre outros.',
          image: '/podcast/podecontar.png',
          youtube: '@PedroHenriquePodeContar'
        },
        {
          title: 'Aquipod',
          description: 'Podcast Online Anfitriãs @raissaquaresmaa e @raphaelamneves quarta-feira 20h',
          image: '/podcast/aquipod.png',
          youtube: '@aquipod7628'
        },
        {
          title: 'PodNerd Podcast',
          description: 'Apresentado por Alan Negrão e Simon Soares trás uma ampla referência em convidados e conversas com um toque de bom humor.',
          image: '/podcast/podnerd.png',
          youtube: '@podnerdpoodcast'
        }
      ]
    }
  },
  async mounted () {
  },
  methods: {
    openURLYoutube (youtubeChannel) {
      openURL(`https://www.youtube.com/${youtubeChannel}`, '_blank')
    }
  }
}
</script>

<style>
.card-cursos:hover {
  background: #e3f2fd;
}
</style>
