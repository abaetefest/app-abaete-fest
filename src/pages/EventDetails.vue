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
    <q-card v-else class="full-width full-height" :key="event.id">
        <q-card-section class="row q-pb-none">
          <div class="text-h6 text-center q-py-none col-12">
           {{ event.name}}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-body2 text-grey-9 q-mb-md text-center" v-if="event.image_url">
            <q-img :src="event.image_url" style="max-width: 350px" />
          </div>

          <div class="q-mb-md">
            <q-btn
              v-if="canShare"
              dense
              label="Compartilhar"
              icon="mdi-share-variant-outline"
              @click="shareApp"
              class="full-width"
              color="blue"
            />
          </div>

          <div class="text-body2 text-grey-9 q-mb-md" v-if="event.description">
            <!-- <strong> SOBRE O EVENTO:</strong> -->
            <p v-html="event.description">
              {{ event.description }}
            </p>
          </div>

          <div class="text-body2 text-grey-9">
            <strong>DATA:</strong> {{ formatDateString(event.start_date)}} - {{ formatHourString(event.start_date) }}
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            label="Voltar"
            class="full-width"
            icon="mdi-arrow-left"
            color="primary"
            outline
            @click="backToEvents(event.category)"
          />
        </q-card-actions>

      </q-card>
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  name: 'PageEventDetails',
  data () {
    return {
      idEvent: '',
      event: {},
      load: true,
      canShare: false
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
      this.$router.push({ name: 'events', params: { type: category } })
    },
    async shareApp () {
      const response = await fetch(this.event.image_url)
      const blob = await response.blob()
      const filesArray = [
        new File(
          [blob],
          'meme.jpg',
          {
            type: 'image/jpeg',
            lastModified: new Date().getTime()
          })
      ]
      const shareData = {
        title: this.event.name,
        text: this.event.description,
        url: window.location.href,
        files: filesArray
      }

      try {
        await navigator.share(shareData)
      } catch (err) {
        this.$notifyDanger('Não foi possível compartilharo app!')
      }
    }
  },
  meta () {
    return {
      title: this.event.name,
      meta: {
        // description: { name: 'description', content: this.event.description },
        keywords: { name: 'keywords', content: 'AbaetéFest, festas, abaetetuba, eventos' }
      }
    }
  }
}
</script>
