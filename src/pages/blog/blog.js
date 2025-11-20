export default {
  name: 'PageBlog',

  // Meta tags para SEO
  meta() {
    const postCount = this.posts.length
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().toLocaleDateString('pt-BR', { month: 'long' })

    const baseUrl = 'https://app.abaetefest.com.br/blog'
    const currentUrl = baseUrl

    const pageTitle = `Blog AbaetéFest ${currentYear} - Notícias e Artigos sobre Abaetetuba`

    const baseDescription = `Fique por dentro das últimas notícias e artigos sobre eventos, cultura e turismo em Abaetetuba. ${postCount} artigos disponíveis sobre a região amazônica.`

    const dynamicKeywords = [
      'blog abaetetuba',
      `blog abaetetuba ${currentYear}`,
      'notícias abaetetuba',
      'artigos abaetetuba',
      'cultura abaetetuba',
      'turismo abaetetuba',
      'eventos abaetetuba',
      'amazônia',
      'pará',
      'baixo tocantins',
      `${currentMonth} ${currentYear}`
    ].join(', ')

    const shareTitle = `Blog AbaetéFest - ${postCount} Artigos`
    const shareDescription = `📰 ${postCount} artigos sobre eventos, cultura e turismo em Abaetetuba. Confira as últimas notícias!`
    const shareImage = 'https://app.abaetefest.com.br/images/og-blog.jpg'

    return {
      title: pageTitle,
      titleTemplate: title => title,

      meta: {
        description: {
          name: 'description',
          content: baseDescription
        },
        keywords: {
          name: 'keywords',
          content: dynamicKeywords
        },
        author: {
          name: 'author',
          content: 'AbaetéFest'
        },
        robots: {
          name: 'robots',
          content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        },

        // Open Graph
        ogTitle: {
          property: 'og:title',
          content: shareTitle
        },
        ogDescription: {
          property: 'og:description',
          content: shareDescription
        },
        ogImage: {
          property: 'og:image',
          content: shareImage
        },
        ogUrl: {
          property: 'og:url',
          content: currentUrl
        },
        ogType: {
          property: 'og:type',
          content: 'website'
        },

        // Twitter Card
        twitterCard: {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        twitterTitle: {
          name: 'twitter:title',
          content: shareTitle
        },
        twitterDescription: {
          name: 'twitter:description',
          content: shareDescription
        },
        twitterImage: {
          name: 'twitter:image',
          content: shareImage
        }
      },

      link: {
        canonical: {
          rel: 'canonical',
          href: currentUrl
        }
      }
    }
  },

  components: {
    BlogFilters: () => import('./components/BlogFilters'),
    BlogCard: () => import('./components/BlogCard'),
    BlogCardSkeleton: () => import('./components/BlogCardSkeleton')
  },

  data() {
    return {
      posts: [],
      loading: true,
      error: null,
      searchTerm: '',
      currentPage: 1,
      postsPerPage: 9,
      totalPages: 0,
      hasMorePages: false,
      // ID da categoria "Abaetéfest" no WordPress
      // Você precisará descobrir o ID correto da categoria
      categoryId: null
    }
  },

  computed: {
    filteredPosts() {
      if (!this.searchTerm) return this.posts

      const term = this.searchTerm.toLowerCase()
      return this.posts.filter(post => {
        const title = post.title.rendered.toLowerCase()
        const excerpt = post.excerpt.rendered.toLowerCase()
        return title.includes(term) || excerpt.includes(term)
      })
    }
  },

  async mounted() {
    // Primeiro, descobre o ID da categoria "Abaetéfest"
    await this.getCategoryId()
    // Depois carrega os posts
    await this.loadPosts()
  },

  methods: {
    /**
     * Busca o ID da categoria "Abaetéfest" no WordPress
     */
    async getCategoryId() {
      try {
        const response = await fetch('https://viladosilicio.com.br/wp-json/wp/v2/categories?search=Abaetéfest')
        const categories = await response.json()

        if (categories && categories.length > 0) {
          this.categoryId = categories[0].id
          console.log('📂 Categoria Abaetéfest encontrada, ID:', this.categoryId)
        } else {
          console.warn('⚠️ Categoria Abaetéfest não encontrada')
        }
      } catch (err) {
        console.error('❌ Erro ao buscar categoria:', err)
      }
    },

    /**
     * Carrega os posts do WordPress
     */
    async loadPosts() {
      this.loading = true
      this.error = null

      try {
        // Monta a URL da API com os parâmetros
        let url = `https://viladosilicio.com.br/wp-json/wp/v2/posts?page=${this.currentPage}&per_page=${this.postsPerPage}&_embed=wp:featuredmedia`

        // Adiciona filtro de categoria se encontrado
        if (this.categoryId) {
          url += `&categories=${this.categoryId}`
        }

        console.log('📡 Carregando posts da URL:', url)

        const response = await fetch(url)

        // Verifica se há mais páginas
        const total = parseInt(response.headers.get('X-WP-TotalPages'))
        this.totalPages = total
        this.hasMorePages = this.currentPage < total

        const data = await response.json()

        // Processa os posts
        this.posts = data.map(post => {
          // Adiciona URL da imagem destacada
          if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
            post.featured_media_url = post._embedded['wp:featuredmedia'][0].source_url
          }

          return post
        })

        console.log('📊 Posts carregados:', this.posts.length)
      } catch (err) {
        console.error('❌ Erro ao carregar posts:', err)
        this.error = err
        this.$q.notify({
          message: 'Erro ao carregar os artigos. Tente novamente mais tarde.',
          color: 'negative',
          position: 'top',
          icon: 'mdi-alert'
        })
      } finally {
        this.loading = false
      }
    },

    /**
     * Carrega uma página específica
     */
    async loadPage(page) {
      this.currentPage = page
      window.scrollTo(0, 0)
      await this.loadPosts()
    },

    /**
     * Abre detalhes do post
     */
    openPostDetails(post) {
      // Navega para a página de detalhes do post internamente
      this.$router.push({
        name: 'post-details',
        params: { id: post.id }
      })

      // Analytics
      if (this.$mixpanel) {
        this.$mixpanel.track('Blog Post Clicked', {
          post_id: post.id,
          post_title: post.title.rendered
        })
      }
    },

    /**
     * Limpa os filtros
     */
    clearFilters() {
      this.searchTerm = ''
    },

    /**
     * Atualiza o termo de busca
     */
    onFilterChange(newFilter) {
      this.searchTerm = newFilter
    }
  }
}
