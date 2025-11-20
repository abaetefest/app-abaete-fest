<template>
  <div class="share-buttons row items-center q-gutter-xs">
    <div class="text-caption text-grey-7 q-mr-xs">Compartilhar:</div>

    <!-- WhatsApp -->
    <q-btn
      round
      flat
      size="sm"
      icon="mdi-whatsapp"
      color="positive"
      @click="shareWhatsApp"
      class="share-btn"
    >
      <q-tooltip>Compartilhar no WhatsApp</q-tooltip>
    </q-btn>

    <!-- Facebook -->
    <q-btn
      round
      flat
      size="sm"
      icon="mdi-facebook"
      color="primary"
      @click="shareFacebook"
      class="share-btn"
    >
      <q-tooltip>Compartilhar no Facebook</q-tooltip>
    </q-btn>

    <!-- Twitter/X -->
    <q-btn
      round
      flat
      size="sm"
      icon="mdi-twitter"
      color="info"
      @click="shareTwitter"
      class="share-btn"
    >
      <q-tooltip>Compartilhar no Twitter</q-tooltip>
    </q-btn>

    <!-- Copy Link -->
    <q-btn
      round
      flat
      size="sm"
      icon="mdi-link-variant"
      color="grey-7"
      @click="copyLink"
      class="share-btn"
    >
      <q-tooltip>Copiar link</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'ShareButtons',

  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },

  methods: {
    shareWhatsApp() {
      const text = encodeURIComponent(`${this.title}\n\n${this.url}`)
      window.open(`https://wa.me/?text=${text}`, '_blank')

      // Analytics
      if (this.$mixpanel) {
        this.$mixpanel.track('Post Shared', {
          platform: 'whatsapp',
          post_title: this.title
        })
      }
    },

    shareFacebook() {
      const url = encodeURIComponent(this.url)
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')

      // Analytics
      if (this.$mixpanel) {
        this.$mixpanel.track('Post Shared', {
          platform: 'facebook',
          post_title: this.title
        })
      }
    },

    shareTwitter() {
      const text = encodeURIComponent(this.title)
      const url = encodeURIComponent(this.url)
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')

      // Analytics
      if (this.$mixpanel) {
        this.$mixpanel.track('Post Shared', {
          platform: 'twitter',
          post_title: this.title
        })
      }
    },

    async copyLink() {
      try {
        await navigator.clipboard.writeText(this.url)
        this.$q.notify({
          message: 'Link copiado com sucesso!',
          color: 'positive',
          position: 'top',
          icon: 'mdi-check',
          timeout: 2000
        })

        // Analytics
        if (this.$mixpanel) {
          this.$mixpanel.track('Post Link Copied', {
            post_title: this.title
          })
        }
      } catch (err) {
        this.$q.notify({
          message: 'Erro ao copiar o link',
          color: 'negative',
          position: 'top',
          icon: 'mdi-alert',
          timeout: 2000
        })
      }
    }
  }
}
</script>

<style scoped>
.share-buttons {
  background: rgba(0, 0, 0, 0.03);
  padding: 8px 12px;
  border-radius: 20px;
}

.q-dark .share-buttons {
  background: rgba(255, 255, 255, 0.05);
}

.share-btn {
  transition: transform 0.2s ease;
}

.share-btn:hover {
  transform: scale(1.1);
}

@media (max-width: 600px) {
  .share-buttons {
    justify-content: flex-start;
    width: 100%;
  }
}
</style>
