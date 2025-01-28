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

    <q-card v-else class="full-width full-height" :key="event.id" :class="$q.dark.isActive ? 'bg-primary text-white' : 'bg-grey-2 text-primary'">
      <img
        :src="event.image_url"
        class="full-width"
        style="max-height: 30rem;width: 400px; position: absolute;filter: blur(1rem); opacity: 0.9"
        placeholder-src="loadPlaceholder.png"
      />
        <!-- <q-card-section class="row q-pb-none">
        </q-card-section> -->

        <q-separator />

        <q-card-section>
          <div class="text-body2 text-grey-9 q-mb-lg q-pa-sm text-center" style="min-height: 200px;">
            <q-img
              :src="event.image_url"
              style="max-width: 350px; min-width: 300px;border-radius: 10px"
              placeholder-src="loadPlaceholder.png"
            />
          </div>

          <q-separator />

          <div class="text-h6 text-center q-py-none col-12 q-pt-lg">
          {{ event.name}}
          </div>

          <q-card-section class="q-pa-sm">
              <q-btn
                v-if="canShare"
                dense
                label="Compartilhar"
                icon="mdi-share-variant-outline"
                @click="shareApp"
                class="full-width"
                color="blue"
              />
          </q-card-section>

          <div
            v-if="event.description"
            class="text-body1 q-mb-md"
            :class="$q.dark.isActive ? 'text-white link-custom' : 'text-grey-9'"
          >
            <!-- <strong> SOBRE O EVENTO:</strong> -->
            <p v-html="event.description">
              {{ event.description }}
            </p>
          </div>

          <div
            class="text-body2"
            :class="$q.dark.isActive ? 'text-white link-custom' : 'text-grey-9'"
          >
            <strong>DATA:</strong> {{ formatDateString(event.start_date)}} - {{ formatHourString(event.start_date) }}
          </div>
        </q-card-section>

        <q-card-actions>
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
