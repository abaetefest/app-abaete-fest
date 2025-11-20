<template>
  <q-card
    class="blog-card cursor-pointer shadow-2"
    :class="$q.dark.isActive ? 'bg-primary' : 'bg-white'"
    @click="$emit('click', post)"
  >
    <!-- Imagem do post -->
    <q-img
      v-if="post.featured_media_url"
      :src="post.featured_media_url"
      :alt="getPlainText(post.title.rendered)"
      class="blog-image"
      :ratio="16/9"
      placeholder-src="loadPlaceholder.png"
    >
      <template #loading>
        <q-skeleton class="full-width full-height" square />
      </template>
    </q-img>

    <!-- Badge de categoria -->
    <div class="blog-category-badge" v-if="post.categories && post.categories.length > 0">
      <q-chip
        color="accent"
        text-color="white"
        icon="mdi-tag"
        dense
        class="text-weight-bold q-pa-sm"
      >
        Blog
      </q-chip>
    </div>

    <!-- Conteúdo do card -->
    <q-card-section class="q-pa-md">
      <!-- Título do post -->
      <div class="blog-title q-mb-sm" v-html="post.title.rendered"></div>

      <!-- Data de publicação -->
      <div class="blog-meta q-mb-md">
        <q-icon name="mdi-calendar-outline" size="16px" class="q-mr-xs" />
        {{ formatDate(post.date) }}
      </div>

      <!-- Resumo do post -->
      <div class="blog-excerpt" v-if="post.excerpt && post.excerpt.rendered">
        {{ getExcerpt(post.excerpt.rendered) }}
      </div>

      <!-- Botão de leitura -->
      <div class="q-mt-md">
        <q-btn
          flat
          dense
          no-caps
          color="primary"
          label="Ler mais"
          icon-right="mdi-arrow-right"
          class="blog-read-more"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'BlogCard',

  props: {
    post: {
      type: Object,
      required: true
    }
  },

  emits: ['click'],

  methods: {
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date)
    },

    getExcerpt(excerpt) {
      if (!excerpt) return ''
      // Remove tags HTML e limpa o texto
      const cleanText = excerpt
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&hellip;/g, '...')
        .trim()

      // Limita a 150 caracteres
      return cleanText.length > 150
        ? cleanText.substring(0, 150) + '...'
        : cleanText
    },

    getPlainText(html) {
      if (!html) return ''
      return html.replace(/<[^>]*>/g, '').trim()
    }
  }
}
</script>

<style scoped>
.blog-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}

.blog-image {
  border-radius: 16px 16px 0 0;
}

.blog-category-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
}

.blog-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--q-dark);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-meta {
  font-size: 13px;
  color: #666;
  display: flex;
  align-items: center;
}

.blog-excerpt {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-read-more {
  font-weight: 500;
  transition: all 0.3s ease;
}

.blog-read-more:hover {
  padding-left: 8px;
}

/* Dark mode adjustments */
.q-dark .blog-title {
  color: white;
}

.q-dark .blog-meta,
.q-dark .blog-excerpt {
  color: #ccc;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .blog-title {
    font-size: 16px;
  }

  .blog-meta {
    font-size: 12px;
  }

  .blog-excerpt {
    font-size: 13px;
  }
}
</style>
