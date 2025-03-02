<template>
  <q-page>
    <q-card v-if="load" class="q-pa-xs">
      <q-item>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-skeleton height="400px" square />

      <q-item>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-card-actions>
        <q-skeleton type="QBtn" class="full-width" />
      </q-card-actions>
    </q-card>

    <q-card v-else class="full-width full-height no-shadow" :key="event.id" :class="$q.dark.isActive ? 'bg-primary text-white' : 'bg-grey-2 text-primary'">
        <q-separator />

        <q-card-section class="q-gutter-sm">
          <div class="text-body2 text-grey-9 q-mb-sm q-pa-xs text-center" style="min-height: 200px;">
            <q-img
              :src="event.image_url"
              style="max-width: 600px;border-radius: 10px"
              placeholder-src="loadPlaceholder.png"
            />
          </div>

          <div class="text-right q-mb-sm">
            <q-btn
              icon="mdi-fullscreen"
              label="Tela cheia"
              outline
              :color="$q.dark.isActive ? 'white' : 'grey-8'"
              @click="imgFullScreen"
            />
          </div>

          <div
            class="text-body1"
            :class="$q.dark.isActive ? 'text-white link-custom' : 'text-grey-9'"
          >
            <strong>DATA:</strong> {{ formatDateString(event.start_date)}} - {{ formatHourString(event.start_date) }}
          </div>

          <div class="text-h6">
            {{ event.name}}
          </div>

          <div
            v-if="event.description"
            class="text-body1"
            :class="$q.dark.isActive ? 'text-white link-custom' : 'text-grey-9'"
          >
            <div v-html="event.description">
              {{ event.description }}
            </div>
          </div>
        </q-card-section>

        <q-card-actions class="q-gutter-y-md">
          <q-btn
            v-if="canShare"
            label="Compartilhar"
            icon="mdi-share-variant-outline"
            @click="shareApp"
            class="full-width"
            color="blue"
          />

          <q-btn
            label="Voltar"
            class="full-width"
            icon="mdi-arrow-left"
            :color="$q.dark.isActive ? 'white' : 'primary'"
            outline
            @click="backToEvents(event.category)"
          />
        </q-card-actions>

    </q-card>

    <q-dialog
      v-model="imgZoom"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-center">
        <image-zoom
          :src="event.image_url"
          :ratio="1"
          @close="imgZoom = false"
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import ImageZoom from 'components/ImageZoom.vue'
export default {
  name: 'PageEventDetails',
  components: {
    ImageZoom
  },
  data () {
    return {
      idEvent: '',
      event: {},
      load: true,
      canShare: false,
      imgZoom: false
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.getEvent(this.$route.params.id)
    } else {
      this.$router.push('/')
    }

    if (!navigator.canShare) {
      this.canShare = false
    } else {
      this.canShare = true
    }
  },
  methods: {
    async getEvent (id) {
      this.load = true
      try {
        const { data } = await this.$services.events().get(id)
        this.event = data.data
        this.load = false
      } catch (error) {
        this.load = false
        console.log(error)
      }
    },
    formatDateString (dateOriginal) {
      return date.formatDate(dateOriginal, 'DD/MM/YYYY')
    },
    formatHourString (dateOriginal) {
      return date.formatDate(dateOriginal, 'HH:mm')
    },
    backToEvents (category) {
      this.$router.push({ name: 'events' })
    },
    async shareApp () {
      const shareData = {
        title: 'Veja esse Evento no AbaetéFest',
        text: this.event.name,
        url: window.location.origin + '/#/event-details/' + this.event.id
      }

      try {
        await navigator.share(shareData)
      } catch (err) {
        this.$notifyDanger('Não foi possível compartilharo app!')
      }
    },
    imgFullScreen () {
      this.imgZoom = true
    }
  },
  meta () {
    return {
      title: this.event.name,
      meta: {
        // description: { name: 'description', content: this.event.description },
        keywords: { name: 'keywords', content: 'AbaetéFest, festas, abaetetuba, eventos' },
        title: {
          name: 'title',
          content: this.event.name
        },
        ogTitle: {
          name: 'og:title',
          content: this.event.name
        },
        description: {
          name: 'description',
          content: this.event.description
        },
        ogDesc: {
          name: 'og:description',
          content: this.event.description
        },
        ogImage: {
          name: 'og:image',
          content: this.event.image_url
        }
      }
    }
  }
}
</script>

<style>
 .link-custom a {
  color: rgb(180, 196, 242);
};
</style>
