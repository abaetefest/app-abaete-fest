export default {
  name: 'PostDetails',

  components: {
    ShareButtons: () => import('./components/ShareButtons'),
    RelatedPosts: () => import('./components/RelatedPosts')
  },

  data() {
    return {
      post: null,
      loading: true,
      error: null
    }
  },

  computed: {
    postId() {
      return this.$route.params.id
    },

    currentPageUrl() {
      if (typeof window !== 'undefined') {
        return window.location.href
      }
      return `https://app.abaetefest.com.br/blog/${this.postId}`
    }
  },

  meta() {
    if (!this.post) {
      return {
        title: 'Carregando artigo... - AbaetéFest',
        meta: {
          description: {
            name: 'description',
            content: 'Carregando conteúdo do artigo...'
          }
        }
      }
    }

    const plainTitle = this.getPlainText(this.post.title.rendered)
    const description = this.getExcerpt(this.post.excerpt && this.post.excerpt.rendered ? this.post.excerpt.rendered : '')

    return {
      title: `${plainTitle} - Blog AbaetéFest`,
      titleTemplate: title => title,

      meta: {
        description: {
          name: 'description',
          content: description
        },
        keywords: {
          name: 'keywords',
          content: `${plainTitle}, blog abaetetuba, abaetéfest, notícias abaetetuba`
        },
        robots: {
          name: 'robots',
          content: 'index, follow'
        },

        // Open Graph
        ogTitle: {
          property: 'og:title',
          content: plainTitle
        },
        ogDescription: {
          property: 'og:description',
          content: description
        },
        ogType: {
          property: 'og:type',
          content: 'article'
        },
        ogUrl: {
          property: 'og:url',
          content: this.currentPageUrl
        },
        ogImage: {
          property: 'og:image',
          content: this.post.featured_media_url || 'https://app.abaetefest.com.br/images/og-blog.jpg'
        },

        // Twitter Card
        twitterCard: {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        twitterTitle: {
          name: 'twitter:title',
          content: plainTitle
        },
        twitterDescription: {
          name: 'twitter:description',
          content: description
        },
        twitterImage: {
          name: 'twitter:image',
          content: this.post.featured_media_url || 'https://app.abaetefest.com.br/images/og-blog.jpg'
        }
      },

      link: {
        canonical: {
          rel: 'canonical',
          href: this.currentPageUrl
        }
      }
    }
  },

  async mounted() {
    await this.fetchPost()
  },

  watch: {
    postId(newId, oldId) {
      if (newId !== oldId) {
        this.fetchPost()
      }
    }
  },

  methods: {
    async fetchPost() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(
          `https://viladosilicio.com.br/wp-json/wp/v2/posts/${this.postId}?_embed=wp:featuredmedia,wp:term`
        )

        if (!response.ok) {
          throw new Error(`Falha ao carregar o artigo (${response.status})`)
        }

        const data = await response.json()

        // Processa a imagem destacada
        if (data._embedded && data._embedded['wp:featuredmedia'] && data._embedded['wp:featuredmedia'][0]) {
          data.featured_media_url = data._embedded['wp:featuredmedia'][0].source_url
        }

        // Processa as categorias e tags
        if (data._embedded && data._embedded['wp:term']) {
          // Extrair IDs das categorias
          const categories = data._embedded['wp:term'].find(terms => terms[0] && terms[0].taxonomy === 'category') || []
          data.categories = categories.map(cat => cat.id)

          // Extrair nomes das tags
          const tags = data._embedded['wp:term'].find(terms => terms[0] && terms[0].taxonomy === 'post_tag') || []
          data.tags = tags.map(tag => tag.name)
        }

        this.post = data

        // Analytics
        if (this.$mixpanel) {
          this.$mixpanel.track('Blog Post Viewed', {
            post_id: data.id,
            post_title: this.getPlainText(data.title.rendered)
          })
        }
      } catch (err) {
        console.error('❌ Erro ao buscar o artigo:', err)
        this.error = err
        this.$q.notify({
          message: 'Erro ao carregar o artigo. Tente novamente mais tarde.',
          color: 'negative',
          position: 'top',
          icon: 'mdi-alert'
        })
      } finally {
        this.loading = false
      }
    },

    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
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

      return cleanText.length > 160
        ? cleanText.substring(0, 160) + '...'
        : cleanText
    }
  }
}
