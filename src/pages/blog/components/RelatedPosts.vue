<template>
  <div v-if="relatedPosts.length > 0" class="related-posts">
    <div class="text-h5 text-weight-bold q-mb-md">
      <q-icon name="mdi-text-box-multiple" size="28px" class="q-mr-sm" />
      Artigos Relacionados
    </div>

    <div v-if="loading" class="row q-col-gutter-md">
      <div
        v-for="i in limit"
        :key="`skeleton-${i}`"
        class="col-12 col-sm-6 col-md-4"
      >
        <q-card flat class="shadow-1">
          <q-skeleton height="200px" square />
          <q-card-section>
            <q-skeleton type="text" width="80%" />
            <q-skeleton type="text" width="60%" class="q-mt-sm" />
            <q-skeleton type="text" width="100%" class="q-mt-md" />
            <q-skeleton type="text" width="90%" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div v-else class="row q-col-gutter-md">
      <div
        v-for="post in relatedPosts"
        :key="post.id"
        class="col-12 col-sm-6 col-md-4"
      >
        <q-card
          flat
          class="related-post-card cursor-pointer shadow-1"
          :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
          @click="goToPost(post.id)"
        >
          <!-- Image -->
          <q-img
            v-if="post.featured_media_url"
            :src="post.featured_media_url"
            :alt="getPlainText(post.title.rendered)"
            class="related-post-image"
            :ratio="16/9"
          >
            <template #loading>
              <q-skeleton class="full-width full-height" square />
            </template>
          </q-img>

          <q-card-section class="q-pa-md">
            <!-- Title -->
            <div
              class="text-subtitle1 text-weight-medium q-mb-xs related-post-title"
              v-html="post.title.rendered"
            ></div>

            <!-- Date -->
            <div class="text-caption text-grey-7">
              <q-icon name="mdi-calendar-outline" size="14px" />
              {{ formatDate(post.date) }}
            </div>

            <!-- Excerpt -->
            <div
              v-if="post.excerpt && post.excerpt.rendered"
              class="text-body2 text-grey-7 q-mt-sm related-post-excerpt"
            >
              {{ getExcerpt(post.excerpt.rendered) }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RelatedPosts',

  props: {
    currentPostId: {
      type: Number,
      required: true
    },
    categoryIds: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 3
    }
  },

  data() {
    return {
      relatedPosts: [],
      loading: true
    }
  },

  async mounted() {
    await this.fetchRelatedPosts()
  },

  methods: {
    async fetchRelatedPosts() {
      this.loading = true

      try {
        // Constrói a URL para buscar posts relacionados
        let url = `https://viladosilicio.com.br/wp-json/wp/v2/posts?per_page=${this.limit + 1}&_embed=wp:featuredmedia`

        // Se temos categorias, filtra por elas
        if (this.categoryIds && this.categoryIds.length > 0) {
          url += `&categories=${this.categoryIds.join(',')}`
        }

        const response = await fetch(url)
        const data = await response.json()

        // Remove o post atual e limita ao número desejado
        this.relatedPosts = data
          .filter(post => post.id !== this.currentPostId)
          .slice(0, this.limit)
          .map(post => {
            // Adiciona URL da imagem destacada
            if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
              post.featured_media_url = post._embedded['wp:featuredmedia'][0].source_url
            }
            return post
          })

        console.log('📚 Posts relacionados carregados:', this.relatedPosts.length)
      } catch (err) {
        console.error('❌ Erro ao carregar posts relacionados:', err)
        // Não mostra notificação de erro pois não é crítico
      } finally {
        this.loading = false
      }
    },

    goToPost(postId) {
      this.$router.push({
        name: 'post-details',
        params: { id: postId }
      })
      window.scrollTo(0, 0)
    },

    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date)
    },

    getPlainText(html) {
      if (!html) return ''
      return html.replace(/<[^>]*>/g, '').trim()
    },

    getExcerpt(excerpt) {
      if (!excerpt) return ''
      const cleanText = excerpt
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&hellip;/g, '...')
        .trim()

      return cleanText.length > 100
        ? cleanText.substring(0, 100) + '...'
        : cleanText
    }
  }
}
</script>

<style scoped>
.related-posts {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid rgba(0, 0, 0, 0.12);
}

.q-dark .related-posts {
  border-top-color: rgba(255, 255, 255, 0.12);
}

.related-post-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.related-post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}

.related-post-image {
  border-radius: 12px 12px 0 0;
}

.related-post-title {
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8em;
}

.related-post-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
}

@media (max-width: 600px) {
  .related-post-title {
    font-size: 14px;
  }

  .related-post-excerpt {
    font-size: 13px;
  }
}
</style>
